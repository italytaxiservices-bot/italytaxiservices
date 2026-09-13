import "server-only";

import { createClient } from "@/lib/supabase/server";
import { resolveDateRange, isoDate, type DateRangeKey } from "@/lib/admin/date-range";

export type VehicleCostSummary = {
  vehicleId: string;
  name: string;
  status: string;
  trips: number;
  revenue: number;
  fuelCost: number;
  maintenanceCost: number;
  tollsCost: number;
  otherCost: number;
  totalCost: number;
  profit: number;
  revenuePerTrip: number;
  costPerTrip: number;
};

/** Per-vehicle profitability for the given range — revenue from
 * non-cancelled bookings, cost from expenses (categorized) plus
 * vehicle_maintenance records, both dated within the same range. */
export async function getFleetCostAnalytics(range: DateRangeKey): Promise<VehicleCostSummary[]> {
  const supabase = await createClient();
  const { from, to } = resolveDateRange(range);
  const fromDate = from ? isoDate(from) : "1970-01-01";
  const toDate = isoDate(to);

  const [{ data: vehicles }, { data: bookings }, { data: expenses }, { data: maintenance }] = await Promise.all([
    supabase.from("vehicles").select("id, name, status").is("deleted_at", null),
    supabase
      .from("bookings")
      .select("vehicle_id, total, status")
      .gte("trip_date", fromDate)
      .lte("trip_date", toDate)
      .is("deleted_at", null)
      .not("vehicle_id", "is", null),
    supabase
      .from("expenses")
      .select("vehicle_id, category, amount")
      .gte("expense_date", fromDate)
      .lte("expense_date", toDate)
      .is("deleted_at", null)
      .not("vehicle_id", "is", null),
    supabase
      .from("vehicle_maintenance")
      .select("vehicle_id, cost")
      .gte("service_date", fromDate)
      .lte("service_date", toDate),
  ]);

  return (vehicles ?? []).map((v) => {
    const vBookings = (bookings ?? []).filter((b) => b.vehicle_id === v.id && b.status !== "CANCELLED");
    const vExpenses = (expenses ?? []).filter((e) => e.vehicle_id === v.id);
    const vMaintenance = (maintenance ?? []).filter((m) => m.vehicle_id === v.id);

    const revenue = vBookings.reduce((s, b) => s + Number(b.total), 0);
    const fuelCost = vExpenses.filter((e) => e.category === "FUEL").reduce((s, e) => s + Number(e.amount), 0);
    const tollsCost = vExpenses.filter((e) => e.category === "TOLL" || e.category === "PARKING").reduce((s, e) => s + Number(e.amount), 0);
    const otherCost = vExpenses
      .filter((e) => !["FUEL", "TOLL", "PARKING", "MAINTENANCE"].includes(e.category))
      .reduce((s, e) => s + Number(e.amount), 0);
    const maintenanceCost =
      vExpenses.filter((e) => e.category === "MAINTENANCE").reduce((s, e) => s + Number(e.amount), 0) +
      vMaintenance.reduce((s, m) => s + Number(m.cost), 0);

    const totalCost = fuelCost + maintenanceCost + tollsCost + otherCost;
    const trips = vBookings.length;

    return {
      vehicleId: v.id,
      name: v.name,
      status: v.status,
      trips,
      revenue,
      fuelCost,
      maintenanceCost,
      tollsCost,
      otherCost,
      totalCost,
      profit: revenue - totalCost,
      revenuePerTrip: trips > 0 ? revenue / trips : 0,
      costPerTrip: trips > 0 ? totalCost / trips : 0,
    };
  });
}
