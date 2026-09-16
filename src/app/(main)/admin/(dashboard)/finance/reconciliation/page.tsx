import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_FINANCE } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import { reconcilePayment } from "@/lib/admin/actions/reconciliation";

export const metadata: Metadata = { title: "Payment reconciliation" };

const STATUSES = ["UNMATCHED", "MATCHED", "PARTIALLY_MATCHED", "DISPUTED"] as const;
type ReconciliationStatus = (typeof STATUSES)[number];

export default async function ReconciliationPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireRole(MANAGE_FINANCE);
  const { status } = await searchParams;
  const filter: ReconciliationStatus = STATUSES.includes(status as ReconciliationStatus) ? (status as ReconciliationStatus) : "UNMATCHED";

  const supabase = await createClient();
  const { data: payments } = await supabase
    .from("payments")
    .select("id, amount, currency, payment_date, method, reconciliation_status, external_reference, reconciliation_notes, invoices(invoice_number), customers(full_name)")
    .eq("reconciliation_status", filter)
    .is("deleted_at", null)
    .order("payment_date", { ascending: false })
    .limit(100);

  return (
    <div>
      <PageHeader
        title="Payment reconciliation"
        description="Manual reconciliation against your bank statement — no live bank feed is connected. Match a recorded payment to a statement line and record the reference."
      />

      <form className="flex gap-2 mb-4">
        <select name="status" defaultValue={filter} className="input-luxe max-w-[220px]">
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replaceAll("_", " ")}
            </option>
          ))}
        </select>
        <button type="submit" className="border border-admin-line px-4 py-2 rounded-sm text-sm hover:bg-white">
          Filter
        </button>
      </form>

      <Card>
        {!payments || payments.length === 0 ? (
          <EmptyState title={`No ${filter?.toLowerCase().replaceAll("_", " ")} payments`} />
        ) : (
          <ul className="divide-y divide-admin-line">
            {payments.map((p) => (
              <li key={p.id} className="px-4 py-3">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="text-sm font-medium text-admin-ink">
                      {(p as any).customers?.full_name ?? "—"} · {(p as any).invoices?.invoice_number ?? "—"}
                    </p>
                    <p className="text-xs text-admin-stone">
                      {formatDate(p.payment_date)} · {p.method}
                      {p.external_reference ? ` · ref: ${p.external_reference}` : ""}
                    </p>
                    {p.reconciliation_notes ? <p className="text-xs text-admin-stone mt-1">{p.reconciliation_notes}</p> : null}
                  </div>
                  <div className="text-right shrink-0">
                    <StatusBadge status={p.reconciliation_status} />
                    <p className="text-sm font-medium mt-1">{formatCurrency(p.amount, p.currency)}</p>
                  </div>
                </div>
                <form action={reconcilePayment.bind(null, p.id)} className="flex flex-wrap items-center gap-2">
                  <select name="reconciliation_status" defaultValue={p.reconciliation_status} className="input-luxe text-xs py-1 w-auto">
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.replaceAll("_", " ")}
                      </option>
                    ))}
                  </select>
                  <input name="external_reference" placeholder="Statement reference" defaultValue={p.external_reference ?? ""} className="input-luxe text-xs py-1 w-40" />
                  <input name="reconciliation_notes" placeholder="Notes" defaultValue={p.reconciliation_notes ?? ""} className="input-luxe text-xs py-1 w-40" />
                  <button type="submit" className="text-xs bg-admin-navy text-admin-ivory px-3 py-1 rounded-sm hover:bg-admin-navy-deep">
                    Save
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
