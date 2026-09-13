"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_FINANCE } from "@/lib/auth/roles";
import { notifyCustomer } from "@/lib/notifications/service";
import { formatCurrency, formatDate } from "@/lib/admin/format";

export async function sendPaymentReminder(invoiceId: string) {
  await requireRole(MANAGE_FINANCE);
  const supabase = await createClient();

  const { data: invoice } = await supabase
    .from("invoices")
    .select("invoice_number, balance_due, currency, due_date, customers(full_name, email)")
    .eq("id", invoiceId)
    .maybeSingle();
  if (!invoice) throw new Error("Invoice not found.");

  const customer = (invoice as any).customers;
  if (!customer?.email) throw new Error("This customer has no email on file.");

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
    relatedEntityId: invoiceId,
  });

  revalidatePath("/admin/finance/receivables");
}
