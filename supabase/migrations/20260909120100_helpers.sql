-- Generic trigger function with no table dependency — safe to create before
-- any table exists. Role-aware helpers that query specific tables live in
-- 20260909120700_role_helpers.sql, once those tables exist.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
