-- Task 3 §4,6,7: Driver Operations 2.0 — pay/commission config, per-trip
-- earnings, and payout batches.

alter table public.drivers
  add column if not exists pay_model text check (pay_model in ('FIXED_PER_TRIP','PERCENTAGE','DAILY_RATE','CUSTOM')),
  add column if not exists pay_rate numeric(12, 2) check (pay_rate >= 0),
  add column if not exists pay_currency text check (pay_currency in ('EUR','USD','GBP','SAR','AED','KWD'));

comment on column public.drivers.pay_rate is 'Meaning depends on pay_model: flat amount for FIXED_PER_TRIP, 0-100 for PERCENTAGE, per-day amount for DAILY_RATE. Unused for CUSTOM (manual entry only).';

create table public.driver_earnings (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references public.drivers (id) on delete restrict,
  booking_id uuid references public.bookings (id) on delete set null,
  trip_revenue numeric(12, 2) not null check (trip_revenue >= 0),
  driver_earning numeric(12, 2) not null check (driver_earning >= 0),
  company_share numeric(12, 2) not null check (company_share >= 0),
  currency text not null default 'EUR' check (currency in ('EUR','USD','GBP','SAR','AED','KWD')),
  -- Snapshot of the pay model/rate used, frozen at calculation time — a
  -- later change to the driver's pay_rate must never retroactively alter
  -- an already-calculated trip earning.
  calculation_method text not null,
  calculation_rate numeric(12, 2),
  status text not null default 'PENDING' check (status in ('PENDING','APPROVED','PAID')),
  approved_by uuid references public.profiles (id) on delete set null,
  approved_at timestamptz,
  payout_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index driver_earnings_booking_id_unique_idx on public.driver_earnings (booking_id) where booking_id is not null;
create index driver_earnings_driver_id_idx on public.driver_earnings (driver_id);
create index driver_earnings_status_idx on public.driver_earnings (status);
create index driver_earnings_payout_id_idx on public.driver_earnings (payout_id) where payout_id is not null;

alter table public.driver_earnings enable row level security;
create policy driver_earnings_select on public.driver_earnings for select to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS']::public.user_role[]));
create policy driver_earnings_update on public.driver_earnings for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]));
-- No insert policy for authenticated — created only by the trigger below
-- (SECURITY DEFINER) or a finance-only manual-entry action added later.

create trigger set_updated_at before update on public.driver_earnings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Auto-calculate a per-trip earning when a booking with a driver assigned
-- is marked COMPLETED. Only FIXED_PER_TRIP and PERCENTAGE are genuinely
-- per-trip pay models — DAILY_RATE and CUSTOM drivers are compensated
-- through manual entries at payout time instead of a fabricated per-trip
-- number that wouldn't reflect how they're actually paid.
-- ---------------------------------------------------------------------------
create or replace function public.calculate_driver_earning()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_driver public.drivers%rowtype;
  v_earning numeric(12, 2);
begin
  if new.status = 'COMPLETED' and old.status is distinct from new.status and new.driver_id is not null then
    if not public.automation_is_enabled('driver_earning_on_completion') then
      perform public.log_automation_run('driver_earning_on_completion', 'SKIPPED_DISABLED', 0, null, 'TRIGGER', jsonb_build_object('booking_id', new.id));
      return new;
    end if;

    select * into v_driver from public.drivers where id = new.driver_id;

    if v_driver.pay_model = 'FIXED_PER_TRIP' and v_driver.pay_rate is not null then
      v_earning := v_driver.pay_rate;
    elsif v_driver.pay_model = 'PERCENTAGE' and v_driver.pay_rate is not null then
      v_earning := round(new.total * (v_driver.pay_rate / 100), 2);
    else
      perform public.log_automation_run('driver_earning_on_completion', 'SUCCESS', 0, null, 'TRIGGER', jsonb_build_object('booking_id', new.id, 'note', 'pay model not per-trip or not configured'));
      return new;
    end if;

    insert into public.driver_earnings (driver_id, booking_id, trip_revenue, driver_earning, company_share, currency, calculation_method, calculation_rate)
    values (new.driver_id, new.id, new.total, v_earning, greatest(new.total - v_earning, 0), new.currency, v_driver.pay_model, v_driver.pay_rate)
    on conflict (booking_id) where booking_id is not null do nothing;

    perform public.log_automation_run('driver_earning_on_completion', 'SUCCESS', 1, null, 'TRIGGER', jsonb_build_object('booking_id', new.id, 'driver_id', new.driver_id));
  end if;
  return new;
end;
$$;

create trigger calculate_driver_earning after update on public.bookings
  for each row execute function public.calculate_driver_earning();

revoke execute on function public.calculate_driver_earning() from public, anon, authenticated;
grant execute on function public.calculate_driver_earning() to service_role;

insert into public.automation_definitions (key, label, description, kind) values
  ('driver_earning_on_completion', 'Calculate driver earning on trip completion', 'Creates a PENDING earnings record when a booking with an assigned driver is marked COMPLETED, using that driver''s configured pay model.', 'TRIGGER')
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- Driver payouts — a batch of approved earnings (plus manual adjustments)
-- for a driver over a period. Never auto-marked PAID; that only happens
-- when staff records an actual payment reference.
-- ---------------------------------------------------------------------------
create table public.driver_payouts (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references public.drivers (id) on delete restrict,
  period_start date not null,
  period_end date not null check (period_end >= period_start),
  gross_earnings numeric(12, 2) not null default 0 check (gross_earnings >= 0),
  adjustments numeric(12, 2) not null default 0,
  expenses numeric(12, 2) not null default 0 check (expenses >= 0),
  net_payout numeric(12, 2) not null default 0,
  currency text not null default 'EUR' check (currency in ('EUR','USD','GBP','SAR','AED','KWD')),
  status text not null default 'PENDING' check (status in ('PENDING','APPROVED','PAID')),
  payment_reference text,
  notes text,
  created_by uuid references public.profiles (id) on delete set null,
  approved_by uuid references public.profiles (id) on delete set null,
  approved_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index driver_payouts_driver_id_idx on public.driver_payouts (driver_id);
create index driver_payouts_status_idx on public.driver_payouts (status);
create index driver_payouts_created_by_idx on public.driver_payouts (created_by);
create index driver_payouts_approved_by_idx on public.driver_payouts (approved_by);

alter table public.driver_payouts enable row level security;
create policy driver_payouts_select on public.driver_payouts for select to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]));
create policy driver_payouts_insert on public.driver_payouts for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]));
create policy driver_payouts_update on public.driver_payouts for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]));

create trigger set_updated_at before update on public.driver_payouts
  for each row execute function public.set_updated_at();

alter table public.driver_earnings
  add constraint driver_earnings_payout_id_fkey foreign key (payout_id) references public.driver_payouts (id) on delete set null;
