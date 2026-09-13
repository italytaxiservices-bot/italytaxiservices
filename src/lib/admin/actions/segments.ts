"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_CRM } from "@/lib/auth/roles";

const OverrideSchema = z.object({
  segment: z.string().trim().min(1, "Enter a segment name.").max(40).transform((s) => s.toUpperCase().replace(/\s+/g, "_")),
  note: z.string().trim().optional().or(z.literal("")),
});

/** get_customer_metrics() computes a segment purely from booking history —
 * this override table lets staff set a manual/custom label (e.g. a VIP by
 * relationship rather than spend) without touching that computed logic.
 * One row per customer (upsert), so setting it again just replaces it. */
export async function setCustomerSegmentOverride(customerId: string, formData: FormData): Promise<void> {
  const profile = await requireRole(MANAGE_CRM);
  const parsed = OverrideSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/customers/${customerId}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { error } = await supabase.from("customer_segment_overrides").upsert({
    customer_id: customerId,
    segment: parsed.data.segment,
    note: parsed.data.note || null,
    created_by: profile.id,
  });
  if (error) redirect(`/admin/customers/${customerId}?error=${encodeURIComponent(error.message)}`);

  revalidatePath(`/admin/customers/${customerId}`);
  revalidatePath("/admin/customers/segments");
  redirect(`/admin/customers/${customerId}?success=Segment+override+saved`);
}

export async function clearCustomerSegmentOverride(customerId: string) {
  await requireRole(MANAGE_CRM);
  const supabase = await createClient();
  const { error } = await supabase.from("customer_segment_overrides").delete().eq("customer_id", customerId);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/customers/${customerId}`);
  revalidatePath("/admin/customers/segments");
}
