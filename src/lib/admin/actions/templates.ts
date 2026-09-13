"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { ADMIN_ONLY } from "@/lib/auth/roles";

const TemplateSchema = z.object({
  subject_template: z.string().trim().min(1, "Subject is required."),
  body_template: z.string().trim().min(1, "Body is required."),
});

export async function updateNotificationTemplate(key: string, formData: FormData): Promise<void> {
  const profile = await requireRole(ADMIN_ONLY);
  const parsed = TemplateSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    redirect(`/admin/settings/templates?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("notification_templates")
    .update({
      subject_template: parsed.data.subject_template,
      body_template: parsed.data.body_template,
      is_customized: true,
      updated_by: profile.id,
    })
    .eq("key", key);
  if (error) redirect(`/admin/settings/templates?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/admin/settings/templates");
  redirect("/admin/settings/templates?success=Template+saved");
}

export async function resetNotificationTemplate(key: string): Promise<void> {
  await requireRole(ADMIN_ONLY);
  const supabase = await createClient();
  // Flip the flag off; notifyCustomer falls back to the code-defined default
  // for any template whose is_customized is false, regardless of what text
  // is still sitting in subject_template/body_template.
  const { error } = await supabase.from("notification_templates").update({ is_customized: false }).eq("key", key);
  if (error) redirect(`/admin/settings/templates?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/admin/settings/templates");
  redirect("/admin/settings/templates?success=Reset+to+default");
}
