import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { getCompanySettings } from "@/lib/pdf/company";
import { BusinessDocument } from "@/lib/pdf/BusinessDocument";
import { pdfResponse } from "@/lib/pdf/render";
import { formatDate, formatTime } from "@/lib/admin/format";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const { id } = await params;
  const supabase = await createClient();

  const { data: booking } = await supabase
    .from("bookings")
    .select("*, customers(full_name, email, phone, company_name, billing_address), vehicles(name), drivers(full_name, phone)")
    .eq("id", id)
    .maybeSingle();
  if (!booking) notFound();

  const company = await getCompanySettings();
  const customer = (booking as any).customers;
  const vehicle = (booking as any).vehicles;
  const driver = (booking as any).drivers;

  const doc = (
    <BusinessDocument
      company={company}
      documentTitle="Booking Confirmation"
      documentNumber={booking.booking_reference}
      statusLabel={booking.status}
      currency={booking.currency}
      customer={{
        name: customer?.full_name ?? "—",
        email: customer?.email,
        phone: customer?.phone,
        company: customer?.company_name,
        billingAddress: customer?.billing_address,
      }}
      meta={[
        { label: "Trip date", value: `${formatDate(booking.trip_date)} ${formatTime(booking.trip_time)}` },
        { label: "Pickup", value: booking.pickup },
        { label: "Drop-off", value: booking.dropoff },
        booking.flight_number ? { label: "Flight number", value: booking.flight_number } : null,
        { label: "Vehicle", value: vehicle?.name ?? "To be confirmed" },
        { label: "Driver", value: driver ? `${driver.full_name}${driver.phone ? ` · ${driver.phone}` : ""}` : "To be confirmed" },
      ].filter(Boolean) as any}
      totals={{ total: Number(booking.total) }}
    />
  );

  return pdfResponse(doc, `${booking.booking_reference}-confirmation.pdf`);
}
