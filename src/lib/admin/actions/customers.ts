"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_CRM } from "@/lib/auth/roles";

const CustomerSchema = z.object({
  full_name: z.string().trim().min(1, "Full name is required."),
  email: z.string().trim().email("Enter a valid email.").optional().or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
  whatsapp: z.string().trim().optional().or(z.literal("")),
  country: z.string().trim().optional().or(z.literal("")),
  customer_type: z.enum(["INDIVIDUAL", "COMPANY"]).default("INDIVIDUAL"),
  company_name: z.string().trim().optional().or(z.literal("")),
  billing_contact_name: z.string().trim().optional().or(z.literal("")),
  billing_email: z.string().trim().email("Enter a valid billing email.").optional().or(z.literal("")),
  tax_vat_number: z.string().trim().optional().or(z.literal("")),
  payment_terms: z.enum(["PAY_NOW", "DUE_7", "DUE_15", "DUE_30", "CUSTOM"]).optional().or(z.literal("")),
  credit_limit: z.coerce.number().nonnegative().optional(),
  billing_address: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().optional().or(z.literal("")),
});

export type FormState = { error?: string } | undefined;

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

/**
 * Finds an existing customer by email or phone before creating a new one, so
 * repeat bookings/leads don't silently fragment a customer's history across
 * duplicate records.
 */
export async function findExistingCustomer(email?: string, phone?: string) {
  if (!email && !phone) return null;
  const supabase = await createClient();
  let query = supabase.from("customers").select("id, full_name, email, phone").is("deleted_at", null);
  if (email) {
    query = query.ilike("email", email);
  } else if (phone) {
    query = query.eq("phone", phone);
  }
  const { data } = await query.limit(1).maybeSingle();
  return data;
}

/**
 * Finds a matching customer by email/phone, or creates one. Used by lead and
 * quotation conversion flows so the same person never ends up as two
 * customer records just because they came in through a different channel.
 */
export async function ensureCustomerFromContact(input: {
  full_name: string;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
}): Promise<string> {
  const profile = await requireRole(MANAGE_CRM);
  const supabase = await createClient();

  const existing = await findExistingCustomer(input.email ?? undefined, input.phone ?? undefined);
  if (existing) return existing.id;

  const { data, error } = await supabase
    .from("customers")
    .insert({
      full_name: input.full_name,
      email: toNullable(input.email ?? undefined),
      phone: toNullable(input.phone ?? undefined),
      whatsapp: toNullable(input.whatsapp ?? undefined),
      created_by: profile.id,
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Could not create customer.");
  }

  return data.id;
}

function parseCustomerForm(formData: FormData) {
  const raw = Object.fromEntries(formData);
  return CustomerSchema.safeParse({ ...raw, credit_limit: raw.credit_limit || undefined });
}

export async function createCustomer(_prevState: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireRole(MANAGE_CRM);

  const parsed = parseCustomerForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("customers")
    .insert({
      full_name: parsed.data.full_name,
      email: toNullable(parsed.data.email),
      phone: toNullable(parsed.data.phone),
      whatsapp: toNullable(parsed.data.whatsapp),
      country: toNullable(parsed.data.country),
      customer_type: parsed.data.customer_type,
      company_name: toNullable(parsed.data.company_name),
      billing_contact_name: toNullable(parsed.data.billing_contact_name),
      billing_email: toNullable(parsed.data.billing_email),
      tax_vat_number: toNullable(parsed.data.tax_vat_number),
      payment_terms: toNullable(parsed.data.payment_terms),
      credit_limit: parsed.data.credit_limit ?? null,
      billing_address: toNullable(parsed.data.billing_address),
      notes: toNullable(parsed.data.notes),
      created_by: profile.id,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { error: error?.message ?? "Could not create customer." };
  }

  await supabase.rpc("log_activity", {
    p_action: "customer.created",
    p_entity_type: "customer",
    p_entity_id: data.id,
    p_metadata: { full_name: parsed.data.full_name },
  });

  revalidatePath("/admin/customers");
  redirect(`/admin/customers/${data.id}?success=Customer+created`);
}

export async function updateCustomer(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireRole(MANAGE_CRM);

  const parsed = parseCustomerForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("customers")
    .update({
      full_name: parsed.data.full_name,
      email: toNullable(parsed.data.email),
      phone: toNullable(parsed.data.phone),
      whatsapp: toNullable(parsed.data.whatsapp),
      country: toNullable(parsed.data.country),
      customer_type: parsed.data.customer_type,
      company_name: toNullable(parsed.data.company_name),
      billing_contact_name: toNullable(parsed.data.billing_contact_name),
      billing_email: toNullable(parsed.data.billing_email),
      tax_vat_number: toNullable(parsed.data.tax_vat_number),
      payment_terms: toNullable(parsed.data.payment_terms),
      credit_limit: parsed.data.credit_limit ?? null,
      billing_address: toNullable(parsed.data.billing_address),
      notes: toNullable(parsed.data.notes),
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  await supabase.rpc("log_activity", {
    p_action: "customer.updated",
    p_entity_type: "customer",
    p_entity_id: id,
    p_metadata: {},
  });

  revalidatePath(`/admin/customers/${id}`);
  revalidatePath("/admin/customers");
  redirect(`/admin/customers/${id}?success=Changes+saved`);
}

export async function archiveCustomer(id: string) {
  await requireRole(MANAGE_CRM);
  const supabase = await createClient();
  const { error } = await supabase.from("customers").update({ deleted_at: new Date().toISOString() }).eq("id", id);
  if (error) throw new Error(error.message);

  await supabase.rpc("log_activity", {
    p_action: "customer.archived",
    p_entity_type: "customer",
    p_entity_id: id,
    p_metadata: {},
  });

  revalidatePath("/admin/customers");
  redirect("/admin/customers?success=Customer+archived");
}
