-- Task 3 §8: expense approval workflow. Adds a real lifecycle instead of
-- expenses just existing the moment they're entered.

alter table public.expenses
  add column if not exists status text not null default 'DRAFT' check (status in ('DRAFT','SUBMITTED','APPROVED','REJECTED','PAID')),
  add column if not exists submitted_by uuid references public.profiles (id) on delete set null,
  add column if not exists submitted_at timestamptz,
  add column if not exists approved_by uuid references public.profiles (id) on delete set null,
  add column if not exists approved_at timestamptz,
  add column if not exists rejected_by uuid references public.profiles (id) on delete set null,
  add column if not exists rejected_at timestamptz,
  add column if not exists rejection_reason text,
  add column if not exists paid_by uuid references public.profiles (id) on delete set null,
  add column if not exists paid_at timestamptz,
  add column if not exists payment_reference text;

create index expenses_status_idx on public.expenses (status) where deleted_at is null;
create index expenses_submitted_by_idx on public.expenses (submitted_by);
create index expenses_approved_by_idx on public.expenses (approved_by);
create index expenses_rejected_by_idx on public.expenses (rejected_by);
create index expenses_paid_by_idx on public.expenses (paid_by);

create table public.expense_status_history (
  id uuid primary key default gen_random_uuid(),
  expense_id uuid not null references public.expenses (id) on delete cascade,
  from_status text,
  to_status text not null,
  changed_by uuid references public.profiles (id) on delete set null,
  note text,
  changed_at timestamptz not null default now()
);
create index expense_status_history_expense_id_idx on public.expense_status_history (expense_id);
create index expense_status_history_changed_by_idx on public.expense_status_history (changed_by);

alter table public.expense_status_history enable row level security;
create policy expense_status_history_select on public.expense_status_history for select to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS']::public.user_role[]));
create policy expense_status_history_insert on public.expense_status_history for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS']::public.user_role[]));

create or replace function public.record_expense_status_history()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    insert into public.expense_status_history (expense_id, from_status, to_status, changed_by)
    values (new.id, case when tg_op = 'INSERT' then null else old.status end, new.status, auth.uid());
  end if;
  return new;
end;
$$;

create trigger record_expense_status_history after insert or update on public.expenses
  for each row execute function public.record_expense_status_history();

revoke execute on function public.record_expense_status_history() from anon, authenticated;
grant execute on function public.record_expense_status_history() to service_role;

-- ---------------------------------------------------------------------------
-- RLS: OPERATIONS/DISPATCHER can create and submit (only while still
-- DRAFT); only FINANCE/ADMIN can move a SUBMITTED expense to APPROVED/
-- REJECTED/PAID. The existing broad expenses_update policy (FINANCE/ADMIN)
-- stays as-is; this adds a second, narrower permissive policy for the
-- submit-only path.
-- ---------------------------------------------------------------------------
create policy expenses_submit on public.expenses for update to authenticated
  using (status = 'DRAFT' and public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]))
  with check (status in ('DRAFT','SUBMITTED') and public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]));
