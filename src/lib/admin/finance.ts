import "server-only";

import { createClient } from "@/lib/supabase/server";
import { resolveDateRange, isoDate, type DateRangeKey } from "@/lib/admin/date-range";

export async function getFinanceDashboard(range: DateRangeKey) {
  const supabase = await createClient();
  const { from, to } = resolveDateRange(range);
  const fromDate = from ? isoDate(from) : "1970-01-01";
  const toDate = isoDate(to);

  const [
    { data: bookings },
    { data: payments },
    { data: outstandingInvoices },
    { data: overdueInvoices },
    { data: expenses },
    { data: payouts },
  ] = await Promise.all([
    supabase.from("bookings").select("total, currency, status").gte("trip_date", fromDate).lte("trip_date", toDate).is("deleted_at", null),
    supabase.from("payments").select("amount, currency").gte("payment_date", fromDate).lte("payment_date", toDate).is("deleted_at", null),
    supabase.from("invoices").select("balance_due, currency").in("status", ["SENT", "PARTIALLY_PAID", "OVERDUE"]).is("deleted_at", null),
    supabase.from("invoices").select("balance_due, currency").eq("status", "OVERDUE").is("deleted_at", null),
    supabase.from("expenses").select("amount, currency, status").gte("expense_date", fromDate).lte("expense_date", toDate).is("deleted_at", null),
    supabase.from("driver_payouts").select("net_payout, currency, status").gte("period_end", fromDate).lte("period_end", toDate),
  ]);

  const revenue = (bookings ?? []).filter((b) => b.status !== "CANCELLED").reduce((s, b) => s + Number(b.total), 0);
  const collected = (payments ?? []).reduce((s, p) => s + Number(p.amount), 0);
  const outstanding = (outstandingInvoices ?? []).reduce((s, i) => s + Number(i.balance_due), 0);
  const overdue = (overdueInvoices ?? []).reduce((s, i) => s + Number(i.balance_due), 0);
  // Only APPROVED/PAID expenses count as a real cost — a DRAFT/SUBMITTED/
  // REJECTED expense hasn't been confirmed as a legitimate business cost yet.
  const expenseTotal = (expenses ?? []).filter((e) => ["APPROVED", "PAID"].includes(e.status)).reduce((s, e) => s + Number(e.amount), 0);
  const payoutTotal = (payouts ?? []).reduce((s, p) => s + Number(p.net_payout), 0);
  const grossProfit = revenue - expenseTotal;
  const estimatedNetProfit = revenue - expenseTotal - payoutTotal;

  // Revenue by currency (no conversion — each currency's total stands alone)
  const byCurrency = new Map<string, number>();
  for (const b of bookings ?? []) {
    if (b.status === "CANCELLED") continue;
    byCurrency.set(b.currency, (byCurrency.get(b.currency) ?? 0) + Number(b.total));
  }

  return {
    range,
    revenue,
    collected,
    outstanding,
    overdue,
    expenses: expenseTotal,
    driverPayouts: payoutTotal,
    grossProfit,
    estimatedNetProfit,
    revenueByCurrency: [...byCurrency.entries()].map(([currency, amount]) => ({ currency, amount })),
  };
}
