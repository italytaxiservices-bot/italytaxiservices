create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_reference text not null unique,
  customer_id uuid not null references public.customers (id) on delete restrict,
  -- A quotation can only ever produce one booking (conversion idempotency).
  quotation_id uuid references public.quotations (id) on delete set null,
  pickup text not null,
  dropoff text not null,
  trip_date date not null,
  trip_time time not null,
  passengers int,
  luggage int,
  vehicle_id uuid references public.vehicles (id) on delete set null,
  driver_id uuid references public.drivers (id) on delete set null,
  flight_number text,
  special_requests text,
  price numeric(12, 2) not null default 0 check (price >= 0),
  currency text not null default 'EUR',
  tax_amount numeric(12, 2) not null default 0 check (tax_amount >= 0),
  discount numeric(12, 2) not null default 0 check (discount >= 0),
  total numeric(12, 2) not null default 0 check (total >= 0),
  payment_status public.payment_status not null default 'UNPAID',
  status public.booking_status not null default 'PENDING',
  internal_notes text,
  customer_notes text,
  source public.booking_source not null default 'ADMIN',
  created_by uuid references public.profiles (id) on delete set null,
  assigned_by uuid references public.profiles (id) on delete set null,
  assigned_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create trigger set_updated_at before update on public.bookings
  for each row execute function public.set_updated_at();

create unique index bookings_quotation_id_unique_idx
  on public.bookings (quotation_id)
  where quotation_id is not null;

create index bookings_customer_id_idx on public.bookings (customer_id);
create index bookings_status_idx on public.bookings (status) where deleted_at is null;
create index bookings_payment_status_idx on public.bookings (payment_status) where deleted_at is null;
create index bookings_trip_date_idx on public.bookings (trip_date) where deleted_at is null;
create index bookings_driver_id_idx on public.bookings (driver_id) where deleted_at is null;
create index bookings_vehicle_id_idx on public.bookings (vehicle_id) where deleted_at is null;
create index bookings_created_at_idx on public.bookings (created_at);

alter table public.quotations
  add constraint quotations_converted_booking_fk
    foreign key (converted_booking_id) references public.bookings (id) on delete set null;

create unique index quotations_converted_booking_unique_idx
  on public.quotations (converted_booking_id)
  where converted_booking_id is not null;

create table public.booking_status_history (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  from_status public.booking_status,
  to_status public.booking_status not null,
  changed_by uuid references public.profiles (id) on delete set null,
  changed_at timestamptz not null default now(),
  note text
);
create index booking_status_history_booking_id_idx on public.booking_status_history (booking_id);

create table public.booking_passengers (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  full_name text not null,
  phone text,
  is_primary boolean not null default false
);
create index booking_passengers_booking_id_idx on public.booking_passengers (booking_id);

create table public.driver_assignments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  driver_id uuid references public.drivers (id) on delete set null,
  vehicle_id uuid references public.vehicles (id) on delete set null,
  assigned_by uuid references public.profiles (id) on delete set null,
  assigned_at timestamptz not null default now(),
  status text not null default 'ASSIGNED'
    check (status in ('ASSIGNED', 'EN_ROUTE', 'COMPLETED', 'CANCELLED')),
  notes text,
  unassigned_at timestamptz
);
create index driver_assignments_booking_id_idx on public.driver_assignments (booking_id);
create index driver_assignments_driver_id_idx on public.driver_assignments (driver_id);
