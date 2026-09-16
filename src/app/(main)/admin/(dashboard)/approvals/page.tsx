import Link from "next/link";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_FINANCE } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import { approveDiscountRequest, rejectDiscountRequest } from "@/lib/admin/actions/discounts";

export const metadata: Metadata = { title: "Approvals" };

/** Aggregates every PENDING/SUBMITTED item across the subsystems that have
 * their own approval lifecycle — reads only, no new table. Each row links
 * to the actual place the approval action lives (its own dedicated page
 * already has the correct permission checks and business logic). */
export default async function ApprovalsPage() {
  await requireRole(MANAGE_FINANCE);
  const supabase = await createClient();

  const [{ data: expenses }, { data: refunds }, { data: discounts }, { data: payouts }] = await Promise.all([
    supabase.from("expenses").select("id, category, amount, currency, expense_date, description").eq("status", "SUBMITTED").order("expense_date", { ascending: false }),
    supabase.from("refunds").select("id, amount, currency, reason, refund_type, created_at, customers(full_name)").eq("status", "PENDING").order("created_at", { ascending: false }),
    supabase.from("discount_requests").select("*").eq("status", "PENDING").order("created_at", { ascending: false }),
    supabase.from("driver_payouts").select("id, net_payout, currency, period_start, period_end, drivers(full_name)").eq("status", "PENDING").order("created_at", { ascending: false }),
  ]);

  const totalPending = (expenses?.length ?? 0) + (refunds?.length ?? 0) + (discounts?.length ?? 0) + (payouts?.length ?? 0);

  return (
    <div>
      <PageHeader title="Approvals" description={`${totalPending} item${totalPending === 1 ? "" : "s"} waiting on a decision.`} />

      <div className="grid lg:grid-cols-2 gap-4">
        <Section title={`Expenses (${expenses?.length ?? 0})`}>
          {!expenses || expenses.length === 0 ? (
            <EmptyState title="Nothing pending" />
          ) : (
            <ul className="divide-y divide-admin-line">
              {expenses.map((e) => (
                <li key={e.id} className="px-4 py-3 flex justify-between text-sm">
                  <div>
                    <p className="text-admin-ink">{e.category} · {formatDate(e.expense_date)}</p>
                    <p className="text-xs text-admin-stone">{e.description ?? "—"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(e.amount, e.currency)}</p>
                    <Link href="/admin/expenses" className="text-xs text-admin-gold hover:underline">
                      Review →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title={`Refunds (${refunds?.length ?? 0})`}>
          {!refunds || refunds.length === 0 ? (
            <EmptyState title="Nothing pending" />
          ) : (
            <ul className="divide-y divide-admin-line">
              {refunds.map((r) => (
                <li key={r.id} className="px-4 py-3 flex justify-between text-sm">
                  <div>
                    <p className="text-admin-ink">{(r as any).customers?.full_name ?? "—"} · {r.refund_type}</p>
                    <p className="text-xs text-admin-stone">{r.reason}</p>
                  </div>
                  <p className="font-medium">{formatCurrency(r.amount, r.currency)}</p>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title={`Discount requests (${discounts?.length ?? 0})`}>
          {!discounts || discounts.length === 0 ? (
            <EmptyState title="Nothing pending" />
          ) : (
            <ul className="divide-y divide-admin-line">
              {discounts.map((d) => (
                <li key={d.id} className="px-4 py-3 flex items-start justify-between text-sm gap-3">
                  <div>
                    <p className="text-admin-ink">
                      {d.entity_type} · {d.discount_percent}% (threshold {d.threshold_percent}%)
                    </p>
                    <p className="text-xs text-admin-stone">{d.reason}</p>
                    <div className="mt-1.5 flex gap-1.5">
                      <form action={approveDiscountRequest.bind(null, d.id)}>
                        <button type="submit" className="text-xs border border-emerald-200 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-sm hover:bg-emerald-100">
                          Approve
                        </button>
                      </form>
                      <form action={rejectDiscountRequest.bind(null, d.id)}>
                        <button type="submit" className="text-xs border border-red-200 text-red-700 px-2 py-1 rounded-sm hover:bg-red-50">
                          Reject
                        </button>
                      </form>
                    </div>
                  </div>
                  <p className="font-medium shrink-0">{formatCurrency(d.final_price)}</p>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title={`Driver payouts (${payouts?.length ?? 0})`}>
          {!payouts || payouts.length === 0 ? (
            <EmptyState title="Nothing pending" />
          ) : (
            <ul className="divide-y divide-admin-line">
              {payouts.map((p) => (
                <li key={p.id} className="px-4 py-3 flex justify-between text-sm">
                  <div>
                    <p className="text-admin-ink">{(p as any).drivers?.full_name ?? "—"}</p>
                    <p className="text-xs text-admin-stone">
                      {formatDate(p.period_start)} – {formatDate(p.period_end)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(p.net_payout, p.currency)}</p>
                    <Link href="/admin/driver-payouts" className="text-xs text-admin-gold hover:underline">
                      Review →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </div>
  );
}
