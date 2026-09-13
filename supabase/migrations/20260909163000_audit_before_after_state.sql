-- Task 2: improved audit system — before/after state on every change to the
-- core business tables, captured automatically by a trigger rather than
-- relying on each server action to remember to build a diff manually (the
-- existing log_activity() calls stay as-is for action-level context like
-- "booking.driver_assigned"; this adds row-level state capture underneath).
--
-- Immutability check: activity_logs already has no INSERT/UPDATE/DELETE RLS
-- policy for `authenticated` at all (see 20260909120900_rls.sql) — the only
-- write path is the SECURITY DEFINER log_activity()/this trigger, both of
-- which run as the function owner. A normal admin, even a SUPER_ADMIN, has
-- no policy that lets them edit or delete an audit row through the app or a
-- direct API call. Nothing to add here; documented for the record.

alter table public.activity_logs add column if not exists before_state jsonb;
alter table public.activity_logs add column if not exists after_state jsonb;

create or replace function public.audit_row_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.activity_logs (actor_id, action, entity_type, entity_id, before_state, after_state)
  values (auth.uid(), tg_table_name || '.updated', tg_table_name, new.id, to_jsonb(old), to_jsonb(new));
  return new;
end;
$$;

revoke execute on function public.audit_row_change() from public, anon, authenticated;
grant execute on function public.audit_row_change() to service_role;

create trigger audit_row_change after update on public.leads for each row execute function public.audit_row_change();
create trigger audit_row_change after update on public.customers for each row execute function public.audit_row_change();
create trigger audit_row_change after update on public.quotations for each row execute function public.audit_row_change();
create trigger audit_row_change after update on public.bookings for each row execute function public.audit_row_change();
create trigger audit_row_change after update on public.invoices for each row execute function public.audit_row_change();
create trigger audit_row_change after update on public.payments for each row execute function public.audit_row_change();
create trigger audit_row_change after update on public.drivers for each row execute function public.audit_row_change();
create trigger audit_row_change after update on public.vehicles for each row execute function public.audit_row_change();
