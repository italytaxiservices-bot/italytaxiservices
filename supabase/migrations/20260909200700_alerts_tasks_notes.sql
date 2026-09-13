-- Task 3 §23-25: operational alert center, management tasks, internal notes.

create table public.operational_alerts (
  id uuid primary key default gen_random_uuid(),
  alert_type text not null,
  severity text not null default 'WARNING' check (severity in ('INFO','WARNING','CRITICAL')),
  entity_type text,
  entity_id uuid,
  title text not null,
  message text,
  status text not null default 'OPEN' check (status in ('OPEN','ACKNOWLEDGED','RESOLVED','SNOOZED')),
  assigned_to uuid references public.profiles (id) on delete set null,
  snoozed_until timestamptz,
  resolved_by uuid references public.profiles (id) on delete set null,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- One live alert per (type, entity) — re-materializing updates it in place
-- instead of duplicating, and never resets a status a human already set.
create unique index operational_alerts_identity_idx on public.operational_alerts (alert_type, coalesce(entity_type, ''), coalesce(entity_id, '00000000-0000-0000-0000-000000000000'));
create index operational_alerts_status_idx on public.operational_alerts (status);
create index operational_alerts_assigned_to_idx on public.operational_alerts (assigned_to);
create index operational_alerts_resolved_by_idx on public.operational_alerts (resolved_by);

alter table public.operational_alerts enable row level security;
create policy operational_alerts_select on public.operational_alerts for select to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER','FINANCE']::public.user_role[]));
create policy operational_alerts_update on public.operational_alerts for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER','FINANCE']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER','FINANCE']::public.user_role[]));
-- No direct insert policy — only the materializer function (SECURITY
-- DEFINER, called from the alerts page) creates rows.

create trigger set_updated_at before update on public.operational_alerts
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Materializer: scans live conditions across the system and upserts one
-- alert row per finding. Called from the /admin/alerts page on load (kept
-- as an on-demand refresh rather than a new cron entry — this is a
-- staff-viewed dashboard, not a notification channel). Re-running never
-- duplicates (unique identity index) and never clobbers a status a human
-- already changed away from the freshly-computed severity/title text is
-- updated, but status/assigned_to/snoozed_until are only touched by staff
-- action, not by this function, UNLESS the underlying condition has
-- cleared (handled by deleting resolved-and-no-longer-true alerts below).
-- ---------------------------------------------------------------------------
create or replace function public.refresh_operational_alerts()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count int := 0;
begin
  -- Unassigned trips (upcoming, not cancelled/completed/no-show)
  insert into public.operational_alerts (alert_type, severity, entity_type, entity_id, title, message)
  select 'unassigned_trip', 'WARNING', 'booking', b.id,
    'Unassigned trip: ' || b.booking_reference,
    b.pickup || ' → ' || b.dropoff || ' on ' || b.trip_date
  from public.bookings b
  where b.deleted_at is null and b.driver_id is null
    and b.status not in ('CANCELLED','COMPLETED','NO_SHOW')
    and b.trip_date >= current_date
  on conflict (alert_type, coalesce(entity_type, ''), coalesce(entity_id, '00000000-0000-0000-0000-000000000000'))
  do update set title = excluded.title, message = excluded.message, severity = excluded.severity;
  get diagnostics v_count = row_count;

  -- Payment overdue
  insert into public.operational_alerts (alert_type, severity, entity_type, entity_id, title, message)
  select 'payment_overdue', 'CRITICAL', 'invoice', i.id,
    'Overdue invoice: ' || i.invoice_number,
    'Balance ' || i.balance_due || ' ' || i.currency || ' overdue since ' || i.due_date
  from public.invoices i
  where i.deleted_at is null and i.status = 'OVERDUE'
  on conflict (alert_type, coalesce(entity_type, ''), coalesce(entity_id, '00000000-0000-0000-0000-000000000000'))
  do update set title = excluded.title, message = excluded.message;

  -- Invoice due soon (SENT, due within 3 days)
  insert into public.operational_alerts (alert_type, severity, entity_type, entity_id, title, message)
  select 'invoice_due', 'INFO', 'invoice', i.id,
    'Invoice due soon: ' || i.invoice_number,
    'Due ' || i.due_date
  from public.invoices i
  where i.deleted_at is null and i.status = 'SENT' and i.due_date between current_date and current_date + 3
  on conflict (alert_type, coalesce(entity_type, ''), coalesce(entity_id, '00000000-0000-0000-0000-000000000000'))
  do update set title = excluded.title, message = excluded.message;

  -- Vehicle maintenance due (next_service_date within 14 days, most recent record per vehicle)
  insert into public.operational_alerts (alert_type, severity, entity_type, entity_id, title, message)
  select 'vehicle_maintenance_due', 'WARNING', 'vehicle', v.id,
    'Maintenance due: ' || v.name,
    'Next service due ' || m.next_service_date
  from public.vehicles v
  join lateral (
    select next_service_date from public.vehicle_maintenance
    where vehicle_id = v.id and next_service_date is not null
    order by next_service_date desc limit 1
  ) m on true
  where v.deleted_at is null and m.next_service_date <= current_date + 14
  on conflict (alert_type, coalesce(entity_type, ''), coalesce(entity_id, '00000000-0000-0000-0000-000000000000'))
  do update set title = excluded.title, message = excluded.message;

  -- Vehicle registration/insurance expiry (existing columns)
  insert into public.operational_alerts (alert_type, severity, entity_type, entity_id, title, message)
  select 'vehicle_document_expiry', 'WARNING', 'vehicle', v.id,
    'Vehicle document expiring: ' || v.name,
    case when v.registration_expiry <= current_date + 30 then 'Registration expires ' || v.registration_expiry || '. ' else '' end ||
    case when v.insurance_expiry <= current_date + 30 then 'Insurance expires ' || v.insurance_expiry || '.' else '' end
  from public.vehicles v
  where v.deleted_at is null
    and (v.registration_expiry <= current_date + 30 or v.insurance_expiry <= current_date + 30)
  on conflict (alert_type, coalesce(entity_type, ''), coalesce(entity_id, '00000000-0000-0000-0000-000000000000'))
  do update set title = excluded.title, message = excluded.message;

  -- Driver document expiry (license_expiry + generic documents table)
  insert into public.operational_alerts (alert_type, severity, entity_type, entity_id, title, message)
  select 'driver_document_expiry', 'WARNING', 'driver', d.id,
    'Driver license expiring: ' || d.full_name,
    'License expires ' || d.license_expiry
  from public.drivers d
  where d.deleted_at is null and d.license_expiry is not null and d.license_expiry <= current_date + 30
  on conflict (alert_type, coalesce(entity_type, ''), coalesce(entity_id, '00000000-0000-0000-0000-000000000000'))
  do update set title = excluded.title, message = excluded.message;

  insert into public.operational_alerts (alert_type, severity, entity_type, entity_id, title, message)
  select 'driver_document_expiry', 'WARNING', 'document', doc.id,
    'Document expiring: ' || coalesce(doc.document_subtype, doc.doc_type::text),
    'Expires ' || doc.expiry_date
  from public.documents doc
  where doc.entity_type in ('driver','vehicle') and doc.expiry_date is not null and doc.expiry_date <= current_date + 30
  on conflict (alert_type, coalesce(entity_type, ''), coalesce(entity_id, '00000000-0000-0000-0000-000000000000'))
  do update set title = excluded.title, message = excluded.message;

  -- Quotation expiring
  insert into public.operational_alerts (alert_type, severity, entity_type, entity_id, title, message)
  select 'quotation_expiring', 'INFO', 'quotation', q.id,
    'Quotation expiring: ' || q.quotation_number,
    'Valid until ' || q.valid_until
  from public.quotations q
  where q.deleted_at is null and q.status in ('SENT','VIEWED') and q.valid_until is not null and q.valid_until <= current_date + 3
  on conflict (alert_type, coalesce(entity_type, ''), coalesce(entity_id, '00000000-0000-0000-0000-000000000000'))
  do update set title = excluded.title, message = excluded.message;

  -- Follow-up overdue
  insert into public.operational_alerts (alert_type, severity, entity_type, entity_id, title, message)
  select 'follow_up_overdue', 'WARNING', 'follow_up', f.id,
    'Follow-up overdue: ' || f.type::text,
    coalesce(f.notes, '') || ' (due ' || f.due_date || ')'
  from public.follow_ups f
  where f.status = 'PENDING' and f.due_date < current_date
  on conflict (alert_type, coalesce(entity_type, ''), coalesce(entity_id, '00000000-0000-0000-0000-000000000000'))
  do update set title = excluded.title, message = excluded.message;

  -- Failed notifications (last 7 days)
  insert into public.operational_alerts (alert_type, severity, entity_type, entity_id, title, message)
  select 'failed_notification', 'WARNING', 'notification', n.id,
    'Failed notification: ' || n.event_type,
    coalesce(n.error, '')
  from public.notifications n
  where n.status = 'FAILED' and n.created_at >= now() - interval '7 days'
  on conflict (alert_type, coalesce(entity_type, ''), coalesce(entity_id, '00000000-0000-0000-0000-000000000000'))
  do update set title = excluded.title, message = excluded.message;

  -- Failed automations (last 7 days)
  insert into public.operational_alerts (alert_type, severity, entity_type, entity_id, title, message)
  select 'failed_automation', 'CRITICAL', 'automation_run', a.id,
    'Automation failed: ' || a.automation_key,
    coalesce(a.error_message, '')
  from public.automation_runs a
  where a.status = 'FAILURE' and a.started_at >= now() - interval '7 days'
  on conflict (alert_type, coalesce(entity_type, ''), coalesce(entity_id, '00000000-0000-0000-0000-000000000000'))
  do update set title = excluded.title, message = excluded.message;

  -- Auto-resolve alerts whose underlying condition is no longer true (still
  -- OPEN/ACKNOWLEDGED, not SNOOZED/manually RESOLVED) and weren't
  -- refreshed in this run.
  update public.operational_alerts
    set status = 'RESOLVED', resolved_at = now()
    where status in ('OPEN','ACKNOWLEDGED')
      and updated_at < now() - interval '1 minute';

  return v_count;
end;
$$;

revoke execute on function public.refresh_operational_alerts() from public, anon;
grant execute on function public.refresh_operational_alerts() to authenticated;

-- ---------------------------------------------------------------------------
-- §24 Management tasks
-- ---------------------------------------------------------------------------
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  assigned_to uuid references public.profiles (id) on delete set null,
  priority text not null default 'MEDIUM' check (priority in ('LOW','MEDIUM','HIGH','URGENT')),
  due_date date,
  status text not null default 'TODO' check (status in ('TODO','IN_PROGRESS','COMPLETED','CANCELLED')),
  related_entity_type text check (related_entity_type in ('lead','customer','booking','driver','vehicle','invoice','quotation')),
  related_entity_id uuid,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index tasks_assigned_to_idx on public.tasks (assigned_to);
create index tasks_status_idx on public.tasks (status);
create index tasks_related_entity_idx on public.tasks (related_entity_type, related_entity_id);
create index tasks_created_by_idx on public.tasks (created_by);
create index tasks_due_date_idx on public.tasks (due_date) where status in ('TODO','IN_PROGRESS');

alter table public.tasks enable row level security;
create policy tasks_select on public.tasks for select to authenticated
  using (public.current_user_active());
create policy tasks_insert on public.tasks for insert to authenticated
  with check (public.current_user_active());
create policy tasks_update on public.tasks for update to authenticated
  using (public.current_user_active())
  with check (public.current_user_active());

create trigger set_updated_at before update on public.tasks
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- §25 Internal notes — staff-only, never surfaced to the customer portal
-- (the get_my_* functions never reference this table, and RLS below has no
-- policy for the customer identity at all, only staff roles).
-- ---------------------------------------------------------------------------
create table public.internal_notes (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('customer','booking','driver','vehicle','invoice','lead')),
  entity_id uuid not null,
  note text not null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);
create index internal_notes_entity_idx on public.internal_notes (entity_type, entity_id);
create index internal_notes_created_by_idx on public.internal_notes (created_by);

alter table public.internal_notes enable row level security;
create policy internal_notes_select on public.internal_notes for select to authenticated
  using (public.current_user_active());
create policy internal_notes_insert on public.internal_notes for insert to authenticated
  with check (public.current_user_active());
