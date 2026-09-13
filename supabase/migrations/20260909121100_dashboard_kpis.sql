-- Dashboard KPI aggregates as SQL functions (not SECURITY DEFINER) so they
-- run under the caller's own RLS grants — a DISPATCHER calling the finance
-- KPI function simply sees zeroed-out totals (no visible invoice/payment
-- rows) rather than an error or, worse, real numbers they shouldn't see.

create or replace function public.dashboard_operational_kpis(p_today date)
returns table (
  todays_trips bigint,
  upcoming_trips bigint,
  pending_bookings bigint,
  confirmed_bookings bigint,
  completed_bookings bigint,
  cancelled_bookings bigint,
  unassigned_trips bigint
)
language sql
stable
as $$
  select
    count(*) filter (where trip_date = p_today) as todays_trips,
    count(*) filter (where trip_date > p_today and status not in ('CANCELLED', 'COMPLETED', 'NO_SHOW')) as upcoming_trips,
    count(*) filter (where status = 'PENDING') as pending_bookings,
    count(*) filter (where status = 'CONFIRMED') as confirmed_bookings,
    count(*) filter (where status = 'COMPLETED') as completed_bookings,
    count(*) filter (where status = 'CANCELLED') as cancelled_bookings,
    count(*) filter (where driver_id is null and status not in ('CANCELLED', 'COMPLETED', 'NO_SHOW')) as unassigned_trips
  from public.bookings
  where deleted_at is null;
$$;
grant execute on function public.dashboard_operational_kpis(date) to authenticated;

create or replace function public.dashboard_crm_kpis(p_from timestamptz, p_to timestamptz)
returns table (
  new_leads bigint,
  pending_quotations bigint,
  accepted_quotations bigint,
  sent_quotations bigint,
  new_customers bigint
)
language sql
stable
as $$
  select
    (select count(*) from public.leads where created_at between p_from and p_to and deleted_at is null),
    (select count(*) from public.quotations where status in ('SENT', 'VIEWED') and deleted_at is null),
    (select count(*) from public.quotations where accepted_at between p_from and p_to and deleted_at is null),
    (select count(*) from public.quotations where sent_at between p_from and p_to and deleted_at is null),
    (select count(*) from public.customers where created_at between p_from and p_to and deleted_at is null);
$$;
grant execute on function public.dashboard_crm_kpis(timestamptz, timestamptz) to authenticated;

create or replace function public.dashboard_finance_kpis(p_from timestamptz, p_to timestamptz, p_today date)
returns table (
  revenue_period numeric,
  payments_received_period numeric,
  outstanding_invoices numeric,
  overdue_invoices_count bigint,
  overdue_invoices_amount numeric,
  expenses_period numeric,
  todays_revenue numeric
)
language sql
stable
as $$
  select
    (select coalesce(sum(total), 0) from public.bookings
       where trip_date between p_from::date and p_to::date and status <> 'CANCELLED' and deleted_at is null),
    (select coalesce(sum(amount), 0) from public.payments
       where payment_date between p_from::date and p_to::date and deleted_at is null),
    (select coalesce(sum(balance_due), 0) from public.invoices
       where status in ('SENT', 'PARTIALLY_PAID', 'OVERDUE') and deleted_at is null),
    (select count(*) from public.invoices where status = 'OVERDUE' and deleted_at is null),
    (select coalesce(sum(balance_due), 0) from public.invoices where status = 'OVERDUE' and deleted_at is null),
    (select coalesce(sum(amount), 0) from public.expenses
       where expense_date between p_from::date and p_to::date and deleted_at is null),
    (select coalesce(sum(amount), 0) from public.payments where payment_date = p_today and deleted_at is null);
$$;
grant execute on function public.dashboard_finance_kpis(timestamptz, timestamptz, date) to authenticated;
