"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { ADMIN_ONLY } from "@/lib/auth/roles";

export type FormState = { error?: string; success?: boolean } | undefined;

const SettingsSchema = z.object({
  company_name: z.string().trim().min(1, "Company name is required."),
  legal_name: z.string().trim().optional().or(z.literal("")),
  logo_url: z.string().trim().url("Enter a valid URL.").optional().or(z.literal("")),
  email: z.string().trim().email().optional().or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
  whatsapp: z.string().trim().optional().or(z.literal("")),
  address: z.string().trim().optional().or(z.literal("")),
  website: z.string().trim().optional().or(z.literal("")),
  tax_number: z.string().trim().optional().or(z.literal("")),
  currency_default: z.string().trim().min(1),
  tax_rate_default: z.coerce.number().nonnegative(),
  quotation_prefix: z.string().trim().min(1),
  invoice_prefix: z.string().trim().min(1),
  receipt_prefix: z.string().trim().min(1),
  booking_prefix: z.string().trim().min(1),
  lead_prefix: z.string().trim().min(1),
  payment_terms: z.string().trim().optional().or(z.literal("")),
  terms_and_conditions: z.string().trim().optional().or(z.literal("")),
  auto_generate_invoice_on_confirm: z.string().optional(),
});

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

export async function updateCompanySettings(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireRole(ADMIN_ONLY);
  const parsed = SettingsSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const supabase = await createClient();
  const { data: existing } = await supabase.from("company_settings").select("id").limit(1).single();
  if (!existing) return { error: "Company settings row is missing." };

  const { error } = await supabase
    .from("company_settings")
    .update({
      company_name: parsed.data.company_name,
      legal_name: toNullable(parsed.data.legal_name),
      logo_url: toNullable(parsed.data.logo_url),
      email: toNullable(parsed.data.email),
      phone: toNullable(parsed.data.phone),
      whatsapp: toNullable(parsed.data.whatsapp),
      address: toNullable(parsed.data.address),
      website: toNullable(parsed.data.website),
      tax_number: toNullable(parsed.data.tax_number),
      currency_default: parsed.data.currency_default,
      tax_rate_default: parsed.data.tax_rate_default,
      quotation_prefix: parsed.data.quotation_prefix,
      invoice_prefix: parsed.data.invoice_prefix,
      receipt_prefix: parsed.data.receipt_prefix,
      booking_prefix: parsed.data.booking_prefix,
      lead_prefix: parsed.data.lead_prefix,
      payment_terms: toNullable(parsed.data.payment_terms),
      terms_and_conditions: toNullable(parsed.data.terms_and_conditions),
      auto_generate_invoice_on_confirm: parsed.data.auto_generate_invoice_on_confirm === "on",
    })
    .eq("id", existing.id);

  if (error) return { error: error.message };

  revalidatePath("/admin/settings");
  return { success: true };
}
