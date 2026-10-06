export function formatCurrency(amount: number | string | null | undefined, currency = "EUR") {
  const value = typeof amount === "string" ? Number(amount) : amount ?? 0;
  return new Intl.NumberFormat("en-IE", { style: "currency", currency }).format(value);
}

export function formatDate(date: string | Date | null | undefined) {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(d);
}

export function formatTime(time: string | null | undefined) {
  if (!time) return "—";
  return time.slice(0, 5);
}

export function formatDateTime(date: string | Date | null | undefined) {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    // The server runs in UTC; show timestamps in the business's local time.
    timeZone: BUSINESS_TIME_ZONE,
  }).format(d);
}

const BUSINESS_TIME_ZONE = "Europe/Rome";

/**
 * When something arrived, e.g. "12 min ago · 06 Oct, 14:32" — relative for
 * the last week so new enquiries stand out, absolute otherwise.
 */
export function formatReceived(date: string | Date | null | undefined, now = new Date()) {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  const absolute = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: BUSINESS_TIME_ZONE,
  }).format(d);

  const minutes = Math.floor((now.getTime() - d.getTime()) / 60_000);
  let relative: string | null = null;
  if (minutes < 1) relative = "just now";
  else if (minutes < 60) relative = `${minutes} min ago`;
  else if (minutes < 24 * 60) relative = `${Math.floor(minutes / 60)} h ago`;
  else if (minutes < 7 * 24 * 60) relative = `${Math.floor(minutes / (24 * 60))} d ago`;

  return relative ? `${relative} · ${absolute}` : absolute;
}

/** Today's date in the business time zone as YYYY-MM-DD (server runs in UTC). */
export function businessToday(now = new Date()) {
  // en-CA formats dates as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", { timeZone: BUSINESS_TIME_ZONE }).format(now);
}

/** True for anything that arrived within the last 24 hours. */
export function isRecent(date: string | Date | null | undefined, now = new Date()) {
  if (!date) return false;
  const d = typeof date === "string" ? new Date(date) : date;
  return now.getTime() - d.getTime() < 24 * 60 * 60 * 1000;
}
