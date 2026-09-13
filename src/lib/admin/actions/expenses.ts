"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_FINANCE, type UserRole } from "@/lib/auth/roles";

export type FormState = { error?: string } | undefined;

const EXPENSE_CREATORS: UserRole[] = ["SUPER_ADMIN", "ADMIN", "FINANCE", "OPERATIONS"];

const ExpenseSchema = z.object({
  category: z.enum(["DRIVER", "FUEL", "TOLL", "PARKING", "MAINTENANCE", "AIRPORT", "COMMISSION", "OTHER"]),
  amount: z.coerce.number().nonnegative(),
  currency: z.string().trim().default("EUR"),
  booking_id: z.string().uuid().optional().or(z.literal("")),
  driver_id: z.string().uuid().optional().or(z.literal("")),
  vehicle_id: z.string().uuid().optional().or(z.literal("")),
  description: z.string().trim().optional().or(z.literal("")),
  expense_date: z.string().trim().min(1, "Date is required."),
});

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

export async function createExpense(_prevState: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireRole(EXPENSE_CREATORS);
  const parsed = ExpenseSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const supabase = await createClient();
  const { data: expense, error } = await supabase
    .from("expenses")
    .insert({
      category: parsed.data.category,
      amount: parsed.data.amount,
      currency: parsed.data.currency,
      booking_id: toNullable(parsed.data.booking_id),
      driver_id: toNullable(parsed.data.driver_id),
      vehicle_id: toNullable(parsed.data.vehicle_id),
      description: toNullable(parsed.data.description),
      expense_date: parsed.data.expense_date,
      created_by: profile.id,
    })
    .select("id")
    .single();
  if (error || !expense) return { error: error?.message ?? "Could not create expense." };

  await supabase.rpc("log_activity", {
    p_action: "expense.created",
    p_entity_type: "expense",
    p_entity_id: expense.id,
    p_metadata: { category: parsed.data.category, amount: parsed.data.amount },
  });

  revalidatePath("/admin/expenses");
  redirect("/admin/expenses?success=Expense+added");
}

export async function deleteExpense(id: string) {
  await requireRole(MANAGE_FINANCE);
  const supabase = await createClient();
  const { error } = await supabase.from("expenses").update({ deleted_at: new Date().toISOString() }).eq("id", id);
  if (error) throw new Error(error.message);

  await supabase.rpc("log_activity", { p_action: "expense.deleted", p_entity_type: "expense", p_entity_id: id, p_metadata: {} });

  revalidatePath("/admin/expenses");
}

// ---------------------------------------------------------------------------
// Approval workflow: DRAFT -> SUBMITTED -> APPROVED/REJECTED -> PAID.
// RLS enforces who can move which transition (see expenses_update policy);
// these actions are the first-line check + the audit trail write.
// ---------------------------------------------------------------------------
export async function submitExpense(id: string) {
  const profile = await requireRole(EXPENSE_CREATORS);
  const supabase = await createClient();
  const { error } = await supabase
    .from("expenses")
    .update({ status: "SUBMITTED", submitted_by: profile.id, submitted_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "DRAFT");
  if (error) throw new Error(error.message);
  revalidatePath("/admin/expenses");
}

export async function approveExpense(id: string) {
  const profile = await requireRole(MANAGE_FINANCE);
  const supabase = await createClient();
  const { error } = await supabase
    .from("expenses")
    .update({ status: "APPROVED", approved_by: profile.id, approved_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "SUBMITTED");
  if (error) throw new Error(error.message);
  revalidatePath("/admin/expenses");
}

const RejectSchema = z.object({ rejection_reason: z.string().trim().min(1, "A reason is required.") });

export async function rejectExpense(id: string, formData: FormData): Promise<void> {
  const profile = await requireRole(MANAGE_FINANCE);
  const parsed = RejectSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/expenses?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { error } = await supabase
    .from("expenses")
    .update({ status: "REJECTED", rejected_by: profile.id, rejected_at: new Date().toISOString(), rejection_reason: parsed.data.rejection_reason })
    .eq("id", id)
    .eq("status", "SUBMITTED");
  if (error) redirect(`/admin/expenses?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/admin/expenses");
  redirect("/admin/expenses?success=Expense+rejected");
}

const MarkPaidSchema = z.object({ payment_reference: z.string().trim().min(1, "A payment reference is required.") });

export async function markExpensePaid(id: string, formData: FormData): Promise<void> {
  const profile = await requireRole(MANAGE_FINANCE);
  const parsed = MarkPaidSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/expenses?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { error } = await supabase
    .from("expenses")
    .update({ status: "PAID", paid_by: profile.id, paid_at: new Date().toISOString(), payment_reference: parsed.data.payment_reference })
    .eq("id", id)
    .eq("status", "APPROVED");
  if (error) redirect(`/admin/expenses?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/admin/expenses");
  redirect("/admin/expenses?success=Expense+marked+paid");
}
