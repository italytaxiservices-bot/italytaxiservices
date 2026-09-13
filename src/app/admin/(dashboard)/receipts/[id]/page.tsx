import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Download } from "lucide-react";
import { requireRole } from "@/lib/auth/dal";
import { VIEW_FINANCE } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import { buildWhatsAppLink } from "@/lib/notifications/whatsapp";

export const metadata: Metadata = { title: "Receipt" };

export default async function ReceiptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireRole(VIEW_FINANCE);
  const supabase = await createClient();

  const { data: receipt } = await supabase
    .from("receipts")
    .select("*, customers(id, full_name, phone), invoices(id, invoice_number), bookings(id, booking_reference)")
    .eq("id", id)
    .maybeSingle();
  if (!receipt) notFound();
  const customer = (receipt as any).customers;

  return (
    <div>
      <PageHeader
        title={receipt.receipt_number}
        description={customer?.full_name}
        actions={
          <div className="flex items-center gap-2">
            {customer?.phone ? (
              <a
                href={buildWhatsAppLink("receipt", customer.phone, {
                  customer_name: customer.full_name ?? "",
                  amount_paid: formatCurrency(receipt.amount),
                  receipt_number: receipt.receipt_number,
                })}
                target="_blank"
                rel="noreferrer"
                className="text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-white"
              >
                Send via WhatsApp
              </a>
            ) : null}
            <Link href={`/admin/receipts/${id}/pdf`} target="_blank" className="inline-flex items-center gap-1.5 text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-white">
              <Download className="h-4 w-4" /> PDF
            </Link>
          </div>
        }
      />

      <Card className="p-6 max-w-lg space-y-3 text-sm">
        <Row label="Amount paid" value={formatCurrency(receipt.amount)} />
        <Row label="Method" value={receipt.method.replaceAll("_", " ")} />
        <Row label="Payment date" value={formatDate(receipt.payment_date)} />
        <Row label="Remaining balance" value={formatCurrency(receipt.remaining_balance)} />
        {(receipt as any).invoices ? (
          <Row
            label="Invoice"
            value={
              <Link href={`/admin/invoices/${(receipt as any).invoices.id}`} className="text-admin-gold hover:underline">
                {(receipt as any).invoices.invoice_number}
              </Link>
            }
          />
        ) : null}
        {(receipt as any).bookings ? (
          <Row
            label="Booking"
            value={
              <Link href={`/admin/bookings/${(receipt as any).bookings.id}`} className="text-admin-gold hover:underline">
                {(receipt as any).bookings.booking_reference}
              </Link>
            }
          />
        ) : null}
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-admin-line pb-2">
      <span className="text-admin-stone">{label}</span>
      <span className="font-medium text-admin-ink">{value}</span>
    </div>
  );
}
