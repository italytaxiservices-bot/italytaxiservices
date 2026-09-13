import { startOfDay, startOfWeek, startOfMonth, startOfYear, endOfDay, formatISO } from "date-fns";

export type DateRangeKey = "today" | "week" | "month" | "year" | "all";

export const DATE_RANGE_LABELS: Record<DateRangeKey, string> = {
  today: "Today",
  week: "This week",
  month: "This month",
  year: "This year",
  all: "All time",
};

export function resolveDateRange(key: DateRangeKey | undefined, now = new Date()) {
  const end = endOfDay(now);
  switch (key) {
    case "today":
      return { from: startOfDay(now), to: end, key: "today" as const };
    case "week":
      return { from: startOfWeek(now, { weekStartsOn: 1 }), to: end, key: "week" as const };
    case "year":
      return { from: startOfYear(now), to: end, key: "year" as const };
    case "all":
      return { from: null, to: end, key: "all" as const };
    case "month":
    default:
      return { from: startOfMonth(now), to: end, key: "month" as const };
  }
}

export function isoDate(d: Date) {
  return formatISO(d, { representation: "date" });
}

export function isoDateTime(d: Date) {
  return formatISO(d);
}
