"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_FINANCE } from "@/lib/auth/roles";

const RefundSchema = z.object({
  payment_id: z.string().uuid("Select the payment to refund."),
  invoice_id: z.string().uuid(),
  amount: z.coerce.number().positive("Enter a refund amount greater than zero."),
  refund_type: z.enum(["FULL", "PARTIAL"]),
  reason: z.string().trim().min(1, "A reason is required."),
});

/** Creates a PENDING refund request — never touches the original payment
 * row, and doesn't move any money until a finance user both approves AND
 * processes it (two separate, deliberate steps). */
export async function requestRefund(invoiceId: string, formData: FormData): Promise<void> {
  const profile = await requireRole(MANAGE_FINANCE);
  const raw = Object.fromEntries(formData);
  const parsed = RefundSchema.safeParse({ ...raw, invoice_id: invoiceId });
  if (!parsed.success) redirect(`/admin/invoices/${invoiceId}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { data: payment } = await supabase.from("payments").select("amount, booking_id, customer_id, currency").eq("id", parsed.data.payment_id).single();
  if (!payment) redirect(`/admin/invoices/${invoiceId}?error=${encodeURIComponent("Payment not found.")}`);

  if (parsed.data.amount > Number(payment!.amount)) {
    redirect(`/admin/invoices/${invoiceId}?error=${encodeURIComponent("Refund amount can't exceed the original payment.")}`);
  }

  const { error } = await supabase.from("refunds").insert({
    payment_id: parsed.data.payment_id,
    invoice_id: parsed.data.invoice_id,
    booking_id: payment!.booking_id,
    customer_id: payment!.customer_id,
    amount: parsed.data.amount,
    currency: payment!.currency,
    refund_type: parsed.data.refund_type,
    reason: parsed.data.reason,
    requested_by: profile.id,
  });
  if (error) redirect(`/admin/invoices/${invoiceId}?error=${encodeURIComponent(error.message)}`);

  revalidatePath(`/admin/invoices/${invoiceId}`);
  redirect(`/admin/invoices/${invoiceId}?success=Refund+requested`);
}

export async function approveRefund(id: string, invoiceId: string) {
  const profile = await requireRole(MANAGE_FINANCE);
  const supabase = await createClient();
  const { error } = await supabase
    .from("refunds")
    .update({ status: "APPROVED", approved_by: profile.id, approved_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "PENDING");
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/invoices/${invoiceId}`);
}

const ProcessSchema = z.object({ refund_reference: z.string().trim().min(1, "A refund reference is required.") });

/** The only step that actually reduces the invoice's paid amount — requires
 * an explicit reference (bank transfer id, card refund id, cash receipt
 * number, ...) attesting the money actually moved. */
export async function processRefund(id: string, invoiceId: string, formData: FormData): Promise<void> {
  await requireRole(MANAGE_FINANCE);
  const parsed = ProcessSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/invoices/${invoiceId}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { error } = await supabase
    .from("refunds")
    .update({ status: "PROCESSED", refund_reference: parsed.data.refund_reference, processed_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "APPROVED");
  if (error) redirect(`/admin/invoices/${invoiceId}?error=${encodeURIComponent(error.message)}`);

  revalidatePath(`/admin/invoices/${invoiceId}`);
  redirect(`/admin/invoices/${invoiceId}?success=Refund+processed`);
}
