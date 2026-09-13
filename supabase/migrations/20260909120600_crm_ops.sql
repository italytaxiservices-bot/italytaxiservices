create table public.follow_ups (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers (id) on delete cascade,
  lead_id uuid references public.leads (id) on delete cascade,
  booking_id uuid references public.bookings (id) on delete cascade,
  quotation_id uuid references public.quotations (id) on delete cascade,
  invoice_id uuid references public.invoices (id) on delete cascade,
  type public.follow_up_type not null,
  due_date date not null,
  assigned_to uuid references public.profiles (id) on delete set null,
  status public.follow_up_status not null default 'PENDING',
  notes text,
  completed_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.follow_ups
  for each row execute function public.set_updated_at();

create index follow_ups_due_date_idx on public.follow_ups (due_date) where status = 'PENDING';
create index follow_ups_assigned_to_idx on public.follow_ups (assigned_to) where status = 'PENDING';
create index follow_ups_status_idx on public.follow_ups (status);
create index follow_ups_customer_id_idx on public.follow_ups (customer_id);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  doc_type public.document_kind not null,
  file_name text not null,
  storage_path text not null,
  mime_type text,
  size_bytes bigint,
  uploaded_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);
create index documents_entity_idx on public.documents (entity_type, entity_id);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_type text not null check (recipient_type in ('ADMIN', 'CUSTOMER', 'DRIVER')),
  recipient_id uuid,
  event_type text not null,
  channel public.notification_channel not null default 'EMAIL',
  subject text,
  body text,
  status public.notification_status not null default 'PENDING',
  related_entity_type text,
  related_entity_id uuid,
  sent_at timestamptz,
  error text,
  created_at timestamptz not null default now()
);
create index notifications_status_idx on public.notifications (status);
create index notifications_related_entity_idx on public.notifications (related_entity_type, related_entity_id);

create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index activity_logs_entity_idx on public.activity_logs (entity_type, entity_id);
create index activity_logs_created_at_idx on public.activity_logs (created_at);
create index activity_logs_actor_id_idx on public.activity_logs (actor_id);
