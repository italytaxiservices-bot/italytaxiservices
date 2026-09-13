-- Task 2 Phase 1 audit fixes: tighten an over-broad RPC grant, add missing
-- FK-covering indexes, and eliminate multiple-permissive-policy overlap on
-- four tables (flagged by get_advisors performance lints).

-- ---------------------------------------------------------------------------
-- convert_quotation_to_booking was callable via RPC by anon/PUBLIC as well as
-- authenticated. It's SECURITY INVOKER so RLS on the underlying tables still
-- protects it, but there's no reason to expose it to anon at all.
-- ---------------------------------------------------------------------------
revoke execute on function public.convert_quotation_to_booking(uuid) from public, anon;
grant execute on function public.convert_quotation_to_booking(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Missing FK-covering indexes (unindexed_foreign_keys advisor, 25 findings)
-- ---------------------------------------------------------------------------
create index if not exists booking_status_history_changed_by_idx on public.booking_status_history (changed_by);
create index if not exists bookings_assigned_by_idx on public.bookings (assigned_by);
create index if not exists bookings_created_by_idx on public.bookings (created_by);
create index if not exists customers_created_by_idx on public.customers (created_by);
create index if not exists documents_uploaded_by_idx on public.documents (uploaded_by);
create index if not exists driver_assignments_assigned_by_idx on public.driver_assignments (assigned_by);
create index if not exists driver_assignments_vehicle_id_idx on public.driver_assignments (vehicle_id);
create index if not exists expenses_created_by_idx on public.expenses (created_by);
create index if not exists expenses_driver_id_idx on public.expenses (driver_id);
create index if not exists expenses_vehicle_id_idx on public.expenses (vehicle_id);
create index if not exists follow_ups_booking_id_idx on public.follow_ups (booking_id);
create index if not exists follow_ups_created_by_idx on public.follow_ups (created_by);
create index if not exists follow_ups_invoice_id_idx on public.follow_ups (invoice_id);
create index if not exists follow_ups_lead_id_idx on public.follow_ups (lead_id);
create index if not exists follow_ups_quotation_id_idx on public.follow_ups (quotation_id);
create index if not exists invoice_status_history_changed_by_idx on public.invoice_status_history (changed_by);
create index if not exists invoices_created_by_idx on public.invoices (created_by);
create index if not exists lead_status_history_changed_by_idx on public.lead_status_history (changed_by);
create index if not exists leads_created_by_idx on public.leads (created_by);
create index if not exists payments_recorded_by_idx on public.payments (recorded_by);
create index if not exists quotation_status_history_changed_by_idx on public.quotation_status_history (changed_by);
create index if not exists quotations_created_by_idx on public.quotations (created_by);
create index if not exists quotations_driver_id_idx on public.quotations (driver_id);
create index if not exists quotations_vehicle_id_idx on public.quotations (vehicle_id);
create index if not exists receipts_booking_id_idx on public.receipts (booking_id);

-- ---------------------------------------------------------------------------
-- Multiple permissive policies: each of these 4 tables had a `for all`
-- "_write" policy plus a separate "_select" policy, so SELECT ran through
-- two permissive policies. Split "_write" into insert/update/delete so
-- SELECT has exactly one applicable policy.
-- ---------------------------------------------------------------------------
drop policy if exists booking_passengers_write on public.booking_passengers;
create policy booking_passengers_insert on public.booking_passengers for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));
create policy booking_passengers_update on public.booking_passengers for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));
create policy booking_passengers_delete on public.booking_passengers for delete to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));

drop policy if exists driver_assignments_write on public.driver_assignments;
create policy driver_assignments_insert on public.driver_assignments for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));
create policy driver_assignments_update on public.driver_assignments for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));
create policy driver_assignments_delete on public.driver_assignments for delete to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));

drop policy if exists invoice_items_write on public.invoice_items;
create policy invoice_items_insert on public.invoice_items for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]));
create policy invoice_items_update on public.invoice_items for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]));
create policy invoice_items_delete on public.invoice_items for delete to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]));

drop policy if exists quotation_items_write on public.quotation_items;
create policy quotation_items_insert on public.quotation_items for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));
create policy quotation_items_update on public.quotation_items for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));
create policy quotation_items_delete on public.quotation_items for delete to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));
