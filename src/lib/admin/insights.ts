import "server-only";

import { createClient } from "@/lib/supabase/server";
import { resolveDateRange, isoDate, type DateRangeKey } from "@/lib/admin/date-range";

export type FunnelStage = { label: string; count: number };
export type RouteStat = { route: string; trips: number; revenue: number };
export type DriverStat = { id: string; name: string; trips: number; revenue: number; cancellations: number };
export type VehicleStat = { id: string; name: string; trips: number; revenue: number };
export type ProfitabilitySummary = {
  revenue: number;
  driverCost: number;
  vehicleCost: number;
  otherCost: number;
  totalCost: number;
  profit: number;
  marginPct: number;
};

const VEHICLE_EXPENSE_CATEGORIES = ["FUEL", "TOLL", "PARKING", "MAINTENANCE"];
const OTHER_EXPENSE_CATEGORIES = ["AIRPORT", "COMMISSION", "OTHER"];

export async function getInsights(range: DateRangeKey) {
  const supabase = await createClient();
  const { from, to } = resolveDateRange(range);
  const fromDate = from ? isoDate(from) : "1970-01-01";
  const toDate = isoDate(to);

  const [leadsRes, quotationsRes, bookingsRes, expensesRes] = await Promise.all([
    supabase.from("leads").select("id, created_at").gte("created_at", fromDate).lte("created_at", toDate).is("deleted_at", null),
    supabase
      .from("quotations")
      .select("id, status, created_at, accepted_at")
      .gte("created_at", fromDate)
      .lte("created_at", toDate)
      .is("deleted_at", null),
    supabase
      .from("bookings")
      .select("id, pickup, dropoff, total, status, trip_date, driver_id, vehicle_id, drivers(full_name), vehicles(name)")
      .gte("trip_date", fromDate)
      .lte("trip_date", toDate)
      .is("deleted_at", null),
    supabase.from("expenses").select("category, amount").gte("expense_date", fromDate).lte("expense_date", toDate).is("deleted_at", null),
  ]);

  const leads = leadsRes.data ?? [];
  const quotations = quotationsRes.data ?? [];
  const bookings = (bookingsRes.data ?? []) as unknown as {
    id: string;
    pickup: string;
    dropoff: string;
    total: number;
    status: string;
    driver_id: string | null;
    vehicle_id: string | null;
    drivers: { full_name: string } | null;
    vehicles: { name: string } | null;
  }[];
  const expenses = expensesRes.data ?? [];

  // ---------------------------------------------------------------------
  // Sales funnel
  // ---------------------------------------------------------------------
  const quotationsSent = quotations.filter((q) => q.status !== "DRAFT").length;
  const quotationsAccepted = quotations.filter((q) => q.status === "ACCEPTED" || q.status === "CONVERTED").length;
  const bookingsCreated = bookings.filter((b) => b.status !== "CANCELLED").length;
  const tripsCompleted = bookings.filter((b) => b.status === "COMPLETED").length;

  const funnel: FunnelStage[] = [
    { label: "New leads", count: leads.length },
    { label: "Quotations sent", count: quotationsSent },
    { label: "Quotations accepted", count: quotationsAccepted },
    { label: "Bookings created", count: bookingsCreated },
    { label: "Trips completed", count: tripsCompleted },
  ];

  // ---------------------------------------------------------------------
  // Route analytics — top pickup -> dropoff pairs by trip volume
  // ---------------------------------------------------------------------
  const routeMap = new Map<string, RouteStat>();
  for (const b of bookings) {
    if (b.status === "CANCELLED") continue;
    const key = `${b.pickup} → ${b.dropoff}`;
    const existing = routeMap.get(key) ?? { route: key, trips: 0, revenue: 0 };
    existing.trips += 1;
    existing.revenue += Number(b.total);
    routeMap.set(key, existing);
  }
  const topRoutes = [...routeMap.values()].sort((a, b) => b.trips - a.trips).slice(0, 10);

  // ---------------------------------------------------------------------
  // Driver / vehicle analytics
  // ---------------------------------------------------------------------
  const driverMap = new Map<string, DriverStat>();
  const vehicleMap = new Map<string, VehicleStat>();
  for (const b of bookings) {
    if (b.driver_id) {
      const existing = driverMap.get(b.driver_id) ?? { id: b.driver_id, name: b.drivers?.full_name ?? "Unknown", trips: 0, revenue: 0, cancellations: 0 };
      if (b.status === "CANCELLED") existing.cancellations += 1;
      else {
        existing.trips += 1;
        existing.revenue += Number(b.total);
      }
      driverMap.set(b.driver_id, existing);
    }
    if (b.vehicle_id && b.status !== "CANCELLED") {
      const existing = vehicleMap.get(b.vehicle_id) ?? { id: b.vehicle_id, name: b.vehicles?.name ?? "Unknown", trips: 0, revenue: 0 };
      existing.trips += 1;
      existing.revenue += Number(b.total);
      vehicleMap.set(b.vehicle_id, existing);
    }
  }
  const topDrivers = [...driverMap.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 10);
  const topVehicles = [...vehicleMap.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 10);

  // ---------------------------------------------------------------------
  // Profitability — revenue from non-cancelled bookings in range, costs
  // from expenses in the same range, grouped into driver/vehicle/other.
  // ---------------------------------------------------------------------
  const revenue = bookings.filter((b) => b.status !== "CANCELLED" && b.status !== "NO_SHOW").reduce((s, b) => s + Number(b.total), 0);
  const driverCost = expenses.filter((e) => e.category === "DRIVER").reduce((s, e) => s + Number(e.amount), 0);
  const vehicleCost = expenses.filter((e) => VEHICLE_EXPENSE_CATEGORIES.includes(e.category)).reduce((s, e) => s + Number(e.amount), 0);
  const otherCost = expenses.filter((e) => OTHER_EXPENSE_CATEGORIES.includes(e.category)).reduce((s, e) => s + Number(e.amount), 0);
  const totalCost = driverCost + vehicleCost + otherCost;
  const profit = revenue - totalCost;

  const profitability: ProfitabilitySummary = {
    revenue,
    driverCost,
    vehicleCost,
    otherCost,
    totalCost,
    profit,
    marginPct: revenue > 0 ? (profit / revenue) * 100 : 0,
  };

  return { range, funnel, topRoutes, topDrivers, topVehicles, profitability };
}
