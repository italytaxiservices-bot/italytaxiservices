import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { getCompanySettings } from "@/lib/pdf/company";
import { BusinessDocument } from "@/lib/pdf/BusinessDocument";
import { formatDate } from "@/lib/admin/format";
import type { Database } from "@/lib/supabase/types";

/**
 * Builds the invoice PDF's React element without rendering it — shared by
 * the admin /pdf route (renders to an HTTP response) and markInvoiceSent
 * (renders to a Buffer for an email attachment), so the two never drift.
 * Accepts an optional client so a future cron-context caller — no user
 * session — can pass the admin/service-role client explicitly.
 */
export async function getInvoicePdfDocument(invoiceId: string, supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? (await createClient());

  const { data: invoice } = await supabase
    .from("invoices")
    .select("*, customers(full_name, email, phone, company_name, billing_address), invoice_items(*)")
    .eq("id", invoiceId)
    .maybeSingle();
  if (!invoice) return null;

  const company = await getCompanySettings(supabase);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customer = (invoice as any).customers;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = ((invoice as any).invoice_items ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order);

  const element = (
    <BusinessDocument
      company={company}
      documentTitle="Invoice"
      documentNumber={invoice.invoice_number}
      statusLabel={invoice.status}
      currency={invoice.currency}
      customer={{
        name: customer?.full_name ?? "—",
        email: customer?.email,
        phone: customer?.phone,
        company: customer?.company_name,
        billingAddress: customer?.billing_address,
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meta={[invoice.due_date ? { label: "Due date", value: formatDate(invoice.due_date) } : null].filter(Boolean) as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items={items.map((i: any) => ({ description: i.description, quantity: Number(i.quantity), unitPrice: Number(i.unit_price), amount: Number(i.amount) }))}
      totals={{
        subtotal: Number(invoice.subtotal),
        discount: Number(invoice.discount),
        taxAmount: Number(invoice.tax_amount),
        total: Number(invoice.total),
        amountPaid: Number(invoice.amount_paid),
        balanceDue: Number(invoice.balance_due),
      }}
      paymentTerms={invoice.payment_terms}
      termsAndConditions={invoice.terms_and_conditions}
    />
  );

  return { element, filename: `${invoice.invoice_number}.pdf`, invoice, customer };
}
