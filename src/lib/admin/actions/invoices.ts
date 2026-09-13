"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_FINANCE } from "@/lib/auth/roles";
import { notifyCustomer } from "@/lib/notifications/service";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import { getInvoicePdfDocument } from "@/lib/pdf/invoice";
import { renderToBuffer } from "@react-pdf/renderer";

export type FormState = { error?: string } | undefined;

const ItemSchema = z.object({
  description: z.string().trim().min(1),
  quantity: z.coerce.number().positive(),
  unit_price: z.coerce.number().nonnegative(),
});

const ManualInvoiceSchema = z.object({
  customer_id: z.string().uuid("Select a customer."),
  booking_id: z.string().uuid().optional().or(z.literal("")),
  discount: z.coerce.number().nonnegative().default(0),
  tax_rate: z.coerce.number().nonnegative().default(0),
  currency: z.string().trim().default("EUR"),
  due_date: z.string().trim().optional().or(z.literal("")),
  payment_terms: z.string().trim().optional().or(z.literal("")),
  terms_and_conditions: z.string().trim().optional().or(z.literal("")),
  items: z.string().min(1),
});

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

export async function createManualInvoice(_prevState: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireRole(MANAGE_FINANCE);
  const parsed = ManualInvoiceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  let items: z.infer<typeof ItemSchema>[];
  try {
    items = z.array(ItemSchema).min(1, "Add at least one line item.").parse(JSON.parse(parsed.data.items));
  } catch {
    return { error: "Add at least one valid line item." };
  }

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
  const discount = parsed.data.discount;
  const taxAmount = Math.max(0, subtotal - discount) * (parsed.data.tax_rate / 100);
  const total = Math.max(0, subtotal - discount) + taxAmount;

  const supabase = await createClient();

  if (parsed.data.booking_id) {
    const { data: existing } = await supabase.from("invoices").select("id").eq("booking_id", parsed.data.booking_id).maybeSingle();
    if (existing) return { error: "This booking already has an invoice." };
  }

  const { data: invoice, error } = await supabase
    .from("invoices")
    .insert({
      // Filled in by the assign_invoice_number trigger.
      invoice_number: undefined!,
      customer_id: parsed.data.customer_id,
      booking_id: toNullable(parsed.data.booking_id),
      subtotal,
      discount,
      tax_rate: parsed.data.tax_rate,
      tax_amount: taxAmount,
      total,
      currency: parsed.data.currency,
      due_date: toNullable(parsed.data.due_date),
      payment_terms: toNullable(parsed.data.payment_terms),
      terms_and_conditions: toNullable(parsed.data.terms_and_conditions),
      status: "DRAFT",
      created_by: profile.id,
    })
    .select("id")
    .single();
  if (error || !invoice) return { error: error?.message ?? "Could not create invoice." };

  const { error: itemsError } = await supabase.from("invoice_items").insert(
    items.map((item, index) => ({
      invoice_id: invoice.id,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      amount: item.quantity * item.unit_price,
      sort_order: index,
    }))
  );
  if (itemsError) return { error: itemsError.message };

  await supabase.rpc("log_activity", {
    p_action: "invoice.created",
    p_entity_type: "invoice",
    p_entity_id: invoice.id,
    p_metadata: { manual: true },
  });

  revalidatePath("/admin/invoices");
  redirect(`/admin/invoices/${invoice.id}?success=Invoice+created`);
}

export async function createInvoiceForBooking(bookingId: string) {
  await requireRole(MANAGE_FINANCE);
  const supabase = await createClient();

  const { data: existing } = await supabase.from("invoices").select("id").eq("booking_id", bookingId).maybeSingle();
  if (existing) {
    redirect(`/admin/invoices/${existing.id}`);
  }

  const { data: booking } = await supabase.from("bookings").select("*").eq("id", bookingId).single();
  if (!booking) throw new Error("Booking not found.");

  const { data: invoice, error } = await supabase
    .from("invoices")
    .insert({
      // Filled in by the assign_invoice_number trigger.
      invoice_number: undefined!,
      booking_id: booking.id,
      customer_id: booking.customer_id,
      subtotal: booking.price,
      discount: booking.discount,
      tax_amount: booking.tax_amount,
      total: booking.total,
      currency: booking.currency,
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      status: "DRAFT",
    })
    .select("id")
    .single();
  if (error || !invoice) throw new Error(error?.message ?? "Could not create invoice.");

  await supabase.from("invoice_items").insert({
    invoice_id: invoice.id,
    description: `Trip: ${booking.pickup} → ${booking.dropoff} (${booking.booking_reference})`,
    quantity: 1,
    unit_price: booking.price,
    amount: booking.price,
    sort_order: 0,
  });

  await supabase.rpc("log_activity", {
    p_action: "invoice.created",
    p_entity_type: "invoice",
    p_entity_id: invoice.id,
    p_metadata: { booking_id: bookingId },
  });

  revalidatePath("/admin/invoices");
  redirect(`/admin/invoices/${invoice.id}?success=Invoice+created`);
}

export async function markInvoiceSent(id: string) {
  await requireRole(MANAGE_FINANCE);
  const supabase = await createClient();
  const { error } = await supabase.from("invoices").update({ status: "SENT", sent_at: new Date().toISOString() }).eq("id", id);
  if (error) throw new Error(error.message);

  await supabase.rpc("log_activity", { p_action: "invoice.sent", p_entity_type: "invoice", p_entity_id: id, p_metadata: {} });

  const { data: invoice } = await supabase
    .from("invoices")
    .select("invoice_number, total, currency, due_date, customers(full_name, email)")
    .eq("id", id)
    .maybeSingle();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customer = (invoice as any)?.customers;
  if (invoice && customer?.email) {
    // Best-effort PDF attachment — a failed render must never block the
    // email itself.
    let attachments: { filename: string; content: Buffer }[] | undefined;
    try {
      const doc = await getInvoicePdfDocument(id);
      if (doc) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const buffer = await renderToBuffer(doc.element as any);
        attachments = [{ filename: doc.filename, content: buffer }];
      }
    } catch (err) {
      console.error("invoice PDF attachment failed", err instanceof Error ? err.message : err);
    }

    await notifyCustomer({
      templateKey: "invoice_created",
      to: customer.email,
      vars: {
        customer_name: customer.full_name ?? "",
        invoice_number: invoice.invoice_number,
        total: formatCurrency(invoice.total, invoice.currency),
        due_date: invoice.due_date ? formatDate(invoice.due_date) : "—",
        pdf_note: attachments ? " (attached as a PDF)" : "",
      },
      relatedEntityType: "invoice",
      relatedEntityId: id,
      attachments,
    });
  }

  revalidatePath(`/admin/invoices/${id}`);
  revalidatePath("/admin/invoices");
}

export async function voidInvoice(id: string) {
  await requireRole(MANAGE_FINANCE);
  const supabase = await createClient();
  const { error } = await supabase.from("invoices").update({ status: "VOID" }).eq("id", id);
  if (error) throw new Error(error.message);

  await supabase.rpc("log_activity", { p_action: "invoice.voided", p_entity_type: "invoice", p_entity_id: id, p_metadata: {} });

  revalidatePath(`/admin/invoices/${id}`);
  revalidatePath("/admin/invoices");
}

const PaymentSchema = z.object({
  amount: z.coerce.number().positive("Enter an amount greater than zero."),
  method: z.enum(["CASH", "BANK_TRANSFER", "CARD", "ONLINE", "OTHER"]),
  reference_number: z.string().trim().optional().or(z.literal("")),
  payment_date: z.string().trim().min(1, "Payment date is required."),
  notes: z.string().trim().optional().or(z.literal("")),
});

export async function recordPayment(invoiceId: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireRole(MANAGE_FINANCE);
  const parsed = PaymentSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const supabase = await createClient();
  // The before_payment_insert trigger validates this doesn't exceed the
  // remaining balance, and the reconcile/receipt triggers do the rest —
  // this insert is the entire operation.
  const { error } = await supabase.from("payments").insert({
    invoice_id: invoiceId,
    amount: parsed.data.amount,
    method: parsed.data.method,
    reference_number: parsed.data.reference_number || null,
    payment_date: parsed.data.payment_date,
    notes: parsed.data.notes || null,
    recorded_by: profile.id,
  });

  if (error) {
    return { error: error.message };
  }

  await supabase.rpc("log_activity", {
    p_action: "payment.recorded",
    p_entity_type: "invoice",
    p_entity_id: invoiceId,
    p_metadata: { amount: parsed.data.amount, method: parsed.data.method },
  });

  const { data: invoice } = await supabase
    .from("invoices")
    .select("invoice_number, amount_paid, balance_due, currency, customers(full_name, email), receipts(receipt_number)")
    .eq("id", invoiceId)
    .maybeSingle();
  const customer = (invoice as any)?.customers;
  if (invoice && customer?.email) {
    const receipts = (invoice as any).receipts as { receipt_number: string }[] | undefined;
    await notifyCustomer({
      templateKey: "payment_confirmation",
      to: customer.email,
      vars: {
        customer_name: customer.full_name ?? "",
        invoice_number: invoice.invoice_number,
        amount_paid: formatCurrency(invoice.amount_paid, invoice.currency),
        balance_due: formatCurrency(invoice.balance_due, invoice.currency),
        receipt_number: receipts?.at(-1)?.receipt_number ?? "",
      },
      relatedEntityType: "invoice",
      relatedEntityId: invoiceId,
    });
  }

  revalidatePath(`/admin/invoices/${invoiceId}`);
  revalidatePath("/admin/invoices");
  revalidatePath("/admin/payments");
  revalidatePath("/admin/receipts");
}
