import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { notifyCustomer } from "@/lib/notifications/service";
import { formatDate, formatTime } from "@/lib/admin/format";
import { isoDate } from "@/lib/admin/date-range";

// Intended to be hit by an external scheduler once daily. See
// app/api/cron/overdue-invoices/route.ts for the auth scheme.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data: createdCount, error } = await supabase.rpc("create_upcoming_trip_reminders", { p_days_ahead: 1 });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const tomorrow = isoDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const { data: trips } = await supabase
    .from("bookings")
    .select("id, booking_reference, pickup, dropoff, trip_date, trip_time, customers(full_name, email)")
    .in("status", ["CONFIRMED", "ASSIGNED"])
    .eq("trip_date", tomorrow)
    .is("deleted_at", null);

  let emailed = 0;
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  for (const trip of trips ?? []) {
    const customer = (trip as any).customers;
    if (!customer?.email) continue;

    const { data: recentNotification } = await supabase
      .from("notifications")
      .select("id")
      .eq("event_type", "upcoming_trip_reminder")
      .eq("related_entity_id", trip.id)
      .gte("created_at", oneDayAgo)
      .maybeSingle();
    if (recentNotification) continue;

    await notifyCustomer({
      templateKey: "upcoming_trip_reminder",
      to: customer.email,
      vars: {
        customer_name: customer.full_name ?? "",
        booking_reference: trip.booking_reference,
        pickup: trip.pickup,
        dropoff: trip.dropoff,
        date: formatDate(trip.trip_date),
        time: formatTime(trip.trip_time),
      },
      relatedEntityType: "booking",
      relatedEntityId: trip.id,
    });
    emailed++;
  }

  return NextResponse.json({ followUpsCreated: createdCount ?? 0, emailed });
}
