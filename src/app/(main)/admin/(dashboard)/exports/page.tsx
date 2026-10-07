import Link from "next/link";
import type { Metadata } from "next";
import { Download } from "lucide-react";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_FINANCE } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { DATE_RANGE_LABELS, type DateRangeKey } from "@/lib/admin/date-range";
import { REPORT_LABELS, type ReportKey } from "@/lib/admin/reports";
import { formatDateTime } from "@/lib/admin/format";
import { TRIP_DATASET_LABELS, TRIP_PERIOD_LABELS, type TripDataset, type TripPeriod } from "@/lib/admin/tripExports";

export const metadata: Metadata = { title: "Export center" };

const RANGE_KEYS: DateRangeKey[] = ["today", "week", "month", "year", "all"];

// The datasets the task explicitly asks this hub to offer quick exports
// for. Every other report type is still reachable from /admin/reports —
// this page doesn't duplicate that browser, it's the accountable front
// door for the datasets staff export most.
const QUICK_EXPORT_KEYS: ReportKey[] = ["bookings", "customers", "invoices", "payments", "expenses", "driver_payouts", "profit_report"];

export default async function ExportsPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  await requireRole(MANAGE_FINANCE);
  const { range: rawRange } = await searchParams;
  const range = (RANGE_KEYS.includes(rawRange as DateRangeKey) ? rawRange : "month") as DateRangeKey;

  const supabase = await createClient();
  const { data: logs } = await supabase
    .from("export_logs")
    .select("id, dataset, filters, row_count, status, created_at, profiles(full_name)")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div>
      <PageHeader
        title="Export center"
        description="Every export here is logged — who ran it, what dataset, what filters, how many rows."
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

      <Section title="Bookings & website requests → Excel / Google Sheets">
        <form action="/admin/exports/trips" method="get" className="p-4 grid sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
          <label className="block text-xs text-admin-stone lg:col-span-2">
            What
            <select name="dataset" defaultValue="bookings" className="input-luxe mt-1">
              {(Object.keys(TRIP_DATASET_LABELS) as TripDataset[]).map((k) => (
                <option key={k} value={k}>
                  {TRIP_DATASET_LABELS[k]}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-admin-stone">
            Period
            <select name="period" defaultValue="upcoming" className="input-luxe mt-1">
              {(Object.keys(TRIP_PERIOD_LABELS) as TripPeriod[]).map((k) => (
                <option key={k} value={k}>
                  {TRIP_PERIOD_LABELS[k]}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-admin-stone">
            Filter by
            <select name="by" defaultValue="trip" className="input-luxe mt-1">
              <option value="trip">Trip date</option>
              <option value="received">Date received</option>
            </select>
          </label>
          <label className="block text-xs text-admin-stone">
            From (custom)
            <input type="date" name="from" className="input-luxe mt-1" />
          </label>
          <label className="block text-xs text-admin-stone">
            To (custom)
            <input type="date" name="to" className="input-luxe mt-1" />
          </label>
          <button type="submit" className="lg:col-span-6 inline-flex items-center justify-center gap-2 bg-admin-navy text-admin-ivory text-sm font-semibold px-4 py-2.5 rounded-sm hover:bg-admin-navy-deep">
            <Download className="h-4 w-4" /> Download spreadsheet (.csv)
          </button>
        </form>
        <p className="px-4 pb-4 text-xs text-admin-stone">
          Every column: received time, trip date &amp; time, pickup, drop-off, city, customer, phone, email, passengers, driver, whether the driver was
          told, flight, status, payment, prices and notes. Opens directly in Excel; in Google Sheets use File → Import → Upload. &quot;From / To&quot; are used
          when Period is &quot;Custom dates&quot;.
        </p>
      </Section>

      <div className="mt-4" />
      <Section title="Quick export">
        <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_EXPORT_KEYS.map((key) => (
            <a
              key={key}
              href={`/admin/reports/export?type=${key}&range=${range}`}
              className="flex items-center justify-between gap-2 border border-admin-line rounded-sm px-4 py-3 text-sm hover:bg-admin-ivory-deep transition-colors"
            >
              {REPORT_LABELS[key]}
              <Download className="h-4 w-4 text-admin-stone" />
            </a>
          ))}
        </div>
        <p className="px-4 pb-4 text-xs text-admin-stone">
          Need a different dataset? The full report browser at{" "}
          <Link href="/admin/reports" className="text-admin-gold hover:underline">
            /admin/reports
          </Link>{" "}
          covers everything else (route/driver/vehicle analytics, outstanding/overdue invoices, cancellations…).
        </p>
      </Section>

      <div className="mt-4">
        <Section title={`Recent exports (${logs?.length ?? 0})`}>
          {!logs || logs.length === 0 ? (
            <EmptyState title="No exports yet" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-admin-stone border-b border-admin-line">
                    <th className="px-4 py-2.5 font-medium">User</th>
                    <th className="px-4 py-2.5 font-medium">Dataset</th>
                    <th className="px-4 py-2.5 font-medium">Filters</th>
                    <th className="px-4 py-2.5 font-medium text-right">Rows</th>
                    <th className="px-4 py-2.5 font-medium">Status</th>
                    <th className="px-4 py-2.5 font-medium">When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-line">
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td className="px-4 py-2.5">{log.profiles?.full_name ?? "Unknown"}</td>
                      <td className="px-4 py-2.5">
                        {REPORT_LABELS[log.dataset as ReportKey] ??
                          TRIP_DATASET_LABELS[log.dataset.replace(/^trips_/, "") as TripDataset] ??
                          log.dataset}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-admin-stone">{log.filters ? JSON.stringify(log.filters) : "—"}</td>
                      <td className="px-4 py-2.5 text-right">{log.row_count}</td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={log.status} />
                      </td>
                      <td className="px-4 py-2.5 text-xs text-admin-stone">{formatDateTime(log.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
