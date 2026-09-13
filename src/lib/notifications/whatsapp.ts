// No WhatsApp Business API is configured (would need META_WHATSAPP_TOKEN /
// META_WHATSAPP_PHONE_ID — see the implementation report). Until then, these
// build wa.me click-to-chat links: they open WhatsApp with the message
// pre-filled, sent by whoever on staff clicks it. Swap this module's
// internals for a real API call later without touching any call site.

export type WhatsAppTemplateKey =
  | "booking_confirmation"
  | "driver_details"
  | "pickup_reminder"
  | "payment_reminder"
  | "receipt"
  | "post_trip_follow_up";

const MESSAGES: Record<WhatsAppTemplateKey, (v: Record<string, string>) => string> = {
  booking_confirmation: (v) =>
    `Hi ${v.customer_name}, your booking ${v.booking_reference} is confirmed for ${v.date} at ${v.time} (${v.pickup} → ${v.dropoff}). Total: ${v.total}.`,
  driver_details: (v) =>
    `Hi ${v.customer_name}, your driver for ${v.booking_reference} is ${v.driver_name} (${v.driver_phone}), vehicle: ${v.vehicle}.`,
  pickup_reminder: (v) =>
    `Hi ${v.customer_name}, a reminder that we'll pick you up at ${v.pickup} on ${v.date} at ${v.time} (booking ${v.booking_reference}).`,
  payment_reminder: (v) =>
    `Hi ${v.customer_name}, invoice ${v.invoice_number} for ${v.balance_due} is due ${v.due_date}. Let us know if you have any questions.`,
  receipt: (v) => `Hi ${v.customer_name}, thanks for your payment of ${v.amount_paid}. Receipt: ${v.receipt_number}.`,
  post_trip_follow_up: (v) => `Hi ${v.customer_name}, thank you for travelling with us on ${v.booking_reference}. We hope it went well!`,
};

/** Normalizes to digits-only with a leading country code, as wa.me requires. */
function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, "").replace(/^\+/, "");
}

export function buildWhatsAppLink(templateKey: WhatsAppTemplateKey, phone: string, vars: Record<string, string>): string {
  const message = MESSAGES[templateKey](vars);
  return `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(message)}`;
}
