import { formatDate, formatDateTime, formatTime } from "@/lib/admin/format";

/**
 * Driver-facing trip summaries for the "Copy for driver" boxes. Trip
 * logistics + passenger contact only — prices and internal notes are left
 * out on purpose.
 */

export type BriefingMethod = "whatsapp" | "email" | "copy";

/**
 * Reads back who a trip was given to from a logged briefing note (see
 * logDriverBriefingSent), e.g. "Booking details sent to driver Romeo
 * Stramaglia via WhatsApp" → { recipient: "Romeo Stramaglia", method: "whatsapp" }.
 * The prefix is optional so both raw and already-stripped notes work.
 */
export function parseBriefingNote(note: string): { recipient: string | null; method: BriefingMethod | null } {
  const body = note.replace(/^Driver briefing:\s*/, "").replace(/^Booking details\s+/, "");
  const patterns: [RegExp, BriefingMethod][] = [
    [/^sent to (.+?) via WhatsApp$/i, "whatsapp"],
    [/^emailed to (.+)$/i, "email"],
    [/^copied to send to (.+)$/i, "copy"],
  ];
  for (const [re, method] of patterns) {
    const m = body.match(re);
    if (m) {
      const who = m[1].replace(/^driver\s+/i, "").trim();
      return { recipient: who && who.toLowerCase() !== "driver" ? who : null, method };
    }
  }
  return { recipient: null, method: null };
}

export const BRIEFING_METHOD_LABELS: Record<BriefingMethod, string> = {
  whatsapp: "WhatsApp",
  email: "Email",
  copy: "Copied",
};

/** "Romeo Stramaglia · WhatsApp" (or "Unknown driver · Copied" when no name was chosen). */
export function givenToLabel(note: string) {
  const { recipient, method } = parseBriefingNote(note);
  return `${recipient ?? "Unknown driver"}${method ? ` · ${BRIEFING_METHOD_LABELS[method]}` : ""}`;
}

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
