-- Task 2: configurable CRM follow-up automation rules. The 3 follow-up-
-- generating automations had their timing hardcoded in the function body
-- (quotation follow-up: 3 days after sent; post-trip: 1 day after
-- completion; upcoming-trip reminder: 1 day ahead of the trip) — staff
-- could only turn them fully on/off, never tune the timing. Adding a
-- `config` column + helper, and reading from it with the old hardcoded
-- value as the fallback default so behavior is unchanged until an admin
-- actually edits a rule.

alter table public.automation_definitions add column if not exists config jsonb not null default '{}'::jsonb;

update public.automation_definitions set config = '{"delay_days": 3}'::jsonb where key = 'quotation_follow_up';
update public.automation_definitions set config = '{"delay_days": 1}'::jsonb where key = 'post_trip_follow_up';
update public.automation_definitions set config = '{"days_ahead": 1}'::jsonb where key = 'upcoming_trip_reminders';

create or replace function public.automation_config(p_key text)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select config from public.automation_definitions where key = p_key), '{}'::jsonb);
$$;

revoke execute on function public.automation_config(text) from public, anon, authenticated;
grant execute on function public.automation_config(text) to service_role;

-- ---------------------------------------------------------------------------
-- quotation_follow_up: due date now reads config->>'delay_days' (default 3).
-- ---------------------------------------------------------------------------
create or replace function public.create_quotation_follow_up()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_created boolean := false;
  v_delay_days int;
begin
  if new.status = 'SENT' and (tg_op = 'INSERT' or old.status is distinct from new.status) then
    if not public.automation_is_enabled('quotation_follow_up') then
      perform public.log_automation_run('quotation_follow_up', 'SKIPPED_DISABLED', 0, null, 'TRIGGER', jsonb_build_object('quotation_id', new.id));
      return new;
    end if;

    v_delay_days := coalesce((public.automation_config('quotation_follow_up')->>'delay_days')::int, 3);

    if not exists (
      select 1 from public.follow_ups
      where quotation_id = new.id and type = 'QUOTATION_FOLLOWUP' and status = 'PENDING'
    ) then
      insert into public.follow_ups (customer_id, quotation_id, type, due_date, notes, created_by)
      values (new.customer_id, new.id, 'QUOTATION_FOLLOWUP', current_date + v_delay_days,
              'Quotation ' || new.quotation_number || ' sent — check if the customer has responded.', new.created_by);
      v_created := true;
    end if;
    perform public.log_automation_run('quotation_follow_up', 'SUCCESS', case when v_created then 1 else 0 end, null, 'TRIGGER', jsonb_build_object('quotation_id', new.id));
  end if;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- post_trip_follow_up: due date now reads config->>'delay_days' (default 1).
-- ---------------------------------------------------------------------------
create or replace function public.create_post_trip_follow_up()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_created boolean := false;
  v_delay_days int;
begin
  if new.status = 'COMPLETED' and old.status is distinct from new.status then
    if not public.automation_is_enabled('post_trip_follow_up') then
      perform public.log_automation_run('post_trip_follow_up', 'SKIPPED_DISABLED', 0, null, 'TRIGGER', jsonb_build_object('booking_id', new.id));
      return new;
    end if;

    v_delay_days := coalesce((public.automation_config('post_trip_follow_up')->>'delay_days')::int, 1);

    if not exists (
      select 1 from public.follow_ups
      where booking_id = new.id and type = 'POST_TRIP_FOLLOWUP'
    ) then
      insert into public.follow_ups (customer_id, booking_id, type, due_date, notes, created_by)
      values (new.customer_id, new.id, 'POST_TRIP_FOLLOWUP', current_date + v_delay_days,
              'Trip ' || new.booking_reference || ' completed — follow up for feedback / repeat booking.', new.created_by);
      v_created := true;
    end if;
    perform public.log_automation_run('post_trip_follow_up', 'SUCCESS', case when v_created then 1 else 0 end, null, 'TRIGGER', jsonb_build_object('booking_id', new.id));
  end if;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- upcoming_trip_reminders (cron): p_days_ahead argument now defaults from
-- config->>'days_ahead' when the caller doesn't override it explicitly.
-- The cron route calls this with no argument, so this is the value that
-- actually governs production behavior; the argument stays for manual/
-- test invocations that want a different lookahead.
-- ---------------------------------------------------------------------------
create or replace function public.create_upcoming_trip_reminders(p_days_ahead integer default null)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count int := 0;
  v_days_ahead int;
  r record;
begin
  if not public.automation_is_enabled('upcoming_trip_reminders') then
    perform public.log_automation_run('upcoming_trip_reminders', 'SKIPPED_DISABLED', 0, null, 'CRON');
    return 0;
  end if;

  v_days_ahead := coalesce(p_days_ahead, (public.automation_config('upcoming_trip_reminders')->>'days_ahead')::int, 1);

  for r in
    select id, customer_id, booking_reference from public.bookings
    where status in ('CONFIRMED', 'ASSIGNED')
      and trip_date = current_date + v_days_ahead
      and deleted_at is null
  loop
    if not exists (
      select 1 from public.follow_ups
      where booking_id = r.id and type = 'UPCOMING_TRIP' and status = 'PENDING'
    ) then
      insert into public.follow_ups (customer_id, booking_id, type, due_date, notes)
      values (r.customer_id, r.id, 'UPCOMING_TRIP', current_date,
              'Trip ' || r.booking_reference || ' is coming up — confirm driver/vehicle readiness.');
      v_count := v_count + 1;
    end if;
  end loop;

  perform public.log_automation_run('upcoming_trip_reminders', 'SUCCESS', v_count, null, 'CRON');
  return v_count;
end;
$$;
