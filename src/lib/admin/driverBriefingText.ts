import { formatDate, formatDateTime, formatTime } from "@/lib/admin/format";

/**
 * Driver-facing trip summaries for the "Copy for driver" boxes. Trip
 * logistics + passenger contact only — prices and internal notes are left
 * out on purpose.
 */

export type BriefingBooking = {
  booking_reference: string;
  trip_date: string;
  trip_time: string | null;
  pickup: string;
  dropoff: string;
  passengers: number | null;
  luggage: number | null;
  flight_number?: string | null;
  flight_terminal?: string | null;
  flight_arrival_time?: string | null;
  meet_and_greet_notes?: string | null;
  special_requests?: string | null;
  customer_notes?: string | null;
  customer?: { full_name: string | null; phone: string | null } | null;
  vehicleName?: string | null;
};

export function bookingBriefing(b: BriefingBooking) {
  return [
    `🚖 BOOKING ${b.booking_reference}`,
    ``,
    `📅 Date: ${formatDate(b.trip_date)}`,
    `⏰ Time: ${formatTime(b.trip_time)}`,
    `📍 Pickup: ${b.pickup}`,
    `🏁 Drop-off: ${b.dropoff}`,
    ``,
    `👤 Passenger: ${b.customer?.full_name ?? "—"}`,
    b.customer?.phone ? `📞 Phone: ${b.customer.phone}` : null,
    `👥 Passengers: ${b.passengers ?? "—"}`,
    b.luggage != null ? `🧳 Luggage: ${b.luggage}` : null,
    b.vehicleName ? `🚘 Vehicle: ${b.vehicleName}` : null,
    b.flight_number ? `✈️ Flight: ${b.flight_number}${b.flight_terminal ? ` (Terminal ${b.flight_terminal})` : ""}` : null,
    b.flight_arrival_time ? `🛬 Arrival: ${formatDateTime(b.flight_arrival_time)}` : null,
    b.meet_and_greet_notes ? `🪧 Meet & greet: ${b.meet_and_greet_notes}` : null,
    b.special_requests ? `📝 Notes: ${b.special_requests}` : null,
    b.customer_notes ? `💬 Customer notes: ${b.customer_notes}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export type BriefingLead = {
  lead_number: string;
  full_name: string;
  phone: string | null;
  pickup: string | null;
  dropoff: string | null;
  trip_date: string | null;
  trip_time: string | null;
  passengers: number | null;
  notes: string | null;
};

export function leadBriefing(l: BriefingLead) {
  return [
    `🚖 BOOKING ${l.lead_number}`,
    ``,
    `📅 Date: ${formatDate(l.trip_date)}`,
    `⏰ Time: ${formatTime(l.trip_time)}`,
    `📍 Pickup: ${l.pickup ?? "—"}`,
    `🏁 Drop-off: ${l.dropoff ?? "—"}`,
    ``,
    `👤 Passenger: ${l.full_name}`,
    l.phone ? `📞 Phone: ${l.phone}` : null,
    `👥 Passengers: ${l.passengers ?? "—"}`,
    l.notes ? `📝 Notes:\n${l.notes}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
