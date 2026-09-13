-- Task 2: flight/airport operations fields. No external flight-status API —
-- these are staff-entered fields (the customer or booking source tells you
-- the flight number/terminal; a real flight-tracking integration is a
-- separate, explicit integration decision, not something to fake here).
alter table public.bookings
  add column if not exists flight_terminal text,
  add column if not exists flight_arrival_time timestamptz,
  add column if not exists flight_departure_time timestamptz,
  add column if not exists meet_and_greet_notes text,
  add column if not exists is_airport_pickup boolean not null default false;

comment on column public.bookings.flight_arrival_time is 'Staff-entered from the flight itinerary the customer/lead provided. Not sourced from a live flight-status API.';
