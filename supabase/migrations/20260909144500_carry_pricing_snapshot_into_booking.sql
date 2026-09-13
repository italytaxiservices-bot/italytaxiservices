-- convert_quotation_to_booking should carry the quotation's pricing snapshot
-- (distance_km, pricing_breakdown) into the resulting booking so the
-- historical "how was this priced" record survives quotation -> booking
-- conversion instead of being dropped.
create or replace function public.convert_quotation_to_booking(p_quotation_id uuid)
returns uuid
language plpgsql
set search_path = public
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
    return q.converted_booking_id;
  end if;

  if q.status not in ('ACCEPTED', 'SENT', 'VIEWED') then
    raise exception 'Quotation % must be accepted before converting to a booking (status is %)', p_quotation_id, q.status;
  end if;

  insert into public.bookings (
    customer_id, quotation_id, pickup, dropoff, trip_date, trip_time,
    passengers, luggage, vehicle_id, driver_id, price, currency,
    tax_amount, discount, total, source, created_by, distance_km, pricing_breakdown
  ) values (
    q.customer_id, q.id, q.pickup, q.dropoff, q.trip_date, q.trip_time,
    q.passengers, q.luggage, q.vehicle_id, q.driver_id,
    q.subtotal, q.currency, q.tax_amount, q.discount, q.total, 'ADMIN', auth.uid(),
    q.distance_km, q.pricing_breakdown
  ) returning id into v_booking_id;

  update public.quotations
    set status = 'CONVERTED', converted_booking_id = v_booking_id
    where id = p_quotation_id;

  return v_booking_id;
end;
$$;

revoke execute on function public.convert_quotation_to_booking(uuid) from public, anon;
grant execute on function public.convert_quotation_to_booking(uuid) to authenticated;
