-- Staff profiles, company settings, document numbering, customers, leads,
-- vehicles and drivers.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  email text not null,
  phone text,
  role public.user_role not null default 'VIEWER',
  active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.profiles is 'Admin/staff accounts. One row per auth.users row.';

create trigger set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Every new Supabase Auth user automatically gets a profile, inactive with
-- the lowest-privilege role until a SUPER_ADMIN reviews and activates them.
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

create table public.company_settings (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true,
  company_name text not null default 'Italy Limo Service',
  legal_name text,
  logo_url text,
  email text,
  phone text,
  whatsapp text,
  address text,
  website text,
  tax_number text,
  currency_default text not null default 'EUR',
  tax_rate_default numeric(5, 2) not null default 0,
  quotation_prefix text not null default 'ILS-QUO',
  invoice_prefix text not null default 'ILS-INV',
  receipt_prefix text not null default 'ILS-REC',
  booking_prefix text not null default 'ILS',
  lead_prefix text not null default 'ILS-LEAD',
  payment_terms text,
  terms_and_conditions text,
  updated_at timestamptz not null default now(),
  constraint company_settings_singleton unique (singleton),
  constraint company_settings_singleton_true check (singleton)
);
comment on table public.company_settings is 'Single-row table: business/document defaults.';

create trigger set_updated_at before update on public.company_settings
  for each row execute function public.set_updated_at();

create table public.document_sequences (
  doc_type text primary key,
  next_number int not null default 1
);
comment on table public.document_sequences is
  'Atomic per-series counters backing next_document_number(). Prefixes live in company_settings, not here, so there is one source of truth.';

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  whatsapp text,
  country text,
  company_name text,
  billing_address text,
  notes text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create trigger set_updated_at before update on public.customers
  for each row execute function public.set_updated_at();

create unique index customers_email_unique_idx
  on public.customers (lower(email))
  where email is not null and deleted_at is null;
create index customers_phone_idx on public.customers (phone) where deleted_at is null;
create index customers_deleted_at_idx on public.customers (deleted_at);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  lead_number text not null unique,
  full_name text not null,
  email text,
  phone text,
  whatsapp text,
  source text not null default 'WEBSITE',
  pickup text,
  dropoff text,
  trip_date date,
  trip_time time,
  passengers int,
  vehicle_requested public.vehicle_category,
  estimated_value numeric(12, 2),
  currency text not null default 'EUR',
  notes text,
  status public.lead_status not null default 'NEW',
  assigned_to uuid references public.profiles (id) on delete set null,
  customer_id uuid references public.customers (id) on delete set null,
  next_follow_up_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create trigger set_updated_at before update on public.leads
  for each row execute function public.set_updated_at();

create index leads_status_idx on public.leads (status) where deleted_at is null;
create index leads_assigned_to_idx on public.leads (assigned_to) where deleted_at is null;
create index leads_customer_id_idx on public.leads (customer_id);
create index leads_created_at_idx on public.leads (created_at);
create index leads_next_follow_up_idx on public.leads (next_follow_up_at) where deleted_at is null;

create table public.lead_status_history (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  from_status public.lead_status,
  to_status public.lead_status not null,
  changed_by uuid references public.profiles (id) on delete set null,
  changed_at timestamptz not null default now(),
  note text
);
create index lead_status_history_lead_id_idx on public.lead_status_history (lead_id);

create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  make text,
  model text,
  year int,
  category public.vehicle_category not null default 'SEDAN',
  seats int,
  luggage_capacity int,
  registration_number text unique,
  description text,
  image_url text,
  status public.vehicle_status not null default 'ACTIVE',
  active boolean not null default true,
  registration_expiry date,
  insurance_expiry date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create trigger set_updated_at before update on public.vehicles
  for each row execute function public.set_updated_at();

create index vehicles_category_idx on public.vehicles (category) where deleted_at is null;
create index vehicles_active_idx on public.vehicles (active) where deleted_at is null;

create table public.drivers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  whatsapp text,
  email text,
  nationality text,
  license_number text,
  license_expiry date,
  assigned_vehicle_id uuid references public.vehicles (id) on delete set null,
  active boolean not null default true,
  availability public.driver_availability not null default 'AVAILABLE',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create trigger set_updated_at before update on public.drivers
  for each row execute function public.set_updated_at();

create index drivers_active_idx on public.drivers (active) where deleted_at is null;
create index drivers_assigned_vehicle_idx on public.drivers (assigned_vehicle_id);
