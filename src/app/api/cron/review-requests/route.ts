import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { notifyCustomer } from "@/lib/notifications/service";
import { siteConfig } from "@/lib/siteConfig";
import { isoDate } from "@/lib/admin/date-range";

// Intended to be hit by an external scheduler once daily. See
// app/api/cron/overdue-invoices/route.ts for the auth scheme.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const yesterday = isoDate(new Date(Date.now() - 24 * 60 * 60 * 1000));
  // Bounded lookback — completed trips older than this have long since
  // either gotten a review request or aged past the point of asking, so
  // there's no reason for this query to keep scanning the entire history
  // of the business every day.
  const thirtyDaysAgo = isoDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

  const { data: trips } = await supabase
    .from("bookings")
    .select("id, booking_reference, trip_date, customers(full_name, email)")
    .eq("status", "COMPLETED")
    .gte("trip_date", thirtyDaysAgo)
    .lte("trip_date", yesterday)
    .is("deleted_at", null);

  let emailed = 0;

  for (const trip of trips ?? []) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customer = (trip as any).customers;
    if (!customer?.email) continue;

    // One-time ask, never repeated — re-asking on a trip that already got a
    // request (answered or not) would just be spam.
    const { data: alreadyAsked } = await supabase
      .from("notifications")
      .select("id")
      .eq("event_type", "review_request")
      .eq("related_entity_id", trip.id)
      .maybeSingle();
    if (alreadyAsked) continue;

    const { data: existingReview } = await supabase.from("reviews").select("id").eq("booking_id", trip.id).maybeSingle();
    if (existingReview) continue;

    // "Booking complete" should mean the whole thing is settled, not just
    // the trip itself — if this booking has an invoice, wait until it's
    // actually paid before asking for a review. No invoice at all (e.g. an
    // off-books/cash job never invoiced) doesn't block the ask.
    const { data: invoice } = await supabase.from("invoices").select("status").eq("booking_id", trip.id).is("deleted_at", null).maybeSingle();
    if (invoice && invoice.status !== "PAID") continue;

    await notifyCustomer({
      templateKey: "review_request",
      to: customer.email,
      vars: {
        customer_name: customer.full_name ?? "",
        booking_reference: trip.booking_reference,
        review_link: `${siteConfig.domain}/my-login`,
        trustpilot_url: siteConfig.trustpilotUrl,
      },
      relatedEntityType: "booking",
      relatedEntityId: trip.id,
      bcc: process.env.TRUSTPILOT_BCC_EMAIL || undefined,
    });
    emailed++;
  }

  return NextResponse.json({ emailed });
}
