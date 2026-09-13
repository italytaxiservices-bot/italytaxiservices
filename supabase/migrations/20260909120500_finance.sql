create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  -- One auto-generated invoice per booking (idempotency for the booking
  -- confirmed -> invoice automation).
  booking_id uuid references public.bookings (id) on delete set null,
  customer_id uuid not null references public.customers (id) on delete restrict,
  subtotal numeric(12, 2) not null default 0 check (subtotal >= 0),
  discount numeric(12, 2) not null default 0 check (discount >= 0),
  tax_rate numeric(5, 2) not null default 0 check (tax_rate >= 0),
  tax_amount numeric(12, 2) not null default 0 check (tax_amount >= 0),
  total numeric(12, 2) not null default 0 check (total >= 0),
  amount_paid numeric(12, 2) not null default 0 check (amount_paid >= 0),
  balance_due numeric(12, 2) generated always as (total - amount_paid) stored,
  due_date date,
  currency text not null default 'EUR',
  payment_terms text,
  terms_and_conditions text,
  status public.invoice_status not null default 'DRAFT',
  sent_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint invoices_amount_paid_le_total check (amount_paid <= total)
);

create trigger set_updated_at before update on public.invoices
  for each row execute function public.set_updated_at();

create unique index invoices_booking_id_unique_idx
  on public.invoices (booking_id)
  where booking_id is not null;

create index invoices_customer_id_idx on public.invoices (customer_id);
create index invoices_status_idx on public.invoices (status) where deleted_at is null;
create index invoices_due_date_idx on public.invoices (due_date) where deleted_at is null;
create index invoices_created_at_idx on public.invoices (created_at);

create table public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices (id) on delete cascade,
  description text not null,
  quantity numeric(10, 2) not null default 1 check (quantity > 0),
  unit_price numeric(12, 2) not null default 0 check (unit_price >= 0),
  amount numeric(12, 2) not null default 0 check (amount >= 0),
  sort_order int not null default 0
);
create index invoice_items_invoice_id_idx on public.invoice_items (invoice_id);

create table public.invoice_status_history (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices (id) on delete cascade,
  from_status public.invoice_status,
  to_status public.invoice_status not null,
  changed_by uuid references public.profiles (id) on delete set null,
  changed_at timestamptz not null default now(),
  note text
);
create index invoice_status_history_invoice_id_idx on public.invoice_status_history (invoice_id);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices (id) on delete restrict,
  -- Denormalized from the invoice at insert time (trigger) purely to make
  -- dispatch/customer-history queries cheap; the invoice row is authoritative.
  booking_id uuid references public.bookings (id) on delete set null,
  customer_id uuid references public.customers (id) on delete set null,
  amount numeric(12, 2) not null check (amount > 0),
  currency text not null default 'EUR',
  method public.payment_method not null,
  reference_number text,
  payment_date date not null default current_date,
  notes text,
  recorded_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create trigger set_updated_at before update on public.payments
  for each row execute function public.set_updated_at();

create index payments_invoice_id_idx on public.payments (invoice_id);
create index payments_booking_id_idx on public.payments (booking_id);
create index payments_customer_id_idx on public.payments (customer_id);
create index payments_payment_date_idx on public.payments (payment_date);

create table public.receipts (
  id uuid primary key default gen_random_uuid(),
  receipt_number text not null unique,
  -- Exactly one receipt per payment (automation idempotency).
  payment_id uuid not null unique references public.payments (id) on delete cascade,
  invoice_id uuid references public.invoices (id) on delete set null,
  booking_id uuid references public.bookings (id) on delete set null,
  customer_id uuid references public.customers (id) on delete set null,
  amount numeric(12, 2) not null,
  method public.payment_method not null,
  payment_date date not null,
  remaining_balance numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);
create index receipts_invoice_id_idx on public.receipts (invoice_id);
create index receipts_customer_id_idx on public.receipts (customer_id);

create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  category public.expense_category not null,
  amount numeric(12, 2) not null check (amount >= 0),
  currency text not null default 'EUR',
  booking_id uuid references public.bookings (id) on delete set null,
  driver_id uuid references public.drivers (id) on delete set null,
  vehicle_id uuid references public.vehicles (id) on delete set null,
  description text,
  expense_date date not null default current_date,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create trigger set_updated_at before update on public.expenses
  for each row execute function public.set_updated_at();

create index expenses_booking_id_idx on public.expenses (booking_id);
create index expenses_category_idx on public.expenses (category) where deleted_at is null;
create index expenses_expense_date_idx on public.expenses (expense_date) where deleted_at is null;
