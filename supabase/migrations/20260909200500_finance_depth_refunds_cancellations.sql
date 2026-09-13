-- Task 3 §10-14,27,28: accounts receivable support columns, refunds/credit
-- notes, cancellation/no-show detail, discount control, price override
-- audit, payment reconciliation.

-- ---------------------------------------------------------------------------
-- §11 Payment reconciliation — manual only (no bank API). Columns on
-- payments rather than a new table: reconciliation is a 1:1 property of a
-- single recorded payment at this business's scale, not a repeating list.
-- ---------------------------------------------------------------------------
alter table public.payments
  add column if not exists reconciliation_status text not null default 'UNMATCHED' check (reconciliation_status in ('UNMATCHED','MATCHED','PARTIALLY_MATCHED','DISPUTED')),
  add column if not exists external_reference text,
  add column if not exists reconciliation_notes text,
  add column if not exists reconciled_by uuid references public.profiles (id) on delete set null,
  add column if not exists reconciled_at timestamptz;
create index payments_reconciliation_status_idx on public.payments (reconciliation_status);

-- ---------------------------------------------------------------------------
-- §12 Refunds — a separate transaction linked to the original payment,
-- which is never deleted or edited. Credit notes are a separate, numbered
-- document generated only once a refund is actually processed.
-- ---------------------------------------------------------------------------
create table public.refunds (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid not null references public.payments (id) on delete restrict,
  invoice_id uuid references public.invoices (id) on delete set null,
  booking_id uuid references public.bookings (id) on delete set null,
  customer_id uuid references public.customers (id) on delete set null,
  amount numeric(12, 2) not null check (amount > 0),
  currency text not null default 'EUR' check (currency in ('EUR','USD','GBP','SAR','AED','KWD')),
  refund_type text not null check (refund_type in ('FULL','PARTIAL')),
  reason text not null,
  status text not null default 'PENDING' check (status in ('PENDING','APPROVED','REJECTED','PROCESSED')),
  refund_reference text,
  requested_by uuid references public.profiles (id) on delete set null,
  approved_by uuid references public.profiles (id) on delete set null,
  approved_at timestamptz,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index refunds_payment_id_idx on public.refunds (payment_id);
create index refunds_invoice_id_idx on public.refunds (invoice_id);
create index refunds_status_idx on public.refunds (status);
create index refunds_requested_by_idx on public.refunds (requested_by);
create index refunds_approved_by_idx on public.refunds (approved_by);

alter table public.refunds enable row level security;
create policy refunds_select on public.refunds for select to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS']::public.user_role[]));
create policy refunds_insert on public.refunds for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS']::public.user_role[]));
create policy refunds_update on public.refunds for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[]));

create trigger set_updated_at before update on public.refunds
  for each row execute function public.set_updated_at();

create table public.credit_notes (
  id uuid primary key default gen_random_uuid(),
  credit_note_number text not null unique,
  refund_id uuid not null references public.refunds (id) on delete restrict,
  customer_id uuid references public.customers (id) on delete set null,
  invoice_id uuid references public.invoices (id) on delete set null,
  amount numeric(12, 2) not null check (amount > 0),
  currency text not null default 'EUR' check (currency in ('EUR','USD','GBP','SAR','AED','KWD')),
  reason text,
  created_at timestamptz not null default now()
);
create unique index credit_notes_refund_id_unique_idx on public.credit_notes (refund_id);
create index credit_notes_customer_id_idx on public.credit_notes (customer_id);

alter table public.credit_notes enable row level security;
create policy credit_notes_select on public.credit_notes for select to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS']::public.user_role[]));
-- No direct insert/update policy — created only by the trigger below.

-- document_sequences needs a 'credit_note' series.
insert into public.document_sequences (doc_type, next_number) values ('credit_note', 1) on conflict (doc_type) do nothing;

-- ---------------------------------------------------------------------------
-- Shared helper: recompute an invoice's amount_paid/status/balance from its
-- payments minus any PROCESSED refunds against those payments — used by
-- both the payment trigger (existing, updated below) and the new refund
-- trigger, so the two never drift out of sync with each other.
-- ---------------------------------------------------------------------------
create or replace function public.recalculate_invoice_financials(p_invoice_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_paid numeric(12, 2);
  v_refunded numeric(12, 2);
  v_net_paid numeric(12, 2);
  v_total numeric(12, 2);
  v_new_status public.invoice_status;
  v_booking_id uuid;
begin
  select coalesce(sum(amount), 0) into v_paid from public.payments where invoice_id = p_invoice_id and deleted_at is null;
  select coalesce(sum(r.amount), 0) into v_refunded from public.refunds r where r.invoice_id = p_invoice_id and r.status = 'PROCESSED';
  v_net_paid := greatest(v_paid - v_refunded, 0);

  select total, booking_id into v_total, v_booking_id from public.invoices where id = p_invoice_id for update;

  if v_net_paid >= v_total and v_total > 0 then
    v_new_status := 'PAID';
  elsif v_net_paid > 0 then
    v_new_status := 'PARTIALLY_PAID';
  else
    v_new_status := 'SENT';
  end if;

  update public.invoices
    set amount_paid = v_net_paid,
        status = case when status in ('DRAFT', 'VOID') then status else v_new_status end
    where id = p_invoice_id;

  if v_booking_id is not null then
    update public.bookings
      set payment_status = case
        when v_net_paid >= v_total and v_total > 0 then 'PAID'::public.payment_status
        when v_net_paid > 0 then 'PARTIALLY_PAID'::public.payment_status
        else 'UNPAID'::public.payment_status
      end
      where id = v_booking_id;
  end if;
end;
$$;

revoke execute on function public.recalculate_invoice_financials(uuid) from public, anon, authenticated;
grant execute on function public.recalculate_invoice_financials(uuid) to service_role;

-- reconcile_invoice_after_payment_change now delegates to the shared helper.
create or replace function public.reconcile_invoice_after_payment_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_invoice_id uuid := coalesce(new.invoice_id, old.invoice_id);
begin
  if v_invoice_id is not null then
    perform public.recalculate_invoice_financials(v_invoice_id);
  end if;
  return coalesce(new, old);
end;
$$;

-- When a refund is marked PROCESSED: recalc the invoice, then create the
-- credit note (idempotent via the unique index on refund_id).
create or replace function public.process_refund()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_credit_note_id uuid;
begin
  if new.status = 'PROCESSED' and old.status is distinct from new.status then
    if new.invoice_id is not null then
      perform public.recalculate_invoice_financials(new.invoice_id);
    end if;

    insert into public.credit_notes (credit_note_number, refund_id, customer_id, invoice_id, amount, currency, reason)
    values (public.next_document_number('credit_note'), new.id, new.customer_id, new.invoice_id, new.amount, new.currency, new.reason)
    on conflict (refund_id) do nothing
    returning id into v_credit_note_id;

    perform public.log_automation_run('refund_processing', 'SUCCESS', case when v_credit_note_id is not null then 1 else 0 end, null, 'TRIGGER', jsonb_build_object('refund_id', new.id));
  end if;
  return new;
end;
$$;

create trigger process_refund after update on public.refunds
  for each row execute function public.process_refund();

revoke execute on function public.process_refund() from anon, authenticated;
grant execute on function public.process_refund() to service_role;

insert into public.automation_definitions (key, label, description, kind) values
  ('refund_processing', 'Process refund into invoice + credit note', 'When a refund is marked PROCESSED, recalculates the linked invoice''s paid amount/status and generates a numbered credit note.', 'TRIGGER')
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- §13 Cancellation detail + §14 No-show detail — 1:1 with the booking
-- (CANCELLED/NO_SHOW are terminal, so a booking is cancelled/no-showed at
-- most once), so these are columns rather than a separate history table.
-- ---------------------------------------------------------------------------
alter table public.bookings
  add column if not exists cancelled_by uuid references public.profiles (id) on delete set null,
  add column if not exists cancellation_reason text,
  add column if not exists cancellation_initiated_by text check (cancellation_initiated_by in ('CUSTOMER','DRIVER','STAFF')),
  add column if not exists cancellation_fee numeric(12, 2) check (cancellation_fee >= 0),
  add column if not exists cancellation_refund_amount numeric(12, 2) check (cancellation_refund_amount >= 0),
  add column if not exists no_show_type text check (no_show_type in ('PASSENGER','DRIVER')),
  add column if not exists no_show_notes text,
  add column if not exists no_show_charge numeric(12, 2) check (no_show_charge >= 0),
  add column if not exists no_show_refund_amount numeric(12, 2) check (no_show_refund_amount >= 0);

-- ---------------------------------------------------------------------------
-- §27/§28 Discount control + price override audit — generic across the
-- entity types a manual price change can happen on (quotation/booking/
-- invoice), one shared log rather than a per-table duplicate.
-- ---------------------------------------------------------------------------
create table public.price_override_log (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('quotation','booking','invoice')),
  entity_id uuid not null,
  original_price numeric(12, 2) not null,
  new_price numeric(12, 2) not null,
  reason text not null,
  changed_by uuid references public.profiles (id) on delete set null,
  changed_at timestamptz not null default now()
);
create index price_override_log_entity_idx on public.price_override_log (entity_type, entity_id);
create index price_override_log_changed_by_idx on public.price_override_log (changed_by);

alter table public.price_override_log enable row level security;
create policy price_override_log_select on public.price_override_log for select to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS']::public.user_role[]));
create policy price_override_log_insert on public.price_override_log for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS']::public.user_role[]));

create table public.discount_requests (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('quotation','booking')),
  entity_id uuid not null,
  original_price numeric(12, 2) not null,
  discount_amount numeric(12, 2) not null default 0 check (discount_amount >= 0),
  discount_percent numeric(5, 2) not null default 0 check (discount_percent >= 0),
  final_price numeric(12, 2) not null,
  reason text not null,
  threshold_percent numeric(5, 2) not null,
  status text not null default 'PENDING' check (status in ('PENDING','APPROVED','REJECTED','AUTO_APPROVED')),
  requested_by uuid references public.profiles (id) on delete set null,
  approved_by uuid references public.profiles (id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);
create index discount_requests_entity_idx on public.discount_requests (entity_type, entity_id);
create index discount_requests_status_idx on public.discount_requests (status);
create index discount_requests_requested_by_idx on public.discount_requests (requested_by);
create index discount_requests_approved_by_idx on public.discount_requests (approved_by);

alter table public.discount_requests enable row level security;
create policy discount_requests_select on public.discount_requests for select to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS']::public.user_role[]));
create policy discount_requests_insert on public.discount_requests for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE','OPERATIONS']::public.user_role[]));
create policy discount_requests_update on public.discount_requests for update to authenticated
  using (public.has_permission('discounts.approve'))
  with check (public.has_permission('discounts.approve'));

-- Configurable approval threshold (company-wide default) — not hard-coded
-- in application code.
alter table public.company_settings add column if not exists discount_approval_threshold_percent numeric(5,2) not null default 5;
