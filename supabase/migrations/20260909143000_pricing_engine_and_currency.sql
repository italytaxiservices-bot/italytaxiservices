-- Task 2: centralized server-side pricing engine + explicit multi-currency
-- support (no silent FX conversion — a rate/route is denominated in exactly
-- one currency; if no rule exists in the chosen currency, staff price it
-- manually, the engine never converts).

-- ---------------------------------------------------------------------------
-- Constrain currency columns to the supported list instead of free text.
-- ---------------------------------------------------------------------------
alter table public.quotations add constraint quotations_currency_check
  check (currency in ('EUR','USD','GBP','SAR','AED','KWD'));
alter table public.bookings add constraint bookings_currency_check
  check (currency in ('EUR','USD','GBP','SAR','AED','KWD'));
alter table public.invoices add constraint invoices_currency_check
  check (currency in ('EUR','USD','GBP','SAR','AED','KWD'));

-- ---------------------------------------------------------------------------
-- Rate cards: default per-vehicle-category pricing (base + optional per-km),
-- one per currency (a EUR sedan rate and an AED sedan rate are two separate
-- rows, never derived from each other).
-- ---------------------------------------------------------------------------
create table public.pricing_rate_cards (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  vehicle_category public.vehicle_category not null,
  currency text not null check (currency in ('EUR','USD','GBP','SAR','AED','KWD')),
  base_price numeric(12, 2) not null default 0 check (base_price >= 0),
  price_per_km numeric(12, 2) check (price_per_km >= 0),
  min_price numeric(12, 2) check (min_price >= 0),
  active boolean not null default true,
  sort_order int not null default 0,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create unique index pricing_rate_cards_unique_idx on public.pricing_rate_cards (vehicle_category, currency) where deleted_at is null and active;
create index pricing_rate_cards_created_by_idx on public.pricing_rate_cards (created_by);

-- ---------------------------------------------------------------------------
-- Fixed-price routes: e.g. "Fiumicino Airport -> Rome city centre" x SEDAN x
-- EUR = a flat price, checked before falling back to the rate card. Matching
-- is a case-insensitive exact match on trimmed labels — deliberately not
-- fuzzy/geocoded, since there's no mapping API in play here.
-- ---------------------------------------------------------------------------
create table public.pricing_route_rates (
  id uuid primary key default gen_random_uuid(),
  pickup_label text not null,
  dropoff_label text not null,
  vehicle_category public.vehicle_category not null,
  currency text not null check (currency in ('EUR','USD','GBP','SAR','AED','KWD')),
  price numeric(12, 2) not null check (price >= 0),
  active boolean not null default true,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index pricing_route_rates_lookup_idx
  on public.pricing_route_rates (lower(pickup_label), lower(dropoff_label), vehicle_category, currency)
  where deleted_at is null and active;
create index pricing_route_rates_created_by_idx on public.pricing_route_rates (created_by);

-- ---------------------------------------------------------------------------
-- Surcharge rules: night hours (time-window based) or flat/percent add-ons
-- (holiday, waiting time, extra stop) that staff toggle on manually when
-- applicable — no attempt to auto-detect "extra stop" or "waiting time".
-- Night and holiday surcharges CAN be auto-detected from trip_time/trip_date
-- + holiday_dates, so those two kinds are evaluated automatically.
-- ---------------------------------------------------------------------------
create table public.pricing_surcharge_rules (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  kind text not null check (kind in ('NIGHT', 'HOLIDAY', 'WAITING', 'EXTRA_STOP', 'CUSTOM')),
  starts_at time,
  ends_at time,
  is_percent boolean not null default false,
  amount numeric(12, 2) not null default 0 check (amount >= 0),
  currency text check (currency in ('EUR','USD','GBP','SAR','AED','KWD')),
  active boolean not null default true,
  sort_order int not null default 0,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index pricing_surcharge_rules_created_by_idx on public.pricing_surcharge_rules (created_by);

create table public.pricing_holiday_dates (
  id uuid primary key default gen_random_uuid(),
  holiday_date date not null unique,
  label text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);
create index pricing_holiday_dates_created_by_idx on public.pricing_holiday_dates (created_by);

alter table public.pricing_rate_cards enable row level security;
alter table public.pricing_route_rates enable row level security;
alter table public.pricing_surcharge_rules enable row level security;
alter table public.pricing_holiday_dates enable row level security;

create policy pricing_rate_cards_select on public.pricing_rate_cards for select to authenticated using (public.current_user_active());
create policy pricing_rate_cards_write on public.pricing_rate_cards for insert to authenticated with check (public.is_admin());
create policy pricing_rate_cards_update on public.pricing_rate_cards for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy pricing_rate_cards_delete on public.pricing_rate_cards for delete to authenticated using (public.is_admin());

create policy pricing_route_rates_select on public.pricing_route_rates for select to authenticated using (public.current_user_active());
create policy pricing_route_rates_write on public.pricing_route_rates for insert to authenticated with check (public.is_admin());
create policy pricing_route_rates_update on public.pricing_route_rates for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy pricing_route_rates_delete on public.pricing_route_rates for delete to authenticated using (public.is_admin());

create policy pricing_surcharge_rules_select on public.pricing_surcharge_rules for select to authenticated using (public.current_user_active());
create policy pricing_surcharge_rules_write on public.pricing_surcharge_rules for insert to authenticated with check (public.is_admin());
create policy pricing_surcharge_rules_update on public.pricing_surcharge_rules for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy pricing_surcharge_rules_delete on public.pricing_surcharge_rules for delete to authenticated using (public.is_admin());

create policy pricing_holiday_dates_select on public.pricing_holiday_dates for select to authenticated using (public.current_user_active());
create policy pricing_holiday_dates_write on public.pricing_holiday_dates for insert to authenticated with check (public.is_admin());
create policy pricing_holiday_dates_delete on public.pricing_holiday_dates for delete to authenticated using (public.is_admin());

create trigger set_updated_at before update on public.pricing_rate_cards for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.pricing_route_rates for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.pricing_surcharge_rules for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Historical pricing snapshot: what the engine actually calculated at the
-- time of pricing, frozen — so a later rate-card edit never silently
-- changes what a past quotation/booking says it charged.
-- ---------------------------------------------------------------------------
alter table public.quotations add column if not exists distance_km numeric(8, 2) check (distance_km >= 0);
alter table public.quotations add column if not exists pricing_breakdown jsonb;
alter table public.bookings add column if not exists distance_km numeric(8, 2) check (distance_km >= 0);
alter table public.bookings add column if not exists pricing_breakdown jsonb;
