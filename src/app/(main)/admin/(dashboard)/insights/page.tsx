import Link from "next/link";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import type { UserRole } from "@/lib/auth/roles";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { StatCard } from "@/components/admin/ui/Card";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { DATE_RANGE_LABELS, type DateRangeKey } from "@/lib/admin/date-range";
import { formatCurrency } from "@/lib/admin/format";
import { getInsights } from "@/lib/admin/insights";

export const metadata: Metadata = { title: "Insights" };

const INSIGHTS_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "FINANCE", "OPERATIONS"];
const RANGE_KEYS: DateRangeKey[] = ["today", "week", "month", "year", "all"];

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  await requireRole(INSIGHTS_ROLES);
  const { range: rawRange } = await searchParams;
  const range = (RANGE_KEYS.includes(rawRange as DateRangeKey) ? rawRange : "month") as DateRangeKey;

  const { funnel, topRoutes, topDrivers, topVehicles, profitability } = await getInsights(range);
  const maxFunnel = Math.max(1, ...funnel.map((f) => f.count));
  const maxRouteTrips = Math.max(1, ...topRoutes.map((r) => r.trips));

  return (
    <div>
      <PageHeader
        title="Insights"
        description="Sales funnel, route/driver/vehicle performance, and profitability for the selected period."
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

      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <Section title="Sales funnel">
          <div className="p-4 space-y-3">
            {funnel.map((stage, i) => {
              const prev = i > 0 ? funnel[i - 1].count : null;
              const conversion = prev && prev > 0 ? ((stage.count / prev) * 100).toFixed(0) : null;
              return (
                <div key={stage.label}>
                  <div className="flex items-center justify-between text-xs text-admin-stone mb-1">
                    <span>{stage.label}</span>
                    <span>
                      {stage.count}
                      {conversion ? ` · ${conversion}% of previous` : ""}
                    </span>
                  </div>
                  <div className="h-2.5 bg-admin-ivory-deep rounded-full overflow-hidden">
                    <div className="h-full bg-admin-gold rounded-full" style={{ width: `${(stage.count / maxFunnel) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Profitability">
          <div className="p-4 grid grid-cols-2 gap-3">
            <StatCard label="Revenue" value={formatCurrency(profitability.revenue)} />
            <StatCard label="Total costs" value={formatCurrency(profitability.totalCost)} />
            <StatCard label="Profit" value={formatCurrency(profitability.profit)} />
            <StatCard label="Margin" value={`${profitability.marginPct.toFixed(1)}%`} />
          </div>
          <div className="px-4 pb-4 text-xs text-admin-stone space-y-1">
            <div className="flex justify-between">
              <span>Driver costs</span>
              <span>{formatCurrency(profitability.driverCost)}</span>
            </div>
            <div className="flex justify-between">
              <span>Vehicle costs (fuel/toll/parking/maintenance)</span>
              <span>{formatCurrency(profitability.vehicleCost)}</span>
            </div>
            <div className="flex justify-between">
              <span>Other costs</span>
              <span>{formatCurrency(profitability.otherCost)}</span>
            </div>
          </div>
        </Section>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Section title="Top routes" action={<ExportLink type="route_analytics" range={range} />}>
          {topRoutes.length === 0 ? (
            <EmptyState title="No trips in this period" />
          ) : (
            <ul className="divide-y divide-admin-line">
              {topRoutes.map((r) => (
                <li key={r.route} className="px-4 py-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="truncate pr-2">{r.route}</span>
                    <span className="text-admin-stone shrink-0">{r.trips}</span>
                  </div>
                  <div className="h-1.5 bg-admin-ivory-deep rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-admin-navy rounded-full" style={{ width: `${(r.trips / maxRouteTrips) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Top drivers" action={<ExportLink type="driver_analytics" range={range} />}>
          {topDrivers.length === 0 ? (
            <EmptyState title="No trips in this period" />
          ) : (
            <ul className="divide-y divide-admin-line">
              {topDrivers.map((d) => (
                <li key={d.id} className="px-4 py-2.5 flex justify-between text-sm">
                  <span className="truncate pr-2">{d.name}</span>
                  <span className="text-admin-stone shrink-0 text-right">
                    {d.trips} trips
                    {d.cancellations > 0 ? <span className="text-red-600"> · {d.cancellations} cancelled</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Top vehicles" action={<ExportLink type="vehicle_analytics" range={range} />}>
          {topVehicles.length === 0 ? (
            <EmptyState title="No trips in this period" />
          ) : (
            <ul className="divide-y divide-admin-line">
              {topVehicles.map((v) => (
                <li key={v.id} className="px-4 py-2.5 flex justify-between text-sm">
                  <span className="truncate pr-2">{v.name}</span>
                  <span className="text-admin-stone shrink-0">{formatCurrency(v.revenue)}</span>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </div>
  );
}

function ExportLink({ type, range }: { type: string; range: DateRangeKey }) {
  return (
    <Link href={`/admin/reports/export?type=${type}&range=${range}`} className="text-xs text-admin-gold hover:underline">
      Export CSV
    </Link>
  );
}
