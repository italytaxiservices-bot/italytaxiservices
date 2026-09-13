-- ON CONFLICT inference against a partial unique index must repeat that
-- index's WHERE predicate — without it, Postgres can't infer the index and
-- submit_my_review would fail at runtime the first time a customer
-- resubmitted a review for the same booking.
create or replace function public.submit_my_review(p_reference text, p_rating int, p_comment text)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  v_booking record;
begin
  if public.current_customer_id() is null then
    raise exception 'No linked customer account.';
  end if;
  if p_rating < 1 or p_rating > 5 then
    raise exception 'Rating must be between 1 and 5.';
  end if;

  select id, customer_id, status into v_booking
    from public.bookings
    where booking_reference = p_reference and deleted_at is null;

  if v_booking is null or v_booking.customer_id <> public.current_customer_id() then
    raise exception 'Booking not found.';
  end if;
  if v_booking.status <> 'COMPLETED' then
    raise exception 'You can only review a completed trip.';
  end if;

  insert into public.reviews (booking_id, customer_id, rating, comment, source)
  values (v_booking.id, v_booking.customer_id, p_rating, nullif(trim(p_comment), ''), 'CUSTOMER_PORTAL')
  on conflict (booking_id) where booking_id is not null
  do update set rating = excluded.rating, comment = excluded.comment;
end;
$$;

revoke execute on function public.submit_my_review(text, int, text) from public, anon;
grant execute on function public.submit_my_review(text, int, text) to authenticated;
