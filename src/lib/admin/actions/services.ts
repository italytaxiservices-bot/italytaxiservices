"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_CRM } from "@/lib/auth/roles";

const ServiceSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  description: z.string().trim().optional().or(z.literal("")),
  pricing_model: z.enum(["FLAT", "HOURLY", "PER_KM", "CUSTOM"]),
  default_price: z.coerce.number().nonnegative().optional(),
  currency: z.string().trim().optional().or(z.literal("")),
  tax_behavior: z.enum(["TAXABLE", "EXEMPT"]),
  default_duration_minutes: z.coerce.number().int().positive().optional(),
  default_buffer_minutes: z.coerce.number().int().nonnegative().optional(),
});

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

export async function createService(formData: FormData): Promise<void> {
  const profile = await requireRole(MANAGE_CRM);
  const raw = Object.fromEntries(formData);
  const parsed = ServiceSchema.safeParse({
    ...raw,
    default_price: raw.default_price || undefined,
    default_duration_minutes: raw.default_duration_minutes || undefined,
    default_buffer_minutes: raw.default_buffer_minutes || undefined,
  });
  if (!parsed.success) redirect(`/admin/services?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { error } = await supabase.from("services").insert({
    name: parsed.data.name,
    description: toNullable(parsed.data.description),
    pricing_model: parsed.data.pricing_model,
    default_price: parsed.data.default_price ?? null,
    currency: toNullable(parsed.data.currency),
    tax_behavior: parsed.data.tax_behavior,
    default_duration_minutes: parsed.data.default_duration_minutes ?? null,
    default_buffer_minutes: parsed.data.default_buffer_minutes ?? null,
    created_by: profile.id,
  });
  if (error) redirect(`/admin/services?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/admin/services");
  redirect("/admin/services?success=Service+added");
}

export async function toggleServiceActive(id: string, formData: FormData) {
  await requireRole(MANAGE_CRM);
  const isActive = formData.get("is_active") === "1";
  const supabase = await createClient();
  const { error } = await supabase.from("services").update({ is_active: isActive }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/services");
}
