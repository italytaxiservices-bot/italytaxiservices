-- Correction to the previous migration: raw-table RLS policies for customer
-- self-access would have exposed internal-only columns to the customer
-- (bookings.internal_notes / pricing_breakdown / created_by / assigned_by,
-- invoices.created_by, customers.notes / created_by, and any column added
-- to these tables in the future would be silently exposed too, since RLS
-- gates rows, not columns, and customers use the same `authenticated`
-- Postgres role as staff so column-level GRANT/REVOKE can't tell them
-- apart). Replacing with curated SECURITY DEFINER functions that return
-- (and, for the profile, accept) only an explicit safe column list.

drop policy if exists bookings_customer_select on public.bookings;
drop policy if exists booking_status_history_customer_select on public.booking_status_history;
drop policy if exists invoices_customer_select on public.invoices;
drop policy if exists invoice_items_customer_select on public.invoice_items;
drop policy if exists receipts_customer_select on public.receipts;
drop policy if exists customers_self_select on public.customers;
drop policy if exists customers_self_update on public.customers;

create or replace function public.get_my_bookings()
returns table (
  id uuid, booking_reference text, pickup text, dropoff text, trip_date date, trip_time time,
  status public.booking_status, payment_status public.payment_status, total numeric, currency text,
  vehicle_name text, driver_name text, driver_phone text, flight_number text, is_airport_pickup boolean
)
language sql stable security definer set search_path = public
as $$
  select b.id, b.booking_reference, b.pickup, b.dropoff, b.trip_date, b.trip_time,
         b.status, b.payment_status, b.total, b.currency,
         v.name, d.full_name, d.phone, b.flight_number, b.is_airport_pickup
  from public.bookings b
  left join public.vehicles v on v.id = b.vehicle_id
  left join public.drivers d on d.id = b.driver_id
  where b.customer_id = public.current_customer_id() and public.current_customer_id() is not null and b.deleted_at is null
  order by b.trip_date desc, b.trip_time desc;
$$;

create or replace function public.get_my_booking(p_reference text)
returns table (
  id uuid, booking_reference text, pickup text, dropoff text, trip_date date, trip_time time,
  status public.booking_status, payment_status public.payment_status,
  price numeric, discount numeric, tax_amount numeric, total numeric, currency text,
  passengers int, luggage int, customer_notes text, special_requests text,
  flight_number text, flight_terminal text, flight_arrival_time timestamptz, flight_departure_time timestamptz,
  meet_and_greet_notes text, is_airport_pickup boolean,
  confirmed_at timestamptz, driver_en_route_at timestamptz, picked_up_at timestamptz,
  trip_started_at timestamptz, completed_at timestamptz, cancelled_at timestamptz,
  vehicle_name text, driver_name text, driver_phone text
)
language sql stable security definer set search_path = public
as $$
  select b.id, b.booking_reference, b.pickup, b.dropoff, b.trip_date, b.trip_time,
         b.status, b.payment_status, b.price, b.discount, b.tax_amount, b.total, b.currency,
         b.passengers, b.luggage, b.customer_notes, b.special_requests,
         b.flight_number, b.flight_terminal, b.flight_arrival_time, b.flight_departure_time,
         b.meet_and_greet_notes, b.is_airport_pickup,
         b.confirmed_at, b.driver_en_route_at, b.picked_up_at, b.trip_started_at, b.completed_at, b.cancelled_at,
         v.name, d.full_name, d.phone
  from public.bookings b
  left join public.vehicles v on v.id = b.vehicle_id
  left join public.drivers d on d.id = b.driver_id
  where b.booking_reference = p_reference
    and b.customer_id = public.current_customer_id()
    and public.current_customer_id() is not null
    and b.deleted_at is null;
$$;

create or replace function public.get_my_booking_status_history(p_reference text)
returns table (from_status public.booking_status, to_status public.booking_status, changed_at timestamptz)
language sql stable security definer set search_path = public
as $$
  select h.from_status, h.to_status, h.changed_at
  from public.booking_status_history h
  join public.bookings b on b.id = h.booking_id
  where b.booking_reference = p_reference
    and b.customer_id = public.current_customer_id()
    and public.current_customer_id() is not null
  order by h.changed_at asc;
$$;

create or replace function public.get_my_invoices()
returns table (
  id uuid, invoice_number text, status public.invoice_status, total numeric, amount_paid numeric,
  balance_due numeric, currency text, due_date date, created_at timestamptz
)
language sql stable security definer set search_path = public
as $$
  select i.id, i.invoice_number, i.status, i.total, i.amount_paid, i.balance_due, i.currency, i.due_date, i.created_at
  from public.invoices i
  where i.customer_id = public.current_customer_id() and public.current_customer_id() is not null and i.deleted_at is null
  order by i.created_at desc;
$$;

create or replace function public.get_my_invoice(p_invoice_number text)
returns table (
  id uuid, invoice_number text, status public.invoice_status, subtotal numeric, discount numeric,
  tax_amount numeric, total numeric, amount_paid numeric, balance_due numeric, currency text,
  due_date date, payment_terms text, terms_and_conditions text, created_at timestamptz
)
language sql stable security definer set search_path = public
as $$
  select i.id, i.invoice_number, i.status, i.subtotal, i.discount, i.tax_amount, i.total, i.amount_paid,
         i.balance_due, i.currency, i.due_date, i.payment_terms, i.terms_and_conditions, i.created_at
  from public.invoices i
  where i.invoice_number = p_invoice_number
    and i.customer_id = public.current_customer_id()
    and public.current_customer_id() is not null
    and i.deleted_at is null;
$$;

create or replace function public.get_my_invoice_items(p_invoice_number text)
returns table (description text, quantity numeric, unit_price numeric, amount numeric, sort_order int)
language sql stable security definer set search_path = public
as $$
  select ii.description, ii.quantity, ii.unit_price, ii.amount, ii.sort_order
  from public.invoice_items ii
  join public.invoices i on i.id = ii.invoice_id
  where i.invoice_number = p_invoice_number
    and i.customer_id = public.current_customer_id()
    and public.current_customer_id() is not null
  order by ii.sort_order asc;
$$;

create or replace function public.get_my_invoice_receipts(p_invoice_number text)
returns table (receipt_number text, amount numeric, method public.payment_method, payment_date date, remaining_balance numeric)
language sql stable security definer set search_path = public
as $$
  select r.receipt_number, r.amount, r.method, r.payment_date, r.remaining_balance
  from public.receipts r
  join public.invoices i on i.id = r.invoice_id
  where i.invoice_number = p_invoice_number
    and i.customer_id = public.current_customer_id()
    and public.current_customer_id() is not null
  order by r.payment_date asc;
$$;

create or replace function public.get_my_customer_profile()
returns table (id uuid, full_name text, email text, phone text, whatsapp text, country text, billing_address text)
language sql stable security definer set search_path = public
as $$
  select c.id, c.full_name, c.email, c.phone, c.whatsapp, c.country, c.billing_address
  from public.customers c
  where c.id = public.current_customer_id() and public.current_customer_id() is not null;
$$;

create or replace function public.update_my_customer_profile(
  p_full_name text, p_phone text, p_whatsapp text, p_country text, p_billing_address text
)
returns void
language plpgsql security definer set search_path = public
as $$
begin
  if public.current_customer_id() is null then
    raise exception 'No linked customer account.';
  end if;
  update public.customers
    set full_name = coalesce(nullif(trim(p_full_name), ''), full_name),
        phone = nullif(trim(p_phone), ''),
        whatsapp = nullif(trim(p_whatsapp), ''),
        country = nullif(trim(p_country), ''),
        billing_address = nullif(trim(p_billing_address), '')
    where id = public.current_customer_id();
end;
$$;

revoke execute on function public.get_my_bookings() from public, anon;
revoke execute on function public.get_my_booking(text) from public, anon;
revoke execute on function public.get_my_booking_status_history(text) from public, anon;
revoke execute on function public.get_my_invoices() from public, anon;
revoke execute on function public.get_my_invoice(text) from public, anon;
revoke execute on function public.get_my_invoice_items(text) from public, anon;
revoke execute on function public.get_my_invoice_receipts(text) from public, anon;
revoke execute on function public.get_my_customer_profile() from public, anon;
revoke execute on function public.update_my_customer_profile(text, text, text, text, text) from public, anon;

grant execute on function public.get_my_bookings() to authenticated;
grant execute on function public.get_my_booking(text) to authenticated;
grant execute on function public.get_my_booking_status_history(text) to authenticated;
grant execute on function public.get_my_invoices() to authenticated;
grant execute on function public.get_my_invoice(text) to authenticated;
grant execute on function public.get_my_invoice_items(text) to authenticated;
grant execute on function public.get_my_invoice_receipts(text) to authenticated;
grant execute on function public.get_my_customer_profile() to authenticated;
grant execute on function public.update_my_customer_profile(text, text, text, text, text) to authenticated;
