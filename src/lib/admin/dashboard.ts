import "server-only";

import { createClient } from "@/lib/supabase/server";
import { resolveDateRange, isoDate, isoDateTime, type DateRangeKey } from "@/lib/admin/date-range";

// Mirrors the `returns table (...)` shape of the dashboard_*_kpis SQL
// functions (20260909121100_dashboard_kpis.sql). Supabase-js can't infer
// RPC return shapes without generated Database types, so these are typed
// by hand until `generate_typescript_types` runs against the live schema.
export type OperationalKpis = {
  todays_trips: number;
  upcoming_trips: number;
  pending_bookings: number;
  confirmed_bookings: number;
  completed_bookings: number;
  cancelled_bookings: number;
  unassigned_trips: number;
};

export type CrmKpis = {
  new_leads: number;
  pending_quotations: number;
  accepted_quotations: number;
  sent_quotations: number;
  new_customers: number;
};

export type FinanceKpis = {
  revenue_period: number;
  payments_received_period: number;
  outstanding_invoices: number;
  overdue_invoices_count: number;
  overdue_invoices_amount: number;
  expenses_period: number;
  todays_revenue: number;
};

export async function getDashboardData(range: DateRangeKey) {
  const supabase = await createClient();
  const now = new Date();
  const { from, to } = resolveDateRange(range, now);
  const today = isoDate(now);
  const fromIso = from ? isoDateTime(from) : "1970-01-01T00:00:00.000Z";
  const toIso = isoDateTime(to);

  const [
    operationalRes,
    crmRes,
    financeRes,
    recentBookingsRes,
    upcomingTripsRes,
    recentPaymentsRes,
    pendingQuotationsRes,
    followUpsDueRes,
    unassignedTripsRes,
  ] = await Promise.all([
    supabase.rpc("dashboard_operational_kpis", { p_today: today }).single(),
    supabase.rpc("dashboard_crm_kpis", { p_from: fromIso, p_to: toIso }).single(),
    supabase.rpc("dashboard_finance_kpis", { p_from: fromIso, p_to: toIso, p_today: today }).single(),
    supabase
      .from("bookings")
      .select("id, booking_reference, pickup, dropoff, trip_date, trip_time, status, customers(full_name)")
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("bookings")
      .select("id, booking_reference, pickup, dropoff, trip_date, trip_time, status, drivers(full_name), vehicles(name)")
      .is("deleted_at", null)
      .gte("trip_date", today)
      .not("status", "in", "(CANCELLED,COMPLETED,NO_SHOW)")
      .order("trip_date", { ascending: true })
      .order("trip_time", { ascending: true })
      .limit(5),
    supabase
      .from("payments")
      .select("id, amount, currency, method, payment_date, customers(full_name)")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("quotations")
      .select("id, quotation_number, total, currency, status, customers(full_name)")
      .in("status", ["SENT", "VIEWED"])
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("follow_ups")
      .select("id, type, notes, due_date, customers(full_name)")
      .eq("status", "PENDING")
      .eq("due_date", today)
      .limit(5),
    supabase
      .from("bookings")
      .select("id, booking_reference, pickup, dropoff, trip_date, trip_time")
      .is("deleted_at", null)
      .is("driver_id", null)
      .not("status", "in", "(CANCELLED,COMPLETED,NO_SHOW)")
      .order("trip_date", { ascending: true })
      .limit(5),
  ]);

  return {
    range,
    operational: operationalRes.data as OperationalKpis | null,
    crm: crmRes.data as CrmKpis | null,
    finance: financeRes.data as FinanceKpis | null,
    recentBookings: recentBookingsRes.data ?? [],
    upcomingTrips: upcomingTripsRes.data ?? [],
    recentPayments: recentPaymentsRes.data ?? [],
    pendingQuotations: pendingQuotationsRes.data ?? [],
    followUpsDue: followUpsDueRes.data ?? [],
    unassignedTrips: unassignedTripsRes.data ?? [],
  };
}
