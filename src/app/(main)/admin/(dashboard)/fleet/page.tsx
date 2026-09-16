import Link from "next/link";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_OPS } from "@/lib/auth/roles";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { StatCard } from "@/components/admin/ui/Card";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { DATE_RANGE_LABELS, type DateRangeKey } from "@/lib/admin/date-range";
import { formatCurrency } from "@/lib/admin/format";
import { getFleetCostAnalytics } from "@/lib/admin/fleet";

export const metadata: Metadata = { title: "Fleet" };

const RANGE_KEYS: DateRangeKey[] = ["today", "week", "month", "year", "all"];

export default async function FleetPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  await requireRole(MANAGE_OPS);
  const { range: rawRange } = await searchParams;
  const range = (RANGE_KEYS.includes(rawRange as DateRangeKey) ? rawRange : "month") as DateRangeKey;

  const fleet = await getFleetCostAnalytics(range);
  const totalRevenue = fleet.reduce((s, v) => s + v.revenue, 0);
  const totalCost = fleet.reduce((s, v) => s + v.totalCost, 0);
  const totalTrips = fleet.reduce((s, v) => s + v.trips, 0);
  const active = fleet.filter((v) => v.status !== "INACTIVE").length;
  const utilized = fleet.filter((v) => v.trips > 0).length;

  return (
    <div>
      <PageHeader
        title="Fleet"
        description="Vehicle profitability and utilization. For individual vehicle records and documents, open a vehicle from the list below."
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
            <Link href="/admin/fleet/maintenance" className="text-sm bg-admin-navy text-admin-ivory px-4 py-2 rounded-sm hover:bg-admin-navy-deep">
              Maintenance
            </Link>
          </form>
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <StatCard label="Fleet size" value={fleet.length} hint={`${active} in service`} />
        <StatCard label="Utilized" value={utilized} hint={`of ${fleet.length} had a trip`} />
        <StatCard label="Trips" value={totalTrips} />
        <StatCard label="Revenue" value={formatCurrency(totalRevenue)} />
        <StatCard label="Est. profit" value={formatCurrency(totalRevenue - totalCost)} />
      </div>

      <Section title="Per-vehicle profitability">
        {fleet.length === 0 ? (
          <EmptyState title="No vehicles yet" description="Add a vehicle to start tracking fleet performance." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-admin-stone border-b border-admin-line">
                  <th className="px-4 py-2.5 font-medium">Vehicle</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 font-medium text-right">Trips</th>
                  <th className="px-4 py-2.5 font-medium text-right">Revenue</th>
                  <th className="px-4 py-2.5 font-medium text-right">Fuel</th>
                  <th className="px-4 py-2.5 font-medium text-right">Maintenance</th>
                  <th className="px-4 py-2.5 font-medium text-right">Tolls/Parking</th>
                  <th className="px-4 py-2.5 font-medium text-right">Other</th>
                  <th className="px-4 py-2.5 font-medium text-right">Rev/trip</th>
                  <th className="px-4 py-2.5 font-medium text-right">Cost/trip</th>
                  <th className="px-4 py-2.5 font-medium text-right">Est. profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-line">
                {fleet.map((v) => (
                  <tr key={v.vehicleId} className="hover:bg-admin-ivory-deep">
                    <td className="px-4 py-2.5">
                      <Link href={`/admin/vehicles/${v.vehicleId}`} className="text-admin-ink hover:underline font-medium">
                        {v.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={v.status} />
                    </td>
                    <td className="px-4 py-2.5 text-right">{v.trips}</td>
                    <td className="px-4 py-2.5 text-right">{formatCurrency(v.revenue)}</td>
                    <td className="px-4 py-2.5 text-right text-admin-stone">{formatCurrency(v.fuelCost)}</td>
                    <td className="px-4 py-2.5 text-right text-admin-stone">{formatCurrency(v.maintenanceCost)}</td>
                    <td className="px-4 py-2.5 text-right text-admin-stone">{formatCurrency(v.tollsCost)}</td>
                    <td className="px-4 py-2.5 text-right text-admin-stone">{formatCurrency(v.otherCost)}</td>
                    <td className="px-4 py-2.5 text-right">{formatCurrency(v.revenuePerTrip)}</td>
                    <td className="px-4 py-2.5 text-right">{formatCurrency(v.costPerTrip)}</td>
                    <td className={`px-4 py-2.5 text-right font-medium ${v.profit >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                      {formatCurrency(v.profit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </div>
  );
}
