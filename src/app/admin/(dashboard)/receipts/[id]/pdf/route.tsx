import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth/dal";
import { VIEW_FINANCE } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { getCompanySettings } from "@/lib/pdf/company";
import { BusinessDocument } from "@/lib/pdf/BusinessDocument";
import { pdfResponse } from "@/lib/pdf/render";
import { formatDate } from "@/lib/admin/format";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireRole(VIEW_FINANCE);
  const { id } = await params;
  const supabase = await createClient();

  const { data: receipt } = await supabase
    .from("receipts")
    .select("*, customers(full_name, email, phone, company_name, billing_address), invoices(invoice_number)")
    .eq("id", id)
    .maybeSingle();
  if (!receipt) notFound();

  const company = await getCompanySettings();
  const customer = (receipt as any).customers;

  const doc = (
    <BusinessDocument
      company={company}
      documentTitle="Receipt"
      documentNumber={receipt.receipt_number}
      currency={company.currency_default}
      customer={{
        name: customer?.full_name ?? "—",
        email: customer?.email,
        phone: customer?.phone,
        company: customer?.company_name,
        billingAddress: customer?.billing_address,
      }}
      meta={[
        { label: "Payment date", value: formatDate(receipt.payment_date) },
        { label: "Method", value: receipt.method.replaceAll("_", " ") },
        (receipt as any).invoices ? { label: "Invoice", value: (receipt as any).invoices.invoice_number } : null,
      ].filter(Boolean) as any}
      totals={{
        total: Number(receipt.amount),
        balanceDue: Number(receipt.remaining_balance),
      }}
    />
  );

  return pdfResponse(doc, `${receipt.receipt_number}.pdf`);
}
