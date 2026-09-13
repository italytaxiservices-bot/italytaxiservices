-- Task 2: expanded trip lifecycle with event timestamps, a terminal-state
-- guard, and a driver/vehicle availability (overlap) engine.

-- ---------------------------------------------------------------------------
-- Event timestamps — one column per lifecycle transition, plus an estimated
-- trip duration so overlap detection isn't limited to exact date+time
-- matches (the previous state: the calendar page only flagged two trips as
-- conflicting when they shared the *exact* same trip_date/trip_time, missing
-- e.g. a 09:00-11:00 airport run and a 10:00 pickup on the same driver).
-- ---------------------------------------------------------------------------
alter table public.bookings
  add column if not exists estimated_duration_minutes int not null default 120 check (estimated_duration_minutes > 0),
  add column if not exists confirmed_at timestamptz,
  add column if not exists driver_en_route_at timestamptz,
  add column if not exists picked_up_at timestamptz,
  add column if not exists trip_started_at timestamptz,
  add column if not exists completed_at timestamptz,
  add column if not exists cancelled_at timestamptz,
  add column if not exists no_show_at timestamptz;

comment on column public.bookings.estimated_duration_minutes is
  'Used only for driver/vehicle overlap detection (check_assignment_conflicts). Not a promise to the customer; defaults to a 2h buffer when unknown.';

-- ---------------------------------------------------------------------------
-- Auto-stamp the matching *_at column the first time a booking enters that
-- status. Idempotent: only fills a column when it is still null, so
-- re-saving a booking already at that status (or DB replays) never
-- overwrites the original transition time.
-- ---------------------------------------------------------------------------
create or replace function public.stamp_booking_lifecycle_timestamps()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    if new.status = 'CONFIRMED' and new.confirmed_at is null then
      new.confirmed_at := now();
    elsif new.status = 'DRIVER_EN_ROUTE' and new.driver_en_route_at is null then
      new.driver_en_route_at := now();
    elsif new.status = 'PASSENGER_PICKED_UP' and new.picked_up_at is null then
      new.picked_up_at := now();
    elsif new.status = 'IN_PROGRESS' and new.trip_started_at is null then
      new.trip_started_at := now();
    elsif new.status = 'COMPLETED' and new.completed_at is null then
      new.completed_at := now();
    elsif new.status = 'CANCELLED' and new.cancelled_at is null then
      new.cancelled_at := now();
    elsif new.status = 'NO_SHOW' and new.no_show_at is null then
      new.no_show_at := now();
    end if;
  end if;
  return new;
end;
$$;

create trigger stamp_booking_lifecycle_timestamps
  before insert or update on public.bookings
  for each row execute function public.stamp_booking_lifecycle_timestamps();

-- ---------------------------------------------------------------------------
-- Terminal-state guard: COMPLETED / CANCELLED / NO_SHOW are end states. Once
-- a booking reaches one, no further status change is allowed through normal
-- (non service-role) sessions — closes a real gap where the trip-status
-- button row let staff jump a completed/cancelled trip back to any other
-- status with no restriction, which could re-trigger the confirmed-booking
-- invoice trigger and produce inconsistent financial history.
-- ---------------------------------------------------------------------------
create or replace function public.guard_booking_terminal_state()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.status in ('COMPLETED', 'CANCELLED', 'NO_SHOW')
     and new.status is distinct from old.status
     and auth.role() <> 'service_role' then
    raise exception 'Booking % is already %, which is a final status and cannot be changed', old.booking_reference, old.status;
  end if;
  return new;
end;
$$;

create trigger guard_booking_terminal_state
  before update on public.bookings
  for each row execute function public.guard_booking_terminal_state();

revoke execute on function public.stamp_booking_lifecycle_timestamps() from public;
revoke execute on function public.guard_booking_terminal_state() from public;
grant execute on function public.stamp_booking_lifecycle_timestamps() to service_role;
grant execute on function public.guard_booking_terminal_state() to service_role;

-- ---------------------------------------------------------------------------
-- Driver/vehicle availability engine: given a candidate driver/vehicle +
-- trip_date/trip_time/duration, return every other active (non-terminal,
-- non-deleted) booking whose window overlaps it for the same driver and/or
-- vehicle. SECURITY INVOKER (default) — RLS on bookings still applies to the
-- caller, which is correct: only staff who can already see bookings should
-- learn about a driver's schedule.
-- ---------------------------------------------------------------------------
create or replace function public.check_assignment_conflicts(
  p_booking_id uuid,
  p_driver_id uuid,
  p_vehicle_id uuid,
  p_trip_date date,
  p_trip_time time,
  p_duration_minutes int default 120
)
returns table (
  conflict_type text,
  booking_id uuid,
  booking_reference text,
  trip_date date,
  trip_time time,
  status public.booking_status
)
language sql
stable
set search_path = public
as $$
  with candidate as (
    select
      (p_trip_date + p_trip_time)::timestamp as starts_at,
      (p_trip_date + p_trip_time)::timestamp + make_interval(mins => p_duration_minutes) as ends_at
  )
  select
    case when b.driver_id = p_driver_id then 'DRIVER' else 'VEHICLE' end as conflict_type,
    b.id as booking_id,
    b.booking_reference,
    b.trip_date,
    b.trip_time,
    b.status
  from public.bookings b, candidate c
  where b.deleted_at is null
    and b.id is distinct from p_booking_id
    and b.status not in ('CANCELLED', 'NO_SHOW', 'COMPLETED')
    and ((p_driver_id is not null and b.driver_id = p_driver_id) or (p_vehicle_id is not null and b.vehicle_id = p_vehicle_id))
    and (b.trip_date + b.trip_time)::timestamp < c.ends_at
    and ((b.trip_date + b.trip_time)::timestamp + make_interval(mins => b.estimated_duration_minutes)) > c.starts_at
  order by b.trip_date, b.trip_time;
$$;

revoke execute on function public.check_assignment_conflicts(uuid, uuid, uuid, date, time, int) from public, anon;
grant execute on function public.check_assignment_conflicts(uuid, uuid, uuid, date, time, int) to authenticated;
