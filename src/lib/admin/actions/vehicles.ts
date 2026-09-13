"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_OPS } from "@/lib/auth/roles";
import type { Database } from "@/lib/supabase/types";

export type FormState = { error?: string } | undefined;

type VehicleStatus = Database["public"]["Enums"]["vehicle_status"];

const VehicleSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  make: z.string().trim().optional().or(z.literal("")),
  model: z.string().trim().optional().or(z.literal("")),
  year: z.coerce.number().int().optional(),
  color: z.string().trim().optional().or(z.literal("")),
  category: z.enum(["SEDAN", "SUV", "VAN", "LUXURY", "MINIBUS"]),
  seats: z.coerce.number().int().positive().optional(),
  luggage_capacity: z.coerce.number().int().nonnegative().optional(),
  registration_number: z.string().trim().optional().or(z.literal("")),
  vin: z.string().trim().optional().or(z.literal("")),
  current_mileage: z.coerce.number().int().nonnegative().optional(),
  description: z.string().trim().optional().or(z.literal("")),
  registration_expiry: z.string().trim().optional().or(z.literal("")),
  insurance_expiry: z.string().trim().optional().or(z.literal("")),
  purchase_date: z.string().trim().optional().or(z.literal("")),
  purchase_price: z.coerce.number().nonnegative().optional(),
  lease_monthly_amount: z.coerce.number().nonnegative().optional(),
  lease_end_date: z.string().trim().optional().or(z.literal("")),
});

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

function parse(formData: FormData) {
  const raw = Object.fromEntries(formData);
  return VehicleSchema.safeParse({
    ...raw,
    year: raw.year || undefined,
    seats: raw.seats || undefined,
    luggage_capacity: raw.luggage_capacity || undefined,
    current_mileage: raw.current_mileage || undefined,
    purchase_price: raw.purchase_price || undefined,
    lease_monthly_amount: raw.lease_monthly_amount || undefined,
  });
}

export async function createVehicle(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireRole(MANAGE_OPS);
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .insert({
      name: parsed.data.name,
      make: toNullable(parsed.data.make),
      model: toNullable(parsed.data.model),
      year: parsed.data.year ?? null,
      color: toNullable(parsed.data.color),
      category: parsed.data.category,
      seats: parsed.data.seats ?? null,
      luggage_capacity: parsed.data.luggage_capacity ?? null,
      registration_number: toNullable(parsed.data.registration_number),
      vin: toNullable(parsed.data.vin),
      current_mileage: parsed.data.current_mileage ?? null,
      description: toNullable(parsed.data.description),
      registration_expiry: toNullable(parsed.data.registration_expiry),
      insurance_expiry: toNullable(parsed.data.insurance_expiry),
      purchase_date: toNullable(parsed.data.purchase_date),
      purchase_price: parsed.data.purchase_price ?? null,
      lease_monthly_amount: parsed.data.lease_monthly_amount ?? null,
      lease_end_date: toNullable(parsed.data.lease_end_date),
    })
    .select("id")
    .single();
  if (error || !data) return { error: error?.message ?? "Could not create vehicle." };

  revalidatePath("/admin/vehicles");
  redirect(`/admin/vehicles/${data.id}?success=Vehicle+created`);
}

export async function updateVehicle(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireRole(MANAGE_OPS);
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("vehicles")
    .update({
      name: parsed.data.name,
      make: toNullable(parsed.data.make),
      model: toNullable(parsed.data.model),
      year: parsed.data.year ?? null,
      color: toNullable(parsed.data.color),
      category: parsed.data.category,
      seats: parsed.data.seats ?? null,
      luggage_capacity: parsed.data.luggage_capacity ?? null,
      registration_number: toNullable(parsed.data.registration_number),
      vin: toNullable(parsed.data.vin),
      current_mileage: parsed.data.current_mileage ?? null,
      description: toNullable(parsed.data.description),
      registration_expiry: toNullable(parsed.data.registration_expiry),
      insurance_expiry: toNullable(parsed.data.insurance_expiry),
      purchase_date: toNullable(parsed.data.purchase_date),
      purchase_price: parsed.data.purchase_price ?? null,
      lease_monthly_amount: parsed.data.lease_monthly_amount ?? null,
      lease_end_date: toNullable(parsed.data.lease_end_date),
    })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath(`/admin/vehicles/${id}`);
  redirect(`/admin/vehicles/${id}?success=Changes+saved`);
}

export async function setVehicleStatus(id: string, status: VehicleStatus) {
  await requireRole(MANAGE_OPS);
  const supabase = await createClient();
  const { error } = await supabase.from("vehicles").update({ status, active: status === "AVAILABLE" }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/vehicles/${id}`);
  revalidatePath("/admin/vehicles");
}

/** Soft-archive: never hard-delete a vehicle referenced by historical bookings. */
export async function archiveVehicle(id: string) {
  await requireRole(MANAGE_OPS);
  const supabase = await createClient();
  const { error } = await supabase
    .from("vehicles")
    .update({ deleted_at: new Date().toISOString(), active: false, status: "INACTIVE" })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/vehicles");
  redirect("/admin/vehicles?success=Vehicle+archived");
}
