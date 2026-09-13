"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole, requireUser } from "@/lib/auth/dal";
import { MANAGE_OPS } from "@/lib/auth/roles";

export type FormState = { error?: string } | undefined;

export async function completeFollowUp(id: string) {
  await requireRole(MANAGE_OPS);
  const supabase = await createClient();
  const { error } = await supabase
    .from("follow_ups")
    .update({ status: "COMPLETED", completed_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/follow-ups");
}

export async function cancelFollowUp(id: string) {
  await requireRole(MANAGE_OPS);
  const supabase = await createClient();
  const { error } = await supabase.from("follow_ups").update({ status: "CANCELLED" }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/follow-ups");
}

const FollowUpSchema = z.object({
  customer_id: z.string().uuid().optional().or(z.literal("")),
  type: z.enum([
    "NEW_LEAD",
    "QUOTATION_FOLLOWUP",
    "UNPAID_INVOICE",
    "UPCOMING_TRIP",
    "POST_TRIP_FOLLOWUP",
    "REVIEW_REQUEST",
    "REPEAT_BOOKING",
    "CUSTOM",
  ]),
  due_date: z.string().trim().min(1, "Due date is required."),
  notes: z.string().trim().optional().or(z.literal("")),
});

export async function createFollowUp(_prevState: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireUser();
  const parsed = FollowUpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const supabase = await createClient();
  const { error } = await supabase.from("follow_ups").insert({
    customer_id: parsed.data.customer_id || null,
    type: parsed.data.type,
    due_date: parsed.data.due_date,
    notes: parsed.data.notes || null,
    assigned_to: profile.id,
    created_by: profile.id,
  });
  if (error) return { error: error.message };

  revalidatePath("/admin/follow-ups");
  redirect("/admin/follow-ups");
}
