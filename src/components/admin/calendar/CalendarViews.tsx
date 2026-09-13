import Link from "next/link";
import { addDays, endOfMonth, endOfWeek, format, isSameMonth, isToday } from "date-fns";
import { Card } from "@/components/admin/ui/Card";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { formatTime } from "@/lib/admin/format";
import type { CalendarBooking } from "@/lib/admin/calendarConflicts";

export function MonthView({
  anchor,
  rangeStart,
  byDay,
  conflictKeys,
}: {
  anchor: Date;
  rangeStart: Date;
  byDay: Map<string, CalendarBooking[]>;
  conflictKeys: Set<string>;
}) {
  const days: Date[] = [];
  for (let d = rangeStart; d <= endOfWeek(endOfMonth(anchor), { weekStartsOn: 1 }); d = addDays(d, 1)) days.push(d);

  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-7 text-xs uppercase tracking-wide text-admin-stone border-b border-admin-line">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="px-2 py-2 text-center">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const dayBookings = byDay.get(key) ?? [];
          return (
            <div key={key} className={`min-h-[110px] border-b border-r border-admin-line p-1.5 ${!isSameMonth(day, anchor) ? "bg-admin-ivory-deep/50" : ""}`}>
              <p className={`text-xs mb-1 ${isToday(day) ? "inline-flex h-5 w-5 items-center justify-center rounded-full bg-admin-navy text-admin-ivory" : "text-admin-stone"}`}>
                {format(day, "d")}
              </p>
              <div className="space-y-1">
                {dayBookings.slice(0, 3).map((b) => (
                  <Link
                    key={b.id}
                    href={`/admin/bookings/${b.id}`}
                    className={`block text-[11px] leading-tight px-1.5 py-1 rounded-sm truncate ${
                      conflictKeys.has(b.id) ? "bg-red-100 hover:bg-red-200 text-red-800" : "bg-admin-gold-pale/30 hover:bg-admin-gold-pale/60"
                    }`}
                    title={`${formatTime(b.trip_time)} · ${b.pickup} → ${b.dropoff} · ${b.drivers?.full_name ?? "Unassigned"}`}
                  >
                    {formatTime(b.trip_time)} {b.booking_reference}
                  </Link>
                ))}
                {dayBookings.length > 3 ? <p className="text-[11px] text-admin-stone">+{dayBookings.length - 3} more</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function WeekView({ rangeStart, byDay, conflictKeys }: { rangeStart: Date; byDay: Map<string, CalendarBooking[]>; conflictKeys: Set<string> }) {
  const days: Date[] = Array.from({ length: 7 }, (_, i) => addDays(rangeStart, i));

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
      {days.map((day) => {
        const key = format(day, "yyyy-MM-dd");
        const dayBookings = byDay.get(key) ?? [];
        return (
          <Card key={key} className="overflow-hidden">
            <div className={`px-3 py-2 border-b border-admin-line text-sm font-medium ${isToday(day) ? "bg-admin-navy text-admin-ivory" : "bg-admin-ivory-deep"}`}>
              {format(day, "EEE d MMM")}
            </div>
            <div className="divide-y divide-admin-line min-h-[80px]">
              {dayBookings.length === 0 ? (
                <p className="text-xs text-admin-stone px-3 py-3">No trips</p>
              ) : (
                dayBookings.map((b) => (
                  <Link
                    key={b.id}
                    href={`/admin/bookings/${b.id}`}
                    className={`block px-3 py-2 text-xs hover:bg-admin-ivory-deep ${conflictKeys.has(b.id) ? "bg-red-50" : ""}`}
                  >
                    <p className="font-medium text-admin-ink">
                      {formatTime(b.trip_time)} · {b.booking_reference}
                    </p>
                    <p className="text-admin-stone truncate">{b.pickup} → {b.dropoff}</p>
                    <p className="text-admin-stone truncate">{b.drivers?.full_name ?? "Unassigned"}</p>
                  </Link>
                ))
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export function DayView({ day, bookings, conflictKeys }: { day: Date; bookings: CalendarBooking[]; conflictKeys: Set<string> }) {
  return (
    <Card>
      {bookings.length === 0 ? (
        <EmptyState title="No trips scheduled" description={`Nothing on the calendar for ${format(day, "MMM d, yyyy")}.`} />
      ) : (
        <div className="divide-y divide-admin-line">
          {bookings.map((b) => (
            <Link key={b.id} href={`/admin/bookings/${b.id}`} className={`flex items-center justify-between gap-3 px-4 py-3 hover:bg-admin-ivory-deep ${conflictKeys.has(b.id) ? "bg-red-50" : ""}`}>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-admin-ink w-16">{formatTime(b.trip_time)}</span>
                <div>
                  <p className="text-sm font-medium text-admin-ink">
                    {b.booking_reference} {conflictKeys.has(b.id) ? <span className="text-red-700">⚠ conflict</span> : null}
                  </p>
                  <p className="text-xs text-admin-stone">
                    {b.pickup} → {b.dropoff} · {b.drivers?.full_name ?? "Unassigned driver"} · {b.vehicles?.name ?? "Unassigned vehicle"}
                  </p>
                </div>
              </div>
              <StatusBadge status={b.status} />
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
}
