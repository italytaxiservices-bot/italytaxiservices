import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/dal";
import { canManageOps } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { QuickDriverSend, type DriverOption } from "@/components/admin/bookings/QuickDriverSend";
import { businessToday, formatDate, formatTime, formatReceived } from "@/lib/admin/format";
import { CITY_LABELS, CITY_ORDER, tripCity, type CityKey } from "@/lib/admin/cities";
import { bookingBriefing, leadBriefing } from "@/lib/admin/driverBriefingText";
import { getLatestDriverBriefings } from "@/lib/admin/driverBriefing";

export const metadata: Metadata = { title: "Trips by city" };

const TYPES = { all: "Bookings + website requests", bookings: "Bookings only", leads: "Website requests only" } as const;
type TypeKey = keyof typeof TYPES;

type Trip = {
  kind: "booking" | "lead";
  id: string;
  ref: string;
  href: string;
  city: CityKey;
  date: string;
  time: string | null;
  pickup: string;
  dropoff: string;
  passenger: string;
  passengers: number | null;
  status: string;
  driverId: string | null;
  driverName: string | null;
  briefing: string;
};

/**
 * Upcoming trips grouped by operating city, so each city's work can be
 * handed to a driver who covers it: pick a driver, copy/WhatsApp the trip
 * summary, and the send is logged on the booking.
 */
export default async function TripsByCityPage({ searchParams }: { searchParams: Promise<{ city?: string; type?: string }> }) {
  const profile = await requireUser();
  const { city: rawCity, type: rawType } = await searchParams;
  const selectedCity = CITY_ORDER.includes(rawCity as CityKey) ? (rawCity as CityKey) : null;
  const type: TypeKey = rawType && rawType in TYPES ? (rawType as TypeKey) : "all";
  const canSend = canManageOps(profile.role);
  const today = businessToday();

  const supabase = await createClient();
  const [bookingsRes, leadsRes, driversRes, historyRes] = await Promise.all([
    type === "leads"
      ? Promise.resolve({ data: [] as any[] })
      : supabase
          .from("bookings")
          .select(
            "id, booking_reference, trip_date, trip_time, pickup, dropoff, passengers, luggage, status, flight_number, flight_terminal, flight_arrival_time, meet_and_greet_notes, special_requests, customer_notes, customers(full_name, phone), vehicles(name), drivers(id, full_name)"
          )
          .is("deleted_at", null)
          .gte("trip_date", today)
          .not("status", "in", "(CANCELLED,COMPLETED,NO_SHOW)")
          .order("trip_date", { ascending: true })
          .order("trip_time", { ascending: true })
          .limit(300),
    type === "bookings"
      ? Promise.resolve({ data: [] as any[] })
      : supabase
          .from("leads")
          // WON leads were converted into bookings — skip them to avoid listing a trip twice.
          .select("id, lead_number, full_name, phone, pickup, dropoff, trip_date, trip_time, passengers, notes, status")
          .is("deleted_at", null)
          .gte("trip_date", today)
          .not("status", "in", "(WON,LOST)")
          .order("trip_date", { ascending: true })
          .limit(300),
    supabase.from("drivers").select("id, full_name, phone, whatsapp").eq("active", true).is("deleted_at", null).order("full_name"),
    // Past assignments tell us which drivers actually work in which city.
    supabase.from("bookings").select("pickup, dropoff, driver_id").not("driver_id", "is", null).is("deleted_at", null).order("trip_date", { ascending: false }).limit(1000),
  ]);

  const trips: Trip[] = [
    ...(bookingsRes.data ?? []).map((b: any): Trip => ({
      kind: "booking",
      id: b.id,
      ref: b.booking_reference,
      href: `/admin/bookings/${b.id}`,
      city: tripCity(b.pickup, b.dropoff),
      date: b.trip_date,
      time: b.trip_time,
      pickup: b.pickup,
      dropoff: b.dropoff,
      passenger: b.customers?.full_name ?? "—",
      passengers: b.passengers,
      status: b.status,
      driverId: b.drivers?.id ?? null,
      driverName: b.drivers?.full_name ?? null,
      briefing: bookingBriefing({ ...b, customer: b.customers, vehicleName: b.vehicles?.name }),
    })),
    ...(leadsRes.data ?? []).map((l: any): Trip => ({
      kind: "lead",
      id: l.id,
      ref: l.lead_number,
      href: `/admin/leads/${l.id}`,
      city: tripCity(l.pickup, l.dropoff),
      date: l.trip_date,
      time: l.trip_time,
      pickup: l.pickup ?? "—",
      dropoff: l.dropoff ?? "—",
      passenger: l.full_name,
      passengers: l.passengers,
      status: l.status,
      driverId: null,
      driverName: null,
      briefing: leadBriefing(l),
    })),
  ].sort((a, b) => `${a.date} ${a.time ?? "99"}`.localeCompare(`${b.date} ${b.time ?? "99"}`));

  // Trip counts per driver per city from past assignments.
  const experience = new Map<CityKey, Map<string, number>>();
  for (const h of historyRes.data ?? []) {
    const c = tripCity(h.pickup, h.dropoff);
    const perDriver = experience.get(c) ?? new Map<string, number>();
    perDriver.set(h.driver_id as string, (perDriver.get(h.driver_id as string) ?? 0) + 1);
    experience.set(c, perDriver);
  }
  const allDrivers = (driversRes.data ?? []).map((d) => ({ id: d.id, name: d.full_name, phone: d.whatsapp || d.phone }));
  function driversFor(city: CityKey): { local: (DriverOption & { trips: number })[]; options: DriverOption[] } {
    const counts = experience.get(city) ?? new Map<string, number>();
    const local = allDrivers
      .filter((d) => counts.has(d.id))
      .map((d) => ({ ...d, trips: counts.get(d.id)!, hint: `${counts.get(d.id)} trips here` }))
      .sort((a, b) => b.trips - a.trips);
    const others = allDrivers.filter((d) => !counts.has(d.id));
    return { local, options: [...local, ...others] };
  }

  const [bookingSent, leadSent] = await Promise.all([
    getLatestDriverBriefings("booking", trips.filter((t) => t.kind === "booking").map((t) => t.id)),
    getLatestDriverBriefings("lead", trips.filter((t) => t.kind === "lead").map((t) => t.id)),
  ]);

  const countByCity = new Map<CityKey, number>();
  for (const t of trips) countByCity.set(t.city, (countByCity.get(t.city) ?? 0) + 1);
  const cities = CITY_ORDER.filter((c) => countByCity.has(c) && (!selectedCity || c === selectedCity));

  const href = (params: { city?: CityKey | null; type?: TypeKey }) => {
    const sp = new URLSearchParams();
    const c = params.city === undefined ? selectedCity : params.city;
    const t = params.type ?? type;
    if (c) sp.set("city", c);
    if (t !== "all") sp.set("type", t);
    const qs = sp.toString();
    return `/admin/by-city${qs ? `?${qs}` : ""}`;
  };
  const chip = (active: boolean) =>
    `px-3 py-1.5 text-xs rounded-sm border ${active ? "bg-admin-navy text-admin-ivory border-admin-navy" : "border-admin-line bg-white text-admin-stone hover:bg-admin-ivory-deep"}`;

  return (
    <div>
      <PageHeader
        title="Trips by city"
        description={`Upcoming trips from ${formatDate(today)}, grouped by pickup city. Pick a driver for that city and send.`}
      />

      <div className="mb-3 flex flex-wrap gap-1.5">
        <Link href={href({ city: null })} className={chip(!selectedCity)}>
          All cities ({trips.length})
        </Link>
        {CITY_ORDER.filter((c) => countByCity.has(c)).map((c) => (
          <Link key={c} href={href({ city: c })} className={chip(selectedCity === c)}>
            {CITY_LABELS[c]} ({countByCity.get(c)})
          </Link>
        ))}
      </div>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {(Object.keys(TYPES) as TypeKey[]).map((t) => (
          <Link key={t} href={href({ type: t })} className={chip(type === t)}>
            {TYPES[t]}
          </Link>
        ))}
      </div>

      {cities.length === 0 ? (
        <Card>
          <EmptyState title="No upcoming trips" />
        </Card>
      ) : (
        <div className="space-y-6">
          {cities.map((city) => {
            const items = trips.filter((t) => t.city === city);
            const { local, options } = driversFor(city);
            return (
              <section key={city}>
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-base font-semibold text-admin-ink">
                    📍 {CITY_LABELS[city]} <span className="text-sm font-normal text-admin-stone">· {items.length} trips</span>
                  </h2>
                  <p className="text-xs text-admin-stone">
                    {local.length > 0
                      ? `Drivers who've worked here: ${local.slice(0, 5).map((d) => `${d.name} (${d.trips})`).join(", ")}`
                      : "No past trips here yet — choose any driver"}
                  </p>
                </div>
                <Card>
                  <ul className="divide-y divide-admin-line">
                    {items.map((t) => {
                      const sent = (t.kind === "booking" ? bookingSent : leadSent).get(t.id);
                      return (
                        <li key={`${t.kind}-${t.id}`} className="px-4 py-3 space-y-2">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-sm">
                                <span className="font-semibold text-admin-ink">
                                  {formatDate(t.date)} · {formatTime(t.time)}
                                </span>{" "}
                                <Link href={t.href} className="text-admin-gold hover:underline">
                                  {t.ref}
                                </Link>{" "}
                                <span
                                  className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-sm ${
                                    t.kind === "booking" ? "bg-admin-navy text-admin-ivory" : "bg-amber-100 text-amber-800"
                                  }`}
                                >
                                  {t.kind === "booking" ? "Booking" : "Website request"}
                                </span>
                              </p>
                              <p className="text-xs text-admin-ink">
                                {t.pickup} → {t.dropoff}
                              </p>
                              <p className="text-xs text-admin-stone">
                                👤 {t.passenger}
                                {t.passengers ? ` · 👥 ${t.passengers}` : ""}
                                {t.kind === "booking" ? ` · 🚘 ${t.driverName ?? "No driver assigned"}` : ""}
                              </p>
                            </div>
                            <StatusBadge status={t.status} />
                          </div>
                          {canSend ? (
                            <QuickDriverSend
                              text={t.briefing}
                              entityType={t.kind}
                              entityId={t.id}
                              drivers={options}
                              defaultDriverId={t.driverId ?? (local.length === 1 ? local[0].id : null)}
                              sentLabel={sent ? `${sent.note} · ${formatReceived(sent.created_at)}` : null}
                            />
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
