-- Task 3 §37 Export Center — an audit trail of who exported what, with what
-- filters, how many rows, and whether it succeeded. Reuses the existing
-- Task 2 report engine (lib/admin/reports.ts runReport()/toCsv()) — this
-- table only adds accountability around it, it does not duplicate it.
create table public.export_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  dataset text not null,
  filters jsonb,
  row_count int not null default 0,
  status text not null default 'SUCCESS' check (status in ('SUCCESS', 'FAILED')),
  created_at timestamptz not null default now()
);
create index export_logs_user_id_idx on public.export_logs (user_id);
create index export_logs_created_at_idx on public.export_logs (created_at desc);

alter table public.export_logs enable row level security;

-- Full audit trail is admin-only; any staff role that can already run a
-- report (see REPORT_ROLES in the export route) may insert its own log row,
-- but only for itself — never on another user's behalf.
create policy export_logs_select on public.export_logs for select to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN', 'ADMIN']::public.user_role[]));
create policy export_logs_insert on public.export_logs for insert to authenticated
  with check (user_id = auth.uid() and public.current_user_active());
