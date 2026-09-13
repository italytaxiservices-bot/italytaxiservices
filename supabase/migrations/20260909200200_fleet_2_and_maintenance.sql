-- Task 3 §1-2: Fleet Management 2.0 + Vehicle Maintenance.

-- Fleet lifecycle status: ACTIVE is being renamed AVAILABLE (matches the
-- spec's wording and the driver_availability enum's own AVAILABLE value for
-- consistency). ASSIGNED/ON_TRIP are deliberately NOT added as stored
-- values — those are real-time facts derivable from bookings/driver
-- assignments right now, and storing them redundently would create exactly
-- the dual-source-of-truth/race-condition problem the Task 2 availability
-- engine was built to avoid. The Fleet page computes "currently on trip"
-- live from bookings instead.
update public.vehicles set status = 'AVAILABLE' where status = 'ACTIVE';

alter table public.vehicles
  add column if not exists vin text,
  add column if not exists color text,
  add column if not exists current_mileage int check (current_mileage >= 0),
  add column if not exists purchase_date date,
  add column if not exists purchase_price numeric(12, 2) check (purchase_price >= 0),
  add column if not exists lease_monthly_amount numeric(12, 2) check (lease_monthly_amount >= 0),
  add column if not exists lease_end_date date;

comment on column public.vehicles.vin is 'Vehicle Identification Number, where applicable — optional, not every fleet vehicle type has one on file.';

-- ---------------------------------------------------------------------------
-- Vehicle maintenance — append-only history, no delete action exposed
-- anywhere in the app (edits are fine, e.g. correcting a typo'd cost;
-- removal is not, so a maintenance record is never lost).
-- ---------------------------------------------------------------------------
create type public.maintenance_type as enum (
  'OIL_SERVICE', 'TIRES', 'BRAKES', 'INSPECTION', 'REGISTRATION', 'INSURANCE', 'GENERAL', 'REPAIR'
);

create table public.vehicle_maintenance (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles (id) on delete restrict,
  maintenance_type public.maintenance_type not null,
  service_date date not null default current_date,
  mileage int check (mileage >= 0),
  cost numeric(12, 2) not null default 0 check (cost >= 0),
  currency text not null default 'EUR' check (currency in ('EUR','USD','GBP','SAR','AED','KWD')),
  vendor text,
  description text,
  next_service_date date,
  next_service_mileage int check (next_service_mileage >= 0),
  document_id uuid references public.documents (id) on delete set null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index vehicle_maintenance_vehicle_id_idx on public.vehicle_maintenance (vehicle_id);
create index vehicle_maintenance_next_service_date_idx on public.vehicle_maintenance (next_service_date) where next_service_date is not null;
create index vehicle_maintenance_created_by_idx on public.vehicle_maintenance (created_by);

alter table public.vehicle_maintenance enable row level security;
create policy vehicle_maintenance_select on public.vehicle_maintenance for select to authenticated
  using (public.current_user_active());
create policy vehicle_maintenance_insert on public.vehicle_maintenance for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));
create policy vehicle_maintenance_update on public.vehicle_maintenance for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));
-- No delete policy at all — see comment above.

create trigger set_updated_at before update on public.vehicle_maintenance
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Document expiry tracking — reuses the existing generic `documents` table
-- (already has entity_type/entity_id/doc_type with DRIVER_DOCUMENT and
-- VEHICLE_DOCUMENT kinds from Task 1) rather than creating parallel
-- driver_documents/vehicle_documents tables.
-- ---------------------------------------------------------------------------
alter table public.documents
  add column if not exists document_subtype text,
  add column if not exists expiry_date date;

comment on column public.documents.document_subtype is 'Free-text subtype, e.g. "Driving License", "Vehicle Registration", "Insurance Policy" — document requirements vary by jurisdiction, so this is deliberately not a rigid enum.';

create index documents_expiry_date_idx on public.documents (expiry_date) where expiry_date is not null;
