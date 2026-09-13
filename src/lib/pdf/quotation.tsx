import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { getCompanySettings } from "@/lib/pdf/company";
import { BusinessDocument } from "@/lib/pdf/BusinessDocument";
import { formatDate, formatTime } from "@/lib/admin/format";
import type { Database } from "@/lib/supabase/types";

/**
 * Builds the quotation PDF's React element without rendering it — shared by
 * the admin /pdf route (renders to an HTTP response), sendQuotation, and the
 * quotation-reminders cron (both render to a Buffer for an email
 * attachment), so none of them ever drift. Accepts an optional client so the
 * cron route — which has no user session — can pass the admin/service-role
 * client explicitly instead of the default cookie-based one.
 */
export async function getQuotationPdfDocument(quotationId: string, supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? (await createClient());

  const { data: quotation } = await supabase
    .from("quotations")
    .select("*, customers(full_name, email, phone, company_name, billing_address), quotation_items(*)")
    .eq("id", quotationId)
    .maybeSingle();
  if (!quotation) return null;

  const company = await getCompanySettings(supabase);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customer = (quotation as any).customers;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = ((quotation as any).quotation_items ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order);

  const element = (
    <BusinessDocument
      company={company}
      documentTitle="Quotation"
      documentNumber={quotation.quotation_number}
      statusLabel={quotation.status}
      currency={quotation.currency}
      customer={{
        name: customer?.full_name ?? "—",
        email: customer?.email,
        phone: customer?.phone,
        company: customer?.company_name,
        billingAddress: customer?.billing_address,
      }}
      meta={[
        quotation.trip_date ? { label: "Trip date", value: `${formatDate(quotation.trip_date)} ${formatTime(quotation.trip_time)}` } : null,
        quotation.pickup ? { label: "Pickup", value: quotation.pickup } : null,
        quotation.dropoff ? { label: "Drop-off", value: quotation.dropoff } : null,
        quotation.valid_until ? { label: "Valid until", value: formatDate(quotation.valid_until) } : null,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ].filter(Boolean) as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items={items.map((i: any) => ({ description: i.description, quantity: Number(i.quantity), unitPrice: Number(i.unit_price), amount: Number(i.amount) }))}
      totals={{
        subtotal: Number(quotation.subtotal),
        discount: Number(quotation.discount),
        taxAmount: Number(quotation.tax_amount),
        total: Number(quotation.total),
      }}
      paymentTerms={quotation.payment_terms}
      termsAndConditions={quotation.terms_and_conditions}
    />
  );

  return { element, filename: `${quotation.quotation_number}.pdf`, quotation, customer };
}
