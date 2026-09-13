"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { ADMIN_ONLY } from "@/lib/auth/roles";

export async function setAutomationEnabled(key: string, formData: FormData) {
  const profile = await requireRole(ADMIN_ONLY);
  const enabled = formData.get("enabled") === "1";

  const supabase = await createClient();
  const { error } = await supabase
    .from("automation_definitions")
    .update({ enabled, updated_by: profile.id })
    .eq("key", key);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/automations");
}

/** The 3 follow-up-generating automations take a single day-count config
 * field (`delay_days` for the two trigger-based ones, `days_ahead` for the
 * upcoming-trip cron) — a generic {days: n} form maps to whichever key the
 * caller names, so one action covers all three follow-up rules. */
export async function setAutomationDelay(key: string, configField: "delay_days" | "days_ahead", formData: FormData): Promise<void> {
  const profile = await requireRole(ADMIN_ONLY);
  const days = Number(formData.get("days"));
  if (!Number.isInteger(days) || days < 0 || days > 365) {
    redirect(`/admin/automations?error=${encodeURIComponent("Enter a whole number of days between 0 and 365.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("automation_definitions")
    .update({ config: { [configField]: days }, updated_by: profile.id })
    .eq("key", key);
  if (error) redirect(`/admin/automations?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/admin/automations");
  redirect("/admin/automations?success=Timing+updated");
}
