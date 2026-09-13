import Link from "next/link";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_FINANCE } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { StatCard } from "@/components/admin/ui/Card";
import { DATE_RANGE_LABELS, resolveDateRange, isoDate, type DateRangeKey } from "@/lib/admin/date-range";
import { formatCurrency } from "@/lib/admin/format";
import { getFinanceDashboard } from "@/lib/admin/finance";

export const metadata: Metadata = { title: "Finance" };

const RANGE_KEYS: DateRangeKey[] = ["today", "week", "month", "year", "all"];

export default async function FinanceDashboardPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  await requireRole(MANAGE_FINANCE);
  const { range: rawRange } = await searchParams;
  const range = (RANGE_KEYS.includes(rawRange as DateRangeKey) ? rawRange : "month") as DateRangeKey;

  const finance = await getFinanceDashboard(range);

  const supabase = await createClient();
  const { from, to } = resolveDateRange(range);
  const fromDate = from ? isoDate(from) : "1970-01-01";
  const toDate = isoDate(to);

  const [{ data: expensesByCategory }, { data: recentPayments }] = await Promise.all([
    supabase.from("expenses").select("category, amount").gte("expense_date", fromDate).lte("expense_date", toDate).is("deleted_at", null).in("status", ["APPROVED", "PAID"]),
    supabase.from("payments").select("amount, currency, payment_date, method, customers(full_name)").gte("payment_date", fromDate).lte("payment_date", toDate).is("deleted_at", null).order("payment_date", { ascending: false }).limit(10),
  ]);

  const categoryTotals = new Map<string, number>();
  for (const e of expensesByCategory ?? []) categoryTotals.set(e.category, (categoryTotals.get(e.category) ?? 0) + Number(e.amount));

  return (
    <div>
      <PageHeader
        title="Finance"
        description="Revenue, cash position, and cost breakdown for the selected period."
        actions={
          <form className="flex items-center gap-2">
            <select name="range" defaultValue={range} className="input-luxe max-w-[160px]">
              {RANGE_KEYS.map((r) => (
                <option key={r} value={r}>
                  {DATE_RANGE_LABELS[r]}
                </option>
              ))}
            </select>
            <button type="submit" className="border border-admin-line px-4 py-2 rounded-sm text-sm hover:bg-white">
              Apply
            </button>
          </form>
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard label="Revenue" value={formatCurrency(finance.revenue)} />
        <StatCard label="Collected" value={formatCurrency(finance.collected)} />
        <StatCard label="Outstanding" value={formatCurrency(finance.outstanding)} />
        <StatCard label="Overdue" value={formatCurrency(finance.overdue)} />
        <StatCard label="Expenses" value={formatCurrency(finance.expenses)} hint="Approved + paid only" />
        <StatCard label="Driver payouts" value={formatCurrency(finance.driverPayouts)} />
        <StatCard label="Gross profit" value={formatCurrency(finance.grossProfit)} hint="Revenue − expenses" />
        <StatCard label="Est. net profit" value={formatCurrency(finance.estimatedNetProfit)} hint="− driver payouts too" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <Section title="Quick links">
          <div className="p-4 flex flex-wrap gap-2 text-sm">
            <Link href="/admin/finance/receivables" className="border border-admin-line px-3 py-1.5 rounded-sm hover:bg-admin-ivory-deep">
              Accounts receivable
            </Link>
            <Link href="/admin/finance/reconciliation" className="border border-admin-line px-3 py-1.5 rounded-sm hover:bg-admin-ivory-deep">
              Reconciliation
            </Link>
            <Link href="/admin/driver-payouts" className="border border-admin-line px-3 py-1.5 rounded-sm hover:bg-admin-ivory-deep">
              Driver payouts
            </Link>
            <Link href="/admin/expenses" className="border border-admin-line px-3 py-1.5 rounded-sm hover:bg-admin-ivory-deep">
              Expenses
            </Link>
          </div>
        </Section>

        <Section title="Expense breakdown">
          <ul className="p-4 space-y-1.5 text-sm">
            {[...categoryTotals.entries()].sort((a, b) => b[1] - a[1]).map(([cat, amount]) => (
              <li key={cat} className="flex justify-between">
                <span className="text-admin-stone">{cat}</span>
                <span>{formatCurrency(amount)}</span>
              </li>
            ))}
            {categoryTotals.size === 0 ? <li className="text-admin-stone">No approved expenses in this period.</li> : null}
          </ul>
        </Section>

        <Section title="Revenue by currency">
          <ul className="p-4 space-y-1.5 text-sm">
            {finance.revenueByCurrency.map((r) => (
              <li key={r.currency} className="flex justify-between">
                <span className="text-admin-stone">{r.currency}</span>
                <span>{formatCurrency(r.amount, r.currency)}</span>
              </li>
            ))}
            {finance.revenueByCurrency.length === 0 ? <li className="text-admin-stone">No revenue in this period.</li> : null}
          </ul>
        </Section>
      </div>

      <Section title="Recent payments">
        <ul className="divide-y divide-admin-line">
          {(recentPayments ?? []).map((p, i) => (
            <li key={i} className="px-4 py-2.5 flex justify-between text-sm">
              <span>
                {(p as any).customers?.full_name ?? "—"} · {p.method}
              </span>
              <span className="font-medium">{formatCurrency(p.amount, p.currency)}</span>
            </li>
          ))}
          {!recentPayments || recentPayments.length === 0 ? <li className="px-4 py-4 text-sm text-admin-stone">No payments in this period.</li> : null}
        </ul>
      </Section>
    </div>
  );
}
