create table public.quotations (
  id uuid primary key default gen_random_uuid(),
  quotation_number text not null unique,
  customer_id uuid not null references public.customers (id) on delete restrict,
  lead_id uuid references public.leads (id) on delete set null,
  pickup text,
  dropoff text,
  trip_date date,
  trip_time time,
  passengers int,
  luggage int,
  vehicle_id uuid references public.vehicles (id) on delete set null,
  driver_id uuid references public.drivers (id) on delete set null,
  subtotal numeric(12, 2) not null default 0 check (subtotal >= 0),
  discount numeric(12, 2) not null default 0 check (discount >= 0),
  tax_rate numeric(5, 2) not null default 0 check (tax_rate >= 0),
  tax_amount numeric(12, 2) not null default 0 check (tax_amount >= 0),
  total numeric(12, 2) not null default 0 check (total >= 0),
  currency text not null default 'EUR',
  valid_until date,
  payment_terms text,
  terms_and_conditions text,
  status public.quotation_status not null default 'DRAFT',
  sent_at timestamptz,
  viewed_at timestamptz,
  accepted_at timestamptz,
  rejected_at timestamptz,
  -- FK to bookings added in 20260909120400_bookings.sql once that table exists.
  converted_booking_id uuid,
  internal_notes text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create trigger set_updated_at before update on public.quotations
  for each row execute function public.set_updated_at();

create index quotations_customer_id_idx on public.quotations (customer_id);
create index quotations_status_idx on public.quotations (status) where deleted_at is null;
create index quotations_lead_id_idx on public.quotations (lead_id);
create index quotations_created_at_idx on public.quotations (created_at);

create table public.quotation_items (
  id uuid primary key default gen_random_uuid(),
  quotation_id uuid not null references public.quotations (id) on delete cascade,
  description text not null,
  quantity numeric(10, 2) not null default 1 check (quantity > 0),
  unit_price numeric(12, 2) not null default 0 check (unit_price >= 0),
  amount numeric(12, 2) not null default 0 check (amount >= 0),
  sort_order int not null default 0
);
create index quotation_items_quotation_id_idx on public.quotation_items (quotation_id);

create table public.quotation_status_history (
  id uuid primary key default gen_random_uuid(),
  quotation_id uuid not null references public.quotations (id) on delete cascade,
  from_status public.quotation_status,
  to_status public.quotation_status not null,
  changed_by uuid references public.profiles (id) on delete set null,
  changed_at timestamptz not null default now(),
  note text
);
create index quotation_status_history_quotation_id_idx on public.quotation_status_history (quotation_id);
