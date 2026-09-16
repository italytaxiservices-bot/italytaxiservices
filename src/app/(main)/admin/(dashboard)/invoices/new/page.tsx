import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_FINANCE } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { InvoiceForm } from "@/components/admin/invoices/InvoiceForm";

export const metadata: Metadata = { title: "New invoice" };

export default async function NewInvoicePage({
  searchParams,
}: {
  searchParams: Promise<{ customer_id?: string; booking_id?: string }>;
}) {
  await requireRole(MANAGE_FINANCE);
  const { customer_id, booking_id } = await searchParams;

  let customerLabel: string | undefined;
  let bookingLabel: string | undefined;

  if (customer_id || booking_id) {
    const supabase = await createClient();
    if (customer_id) {
      const { data } = await supabase.from("customers").select("full_name, phone, email").eq("id", customer_id).maybeSingle();
      if (data) customerLabel = `${data.full_name}${data.phone ? ` · ${data.phone}` : data.email ? ` · ${data.email}` : ""}`;
    }
    if (booking_id) {
      const { data } = await supabase.from("bookings").select("booking_reference, pickup, dropoff").eq("id", booking_id).maybeSingle();
      if (data) bookingLabel = `${data.booking_reference} · ${data.pickup} → ${data.dropoff}`;
    }
  }

  return (
    <div>
      <PageHeader title="New invoice" description="For a manual/standalone invoice. Booking-linked invoices are usually created automatically when a booking is confirmed." />
      <Card className="p-6">
        <InvoiceForm defaultCustomerId={customer_id} defaultCustomerLabel={customerLabel} defaultBookingId={booking_id} defaultBookingLabel={bookingLabel} />
      </Card>
    </div>
  );
}
