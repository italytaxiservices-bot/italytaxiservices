"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_OPS } from "@/lib/auth/roles";

export async function setAlertStatus(id: string, status: "ACKNOWLEDGED" | "RESOLVED") {
  const profile = await requireRole(MANAGE_OPS);
  const supabase = await createClient();
  const { error } =
    status === "RESOLVED"
      ? await supabase.from("operational_alerts").update({ status, resolved_by: profile.id, resolved_at: new Date().toISOString() }).eq("id", id)
      : await supabase.from("operational_alerts").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/alerts");
}

export async function snoozeAlert(id: string, days: number) {
  await requireRole(MANAGE_OPS);
  const supabase = await createClient();
  const snoozedUntil = new Date(Date.now() + days * 86_400_000).toISOString();
  const { error } = await supabase.from("operational_alerts").update({ status: "SNOOZED", snoozed_until: snoozedUntil }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/alerts");
}

export async function assignAlert(id: string, formData: FormData) {
  await requireRole(MANAGE_OPS);
  const assignedTo = formData.get("assigned_to")?.toString() || null;
  const supabase = await createClient();
  const { error } = await supabase.from("operational_alerts").update({ assigned_to: assignedTo }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/alerts");
}
