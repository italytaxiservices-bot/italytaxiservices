import { NextResponse, type NextRequest } from "next/server";
import { requireRole } from "@/lib/auth/dal";
import type { UserRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import {
  TRIP_DATASET_LABELS,
  TRIP_PERIOD_LABELS,
  runTripExport,
  toSheetCsv,
  type TripDataset,
  type TripDateField,
  type TripPeriod,
} from "@/lib/admin/tripExports";
import { businessToday } from "@/lib/admin/format";

// Same roles that can open the generic report exports.
const EXPORT_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "FINANCE", "OPERATIONS", "VIEWER"];

/** GET /admin/exports/trips?dataset=bookings|leads&period=…&by=trip|received&from=&to= → CSV for Excel / Google Sheets. */
export async function GET(request: NextRequest) {
  const profile = await requireRole(EXPORT_ROLES);
  const sp = new URL(request.url).searchParams;

  const dataset = (sp.get("dataset") ?? "bookings") as TripDataset;
  const period = (sp.get("period") ?? "upcoming") as TripPeriod;
  const by = (sp.get("by") === "received" ? "received" : "trip") as TripDateField;
  if (!(dataset in TRIP_DATASET_LABELS) || !(period in TRIP_PERIOD_LABELS)) {
    return NextResponse.json({ error: "Unknown dataset or period" }, { status: 400 });
  }
  const from = sp.get("from");
  const to = sp.get("to");

  const table = await runTripExport({ dataset, period, by, from, to });

  const supabase = await createClient();
  const { error: logError } = await supabase.from("export_logs").insert({
    user_id: profile.id,
    dataset: `trips_${dataset}`,
    filters: { period, by, from, to },
    row_count: table.rows.length,
    status: "SUCCESS",
  });
  if (logError) console.error("export_logs insert failed", logError.message);

  const range = period === "custom" ? `${from ?? "start"}_to_${to ?? "end"}` : period;
  const filename = `italytaxi-${dataset}-${range}-${businessToday()}.csv`;
  return new NextResponse(toSheetCsv(table), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
