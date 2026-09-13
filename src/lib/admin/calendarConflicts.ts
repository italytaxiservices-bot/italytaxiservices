export type CalendarBooking = {
  id: string;
  booking_reference: string;
  trip_date: string;
  trip_time: string;
  status: string;
  pickup: string;
  dropoff: string;
  driver_id: string | null;
  vehicle_id: string | null;
  estimated_duration_minutes: number;
  drivers: { full_name: string } | null;
  vehicles: { name: string } | null;
};

function tripWindow(b: Pick<CalendarBooking, "trip_date" | "trip_time" | "estimated_duration_minutes">) {
  const start = new Date(`${b.trip_date}T${b.trip_time}`);
  const end = new Date(start.getTime() + (b.estimated_duration_minutes ?? 120) * 60_000);
  return { start, end };
}

function overlaps(a: CalendarBooking, b: CalendarBooking) {
  const wa = tripWindow(a);
  const wb = tripWindow(b);
  return wa.start < wb.end && wb.start < wa.end;
}

/** Same driver/vehicle with overlapping time windows (mirrors the DB's
 * check_assignment_conflicts, using estimated_duration_minutes instead of
 * exact-time-match — a 9:00-11:00 airport run and a 10:00 pickup on the
 * same driver is a conflict even though the times differ). Shared by the
 * org-wide calendar and the per-driver schedule view so both pages agree
 * on what counts as a conflict. */
export function findConflictKeys(rows: CalendarBooking[]): Set<string> {
  const conflictKeys = new Set<string>();
  for (let i = 0; i < rows.length; i++) {
    for (let j = i + 1; j < rows.length; j++) {
      const a = rows[i];
      const b = rows[j];
      const sameDriver = a.driver_id && a.driver_id === b.driver_id;
      const sameVehicle = a.vehicle_id && a.vehicle_id === b.vehicle_id;
      if ((sameDriver || sameVehicle) && overlaps(a, b)) {
        conflictKeys.add(a.id);
        conflictKeys.add(b.id);
      }
    }
  }
  return conflictKeys;
}

export function groupByDay(rows: CalendarBooking[]): Map<string, CalendarBooking[]> {
  const byDay = new Map<string, CalendarBooking[]>();
  for (const b of rows) {
    const key = b.trip_date;
    if (!byDay.has(key)) byDay.set(key, []);
    byDay.get(key)!.push(b);
  }
  return byDay;
}
