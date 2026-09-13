import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Download } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { canManageCrm } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { QuotationForm } from "@/components/admin/quotations/QuotationForm";
import {
  updateQuotation,
  sendQuotation,
  markQuotationAccepted,
  markQuotationRejected,
  duplicateQuotation,
  convertQuotationToBooking,
} from "@/lib/admin/actions/quotations";

export const metadata: Metadata = { title: "Quotation" };

export default async function QuotationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await requireUser();
  const supabase = await createClient();

  const { data: quotation } = await supabase
    .from("quotations")
    .select("*, customers(id, full_name, phone, email), vehicles(id, name), drivers(id, full_name), quotation_items(*)")
    .eq("id", id)
    .maybeSingle();
  if (!quotation) notFound();

  const canEdit = canManageCrm(profile.role);
  const items = ((quotation as any).quotation_items ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order);
  const { data: services } = canEdit
    ? await supabase.from("services").select("id, name, default_price, currency").eq("is_active", true).order("sort_order")
    : { data: null };

  return (
    <div>
      <PageHeader
        title={quotation.quotation_number}
        description={(quotation as any).customers?.full_name}
        actions={
          <div className="flex items-center gap-2">
            <StatusBadge status={quotation.status} />
            <Link
              href={`/admin/quotations/${id}/pdf`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-white"
            >
              <Download className="h-4 w-4" /> PDF
            </Link>
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Section title="Quotation">
            <div className="p-4">
              {canEdit ? (
                <QuotationForm
                  action={updateQuotation.bind(null, id)}
                  submitLabel="Save changes"
                  services={services ?? undefined}
                  defaults={{
                    customer_id: (quotation as any).customers?.id,
                    customer_label: (quotation as any).customers?.full_name,
                    pickup: quotation.pickup ?? undefined,
                    dropoff: quotation.dropoff ?? undefined,
                    trip_date: quotation.trip_date ?? undefined,
                    trip_time: quotation.trip_time ?? undefined,
                    passengers: quotation.passengers ?? undefined,
                    luggage: quotation.luggage ?? undefined,
                    vehicle_id: (quotation as any).vehicles?.id,
                    vehicle_label: (quotation as any).vehicles?.name,
                    driver_id: (quotation as any).drivers?.id,
                    driver_label: (quotation as any).drivers?.full_name,
                    discount: Number(quotation.discount),
                    tax_rate: Number(quotation.tax_rate),
                    currency: quotation.currency,
                    valid_until: quotation.valid_until ?? undefined,
                    payment_terms: quotation.payment_terms ?? undefined,
                    terms_and_conditions: quotation.terms_and_conditions ?? undefined,
                    internal_notes: quotation.internal_notes ?? undefined,
                    items: items.map((i: any) => ({
                      description: i.description,
                      quantity: Number(i.quantity),
                      unit_price: Number(i.unit_price),
                      service_id: i.service_id ?? undefined,
                    })),
                  }}
                />
              ) : (
                <p className="text-sm text-admin-stone">You don&apos;t have permission to edit quotations.</p>
              )}
            </div>
          </Section>
        </div>

        {canEdit ? (
          <div className="space-y-4">
            <Section title="Actions">
              <div className="p-4 space-y-2">
                {quotation.status === "DRAFT" || quotation.status === "SENT" ? (
                  <form action={sendQuotation.bind(null, id)}>
                    <button type="submit" className="w-full text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-admin-ivory-deep">
                      Mark as sent
                    </button>
                  </form>
                ) : null}
                {quotation.status !== "ACCEPTED" && quotation.status !== "CONVERTED" ? (
                  <form action={markQuotationAccepted.bind(null, id)}>
                    <button type="submit" className="w-full text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-admin-ivory-deep">
                      Mark as accepted
                    </button>
                  </form>
                ) : null}
                {quotation.status !== "REJECTED" && quotation.status !== "CONVERTED" ? (
                  <form action={markQuotationRejected.bind(null, id)}>
                    <button type="submit" className="w-full text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-admin-ivory-deep">
                      Mark as rejected
                    </button>
                  </form>
                ) : null}
                <form action={duplicateQuotation.bind(null, id)}>
                  <button type="submit" className="w-full text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-admin-ivory-deep">
                    Duplicate
                  </button>
                </form>
                {quotation.status !== "CONVERTED" ? (
                  <form action={convertQuotationToBooking.bind(null, id)}>
                    <button type="submit" className="w-full text-sm bg-admin-navy text-admin-ivory px-3 py-2 rounded-sm hover:bg-admin-navy-deep">
                      Convert to booking
                    </button>
                  </form>
                ) : (
                  <p className="text-xs text-admin-stone">Already converted to a booking.</p>
                )}
              </div>
            </Section>
          </div>
        ) : null}
      </div>
    </div>
  );
}
