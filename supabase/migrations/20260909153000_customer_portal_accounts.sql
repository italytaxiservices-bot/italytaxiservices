-- Task 2: secure customer-facing portal. Customer identity is deliberately
-- kept OUT of `profiles` (staff/RBAC table) — a customer authenticating
-- must never accidentally pick up a role via the same table every RLS
-- staff-policy helper (current_user_active/current_user_role/is_admin/
-- is_staff_role) reads from. Signup is tagged with
-- raw_user_meta_data->>'account_type' = 'customer' at signInWithOtp() time;
-- handle_new_auth_user (staff path) now skips those, and a new trigger
-- creates a customer_accounts row instead.

create table public.customer_accounts (
  id uuid primary key references auth.users (id) on delete cascade,
  customer_id uuid references public.customers (id) on delete set null,
  email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index customer_accounts_customer_id_idx on public.customer_accounts (customer_id);

alter table public.customer_accounts enable row level security;

create policy customer_accounts_select on public.customer_accounts for select to authenticated
  using (id = (select auth.uid()));
create policy customer_accounts_update on public.customer_accounts for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));
-- No insert/delete policy for authenticated — rows are created only by the
-- SECURITY DEFINER trigger below and removed only via the auth.users cascade.

create trigger set_updated_at before update on public.customer_accounts
  for each row execute function public.set_updated_at();

create or replace function public.current_customer_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select customer_id from public.customer_accounts where id = auth.uid();
$$;

revoke execute on function public.current_customer_id() from public, anon;
grant execute on function public.current_customer_id() to authenticated;

-- ---------------------------------------------------------------------------
-- handle_new_auth_user: skip the staff-profile row for customer signups.
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(new.raw_user_meta_data->>'account_type', '') = 'customer' then
    return new;
  end if;
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- New trigger: create the customer_accounts row, auto-linking to an
-- existing `customers` row by exact case-insensitive email match if one
-- exists. Never auto-*creates* a customers row — an unmatched signup just
-- gets a customer_accounts row with customer_id null, and the portal shows
-- "no account found for this email, contact us" rather than silently
-- fabricating a customer record from a bare signup.
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_customer_account()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_customer_id uuid;
begin
  if coalesce(new.raw_user_meta_data->>'account_type', '') <> 'customer' then
    return new;
  end if;

  select id into v_customer_id from public.customers
    where lower(email) = lower(new.email) and deleted_at is null
    order by created_at asc
    limit 1;

  insert into public.customer_accounts (id, customer_id, email)
  values (new.id, v_customer_id, new.email)
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created_customer
  after insert on auth.users
  for each row execute function public.handle_new_customer_account();

revoke execute on function public.handle_new_customer_account() from public, anon, authenticated;
grant execute on function public.handle_new_customer_account() to service_role;
