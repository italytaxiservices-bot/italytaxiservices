import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Download } from "lucide-react";
import { requireRole } from "@/lib/auth/dal";
import { canManageFinance, VIEW_FINANCE } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { SimpleTable } from "@/components/admin/ui/SimpleTable";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { RecordPaymentForm } from "@/components/admin/invoices/RecordPaymentForm";
import { ConfirmButton } from "@/components/admin/ui/ConfirmButton";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import { markInvoiceSent, voidInvoice, recordPayment } from "@/lib/admin/actions/invoices";
import { requestRefund, approveRefund, processRefund } from "@/lib/admin/actions/refunds";
import { InternalNotes } from "@/components/admin/notes/InternalNotes";
import { buildWhatsAppLink } from "@/lib/notifications/whatsapp";

export const metadata: Metadata = { title: "Invoice" };

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await requireRole(VIEW_FINANCE);
  const supabase = await createClient();

  const { data: invoice } = await supabase
    .from("invoices")
    .select("*, customers(id, full_name, phone), bookings(id, booking_reference), invoice_items(*)")
    .eq("id", id)
    .maybeSingle();
  if (!invoice) notFound();

  const [{ data: payments }, { data: refunds }] = await Promise.all([
    supabase
      .from("payments")
      .select("id, amount, currency, method, payment_date, reference_number")
      .eq("invoice_id", id)
      .is("deleted_at", null)
      .order("payment_date", { ascending: false }),
    supabase.from("refunds").select("*").eq("invoice_id", id).order("created_at", { ascending: false }),
  ]);

  const canEdit = canManageFinance(profile.role);
  const items = ((invoice as any).invoice_items ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order);

  return (
    <div>
      <PageHeader
        title={invoice.invoice_number}
        description={(invoice as any).customers?.full_name}
        actions={
          <div className="flex items-center gap-2">
            <StatusBadge status={invoice.status} />
            <Link href={`/admin/invoices/${id}/pdf`} target="_blank" className="inline-flex items-center gap-1.5 text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-white">
              <Download className="h-4 w-4" /> PDF
            </Link>
          </div>
        }
      />

      {(invoice as any).bookings ? (
        <Link href={`/admin/bookings/${(invoice as any).bookings.id}`} className="inline-block mb-4 text-sm text-admin-gold hover:underline">
          View booking {(invoice as any).bookings.booking_reference} →
        </Link>
      ) : null}

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Section title="Line items">
            <SimpleTable
              rows={items}
              emptyTitle="No line items"
              columns={[
                { header: "Description", cell: (i: any) => i.description },
                { header: "Qty", cell: (i: any) => i.quantity },
                { header: "Unit price", cell: (i: any) => formatCurrency(i.unit_price, invoice.currency) },
                { header: "Amount", cell: (i: any) => formatCurrency(i.amount, invoice.currency) },
              ]}
            />
            <div className="p-4 ml-auto max-w-xs space-y-1 text-sm border-t border-admin-line">
              <Row label="Subtotal" value={formatCurrency(invoice.subtotal, invoice.currency)} />
              <Row label="Discount" value={`-${formatCurrency(invoice.discount, invoice.currency)}`} />
              <Row label="Tax" value={formatCurrency(invoice.tax_amount, invoice.currency)} />
              <Row label="Total" value={formatCurrency(invoice.total, invoice.currency)} strong />
              <Row label="Paid" value={formatCurrency(invoice.amount_paid, invoice.currency)} />
              <Row label="Balance due" value={formatCurrency(invoice.balance_due, invoice.currency)} strong />
            </div>
          </Section>

          <Section title="Payment history">
            <SimpleTable
              rows={payments ?? []}
              emptyTitle="No payments recorded yet"
              columns={[
                { header: "Date", cell: (p: any) => formatDate(p.payment_date) },
                { header: "Amount", cell: (p: any) => formatCurrency(p.amount, p.currency) },
                { header: "Method", cell: (p: any) => p.method.replaceAll("_", " ") },
                { header: "Reference", cell: (p: any) => p.reference_number ?? "—" },
              ]}
            />
          </Section>
        </div>

        {canEdit ? (
          <div className="space-y-4">
            <Section title="Record payment">
              <RecordPaymentForm action={recordPayment.bind(null, id)} balanceDue={Number(invoice.balance_due)} currency={invoice.currency} />
            </Section>

            {payments && payments.length > 0 ? (
              <Section title="Refunds">
                <div className="p-4 space-y-3">
                  {(refunds ?? []).map((r) => (
                    <div key={r.id} className="border border-admin-line rounded-sm p-3 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-admin-ink">
                          {formatCurrency(r.amount, r.currency)} · {r.refund_type}
                        </span>
                        <StatusBadge status={r.status} />
                      </div>
                      <p className="text-admin-stone">{r.reason}</p>
                      {r.refund_reference ? <p className="text-admin-stone">Ref: {r.refund_reference}</p> : null}
                      {r.status === "PENDING" ? (
                        <form action={approveRefund.bind(null, r.id, id)}>
                          <button type="submit" className="text-xs border border-admin-line px-2 py-1 rounded-sm hover:bg-admin-ivory-deep">
                            Approve
                          </button>
                        </form>
                      ) : null}
                      {r.status === "APPROVED" ? (
                        <form action={processRefund.bind(null, r.id, id)} className="flex items-center gap-1.5">
                          <input name="refund_reference" placeholder="Refund reference" required className="input-luxe text-xs py-1" />
                          <button type="submit" className="text-xs bg-admin-navy text-admin-ivory px-2 py-1 rounded-sm hover:bg-admin-navy-deep shrink-0">
                            Process
                          </button>
                        </form>
                      ) : null}
                    </div>
                  ))}

                  <form action={requestRefund.bind(null, id)} className="space-y-2 border-t border-admin-line pt-3">
                    <select name="payment_id" required className="input-luxe text-xs">
                      {payments.map((p) => (
                        <option key={p.id} value={p.id}>
                          {formatCurrency(p.amount, p.currency)} paid {formatDate(p.payment_date)}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-1.5">
                      <input type="number" name="amount" min={0.01} step="0.01" placeholder="Amount" required className="input-luxe text-xs" />
                      <select name="refund_type" className="input-luxe text-xs w-24">
                        <option value="FULL">Full</option>
                        <option value="PARTIAL">Partial</option>
                      </select>
                    </div>
                    <input name="reason" placeholder="Reason" required className="input-luxe text-xs" />
                    <button type="submit" className="w-full text-xs border border-admin-line px-3 py-1.5 rounded-sm hover:bg-admin-ivory-deep">
                      Request refund
                    </button>
                  </form>
                </div>
              </Section>
            ) : null}

            <Section title="Actions">
              <div className="p-4 space-y-2">
                {invoice.status === "DRAFT" ? (
                  <form action={markInvoiceSent.bind(null, id)}>
                    <button type="submit" className="w-full text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-admin-ivory-deep">
                      Mark as sent
                    </button>
                  </form>
                ) : null}
                {invoice.status !== "VOID" && invoice.status !== "PAID" ? (
                  <form action={voidInvoice.bind(null, id)}>
                    <ConfirmButton
                      confirmMessage={`Void invoice ${invoice.invoice_number}? This can't be undone.`}
                      className="w-full text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-red-50 hover:text-red-700"
                    >
                      Void invoice
                    </ConfirmButton>
                  </form>
                ) : null}
              </div>
            </Section>

            {(invoice as any).customers?.phone && Number(invoice.balance_due) > 0 ? (
              <Section title="WhatsApp">
                <div className="p-4">
                  <a
                    href={buildWhatsAppLink("payment_reminder", (invoice as any).customers.phone, {
                      customer_name: (invoice as any).customers.full_name ?? "",
                      invoice_number: invoice.invoice_number,
                      balance_due: formatCurrency(invoice.balance_due, invoice.currency),
                      due_date: formatDate(invoice.due_date),
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-admin-ivory-deep"
                  >
                    Send payment reminder
                  </a>
                </div>
              </Section>
            ) : null}

            <Section title="Internal notes">
              <div className="p-4">
                <InternalNotes entityType="invoice" entityId={id} />
              </div>
            </Section>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${strong ? "font-semibold text-admin-ink" : "text-admin-stone"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
