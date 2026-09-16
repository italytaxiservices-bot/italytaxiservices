import type { Metadata } from "next";
import { Download } from "lucide-react";
import { requireRole } from "@/lib/auth/dal";
import type { UserRole } from "@/lib/auth/roles";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { DATE_RANGE_LABELS, type DateRangeKey } from "@/lib/admin/date-range";
import { REPORT_LABELS, runReport, type ReportKey } from "@/lib/admin/reports";

export const metadata: Metadata = { title: "Reports" };

const REPORT_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "FINANCE", "OPERATIONS", "VIEWER"];
const RANGE_KEYS: DateRangeKey[] = ["today", "week", "month", "year", "all"];

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; range?: string }>;
}) {
  await requireRole(REPORT_ROLES);
  const { type: rawType, range: rawRange } = await searchParams;
  const type = (Object.keys(REPORT_LABELS).includes(rawType ?? "") ? rawType : "bookings") as ReportKey;
  const range = (RANGE_KEYS.includes(rawRange as DateRangeKey) ? rawRange : "month") as DateRangeKey;

  const result = await runReport(type, range);

  return (
    <div>
      <PageHeader title="Reports" />

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <form className="flex flex-wrap items-center gap-2">
          <select name="type" defaultValue={type} className="input-luxe max-w-[220px]">
            {Object.entries(REPORT_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <select name="range" defaultValue={range} className="input-luxe max-w-[160px]">
            {RANGE_KEYS.map((r) => (
              <option key={r} value={r}>
                {DATE_RANGE_LABELS[r]}
              </option>
            ))}
          </select>
          <button type="submit" className="border border-admin-line px-4 py-2 rounded-sm text-sm hover:bg-white">
            Run report
          </button>
        </form>
        <a
          href={`/admin/reports/export?type=${type}&range=${range}`}
          className="inline-flex items-center gap-1.5 text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-white ml-auto"
        >
          <Download className="h-4 w-4" /> Export CSV
        </a>
      </div>

      <Card>
        {result.rows.length === 0 ? (
          <EmptyState title="No data for this report/range" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-admin-stone border-b border-admin-line">
                  {result.columns.map((c) => (
                    <th key={c} className="px-4 py-2.5 font-medium whitespace-nowrap">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-line">
                {result.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-admin-ivory-deep">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-2 whitespace-nowrap">
                        {cell}
                      </td>
                    ))}
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
