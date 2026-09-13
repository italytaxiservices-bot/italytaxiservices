-- Task 2: review/feedback system. No fabricated reviews — every row has an
-- explicit source (who actually said this) and, for customer-submitted
-- ones, is tied 1:1 to a real completed booking via RLS-enforced ownership.

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings (id) on delete set null,
  customer_id uuid references public.customers (id) on delete set null,
  rating int not null check (rating between 1 and 5),
  comment text,
  source text not null check (source in ('CUSTOMER_PORTAL', 'STAFF_ENTERED', 'GOOGLE', 'OTHER')),
  is_published boolean not null default false,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index reviews_booking_id_unique_idx on public.reviews (booking_id) where booking_id is not null;
create index reviews_customer_id_idx on public.reviews (customer_id);
create index reviews_created_by_idx on public.reviews (created_by);
create index reviews_is_published_idx on public.reviews (is_published) where is_published;

alter table public.reviews enable row level security;

create policy reviews_select on public.reviews for select to authenticated
  using (public.current_user_active());
create policy reviews_insert on public.reviews for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));
create policy reviews_update on public.reviews for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));

create trigger set_updated_at before update on public.reviews
  for each row execute function public.set_updated_at();

-- Published reviews are safe to show on the public marketing site (no PII
-- beyond a first name), so anon can read published ones only.
create policy reviews_public_select on public.reviews for select to anon
  using (is_published);

-- ---------------------------------------------------------------------------
-- Customer-portal review submission: one review per completed booking they
-- actually own, enforced both by the unique index above and by this
-- function only accepting a booking that is COMPLETED and belongs to the
-- caller.
-- ---------------------------------------------------------------------------
create or replace function public.get_my_booking_review(p_reference text)
returns table (rating int, comment text, created_at timestamptz)
language sql stable security definer set search_path = public
as $$
  select r.rating, r.comment, r.created_at
  from public.reviews r
  join public.bookings b on b.id = r.booking_id
  where b.booking_reference = p_reference
    and b.customer_id = public.current_customer_id()
    and public.current_customer_id() is not null;
$$;

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
  on conflict (booking_id) do update set rating = excluded.rating, comment = excluded.comment;
end;
$$;

revoke execute on function public.get_my_booking_review(text) from public, anon;
revoke execute on function public.submit_my_review(text, int, text) from public, anon;
grant execute on function public.get_my_booking_review(text) to authenticated;
grant execute on function public.submit_my_review(text, int, text) to authenticated;
