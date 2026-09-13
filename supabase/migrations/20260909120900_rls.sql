-- Row Level Security for every table. No table is readable/writable by the
-- `anon` role — every policy below is scoped to `authenticated`, and public
-- users simply have no policy at all (default-deny). Financial tables
-- (invoices/invoice_items/payments/receipts/expenses) deliberately exclude
-- DISPATCHER, per the requirement that dispatch access not carry financial
-- access. Audit/system tables (activity_logs, notifications, document
-- sequences) are readable by admins only and are never written to directly
-- by authenticated clients — only by SECURITY DEFINER functions or the
-- server-side service-role client.

-- Role groups, spelled out inline per policy for clarity in the dashboard.

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

create policy profiles_select on public.profiles for select to authenticated
  using (public.current_user_active() or id = auth.uid());

create policy profiles_update on public.profiles for update to authenticated
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());
-- Role/active changes are further restricted to SUPER_ADMIN by the
-- protect_profile_privileges trigger.

-- ---------------------------------------------------------------------------
-- company_settings / document_sequences
-- ---------------------------------------------------------------------------
alter table public.company_settings enable row level security;
alter table public.document_sequences enable row level security;

create policy company_settings_select on public.company_settings for select to authenticated
  using (public.current_user_active());
create policy company_settings_update on public.company_settings for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy document_sequences_select on public.document_sequences for select to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- customers
-- ---------------------------------------------------------------------------
alter table public.customers enable row level security;

create policy customers_select on public.customers for select to authenticated
  using (public.current_user_active());
create policy customers_insert on public.customers for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));
create policy customers_update on public.customers for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));

-- ---------------------------------------------------------------------------
-- leads / lead_status_history
-- ---------------------------------------------------------------------------
alter table public.leads enable row level security;
alter table public.lead_status_history enable row level security;

create policy leads_select on public.leads for select to authenticated
  using (public.current_user_active());
create policy leads_insert on public.leads for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));
create policy leads_update on public.leads for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));

create policy lead_status_history_select on public.lead_status_history for select to authenticated
  using (public.current_user_active());
create policy lead_status_history_insert on public.lead_status_history for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));

-- ---------------------------------------------------------------------------
-- vehicles / drivers
-- ---------------------------------------------------------------------------
alter table public.vehicles enable row level security;
alter table public.drivers enable row level security;

create policy vehicles_select on public.vehicles for select to authenticated
  using (public.current_user_active());
create policy vehicles_insert on public.vehicles for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));
create policy vehicles_update on public.vehicles for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));

create policy drivers_select on public.drivers for select to authenticated
  using (public.current_user_active());
create policy drivers_insert on public.drivers for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));
create policy drivers_update on public.drivers for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));

-- ---------------------------------------------------------------------------
-- quotations / quotation_items / quotation_status_history
-- ---------------------------------------------------------------------------
alter table public.quotations enable row level security;
alter table public.quotation_items enable row level security;
alter table public.quotation_status_history enable row level security;

create policy quotations_select on public.quotations for select to authenticated
  using (public.current_user_active());
create policy quotations_insert on public.quotations for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));
create policy quotations_update on public.quotations for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));

create policy quotation_items_select on public.quotation_items for select to authenticated
  using (public.current_user_active());
create policy quotation_items_write on public.quotation_items for all to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));

create policy quotation_status_history_select on public.quotation_status_history for select to authenticated
  using (public.current_user_active());
create policy quotation_status_history_insert on public.quotation_status_history for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));

-- ---------------------------------------------------------------------------
-- bookings / booking_status_history / booking_passengers / driver_assignments
-- ---------------------------------------------------------------------------
alter table public.bookings enable row level security;
alter table public.booking_status_history enable row level security;
alter table public.booking_passengers enable row level security;
alter table public.driver_assignments enable row level security;

create policy bookings_select on public.bookings for select to authenticated
  using (public.current_user_active());
create policy bookings_insert on public.bookings for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));
create policy bookings_update on public.bookings for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));

create policy booking_status_history_select on public.booking_status_history for select to authenticated
  using (public.current_user_active());
create policy booking_status_history_insert on public.booking_status_history for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));

create policy booking_passengers_select on public.booking_passengers for select to authenticated
  using (public.current_user_active());
create policy booking_passengers_write on public.booking_passengers for all to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));

create policy driver_assignments_select on public.driver_assignments for select to authenticated
  using (public.current_user_active());
create policy driver_assignments_write on public.driver_assignments for all to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));

-- ---------------------------------------------------------------------------
-- invoices / invoice_items / invoice_status_history / payments / receipts /
-- expenses — DISPATCHER is intentionally excluded from every policy here.
-- ---------------------------------------------------------------------------
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.invoice_status_history enable row level security;
alter table public.payments enable row level security;
alter table public.receipts enable row level security;
alter table public.expenses enable row level security;

create policy invoices_select on public.invoices for select to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS','VIEWER']::public.user_role[]));
create policy invoices_insert on public.invoices for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]));
create policy invoices_update on public.invoices for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]));

create policy invoice_items_select on public.invoice_items for select to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS','VIEWER']::public.user_role[]));
create policy invoice_items_write on public.invoice_items for all to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]));

create policy invoice_status_history_select on public.invoice_status_history for select to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS','VIEWER']::public.user_role[]));
create policy invoice_status_history_insert on public.invoice_status_history for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]));

create policy payments_select on public.payments for select to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS','VIEWER']::public.user_role[]));
create policy payments_insert on public.payments for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]));
create policy payments_update on public.payments for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]));

create policy receipts_select on public.receipts for select to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS','VIEWER']::public.user_role[]));
-- No insert/update/delete policy: receipts are only ever created by the
-- create_receipt_for_payment SECURITY DEFINER trigger, and are immutable.

create policy expenses_select on public.expenses for select to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS','VIEWER']::public.user_role[]));
create policy expenses_insert on public.expenses for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS']::public.user_role[]));
create policy expenses_update on public.expenses for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]));

-- ---------------------------------------------------------------------------
-- follow_ups
-- ---------------------------------------------------------------------------
alter table public.follow_ups enable row level security;

create policy follow_ups_select on public.follow_ups for select to authenticated
  using (public.current_user_active());
create policy follow_ups_insert on public.follow_ups for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','FINANCE','DISPATCHER']::public.user_role[]));
create policy follow_ups_update on public.follow_ups for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','FINANCE','DISPATCHER']::public.user_role[]));

-- ---------------------------------------------------------------------------
-- documents
-- ---------------------------------------------------------------------------
alter table public.documents enable row level security;

create policy documents_select on public.documents for select to authenticated
  using (public.current_user_active());
create policy documents_insert on public.documents for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','FINANCE']::public.user_role[]));
create policy documents_delete on public.documents for delete to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- notifications / activity_logs — admin-only visibility, no direct writes.
-- Writes happen exclusively via the server-side service-role client
-- (notifications) or the log_activity() SECURITY DEFINER function
-- (activity_logs), never via a client-facing RLS grant.
-- ---------------------------------------------------------------------------
alter table public.notifications enable row level security;
alter table public.activity_logs enable row level security;

create policy notifications_select on public.notifications for select to authenticated
  using (public.is_admin());

create policy activity_logs_select on public.activity_logs for select to authenticated
  using (public.is_admin());
