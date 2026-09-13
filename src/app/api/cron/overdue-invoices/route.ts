import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { notifyCustomer } from "@/lib/notifications/service";
import { formatCurrency, formatDate } from "@/lib/admin/format";

// Intended to be hit by an external scheduler (Vercel Cron, or any cron
// service) once daily. Requires CRON_SECRET to be set and passed as
// `Authorization: Bearer <CRON_SECRET>` — see the implementation report for
// the exact scheduler configuration needed.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data: markedCount, error } = await supabase.rpc("mark_overdue_invoices");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: overdueInvoices } = await supabase
    .from("invoices")
    .select("id, invoice_number, balance_due, currency, due_date, customers(full_name, email)")
    .eq("status", "OVERDUE")
    .is("deleted_at", null);

  let emailed = 0;
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

  for (const invoice of overdueInvoices ?? []) {
    const customer = (invoice as any).customers;
    if (!customer?.email) continue;

    const { data: recentNotification } = await supabase
      .from("notifications")
      .select("id")
      .eq("event_type", "payment_overdue")
      .eq("related_entity_id", invoice.id)
      .gte("created_at", threeDaysAgo)
      .maybeSingle();
    if (recentNotification) continue;

    await notifyCustomer({
      templateKey: "payment_overdue",
      to: customer.email,
      vars: {
        customer_name: customer.full_name ?? "",
        invoice_number: invoice.invoice_number,
        balance_due: formatCurrency(invoice.balance_due, invoice.currency),
        due_date: formatDate(invoice.due_date),
      },
      relatedEntityType: "invoice",
      relatedEntityId: invoice.id,
    });
    emailed++;
  }

  return NextResponse.json({ markedOverdue: markedCount ?? 0, emailed });
}
