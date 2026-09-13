create index bookings_cancelled_by_idx on public.bookings (cancelled_by);
create index credit_notes_invoice_id_idx on public.credit_notes (invoice_id);
create index customer_segment_overrides_created_by_idx on public.customer_segment_overrides (created_by);
create index driver_earnings_approved_by_idx on public.driver_earnings (approved_by);
create index payments_reconciled_by_idx on public.payments (reconciled_by);
create index refunds_booking_id_idx on public.refunds (booking_id);
create index refunds_customer_id_idx on public.refunds (customer_id);
create index vehicle_maintenance_document_id_idx on public.vehicle_maintenance (document_id);
