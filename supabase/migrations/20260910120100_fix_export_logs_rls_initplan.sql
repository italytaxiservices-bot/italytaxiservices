-- Advisor-flagged: export_logs_insert re-evaluated auth.uid() per row.
-- Wrap in (select ...) so it's evaluated once per statement, matching the
-- pattern already used across this project's other RLS policies.
drop policy export_logs_insert on public.export_logs;
create policy export_logs_insert on public.export_logs for insert to authenticated
  with check (user_id = (select auth.uid()) and public.current_user_active());
