-- Bookings had no DELETE policy at all (the source design favored soft
-- cancellation via cancelBookingWithDetails). Added on request: staff need
-- to be able to permanently remove a booking, restricted to the same
-- ADMIN_ONLY bar as other destructive actions (see documents_delete).
create policy bookings_delete on public.bookings for delete to authenticated
  using (public.is_admin());
