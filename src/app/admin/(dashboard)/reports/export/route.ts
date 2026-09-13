import { NextResponse, type NextRequest } from "next/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_FINANCE, type UserRole } from "@/lib/auth/roles";
import { REPORT_LABELS, runReport, toCsv, type ReportKey } from "@/lib/admin/reports";
import type { DateRangeKey } from "@/lib/admin/date-range";
import { createClient } from "@/lib/supabase/server";

const REPORT_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "FINANCE", "OPERATIONS", "VIEWER"];

// Payout and profit figures are more sensitive than the general report set —
// exporting them requires the same access as the Finance dashboard, not just
// general report-viewing access.
const FINANCE_ONLY_REPORTS: ReportKey[] = ["driver_payouts", "profit_report"];

export async function GET(request: NextRequest) {
  const profile = await requireRole(REPORT_ROLES);
  const { searchParams } = new URL(request.url);
  const type = (searchParams.get("type") ?? "bookings") as ReportKey;
  const range = (searchParams.get("range") ?? "month") as DateRangeKey;

  if (!Object.keys(REPORT_LABELS).includes(type)) {
    return NextResponse.json({ error: "Unknown report" }, { status: 400 });
  }
  if (FINANCE_ONLY_REPORTS.includes(type) && !MANAGE_FINANCE.includes(profile.role)) {
    return NextResponse.json({ error: "You don't have permission to export this report." }, { status: 403 });
  }

  const result = await runReport(type, range);
  const csv = toCsv(result);

  const supabase = await createClient();
  const { error: logError } = await supabase.from("export_logs").insert({
    user_id: profile.id,
    dataset: type,
    filters: { range },
    row_count: result.rows.length,
    status: "SUCCESS",
  });
  if (logError) console.error("export_logs insert failed", logError.message);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${type}-${range}.csv"`,
    },
  });
}
