-- Task 3 §33: advanced role permissions. Existing RLS policies (role-array
-- checks via is_staff_role()) stay exactly as they are — they're proven and
-- rewriting 50+ policies to a dynamic permission lookup in one pass would be
-- the kind of change that "weakens RLS" through sheer surface area for
-- error. Instead: a real, data-driven, auditable permission matrix that (a)
-- documents exactly what every role can do today, (b) is editable by
-- SUPER_ADMIN for future flexibility, and (c) is the actual DB-level
-- enforcement mechanism for every NEW Task-3 subsystem (approvals,
-- discounts, refunds, payouts, exports, etc.) via has_permission() below.

create table public.role_permissions (
  role public.user_role not null,
  permission text not null,
  primary key (role, permission)
);

alter table public.role_permissions enable row level security;

create policy role_permissions_select on public.role_permissions for select to authenticated
  using (public.current_user_active());
create policy role_permissions_write on public.role_permissions for all to authenticated
  using (public.current_user_role() = 'SUPER_ADMIN')
  with check (public.current_user_role() = 'SUPER_ADMIN');

-- Seed: mirrors the CURRENT effective access (lib/auth/roles.ts's
-- MANAGE_CRM/MANAGE_OPS/MANAGE_FINANCE/VIEW_FINANCE/ADMIN_ONLY groups and
-- the existing RLS policies) — this is a snapshot of reality, not a new
-- policy decision.
insert into public.role_permissions (role, permission)
select r.role, p.permission
from (values ('SUPER_ADMIN'::public.user_role), ('ADMIN'::public.user_role)) as r(role)
cross join (values
  ('dashboard.view'),('leads.view'),('leads.edit'),('customers.view'),('customers.edit'),
  ('bookings.view'),('bookings.edit'),('bookings.cancel'),('dispatch.manage'),
  ('drivers.view'),('drivers.edit'),('vehicles.view'),('vehicles.edit'),
  ('quotes.create'),('quotes.send'),('quotes.approve'),
  ('invoices.view'),('invoices.create'),('payments.record'),('refunds.approve'),
  ('expenses.create'),('expenses.approve'),('reports.view'),
  ('users.manage'),('settings.manage'),('fleet.manage'),('payouts.manage'),
  ('discounts.approve'),('exports.run'),('approvals.manage')
) as p(permission)
on conflict do nothing;

insert into public.role_permissions (role, permission) values
  ('OPERATIONS', 'dashboard.view'), ('OPERATIONS', 'leads.view'), ('OPERATIONS', 'leads.edit'),
  ('OPERATIONS', 'customers.view'), ('OPERATIONS', 'customers.edit'),
  ('OPERATIONS', 'bookings.view'), ('OPERATIONS', 'bookings.edit'), ('OPERATIONS', 'bookings.cancel'),
  ('OPERATIONS', 'dispatch.manage'), ('OPERATIONS', 'drivers.view'), ('OPERATIONS', 'drivers.edit'),
  ('OPERATIONS', 'vehicles.view'), ('OPERATIONS', 'vehicles.edit'), ('OPERATIONS', 'fleet.manage'),
  ('OPERATIONS', 'quotes.create'), ('OPERATIONS', 'quotes.send'),
  ('OPERATIONS', 'invoices.view'), ('OPERATIONS', 'payments.record'), ('OPERATIONS', 'expenses.create'),
  ('OPERATIONS', 'reports.view'), ('OPERATIONS', 'exports.run')
on conflict do nothing;

insert into public.role_permissions (role, permission) values
  ('FINANCE', 'dashboard.view'), ('FINANCE', 'customers.view'), ('FINANCE', 'bookings.view'),
  ('FINANCE', 'invoices.view'), ('FINANCE', 'invoices.create'), ('FINANCE', 'payments.record'),
  ('FINANCE', 'refunds.approve'), ('FINANCE', 'expenses.create'), ('FINANCE', 'expenses.approve'),
  ('FINANCE', 'payouts.manage'), ('FINANCE', 'discounts.approve'), ('FINANCE', 'approvals.manage'),
  ('FINANCE', 'reports.view'), ('FINANCE', 'exports.run')
on conflict do nothing;

insert into public.role_permissions (role, permission) values
  ('DISPATCHER', 'dashboard.view'), ('DISPATCHER', 'bookings.view'), ('DISPATCHER', 'bookings.edit'),
  ('DISPATCHER', 'dispatch.manage'), ('DISPATCHER', 'drivers.view'), ('DISPATCHER', 'drivers.edit'),
  ('DISPATCHER', 'vehicles.view'), ('DISPATCHER', 'vehicles.edit')
on conflict do nothing;

insert into public.role_permissions (role, permission) values
  ('VIEWER', 'dashboard.view'), ('VIEWER', 'leads.view'), ('VIEWER', 'customers.view'),
  ('VIEWER', 'bookings.view'), ('VIEWER', 'drivers.view'), ('VIEWER', 'vehicles.view'),
  ('VIEWER', 'invoices.view'), ('VIEWER', 'reports.view')
on conflict do nothing;

create or replace function public.has_permission(p_permission text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.role_permissions rp
    where rp.role = public.current_user_role()
      and rp.permission = p_permission
      and public.current_user_active()
  );
$$;

revoke execute on function public.has_permission(text) from public, anon;
grant execute on function public.has_permission(text) to authenticated;
