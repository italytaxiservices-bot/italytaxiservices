"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_FINANCE } from "@/lib/auth/roles";

const ReconcileSchema = z.object({
  reconciliation_status: z.enum(["UNMATCHED", "MATCHED", "PARTIALLY_MATCHED", "DISPUTED"]),
  external_reference: z.string().trim().optional().or(z.literal("")),
  reconciliation_notes: z.string().trim().optional().or(z.literal("")),
});

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

/** Manual reconciliation only — no bank API exists. Staff match a recorded
 * payment against a bank statement line by eye and record the reference. */
export async function reconcilePayment(id: string, formData: FormData): Promise<void> {
  const profile = await requireRole(MANAGE_FINANCE);
  const parsed = ReconcileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/finance/reconciliation?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { error } = await supabase
    .from("payments")
    .update({
      reconciliation_status: parsed.data.reconciliation_status,
      external_reference: toNullable(parsed.data.external_reference),
      reconciliation_notes: toNullable(parsed.data.reconciliation_notes),
      reconciled_by: profile.id,
      reconciled_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) redirect(`/admin/finance/reconciliation?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/admin/finance/reconciliation");
  redirect("/admin/finance/reconciliation?success=Payment+reconciled");
}
