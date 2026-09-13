import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_OPS } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { BookingForm } from "@/components/admin/bookings/BookingForm";
import { createBooking } from "@/lib/admin/actions/bookings";

export const metadata: Metadata = { title: "New booking" };

export default async function NewBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ customer_id?: string; lead_id?: string }>;
}) {
  await requireRole(MANAGE_OPS);
  const { customer_id, lead_id } = await searchParams;

  let customerLabel: string | undefined;
  let leadDefaults: { pickup?: string; dropoff?: string; trip_date?: string; trip_time?: string; passengers?: number } = {};

  if (customer_id || lead_id) {
    const supabase = await createClient();
    if (customer_id) {
      const { data } = await supabase.from("customers").select("full_name, phone, email").eq("id", customer_id).maybeSingle();
      if (data) customerLabel = `${data.full_name}${data.phone ? ` · ${data.phone}` : data.email ? ` · ${data.email}` : ""}`;
    }
    if (lead_id) {
      const { data: lead } = await supabase
        .from("leads")
        .select("pickup, dropoff, trip_date, trip_time, passengers")
        .eq("id", lead_id)
        .maybeSingle();
      if (lead) {
        leadDefaults = {
          pickup: lead.pickup ?? undefined,
          dropoff: lead.dropoff ?? undefined,
          trip_date: lead.trip_date ?? undefined,
          trip_time: lead.trip_time ?? undefined,
          passengers: lead.passengers ?? undefined,
        };
      }
    }
  }

  return (
    <div>
      <PageHeader title="New booking" />
      <Card className="p-6">
        <BookingForm action={createBooking} submitLabel="Create booking" defaults={{ customer_id, customer_label: customerLabel, ...leadDefaults }} />
      </Card>
    </div>
  );
}
