-- Automation: document numbering, status history, financial reconciliation,
-- idempotent conversions, and derived follow-ups. Everything here runs
-- inside the same transaction as the triggering write, so it can't be
-- bypassed by any client and can't race with itself.

alter table public.company_settings
  add column auto_generate_invoice_on_confirm boolean not null default true;

-- ---------------------------------------------------------------------------
-- Document numbering
-- ---------------------------------------------------------------------------

create or replace function public.assign_lead_number()
returns trigger language plpgsql as $$
begin
  if new.lead_number is null then
    new.lead_number := public.next_document_number('lead');
  end if;
  return new;
end;
$$;
create trigger assign_lead_number before insert on public.leads
  for each row execute function public.assign_lead_number();

create or replace function public.assign_quotation_number()
returns trigger language plpgsql as $$
begin
  if new.quotation_number is null then
    new.quotation_number := public.next_document_number('quotation');
  end if;
  return new;
end;
$$;
create trigger assign_quotation_number before insert on public.quotations
  for each row execute function public.assign_quotation_number();

create or replace function public.assign_booking_reference()
returns trigger language plpgsql as $$
begin
  if new.booking_reference is null then
    new.booking_reference := public.next_document_number('booking');
  end if;
  return new;
end;
$$;
create trigger assign_booking_reference before insert on public.bookings
  for each row execute function public.assign_booking_reference();

create or replace function public.assign_invoice_number()
returns trigger language plpgsql as $$
begin
  if new.invoice_number is null then
    new.invoice_number := public.next_document_number('invoice');
  end if;
  return new;
end;
$$;
create trigger assign_invoice_number before insert on public.invoices
  for each row execute function public.assign_invoice_number();

create or replace function public.assign_receipt_number()
returns trigger language plpgsql as $$
begin
  if new.receipt_number is null then
    new.receipt_number := public.next_document_number('receipt');
  end if;
  return new;
end;
$$;
create trigger assign_receipt_number before insert on public.receipts
  for each row execute function public.assign_receipt_number();

-- ---------------------------------------------------------------------------
-- Status history
-- ---------------------------------------------------------------------------

create or replace function public.record_lead_status_history()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    insert into public.lead_status_history (lead_id, from_status, to_status, changed_by)
    values (new.id, case when tg_op = 'INSERT' then null else old.status end, new.status, auth.uid());
  end if;
  return new;
end;
$$;
create trigger record_lead_status_history after insert or update of status on public.leads
  for each row execute function public.record_lead_status_history();

create or replace function public.record_quotation_status_history()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    insert into public.quotation_status_history (quotation_id, from_status, to_status, changed_by)
    values (new.id, case when tg_op = 'INSERT' then null else old.status end, new.status, auth.uid());
  end if;
  return new;
end;
$$;
create trigger record_quotation_status_history after insert or update of status on public.quotations
  for each row execute function public.record_quotation_status_history();

create or replace function public.record_booking_status_history()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    insert into public.booking_status_history (booking_id, from_status, to_status, changed_by)
    values (new.id, case when tg_op = 'INSERT' then null else old.status end, new.status, auth.uid());
  end if;
  return new;
end;
$$;
create trigger record_booking_status_history after insert or update of status on public.bookings
  for each row execute function public.record_booking_status_history();

create or replace function public.record_invoice_status_history()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    insert into public.invoice_status_history (invoice_id, from_status, to_status, changed_by)
    values (new.id, case when tg_op = 'INSERT' then null else old.status end, new.status, auth.uid());
  end if;
  return new;
end;
$$;
create trigger record_invoice_status_history after insert or update of status on public.invoices
  for each row execute function public.record_invoice_status_history();

-- ---------------------------------------------------------------------------
-- Profile privilege protection: only SUPER_ADMIN can change role/active,
-- server-side admin operations (service role) are exempt.
-- ---------------------------------------------------------------------------

create or replace function public.protect_profile_privileges()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.role() = 'service_role' then
    return new;
  end if;

  if (new.role is distinct from old.role or new.active is distinct from old.active)
     and public.current_user_role() <> 'SUPER_ADMIN' then
    raise exception 'Only SUPER_ADMIN can change a profile''s role or active status';
  end if;

  return new;
end;
$$;
create trigger protect_profile_privileges before update on public.profiles
  for each row execute function public.protect_profile_privileges();

-- ---------------------------------------------------------------------------
-- Quotation -> booking conversion (idempotent: a quotation can only ever
-- produce one booking, enforced by the unique index from
-- 20260909120400_bookings.sql; this function also short-circuits so a
-- double-click doesn't attempt — and fail loudly on — a second insert).
-- ---------------------------------------------------------------------------

create or replace function public.convert_quotation_to_booking(p_quotation_id uuid)
returns uuid
language plpgsql
as $$
declare
  q public.quotations%rowtype;
  v_booking_id uuid;
begin
  select * into q from public.quotations where id = p_quotation_id for update;

  if not found then
    raise exception 'Quotation % not found', p_quotation_id;
  end if;

  if q.converted_booking_id is not null then
    -- Already converted: return the existing booking rather than erroring,
    -- so a retried/duplicate request is a no-op.
    return q.converted_booking_id;
  end if;

  if q.status not in ('ACCEPTED', 'SENT', 'VIEWED') then
    raise exception 'Quotation % must be accepted before converting to a booking (status is %)', p_quotation_id, q.status;
  end if;

  insert into public.bookings (
    customer_id, quotation_id, pickup, dropoff, trip_date, trip_time,
    passengers, luggage, vehicle_id, driver_id, price, currency,
    tax_amount, discount, total, source, created_by
  ) values (
    q.customer_id, q.id, q.pickup, q.dropoff, q.trip_date, q.trip_time,
    q.passengers, q.luggage, q.vehicle_id, q.driver_id,
    q.subtotal, q.currency, q.tax_amount, q.discount, q.total, 'ADMIN', auth.uid()
  ) returning id into v_booking_id;

  update public.quotations
    set status = 'CONVERTED', converted_booking_id = v_booking_id
    where id = p_quotation_id;

  return v_booking_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Booking confirmed -> invoice (idempotent via the partial unique index on
-- invoices.booking_id: ON CONFLICT makes a duplicate trigger firing a no-op).
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

      -- v_invoice_id is only set when a row was actually inserted (not on a
      -- conflict no-op), so this line item is never duplicated either.
      if v_invoice_id is not null then
        insert into public.invoice_items (invoice_id, description, quantity, unit_price, amount, sort_order)
        values (v_invoice_id, 'Trip: ' || new.pickup || ' → ' || new.dropoff || ' (' || new.booking_reference || ')', 1, new.price, new.price, 0);
      end if;
    end if;
  end if;
  return new;
end;
$$;
create trigger create_invoice_for_confirmed_booking
  after insert or update of status on public.bookings
  for each row execute function public.create_invoice_for_confirmed_booking();

-- ---------------------------------------------------------------------------
-- Payment -> invoice/booking reconciliation + automatic receipt.
-- ---------------------------------------------------------------------------

create or replace function public.before_payment_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  inv public.invoices%rowtype;
begin
  select * into inv from public.invoices where id = new.invoice_id for update;
  if not found then
    raise exception 'Invoice % not found', new.invoice_id;
  end if;
  if inv.total - inv.amount_paid < new.amount then
    raise exception 'Payment of % exceeds remaining balance of % on invoice %',
      new.amount, inv.total - inv.amount_paid, inv.invoice_number;
  end if;

  new.booking_id := inv.booking_id;
  new.customer_id := inv.customer_id;
  return new;
end;
$$;
create trigger before_payment_insert before insert on public.payments
  for each row execute function public.before_payment_insert();

create or replace function public.reconcile_invoice_after_payment_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_invoice_id uuid := coalesce(new.invoice_id, old.invoice_id);
  v_paid numeric(12, 2);
  v_total numeric(12, 2);
  v_new_status public.invoice_status;
  v_booking_id uuid;
begin
  select coalesce(sum(amount), 0) into v_paid
    from public.payments where invoice_id = v_invoice_id and deleted_at is null;

  select total, booking_id into v_total, v_booking_id
    from public.invoices where id = v_invoice_id for update;

  if v_paid >= v_total and v_total > 0 then
    v_new_status := 'PAID';
  elsif v_paid > 0 then
    v_new_status := 'PARTIALLY_PAID';
  else
    v_new_status := 'SENT';
  end if;

  update public.invoices
    set amount_paid = v_paid,
        status = case when status in ('DRAFT', 'VOID') then status else v_new_status end
    where id = v_invoice_id;

  if v_booking_id is not null then
    update public.bookings
      set payment_status = case
        when v_paid >= v_total and v_total > 0 then 'PAID'::public.payment_status
        when v_paid > 0 then 'PARTIALLY_PAID'::public.payment_status
        else 'UNPAID'::public.payment_status
      end
      where id = v_booking_id;
  end if;

  return coalesce(new, old);
end;
$$;
create trigger reconcile_invoice_after_payment_change
  after insert or update of amount, deleted_at or delete on public.payments
  for each row execute function public.reconcile_invoice_after_payment_change();

create or replace function public.create_receipt_for_payment()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_balance numeric(12, 2);
begin
  -- Computed directly (not read from invoices.balance_due) because trigger
  -- firing order for same-event AFTER triggers is alphabetical by name, and
  -- this must not depend on reconcile_invoice_after_payment_change having
  -- already run.
  select i.total - coalesce(sum(p.amount), 0) into v_balance
    from public.invoices i
    left join public.payments p on p.invoice_id = i.id and p.deleted_at is null
    where i.id = new.invoice_id
    group by i.total;

  insert into public.receipts (payment_id, invoice_id, booking_id, customer_id, amount, method, payment_date, remaining_balance)
  values (new.id, new.invoice_id, new.booking_id, new.customer_id, new.amount, new.method, new.payment_date, coalesce(v_balance, 0))
  on conflict (payment_id) do nothing;

  return new;
end;
$$;
create trigger create_receipt_for_payment
  after insert on public.payments
  for each row execute function public.create_receipt_for_payment();

-- Prevent recording the same transaction reference twice against one invoice.
create unique index payments_invoice_reference_unique_idx
  on public.payments (invoice_id, reference_number)
  where reference_number is not null and deleted_at is null;

-- ---------------------------------------------------------------------------
-- Derived follow-ups
-- ---------------------------------------------------------------------------

create or replace function public.create_quotation_follow_up()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = 'SENT' and (tg_op = 'INSERT' or old.status is distinct from new.status) then
    if not exists (
      select 1 from public.follow_ups
      where quotation_id = new.id and type = 'QUOTATION_FOLLOWUP' and status = 'PENDING'
    ) then
      insert into public.follow_ups (customer_id, quotation_id, type, due_date, notes, created_by)
      values (new.customer_id, new.id, 'QUOTATION_FOLLOWUP', current_date + 3,
              'Quotation ' || new.quotation_number || ' sent — check if the customer has responded.', new.created_by);
    end if;
  end if;
  return new;
end;
$$;
create trigger create_quotation_follow_up
  after insert or update of status on public.quotations
  for each row execute function public.create_quotation_follow_up();

create or replace function public.create_post_trip_follow_up()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = 'COMPLETED' and old.status is distinct from new.status then
    if not exists (
      select 1 from public.follow_ups
      where booking_id = new.id and type = 'POST_TRIP_FOLLOWUP'
    ) then
      insert into public.follow_ups (customer_id, booking_id, type, due_date, notes, created_by)
      values (new.customer_id, new.id, 'POST_TRIP_FOLLOWUP', current_date + 1,
              'Trip ' || new.booking_reference || ' completed — follow up for feedback / repeat booking.', new.created_by);
    end if;
  end if;
  return new;
end;
$$;
create trigger create_post_trip_follow_up
  after update of status on public.bookings
  for each row execute function public.create_post_trip_follow_up();

-- ---------------------------------------------------------------------------
-- Time-based automations that can't be expressed as row triggers. Callable
-- on a schedule (see the /api/cron/* route handlers + required external
-- scheduler, documented in the implementation report).
-- ---------------------------------------------------------------------------

create or replace function public.mark_overdue_invoices()
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count int := 0;
  r record;
begin
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

  return v_count;
end;
$$;

create or replace function public.create_upcoming_trip_reminders(p_days_ahead int default 1)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count int := 0;
  r record;
begin
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

  return v_count;
end;
$$;
