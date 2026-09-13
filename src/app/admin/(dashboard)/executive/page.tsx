import type { Metadata } from "next";
import { subDays, subWeeks, subMonths, subYears, startOfDay, endOfDay } from "date-fns";
import { requireRole } from "@/lib/auth/dal";
import { ADMIN_ONLY } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { StatCard } from "@/components/admin/ui/Card";
import { DATE_RANGE_LABELS, resolveDateRange, isoDate, type DateRangeKey } from "@/lib/admin/date-range";
import { formatCurrency } from "@/lib/admin/format";
import { getFinanceDashboard } from "@/lib/admin/finance";
import { getFleetCostAnalytics } from "@/lib/admin/fleet";
import { getInsights } from "@/lib/admin/insights";

export const metadata: Metadata = { title: "Executive dashboard" };

const RANGE_KEYS: DateRangeKey[] = ["today", "week", "month", "year"];

/** Shifts the current period back by its own length — a real previous
 * window, not a fabricated one, so the % comparison below is comparing two
 * equal-length real date ranges. */
function previousPeriodBounds(range: DateRangeKey, anchor: Date) {
  const shifted = range === "today" ? subDays(anchor, 1) : range === "week" ? subWeeks(anchor, 1) : range === "year" ? subYears(anchor, 1) : subMonths(anchor, 1);
  const { from, to } = resolveDateRange(range === "all" ? "month" : range, shifted);
  return { from: from ? startOfDay(from) : startOfDay(shifted), to: endOfDay(to) };
}

function pctChange(current: number, previous: number): number | null {
  // A percentage change against a near-zero base is not a meaningful
  // number (it can read as +40,000%) — only show it when the previous
  // period had a real base to compare against.
  if (Math.abs(previous) < 0.01) return null;
  return ((current - previous) / previous) * 100;
}

function ChangeLabel({ pct }: { pct: number | null }) {
  if (pct === null) return null;
  const sign = pct >= 0 ? "+" : "";
  return <span className={pct >= 0 ? "text-emerald-700" : "text-red-700"}> {sign}{pct.toFixed(1)}% vs previous period</span>;
}

export default async function ExecutiveDashboardPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  await requireRole(ADMIN_ONLY);
  const { range: rawRange } = await searchParams;
  const range = (RANGE_KEYS.includes(rawRange as DateRangeKey) ? rawRange : "month") as DateRangeKey;

  const supabase = await createClient();

  const [finance, fleet, insights] = await Promise.all([getFinanceDashboard(range), getFleetCostAnalytics(range), getInsights(range)]);

  const prevBounds = previousPeriodBounds(range, new Date());
  const prevFromDate = isoDate(prevBounds.from);
  const prevToDate = isoDate(prevBounds.to);
  const [{ data: prevBookings }, { data: prevExpenses }] = await Promise.all([
    supabase.from("bookings").select("total, status").gte("trip_date", prevFromDate).lte("trip_date", prevToDate).is("deleted_at", null),
    supabase.from("expenses").select("amount, status").gte("expense_date", prevFromDate).lte("expense_date", prevToDate).is("deleted_at", null).in("status", ["APPROVED", "PAID"]),
  ]);
  const prevRevenue = (prevBookings ?? []).filter((b) => b.status !== "CANCELLED").reduce((s, b) => s + Number(b.total), 0);
  const prevExpenseTotal = (prevExpenses ?? []).reduce((s, e) => s + Number(e.amount), 0);
  const revenueChange = pctChange(finance.revenue, prevRevenue);
  const profitChange = pctChange(finance.grossProfit, prevRevenue - prevExpenseTotal);

  const [{ count: driversCount }, { count: vehiclesCount }, { count: newCustomers }, { count: totalCustomers }] = await Promise.all([
    supabase.from("drivers").select("id", { count: "exact", head: true }).is("deleted_at", null).eq("active", true),
    supabase.from("vehicles").select("id", { count: "exact", head: true }).is("deleted_at", null),
    supabase.from("customers").select("id", { count: "exact", head: true }).is("deleted_at", null),
    supabase.from("customers").select("id", { count: "exact", head: true }).is("deleted_at", null),
  ]);

  const conversionStage = insights.funnel.find((f) => f.label === "Quotations sent");
  const acceptedStage = insights.funnel.find((f) => f.label === "Quotations accepted");
  const conversionRate = conversionStage && conversionStage.count > 0 ? ((acceptedStage?.count ?? 0) / conversionStage.count) * 100 : null;

  const fleetUtilization = fleet.length > 0 ? (fleet.filter((v) => v.trips > 0).length / fleet.length) * 100 : 0;

  return (
    <div>
      <PageHeader
        title="Executive dashboard"
        description="High-level view for management — revenue, profit, and operational health for the selected period."
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
        <StatCard label="Revenue" value={formatCurrency(finance.revenue)} hint={revenueChange !== null ? <ChangeLabel pct={revenueChange} /> : "No prior-period base"} />
        <StatCard label="Gross profit" value={formatCurrency(finance.grossProfit)} hint={profitChange !== null ? <ChangeLabel pct={profitChange} /> : "No prior-period base"} />
        <StatCard label="Est. net profit" value={formatCurrency(finance.estimatedNetProfit)} />
        <StatCard label="Outstanding" value={formatCurrency(finance.outstanding)} />
        <StatCard label="Bookings" value={insights.funnel.find((f) => f.label === "Bookings created")?.count ?? 0} />
        <StatCard label="Total customers" value={totalCustomers ?? 0} hint={`${newCustomers ?? 0} tracked overall`} />
        <StatCard label="Quote → accept rate" value={conversionRate !== null ? `${conversionRate.toFixed(0)}%` : "No quotes yet"} />
        <StatCard label="Expenses" value={formatCurrency(finance.expenses)} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Section title="Fleet & driver utilization">
          <div className="p-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-admin-stone">Fleet size</span>
              <span>{vehiclesCount ?? 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-admin-stone">Active drivers</span>
              <span>{driversCount ?? 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-admin-stone">Fleet utilization (had a trip)</span>
              <span>{fleetUtilization.toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-admin-stone">Driver utilization</span>
              <span>{insights.topDrivers.length} of {driversCount ?? 0} drove a trip</span>
            </div>
          </div>
        </Section>

        <Section title="Sales funnel this period">
          <ul className="p-4 space-y-2 text-sm">
            {insights.funnel.map((f) => (
              <li key={f.label} className="flex justify-between">
                <span className="text-admin-stone">{f.label}</span>
                <span>{f.count}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <p className="text-xs text-admin-stone mt-4">
        Period-over-period percentage comparisons are shown only where the previous period had a non-trivial base — a 0 → 1 change
        is directionally real but not a meaningful percentage, so it&rsquo;s omitted rather than shown as a misleading number.
      </p>
    </div>
  );
}
