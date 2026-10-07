import "server-only";

import { createClient } from "@/lib/supabase/server";
import { businessToday, formatDateTime } from "@/lib/admin/format";
import { CITY_LABELS, tripCity } from "@/lib/admin/cities";
import { getLatestDriverBriefings } from "@/lib/admin/driverBriefing";
import { givenToLabel } from "@/lib/admin/driverBriefingText";

/**
 * Full-detail spreadsheet exports of bookings and website requests (leads)
 * for Excel / Google Sheets. Unlike the generic reports (which stop at
 * "today"), periods here are whole calendar periods and include future
 * trips, and can filter by trip date or by when the request came in.
 */

export type TripDataset = "bookings" | "leads";
export type TripPeriod = "upcoming" | "today" | "week" | "month" | "year" | "all" | "custom";
export type TripDateField = "trip" | "received";

export const TRIP_DATASET_LABELS: Record<TripDataset, string> = {
  bookings: "Bookings (full details)",
  leads: "Website requests (leads)",
};

export const TRIP_PERIOD_LABELS: Record<TripPeriod, string> = {
  upcoming: "Upcoming (today onwards)",
  today: "Today",
  week: "This week",
  month: "This month",
  year: "This year",
  all: "All time",
  custom: "Custom dates",
};

export type TripExportFilters = {
  dataset: TripDataset;
  period: TripPeriod;
  by: TripDateField;
  from?: string | null;
  to?: string | null;
};

type Table = { columns: string[]; rows: (string | number | null)[][] };

const isDate = (s: string | null | undefined): s is string => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);

function addDays(date: string, days: number) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Inclusive YYYY-MM-DD bounds (business time zone) for a period; null = open-ended. */
export function resolveTripPeriod(period: TripPeriod, from?: string | null, to?: string | null) {
  const today = businessToday();
  const [y, m] = today.split("-").map(Number);
  switch (period) {
    case "upcoming":
      return { from: today, to: null };
    case "today":
      return { from: today, to: today };
    case "week": {
      const weekday = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7; // Monday = 0
      const start = addDays(today, -weekday);
      return { from: start, to: addDays(start, 6) };
    }
    case "month": {
      const start = `${y}-${String(m).padStart(2, "0")}-01`;
      const end = new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
      return { from: start, to: end };
    }
    case "year":
      return { from: `${y}-01-01`, to: `${y}-12-31` };
    case "custom":
      return { from: isDate(from) ? from : null, to: isDate(to) ? to : null };
    case "all":
    default:
      return { from: null, to: null };
  }
}

/** UTC instant of 00:00 on a business-time-zone date, for filtering created_at. */
function businessMidnightIso(date: string) {
  const probe = new Date(`${date}T12:00:00Z`);
  const offset = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Rome", timeZoneName: "longOffset" })
    .formatToParts(probe)
    .find((p) => p.type === "timeZoneName")
    ?.value.replace("GMT", "");
  return new Date(`${date}T00:00:00${offset && offset !== "" ? offset : "Z"}`).toISOString();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyPeriod(query: any, by: TripDateField, bounds: { from: string | null; to: string | null }) {
  if (by === "received") {
    if (bounds.from) query = query.gte("created_at", businessMidnightIso(bounds.from));
    if (bounds.to) query = query.lt("created_at", businessMidnightIso(addDays(bounds.to, 1)));
  } else {
    if (bounds.from) query = query.gte("trip_date", bounds.from);
    if (bounds.to) query = query.lte("trip_date", bounds.to);
  }
  return query;
}

/** Supabase caps a select at 1000 rows; page through so big exports are complete. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchAll<T>(build: () => any, max = 20000): Promise<T[]> {
  const out: T[] = [];
  for (let start = 0; start < max; start += 1000) {
    const { data, error } = await build().range(start, start + 999);
    if (error) throw new Error(error.message);
    out.push(...((data ?? []) as T[]));
    if (!data || data.length < 1000) break;
  }
  return out;
}

const money = (n: unknown) => (n == null ? "" : Number(n).toFixed(2));

export async function runTripExport(filters: TripExportFilters): Promise<Table> {
  const supabase = await createClient();
  const bounds = resolveTripPeriod(filters.period, filters.from, filters.to);
  const by = filters.period === "upcoming" ? "trip" : filters.by;

  if (filters.dataset === "bookings") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows = await fetchAll<any>(() =>
      applyPeriod(
        supabase
          .from("bookings")
          .select(
            "id, booking_reference, created_at, trip_date, trip_time, pickup, dropoff, passengers, luggage, flight_number, flight_terminal, status, payment_status, price, discount, tax_amount, total, currency, special_requests, customer_notes, internal_notes, source, customers(full_name, phone, email), drivers(full_name), vehicles(name)"
          )
          .is("deleted_at", null)
          .order("trip_date", { ascending: true })
          .order("trip_time", { ascending: true }),
        by,
        bounds
      )
    );
    const given = await getLatestDriverBriefings("booking", rows.map((r) => r.id));
    return {
      columns: [
        "Reference", "Received", "Trip date", "Time", "Pickup", "Drop-off", "City",
        "Customer", "Phone", "Email", "Passengers", "Luggage", "Vehicle", "Driver", "Given to driver", "Given at",
        "Flight", "Status", "Payment", "Price", "Discount", "Tax", "Total", "Currency",
        "Special requests", "Customer notes", "Internal notes", "Source",
      ],
      rows: rows.map((b) => [
        b.booking_reference, formatDateTime(b.created_at), b.trip_date, (b.trip_time ?? "").slice(0, 5), b.pickup, b.dropoff,
        CITY_LABELS[tripCity(b.pickup, b.dropoff)],
        b.customers?.full_name ?? "", b.customers?.phone ?? "", b.customers?.email ?? "", b.passengers, b.luggage,
        b.vehicles?.name ?? "", b.drivers?.full_name ?? "", given.has(b.id) ? givenToLabel(given.get(b.id)!.note) : "", given.has(b.id) ? formatDateTime(given.get(b.id)!.created_at) : "",
        [b.flight_number, b.flight_terminal ? `T${b.flight_terminal}` : null].filter(Boolean).join(" "),
        b.status, b.payment_status, money(b.price), money(b.discount), money(b.tax_amount), money(b.total), b.currency,
        b.special_requests ?? "", b.customer_notes ?? "", b.internal_notes ?? "", b.source ?? "",
      ]),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = await fetchAll<any>(() =>
    applyPeriod(
      supabase
        .from("leads")
        .select("id, lead_number, created_at, trip_date, trip_time, pickup, dropoff, full_name, phone, whatsapp, email, passengers, status, source, estimated_value, currency, notes")
        .is("deleted_at", null)
        .order(by === "received" ? "created_at" : "trip_date", { ascending: by !== "received" }),
      by,
      bounds
    )
  );
  const given = await getLatestDriverBriefings("lead", rows.map((r) => r.id));
  return {
    columns: [
      "Lead #", "Received", "Trip date", "Time", "Pickup", "Drop-off", "City",
      "Name", "Phone", "Email", "Passengers", "Status", "Given to driver", "Given at", "Source", "Est. value", "Currency", "Notes",
    ],
    rows: rows.map((l) => [
      l.lead_number, formatDateTime(l.created_at), l.trip_date ?? "", (l.trip_time ?? "").slice(0, 5), l.pickup ?? "", l.dropoff ?? "",
      CITY_LABELS[tripCity(l.pickup, l.dropoff)],
      l.full_name, l.whatsapp || l.phone || "", l.email ?? "", l.passengers, l.status, given.has(l.id) ? givenToLabel(given.get(l.id)!.note) : "", given.has(l.id) ? formatDateTime(given.get(l.id)!.created_at) : "",
      l.source ?? "", money(l.estimated_value), l.currency ?? "", l.notes ?? "",
    ]),
  };
}

/**
 * CSV that opens cleanly in Excel and Google Sheets: UTF-8 BOM (so "→",
 * "à", "€" survive Excel), CRLF line ends, and a leading apostrophe on
 * cells starting with = + - @ — website visitors type these fields, so
 * this stops formula injection, and it keeps "+39 …" phone numbers as text.
 */
export function toSheetCsv(table: Table): string {
  const cell = (value: string | number | null) => {
    let s = value == null ? "" : String(value);
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [table.columns, ...table.rows].map((row) => row.map(cell).join(","));
  return `﻿${lines.join("\r\n")}\r\n`;
}
