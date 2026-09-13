import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { MonthView, WeekView, DayView } from "@/components/admin/calendar/CalendarViews";
import { findConflictKeys, groupByDay, type CalendarBooking } from "@/lib/admin/calendarConflicts";
import { addDays, addMonths, addWeeks, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";

export const metadata: Metadata = { title: "Driver schedule" };

const VIEWS = ["month", "week", "day"] as const;
type ViewKey = (typeof VIEWS)[number];

// Reuses the exact calendar rendering used by the org-wide /admin/calendar
// (see lib/admin/calendarConflicts.ts + components/admin/calendar/) — this
// page is that same calendar scoped to one driver, not a second
// implementation. Conflicts here mean this driver is double-booked, the
// same overlap rule the DB's check_assignment_conflicts enforces at
// assignment time.
export default async function DriverSchedulePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ view?: string; date?: string }>;
}) {
  const { id } = await params;
  await requireUser();
  const { view: rawView, date: dateParam } = await searchParams;
  const view: ViewKey = VIEWS.includes(rawView as ViewKey) ? (rawView as ViewKey) : "week";
  const anchor = dateParam ? new Date(`${dateParam}T00:00:00`) : new Date();

  const supabase = await createClient();
  const { data: driver } = await supabase.from("drivers").select("id, full_name").eq("id", id).maybeSingle();
  if (!driver) notFound();

  let rangeStart: Date;
  let rangeEnd: Date;
  if (view === "month") {
    rangeStart = startOfWeek(startOfMonth(anchor), { weekStartsOn: 1 });
    rangeEnd = endOfWeek(endOfMonth(anchor), { weekStartsOn: 1 });
  } else if (view === "week") {
    rangeStart = startOfWeek(anchor, { weekStartsOn: 1 });
    rangeEnd = endOfWeek(anchor, { weekStartsOn: 1 });
  } else {
    rangeStart = anchor;
    rangeEnd = anchor;
  }

  const { data: bookings } = await supabase
    .from("bookings")
    .select("id, booking_reference, trip_date, trip_time, status, pickup, dropoff, driver_id, vehicle_id, estimated_duration_minutes, drivers(full_name), vehicles(name)")
    .eq("driver_id", id)
    .gte("trip_date", format(rangeStart, "yyyy-MM-dd"))
    .lte("trip_date", format(rangeEnd, "yyyy-MM-dd"))
    .not("status", "in", "(CANCELLED,NO_SHOW,COMPLETED)")
    .is("deleted_at", null)
    .order("trip_time", { ascending: true });

  const rows = (bookings ?? []) as unknown as CalendarBooking[];
  const conflictKeys = findConflictKeys(rows);
  const byDay = groupByDay(rows);

  const dateStr = format(anchor, "yyyy-MM-dd");
  const base = `/admin/drivers/${id}/schedule`;
  const nav =
    view === "month"
      ? { prev: format(addMonths(anchor, -1), "yyyy-MM-dd"), next: format(addMonths(anchor, 1), "yyyy-MM-dd") }
      : view === "week"
        ? { prev: format(addWeeks(anchor, -1), "yyyy-MM-dd"), next: format(addWeeks(anchor, 1), "yyyy-MM-dd") }
        : { prev: format(addDays(anchor, -1), "yyyy-MM-dd"), next: format(addDays(anchor, 1), "yyyy-MM-dd") };

  const heading = view === "month" ? format(anchor, "MMMM yyyy") : view === "week" ? `Week of ${format(rangeStart, "MMM d")}` : format(anchor, "EEEE, MMM d yyyy");

  return (
    <div>
      <PageHeader
        title={`${driver.full_name} — Schedule`}
        description={heading}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/admin/drivers/${id}`} className="inline-flex items-center gap-1.5 border border-admin-line px-3 py-2 rounded-sm text-sm hover:bg-white">
              <ArrowLeft className="h-4 w-4" /> Driver
            </Link>
            <div className="flex items-center gap-1 bg-white border border-admin-line rounded-sm p-1">
              {VIEWS.map((v) => (
                <Link
                  key={v}
                  href={`${base}?view=${v}&date=${dateStr}`}
                  className={`px-3 py-1.5 text-xs rounded-sm capitalize ${view === v ? "bg-admin-navy text-admin-ivory" : "text-admin-stone hover:bg-admin-ivory-deep"}`}
                >
                  {v}
                </Link>
              ))}
            </div>
            <Link href={`${base}?view=${view}&date=${nav.prev}`} className="border border-admin-line px-3 py-2 rounded-sm text-sm hover:bg-white">
              ← Prev
            </Link>
            <Link href={`${base}?view=${view}&date=${format(new Date(), "yyyy-MM-dd")}`} className="border border-admin-line px-3 py-2 rounded-sm text-sm hover:bg-white">
              Today
            </Link>
            <Link href={`${base}?view=${view}&date=${nav.next}`} className="border border-admin-line px-3 py-2 rounded-sm text-sm hover:bg-white">
              Next →
            </Link>
          </div>
        }
      />

      {conflictKeys.size > 0 ? (
        <div className="mb-4 flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-3 py-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {driver.full_name} is double-booked on {conflictKeys.size} trip{conflictKeys.size > 1 ? "s" : ""} — check assignments before confirming.
        </div>
      ) : null}

      {view === "month" ? (
        <MonthView anchor={anchor} rangeStart={rangeStart} byDay={byDay} conflictKeys={conflictKeys} />
      ) : view === "week" ? (
        <WeekView rangeStart={rangeStart} byDay={byDay} conflictKeys={conflictKeys} />
      ) : (
        <DayView day={anchor} bookings={byDay.get(dateStr) ?? []} conflictKeys={conflictKeys} />
      )}
    </div>
  );
}
