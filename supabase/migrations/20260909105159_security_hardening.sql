-- Repo-parity copy of the "security_hardening" migration applied directly to
-- the remote project via the Supabase MCP server (mcp__supabase__apply_migration,
-- name "security_hardening"). This file was not written to the repo at the time
-- it was applied; it is added after the fact so a fresh clone / `supabase db
-- push` reflects reality. Filename timestamp matches the remote-reported
-- version (20260909105159) so the Supabase CLI treats it as already applied
-- rather than re-running it.
--
-- What it did, driven by `get_advisors(type: "security")` findings after the
-- first migration batch:
--   1. Locked `search_path` on every SECURITY DEFINER / plpgsql function to
--      `public`, closing the classic search_path-hijack vector.
--   2. Made the `assign_*_number` trigger functions SECURITY DEFINER so they
--      can still call the now-locked-down `next_document_number()`.
--   3. Revoked EXECUTE on trigger-only functions and `next_document_number`
--      from PUBLIC/anon/authenticated (only postgres/service_role need them).
--   4. Restricted `mark_overdue_invoices` / `create_upcoming_trip_reminders`
--      (cron entry points) to service_role only.
--   5. Revoked `log_activity` from anon only (kept for authenticated, since
--      admin server actions call it as the signed-in user).
--   6. Left current_user_role/current_user_active/is_admin/is_staff_role
--      grants alone — needed by RLS policies for `authenticated`, harmless
--      no-op for `anon` (STABLE, no side effects, and `anon` never matches
--      any RLS policy on these tables since every policy is scoped `to
--      authenticated`).
--   7. Fixed the profiles RLS perf warning by wrapping auth.uid() as
--      `(select auth.uid())`.

-- ---------------------------------------------------------------------------
-- 1 & 2. search_path + SECURITY DEFINER on trigger/RPC functions
-- ---------------------------------------------------------------------------
alter function public.assign_booking_reference() security definer set search_path = public;
alter function public.assign_invoice_number() security definer set search_path = public;
alter function public.assign_lead_number() security definer set search_path = public;
alter function public.assign_quotation_number() security definer set search_path = public;
alter function public.assign_receipt_number() security definer set search_path = public;
alter function public.before_payment_insert() security definer set search_path = public;
alter function public.create_invoice_for_confirmed_booking() security definer set search_path = public;
alter function public.create_post_trip_follow_up() security definer set search_path = public;
alter function public.create_quotation_follow_up() security definer set search_path = public;
alter function public.create_receipt_for_payment() security definer set search_path = public;
alter function public.create_upcoming_trip_reminders(integer) security definer set search_path = public;
alter function public.current_user_active() security definer set search_path = public;
alter function public.current_user_role() security definer set search_path = public;
alter function public.handle_new_auth_user() security definer set search_path = public;
alter function public.is_admin() security definer set search_path = public;
alter function public.is_staff_role(public.user_role[]) security definer set search_path = public;
alter function public.log_activity(text, text, uuid, jsonb) security definer set search_path = public;
alter function public.mark_overdue_invoices() security definer set search_path = public;
alter function public.next_document_number(text) security definer set search_path = public;
alter function public.protect_profile_privileges() security definer set search_path = public;
alter function public.reconcile_invoice_after_payment_change() security definer set search_path = public;

-- These stay SECURITY INVOKER (default) — the caller's own RLS-checked
-- identity is what should govern them — but still get a locked search_path.
alter function public.convert_quotation_to_booking(uuid) set search_path = public;
alter function public.dashboard_crm_kpis(timestamptz, timestamptz) set search_path = public;
alter function public.dashboard_finance_kpis(timestamptz, timestamptz, date) set search_path = public;
alter function public.dashboard_operational_kpis(date) set search_path = public;
alter function public.record_booking_status_history() set search_path = public;
alter function public.record_invoice_status_history() set search_path = public;
alter function public.record_lead_status_history() set search_path = public;
alter function public.record_quotation_status_history() set search_path = public;
alter function public.set_updated_at() set search_path = public;

-- ---------------------------------------------------------------------------
-- 3. Revoke EXECUTE on trigger-only functions from PUBLIC *and* from
--    anon/authenticated explicitly — Supabase's default privileges grant
--    EXECUTE on every new function directly to anon/authenticated/
--    service_role at creation time (not merely via the PUBLIC pseudo-role),
--    so `revoke ... from public` alone does not undo that grant. (Confirmed
--    the hard way in the task2_audit_fixes-era migrations: two functions
--    revoked only `from public` still showed up on the advisor as
--    anon/authenticated-executable.) Keep postgres + service_role able to
--    run them (triggers execute as the function owner/postgres regardless,
--    this only affects direct RPC calls).
-- ---------------------------------------------------------------------------
revoke execute on function public.assign_booking_reference() from public, anon, authenticated;
revoke execute on function public.assign_invoice_number() from public, anon, authenticated;
revoke execute on function public.assign_lead_number() from public, anon, authenticated;
revoke execute on function public.assign_quotation_number() from public, anon, authenticated;
revoke execute on function public.assign_receipt_number() from public, anon, authenticated;
revoke execute on function public.before_payment_insert() from public, anon, authenticated;
revoke execute on function public.create_invoice_for_confirmed_booking() from public, anon, authenticated;
revoke execute on function public.create_post_trip_follow_up() from public, anon, authenticated;
revoke execute on function public.create_quotation_follow_up() from public, anon, authenticated;
revoke execute on function public.create_receipt_for_payment() from public, anon, authenticated;
revoke execute on function public.handle_new_auth_user() from public, anon, authenticated;
revoke execute on function public.protect_profile_privileges() from public, anon, authenticated;
revoke execute on function public.reconcile_invoice_after_payment_change() from public, anon, authenticated;
revoke execute on function public.record_booking_status_history() from public, anon, authenticated;
revoke execute on function public.record_invoice_status_history() from public, anon, authenticated;
revoke execute on function public.record_lead_status_history() from public, anon, authenticated;
revoke execute on function public.record_quotation_status_history() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;
revoke execute on function public.next_document_number(text) from public, anon, authenticated;

grant execute on function public.assign_booking_reference() to service_role;
grant execute on function public.assign_invoice_number() to service_role;
grant execute on function public.assign_lead_number() to service_role;
grant execute on function public.assign_quotation_number() to service_role;
grant execute on function public.assign_receipt_number() to service_role;
grant execute on function public.before_payment_insert() to service_role;
grant execute on function public.create_invoice_for_confirmed_booking() to service_role;
grant execute on function public.create_post_trip_follow_up() to service_role;
grant execute on function public.create_quotation_follow_up() to service_role;
grant execute on function public.create_receipt_for_payment() to service_role;
grant execute on function public.handle_new_auth_user() to service_role;
grant execute on function public.protect_profile_privileges() to service_role;
grant execute on function public.reconcile_invoice_after_payment_change() to service_role;
grant execute on function public.record_booking_status_history() to service_role;
grant execute on function public.record_invoice_status_history() to service_role;
grant execute on function public.record_lead_status_history() to service_role;
grant execute on function public.record_quotation_status_history() to service_role;
grant execute on function public.set_updated_at() to service_role;
grant execute on function public.next_document_number(text) to service_role;

-- ---------------------------------------------------------------------------
-- 4. Cron entry points — service_role only (called from app/api/cron/* using
--    the service-role client, never from a user session).
-- ---------------------------------------------------------------------------
revoke execute on function public.mark_overdue_invoices() from public, anon, authenticated;
revoke execute on function public.create_upcoming_trip_reminders(integer) from public, anon, authenticated;
grant execute on function public.mark_overdue_invoices() to service_role;
grant execute on function public.create_upcoming_trip_reminders(integer) to service_role;

-- ---------------------------------------------------------------------------
-- 5. log_activity — usable by signed-in staff (server actions call it as the
--    acting user), not by anon.
-- ---------------------------------------------------------------------------
revoke execute on function public.log_activity(text, text, uuid, jsonb) from anon;

-- ---------------------------------------------------------------------------
-- 7. RLS perf: wrap auth.uid() as (select auth.uid()) so it's evaluated once
--    per statement instead of once per row.
-- ---------------------------------------------------------------------------
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select to authenticated
  using (public.current_user_active() or (id = (select auth.uid())));

drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update to authenticated
  using ((id = (select auth.uid())) or public.is_admin())
  with check ((id = (select auth.uid())) or public.is_admin());
