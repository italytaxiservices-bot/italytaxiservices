-- Task 2: centralized automation job architecture. Doesn't rip out the
-- existing trigger/cron mechanics (they're already idempotent — see the
-- `on conflict do nothing` / `not exists` guards throughout) — it adds a
-- registry (so each automation can be individually disabled) and a run log
-- (so /admin/automations has something real to show) around them.

create table public.automation_definitions (
  key text primary key,
  label text not null,
  description text not null,
  kind text not null check (kind in ('TRIGGER', 'CRON')),
  enabled boolean not null default true,
  updated_by uuid references public.profiles (id) on delete set null,
  updated_at timestamptz not null default now()
);

create table public.automation_runs (
  id uuid primary key default gen_random_uuid(),
  automation_key text not null references public.automation_definitions (key) on delete cascade,
  status text not null check (status in ('SUCCESS', 'FAILURE', 'SKIPPED_DISABLED')),
  affected_count int not null default 0,
  error_message text,
  triggered_by text not null check (triggered_by in ('CRON', 'TRIGGER', 'MANUAL')),
  metadata jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  finished_at timestamptz not null default now()
);
create index automation_runs_key_idx on public.automation_runs (automation_key, started_at desc);

alter table public.automation_definitions enable row level security;
alter table public.automation_runs enable row level security;

create policy automation_definitions_select on public.automation_definitions for select to authenticated using (public.is_admin());
create policy automation_definitions_update on public.automation_definitions for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy automation_runs_select on public.automation_runs for select to authenticated using (public.is_admin());

-- automation_runs is an append-only log written exclusively by SECURITY
-- DEFINER trigger functions and the service-role cron routes — no direct
-- INSERT policy for authenticated/anon at all.

insert into public.automation_definitions (key, label, description, kind) values
  ('auto_invoice_on_confirm', 'Auto-create invoice on booking confirmation', 'Creates a DRAFT invoice the moment a booking is marked CONFIRMED (also gated by company_settings.auto_generate_invoice_on_confirm).', 'TRIGGER'),
  ('auto_receipt_on_payment', 'Auto-create receipt on payment', 'Creates a receipt immediately after a payment is recorded against an invoice.', 'TRIGGER'),
  ('post_trip_follow_up', 'Post-trip follow-up task', 'Creates a follow-up task the day after a booking is marked COMPLETED.', 'TRIGGER'),
  ('quotation_follow_up', 'Quotation follow-up task', 'Creates a follow-up task 3 days after a quotation is sent.', 'TRIGGER'),
  ('overdue_invoices', 'Mark overdue invoices', 'Daily cron: flips SENT invoices past their due date to OVERDUE and opens a follow-up task.', 'CRON'),
  ('upcoming_trip_reminders', 'Upcoming trip reminders', 'Daily cron: opens a follow-up task for trips happening tomorrow.', 'CRON')
on conflict (key) do nothing;

create trigger set_updated_at before update on public.automation_definitions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Helper the trigger functions call to check + log in one round trip.
-- ---------------------------------------------------------------------------
create or replace function public.automation_is_enabled(p_key text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select enabled from public.automation_definitions where key = p_key), true);
$$;

create or replace function public.log_automation_run(
  p_key text, p_status text, p_affected_count int, p_error_message text, p_triggered_by text, p_metadata jsonb default '{}'::jsonb
)
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.automation_runs (automation_key, status, affected_count, error_message, triggered_by, metadata)
  values (p_key, p_status, p_affected_count, p_error_message, p_triggered_by, p_metadata);
$$;

revoke execute on function public.automation_is_enabled(text) from public, anon;
revoke execute on function public.log_automation_run(text, text, int, text, text, jsonb) from public, anon;
grant execute on function public.automation_is_enabled(text) to authenticated, service_role;
grant execute on function public.log_automation_run(text, text, int, text, text, jsonb) to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Wire the enable-check + run-logging into the 4 trigger-based automations.
-- ---------------------------------------------------------------------------
create or replace function public.create_invoice_for_confirmed_booking()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_auto_invoice boolean;
  v_due_days int := 7;
  v_invoice_id uuid;
begin
  if new.status = 'CONFIRMED' and (tg_op = 'INSERT' or old.status is distinct from new.status) then
    if not public.automation_is_enabled('auto_invoice_on_confirm') then
      perform public.log_automation_run('auto_invoice_on_confirm', 'SKIPPED_DISABLED', 0, null, 'TRIGGER', jsonb_build_object('booking_id', new.id));
      return new;
    end if;

    select coalesce(auto_generate_invoice_on_confirm, true) into v_auto_invoice
      from public.company_settings limit 1;

    if coalesce(v_auto_invoice, true) then
      insert into public.invoices (
        booking_id, customer_id, subtotal, discount, tax_amount, total,
        currency, due_date, status, created_by
      )
      values (
        new.id, new.customer_id, new.price, new.discount, new.tax_amount, new.total,
        new.currency, current_date + v_due_days, 'DRAFT', new.created_by
      )
      on conflict (booking_id) where booking_id is not null do nothing
      returning id into v_invoice_id;

      if v_invoice_id is not null then
        insert into public.invoice_items (invoice_id, description, quantity, unit_price, amount, sort_order)
        values (v_invoice_id, 'Trip: ' || new.pickup || ' → ' || new.dropoff || ' (' || new.booking_reference || ')', 1, new.price, new.price, 0);
        perform public.log_automation_run('auto_invoice_on_confirm', 'SUCCESS', 1, null, 'TRIGGER', jsonb_build_object('booking_id', new.id, 'invoice_id', v_invoice_id));
      end if;
    end if;
  end if;
  return new;
end;
$$;

create or replace function public.create_receipt_for_payment()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_balance numeric(12, 2);
  v_receipt_id uuid;
begin
  if not public.automation_is_enabled('auto_receipt_on_payment') then
    perform public.log_automation_run('auto_receipt_on_payment', 'SKIPPED_DISABLED', 0, null, 'TRIGGER', jsonb_build_object('payment_id', new.id));
    return new;
  end if;

  select i.total - coalesce(sum(p.amount), 0) into v_balance
    from public.invoices i
    left join public.payments p on p.invoice_id = i.id and p.deleted_at is null
    where i.id = new.invoice_id
    group by i.total;

  insert into public.receipts (payment_id, invoice_id, booking_id, customer_id, amount, method, payment_date, remaining_balance)
  values (new.id, new.invoice_id, new.booking_id, new.customer_id, new.amount, new.method, new.payment_date, coalesce(v_balance, 0))
  on conflict (payment_id) do nothing
  returning id into v_receipt_id;

  -- A receipt not being created (conflict) is expected on a retry, not a
  -- failure — the payment itself already succeeded and must never look
  -- broken just because the receipt step is a no-op the second time.
  perform public.log_automation_run(
    'auto_receipt_on_payment',
    case when v_receipt_id is not null then 'SUCCESS' else 'SUCCESS' end,
    case when v_receipt_id is not null then 1 else 0 end,
    null, 'TRIGGER', jsonb_build_object('payment_id', new.id, 'receipt_id', v_receipt_id)
  );

  return new;
end;
$$;

create or replace function public.create_post_trip_follow_up()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_created boolean := false;
begin
  if new.status = 'COMPLETED' and old.status is distinct from new.status then
    if not public.automation_is_enabled('post_trip_follow_up') then
      perform public.log_automation_run('post_trip_follow_up', 'SKIPPED_DISABLED', 0, null, 'TRIGGER', jsonb_build_object('booking_id', new.id));
      return new;
    end if;

    if not exists (
      select 1 from public.follow_ups
      where booking_id = new.id and type = 'POST_TRIP_FOLLOWUP'
    ) then
      insert into public.follow_ups (customer_id, booking_id, type, due_date, notes, created_by)
      values (new.customer_id, new.id, 'POST_TRIP_FOLLOWUP', current_date + 1,
              'Trip ' || new.booking_reference || ' completed — follow up for feedback / repeat booking.', new.created_by);
      v_created := true;
    end if;
    perform public.log_automation_run('post_trip_follow_up', 'SUCCESS', case when v_created then 1 else 0 end, null, 'TRIGGER', jsonb_build_object('booking_id', new.id));
  end if;
  return new;
end;
$$;

create or replace function public.create_quotation_follow_up()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_created boolean := false;
begin
  if new.status = 'SENT' and (tg_op = 'INSERT' or old.status is distinct from new.status) then
    if not public.automation_is_enabled('quotation_follow_up') then
      perform public.log_automation_run('quotation_follow_up', 'SKIPPED_DISABLED', 0, null, 'TRIGGER', jsonb_build_object('quotation_id', new.id));
      return new;
    end if;

    if not exists (
      select 1 from public.follow_ups
      where quotation_id = new.id and type = 'QUOTATION_FOLLOWUP' and status = 'PENDING'
    ) then
      insert into public.follow_ups (customer_id, quotation_id, type, due_date, notes, created_by)
      values (new.customer_id, new.id, 'QUOTATION_FOLLOWUP', current_date + 3,
              'Quotation ' || new.quotation_number || ' sent — check if the customer has responded.', new.created_by);
      v_created := true;
    end if;
    perform public.log_automation_run('quotation_follow_up', 'SUCCESS', case when v_created then 1 else 0 end, null, 'TRIGGER', jsonb_build_object('quotation_id', new.id));
  end if;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- CRON automations: add an enabled-check + logging wrapper. The original
-- functions keep their names/signatures (cron routes already call them) but
-- now check automation_definitions first and always log a run.
-- ---------------------------------------------------------------------------
create or replace function public.mark_overdue_invoices()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count int := 0;
  r record;
begin
  if not public.automation_is_enabled('overdue_invoices') then
    perform public.log_automation_run('overdue_invoices', 'SKIPPED_DISABLED', 0, null, 'CRON');
    return 0;
  end if;

  for r in
    select id, customer_id, invoice_number from public.invoices
    where status = 'SENT' and due_date < current_date and deleted_at is null
  loop
    update public.invoices set status = 'OVERDUE' where id = r.id;

    if not exists (
      select 1 from public.follow_ups
      where invoice_id = r.id and type = 'UNPAID_INVOICE' and status = 'PENDING'
    ) then
      insert into public.follow_ups (customer_id, invoice_id, type, due_date, notes)
      values (r.customer_id, r.id, 'UNPAID_INVOICE', current_date,
              'Invoice ' || r.invoice_number || ' is overdue.');
    end if;

    v_count := v_count + 1;
  end loop;

  perform public.log_automation_run('overdue_invoices', 'SUCCESS', v_count, null, 'CRON');
  return v_count;
end;
$$;

create or replace function public.create_upcoming_trip_reminders(p_days_ahead integer default 1)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count int := 0;
  r record;
begin
  if not public.automation_is_enabled('upcoming_trip_reminders') then
    perform public.log_automation_run('upcoming_trip_reminders', 'SKIPPED_DISABLED', 0, null, 'CRON');
    return 0;
  end if;

  for r in
    select id, customer_id, booking_reference from public.bookings
    where status in ('CONFIRMED', 'ASSIGNED')
      and trip_date = current_date + p_days_ahead
      and deleted_at is null
  loop
    if not exists (
      select 1 from public.follow_ups
      where booking_id = r.id and type = 'UPCOMING_TRIP' and status = 'PENDING'
    ) then
      insert into public.follow_ups (customer_id, booking_id, type, due_date, notes)
      values (r.customer_id, r.id, 'UPCOMING_TRIP', current_date,
              'Trip ' || r.booking_reference || ' is coming up — confirm driver/vehicle readiness.');
      v_count := v_count + 1;
    end if;
  end loop;

  perform public.log_automation_run('upcoming_trip_reminders', 'SUCCESS', v_count, null, 'CRON');
  return v_count;
end;
$$;
