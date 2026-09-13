import Link from "next/link";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_FINANCE } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { StatCard } from "@/components/admin/ui/Card";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import { sendPaymentReminder } from "@/lib/admin/actions/receivables";

export const metadata: Metadata = { title: "Accounts receivable" };

type Bucket = "CURRENT" | "DUE_SOON" | "OVERDUE";

function bucketFor(dueDate: string): Bucket {
  const days = Math.floor((new Date(dueDate).getTime() - Date.now()) / 86_400_000);
  if (days < 0) return "OVERDUE";
  if (days <= 7) return "DUE_SOON";
  return "CURRENT";
}

export default async function ReceivablesPage() {
  await requireRole(MANAGE_FINANCE);
  const supabase = await createClient();

  const { data: invoices } = await supabase
    .from("invoices")
    .select("id, invoice_number, created_at, due_date, total, amount_paid, balance_due, currency, customers(id, full_name)")
    .in("status", ["SENT", "PARTIALLY_PAID", "OVERDUE"])
    .is("deleted_at", null)
    .order("due_date", { ascending: true });

  const rows = (invoices ?? []).map((i) => ({ ...i, bucket: bucketFor(i.due_date ?? new Date().toISOString()) }));
  const totalOutstanding = rows.reduce((s, i) => s + Number(i.balance_due), 0);
  const overdueTotal = rows.filter((r) => r.bucket === "OVERDUE").reduce((s, i) => s + Number(i.balance_due), 0);
  const dueSoonTotal = rows.filter((r) => r.bucket === "DUE_SOON").reduce((s, i) => s + Number(i.balance_due), 0);

  return (
    <div>
      <PageHeader title="Accounts receivable" description="Every unpaid or partially paid invoice, categorized by how close it is to (or past) its due date." />

      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <StatCard label="Total outstanding" value={formatCurrency(totalOutstanding)} />
        <StatCard label="Due soon (≤7 days)" value={formatCurrency(dueSoonTotal)} />
        <StatCard label="Overdue" value={formatCurrency(overdueTotal)} />
      </div>

      <Card>
        {rows.length === 0 ? (
          <EmptyState title="Nothing outstanding" description="Every invoice is either paid or in draft." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-admin-stone border-b border-admin-line">
                  <th className="px-4 py-2.5 font-medium">Customer</th>
                  <th className="px-4 py-2.5 font-medium">Invoice</th>
                  <th className="px-4 py-2.5 font-medium">Due date</th>
                  <th className="px-4 py-2.5 font-medium text-right">Total</th>
                  <th className="px-4 py-2.5 font-medium text-right">Paid</th>
                  <th className="px-4 py-2.5 font-medium text-right">Balance</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-line">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-admin-ivory-deep">
                    <td className="px-4 py-2.5">
                      <Link href={`/admin/customers/${(r as any).customers?.id}`} className="text-admin-ink hover:underline">
                        {(r as any).customers?.full_name ?? "—"}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5">
                      <Link href={`/admin/invoices/${r.id}`} className="text-admin-gold hover:underline">
                        {r.invoice_number}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5">{formatDate(r.due_date)}</td>
                    <td className="px-4 py-2.5 text-right">{formatCurrency(r.total, r.currency)}</td>
                    <td className="px-4 py-2.5 text-right text-admin-stone">{formatCurrency(r.amount_paid, r.currency)}</td>
                    <td className="px-4 py-2.5 text-right font-medium">{formatCurrency(r.balance_due, r.currency)}</td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          r.bucket === "OVERDUE"
                            ? "bg-red-50 text-red-700"
                            : r.bucket === "DUE_SOON"
                              ? "bg-admin-gold-pale/40 text-admin-gold"
                              : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {r.bucket.replaceAll("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <form action={sendPaymentReminder.bind(null, r.id)}>
                        <button type="submit" className="text-xs text-admin-gold hover:underline">
                          Send reminder
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
