"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_OPS, MANAGE_FINANCE } from "@/lib/auth/roles";
import type { Database } from "@/lib/supabase/types";

export type FormState = { error?: string } | undefined;

type DriverAvailability = Database["public"]["Enums"]["driver_availability"];

const DriverSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required."),
  phone: z.string().trim().optional().or(z.literal("")),
  whatsapp: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().email().optional().or(z.literal("")),
  nationality: z.string().trim().optional().or(z.literal("")),
  license_number: z.string().trim().optional().or(z.literal("")),
  license_expiry: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().optional().or(z.literal("")),
});

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

function parse(formData: FormData) {
  return DriverSchema.safeParse(Object.fromEntries(formData));
}

export async function createDriver(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireRole(MANAGE_OPS);
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("drivers")
    .insert({
      full_name: parsed.data.full_name,
      phone: toNullable(parsed.data.phone),
      whatsapp: toNullable(parsed.data.whatsapp),
      email: toNullable(parsed.data.email),
      nationality: toNullable(parsed.data.nationality),
      license_number: toNullable(parsed.data.license_number),
      license_expiry: toNullable(parsed.data.license_expiry),
      notes: toNullable(parsed.data.notes),
    })
    .select("id")
    .single();
  if (error || !data) return { error: error?.message ?? "Could not create driver." };

  revalidatePath("/admin/drivers");
  redirect(`/admin/drivers/${data.id}?success=Driver+created`);
}

export async function updateDriver(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireRole(MANAGE_OPS);
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("drivers")
    .update({
      full_name: parsed.data.full_name,
      phone: toNullable(parsed.data.phone),
      whatsapp: toNullable(parsed.data.whatsapp),
      email: toNullable(parsed.data.email),
      nationality: toNullable(parsed.data.nationality),
      license_number: toNullable(parsed.data.license_number),
      license_expiry: toNullable(parsed.data.license_expiry),
      notes: toNullable(parsed.data.notes),
    })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath(`/admin/drivers/${id}`);
  redirect(`/admin/drivers/${id}?success=Changes+saved`);
}

export async function setDriverActive(id: string, active: boolean) {
  await requireRole(MANAGE_OPS);
  const supabase = await createClient();
  const { error } = await supabase.from("drivers").update({ active }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/drivers/${id}`);
  revalidatePath("/admin/drivers");
}

export async function setDriverAvailability(id: string, availability: DriverAvailability) {
  await requireRole(MANAGE_OPS);
  const supabase = await createClient();
  const { error } = await supabase.from("drivers").update({ availability }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/drivers/${id}`);
}

const DriverPaySchema = z.object({
  pay_model: z.enum(["FIXED_PER_TRIP", "PERCENTAGE", "DAILY_RATE", "CUSTOM"]),
  pay_rate: z.coerce.number().nonnegative().optional(),
  pay_currency: z.string().trim().default("EUR"),
});

/** Compensation is sensitive — gated to FINANCE/ADMIN, separate from the
 * general driver-profile edit which OPERATIONS/DISPATCHER can also do. */
export async function updateDriverPay(id: string, formData: FormData): Promise<void> {
  await requireRole(MANAGE_FINANCE);
  const raw = Object.fromEntries(formData);
  const parsed = DriverPaySchema.safeParse({ ...raw, pay_rate: raw.pay_rate || undefined });
  if (!parsed.success) redirect(`/admin/drivers/${id}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { error } = await supabase
    .from("drivers")
    .update({ pay_model: parsed.data.pay_model, pay_rate: parsed.data.pay_rate ?? null, pay_currency: parsed.data.pay_currency })
    .eq("id", id);
  if (error) redirect(`/admin/drivers/${id}?error=${encodeURIComponent(error.message)}`);

  revalidatePath(`/admin/drivers/${id}`);
  redirect(`/admin/drivers/${id}?success=Pay+settings+saved`);
}
