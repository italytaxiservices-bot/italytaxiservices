import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { createAdminClient } from "@/lib/supabase/admin";
import { notifyCustomer } from "@/lib/notifications/service";
import { formatDate, formatTime } from "@/lib/admin/format";
import { verifyRecaptcha } from "@/lib/recaptcha";

const REQUIRED_FIELDS = ["pickup", "destination", "date", "time", "passengers", "name", "contact"] as const;
// Must match the action name QuoteForm passes to grecaptcha.execute().
const RECAPTCHA_ACTION = "submit_booking";
const RECAPTCHA_FAILURE_MESSAGE = "Please verify your request and try again.";

/**
 * Records the public enquiry as a CRM lead. Uses the service-role client
 * because this is an unauthenticated route — there's no signed-in staff
 * session for RLS to key off, and a public lead is exactly the kind of
 * "operation that must cross the RLS boundary by design" the admin client
 * exists for (see lib/supabase/admin.ts). Best-effort: a failure here must
 * never take down the booking form, since the email above is already the
 * primary, working notification path.
 */
async function recordLead(data: Record<string, string>): Promise<string | null> {
  try {
    const supabase = createAdminClient();
    const isEmail = data.contact.includes("@");

    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        // Filled in by the assign_lead_number trigger — deliberately omitted
        // at runtime (undefined is dropped by JSON.stringify) so the trigger's
        // `if new.lead_number is null` check fires.
        lead_number: undefined!,
        full_name: data.name,
        email: isEmail ? data.contact : null,
        phone: isEmail ? null : data.contact,
        source: "WEBSITE",
        pickup: data.pickup,
        dropoff: data.destination,
        trip_date: data.date || null,
        trip_time: data.time || null,
        passengers: Number(data.passengers) || null,
        notes: [
          data.tripType ? `Trip type: ${data.tripType}` : null,
          data.returnDate ? `Return date: ${data.returnDate}` : null,
          data.returnTime ? `Return time: ${data.returnTime}` : null,
          data.vehicle ? `Preferred vehicle: ${data.vehicle}` : null,
          data.requirements || null,
        ]
          .filter(Boolean)
          .join("\n") || null,
      })
      .select("id")
      .single();
    if (error) throw error;
    return lead.id;
  } catch (err) {
    console.error("Failed to record lead from public booking form", err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: silently succeed so bots get no signal their submission was rejected.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const recaptchaOk = await verifyRecaptcha(data.recaptchaToken, RECAPTCHA_ACTION, {
    userAgent: req.headers.get("user-agent") || undefined,
    userIpAddress: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  });
  if (!recaptchaOk) {
    return NextResponse.json(
      { ok: false, error: RECAPTCHA_FAILURE_MESSAGE, code: "recaptcha_failed" },
      { status: 400 }
    );
  }

  for (const field of REQUIRED_FIELDS) {
    if (!data[field] || !data[field].trim()) {
      return NextResponse.json({ ok: false, error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  const from = process.env.MAIL_FROM_BOOKING || process.env.GMAIL_USER;
  const to = process.env.MAIL_TO_BOOKING;

  if (!from || !to) {
    console.error("Booking email not configured: missing MAIL_FROM_BOOKING/MAIL_TO_BOOKING env vars");
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }

  const subject = `New Booking Request — ${data.pickup} → ${data.destination}`;
  const text = [
    `Trip type: ${data.tripType || "-"}`,
    `Pickup: ${data.pickup}`,
    `Destination: ${data.destination}`,
    `Date: ${data.date}`,
    `Time: ${data.time}`,
    ...(data.returnDate ? [`Return date: ${data.returnDate}`] : []),
    ...(data.returnTime ? [`Return time: ${data.returnTime}`] : []),
    `Passengers: ${data.passengers}`,
    `Vehicle: ${data.vehicle || "-"}`,
    `Special requirements: ${data.requirements || "-"}`,
    "",
    `Name: ${data.name}`,
    `Contact: ${data.contact}`,
  ].join("\n");

  try {
    await sendMail({
      from: `"Italy Limo Service — Booking" <${from}>`,
      to,
      subject,
      text,
      replyTo: data.contact.includes("@") ? data.contact : undefined,
    });
  } catch (err) {
    console.error("Failed to send booking email", err);
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 502 });
  }

  const leadId = await recordLead(data);

  // Best-effort customer confirmation — a phone-only contact has no email
  // to send to, and any failure here must never fail the form submission
  // itself (the staff notification above is the primary, already-succeeded
  // path).
  if (leadId && data.contact.includes("@")) {
    try {
      await notifyCustomer({
        templateKey: "lead_received",
        to: data.contact,
        vars: {
          customer_name: data.name,
          pickup: data.pickup,
          dropoff: data.destination,
          date: formatDate(data.date),
          time: formatTime(data.time),
        },
        relatedEntityType: "lead",
        relatedEntityId: leadId,
      });
    } catch (err) {
      console.error("Failed to send lead_received confirmation", err);
    }
  }

  return NextResponse.json({ ok: true });
}
