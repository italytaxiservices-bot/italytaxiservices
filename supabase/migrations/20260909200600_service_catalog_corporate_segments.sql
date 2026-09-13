-- Task 3 §15-19: service catalog, corporate customers, customer
-- segmentation (computed, not stored, so it never goes stale), CLV.

create table public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  pricing_model text not null check (pricing_model in ('FLAT','HOURLY','PER_KM','CUSTOM')),
  default_price numeric(12, 2) check (default_price >= 0),
  currency text check (currency in ('EUR','USD','GBP','SAR','AED','KWD')),
  is_active boolean not null default true,
  tax_behavior text not null default 'TAXABLE' check (tax_behavior in ('TAXABLE','EXEMPT')),
  default_duration_minutes int check (default_duration_minutes > 0),
  default_buffer_minutes int check (default_buffer_minutes >= 0),
  sort_order int not null default 0,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index services_created_by_idx on public.services (created_by);

alter table public.services enable row level security;
create policy services_select on public.services for select to authenticated
  using (public.current_user_active());
create policy services_write on public.services for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));
create policy services_update on public.services for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));

create trigger set_updated_at before update on public.services
  for each row execute function public.set_updated_at();

insert into public.services (name, pricing_model, tax_behavior, sort_order) values
  ('Airport transfer', 'FLAT', 'TAXABLE', 1),
  ('City transfer', 'FLAT', 'TAXABLE', 2),
  ('Hourly chauffeur', 'HOURLY', 'TAXABLE', 3),
  ('Full-day chauffeur', 'FLAT', 'TAXABLE', 4),
  ('Intercity transfer', 'FLAT', 'TAXABLE', 5),
  ('Corporate transfer', 'FLAT', 'TAXABLE', 6),
  ('Event transportation', 'FLAT', 'TAXABLE', 7),
  ('Meet & greet', 'FLAT', 'TAXABLE', 8),
  ('Child seat', 'FLAT', 'TAXABLE', 9),
  ('Extra stop', 'FLAT', 'TAXABLE', 10),
  ('Waiting time', 'HOURLY', 'TAXABLE', 11);

-- Optional link from line items / bookings to the catalog — additive,
-- existing free-text description flow keeps working unchanged.
alter table public.quotation_items add column if not exists service_id uuid references public.services (id) on delete set null;
alter table public.invoice_items add column if not exists service_id uuid references public.services (id) on delete set null;
alter table public.bookings add column if not exists service_id uuid references public.services (id) on delete set null;
create index quotation_items_service_id_idx on public.quotation_items (service_id);
create index invoice_items_service_id_idx on public.invoice_items (service_id);
create index bookings_service_id_idx on public.bookings (service_id);

-- ---------------------------------------------------------------------------
-- §16/17 Corporate customers + billing terms
-- ---------------------------------------------------------------------------
alter table public.customers
  add column if not exists customer_type text not null default 'INDIVIDUAL' check (customer_type in ('INDIVIDUAL','COMPANY')),
  add column if not exists billing_contact_name text,
  add column if not exists billing_email text,
  add column if not exists tax_vat_number text,
  add column if not exists payment_terms text check (payment_terms in ('PAY_NOW','DUE_7','DUE_15','DUE_30','CUSTOM')),
  add column if not exists credit_limit numeric(12, 2) check (credit_limit >= 0);
create index customers_customer_type_idx on public.customers (customer_type) where deleted_at is null;

-- ---------------------------------------------------------------------------
-- §18/19 Segmentation + CLV — computed from real booking/payment data, not
-- a stored field that would drift. A thin manual-override table covers
-- "allow custom segments" without inventing data.
-- ---------------------------------------------------------------------------
create or replace function public.get_customer_metrics(p_customer_id uuid)
returns table (
  total_bookings bigint, completed_bookings bigint, total_revenue numeric, avg_booking_value numeric,
  last_booking_date date, first_booking_date date, days_since_last_booking int, is_corporate boolean, segment text
)
language sql
stable
security definer
set search_path = public
as $$
  with b as (
    select * from public.bookings where customer_id = p_customer_id and deleted_at is null
  ), agg as (
    select
      count(*) as total_bookings,
      count(*) filter (where status = 'COMPLETED') as completed_bookings,
      coalesce(sum(total) filter (where status not in ('CANCELLED', 'NO_SHOW')), 0) as total_revenue,
      max(trip_date) as last_booking_date,
      min(trip_date) as first_booking_date
    from b
  )
  select
    agg.total_bookings, agg.completed_bookings, agg.total_revenue,
    case when agg.total_bookings > 0 then round(agg.total_revenue / agg.total_bookings, 2) else 0 end as avg_booking_value,
    agg.last_booking_date, agg.first_booking_date,
    (current_date - agg.last_booking_date) as days_since_last_booking,
    (select c.customer_type = 'COMPANY' from public.customers c where c.id = p_customer_id) as is_corporate,
    case
      when agg.total_bookings = 0 then 'NEW'
      when (select c.customer_type from public.customers c where c.id = p_customer_id) = 'COMPANY' then 'CORPORATE'
      when agg.last_booking_date is not null and (current_date - agg.last_booking_date) > 180 then 'INACTIVE'
      when agg.total_revenue >= 2000 then 'VIP'
      when agg.completed_bookings >= 5 then 'HIGH_FREQUENCY'
      when agg.total_bookings > 1 then 'RETURNING'
      else 'NEW'
    end as segment
  from agg;
$$;

revoke execute on function public.get_customer_metrics(uuid) from public, anon;
grant execute on function public.get_customer_metrics(uuid) to authenticated;

create table public.customer_segment_overrides (
  customer_id uuid primary key references public.customers (id) on delete cascade,
  segment text not null,
  note text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.customer_segment_overrides enable row level security;
create policy customer_segment_overrides_select on public.customer_segment_overrides for select to authenticated
  using (public.current_user_active());
create policy customer_segment_overrides_write on public.customer_segment_overrides for all to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));
