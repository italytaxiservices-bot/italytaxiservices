"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_OPS } from "@/lib/auth/roles";

const MaintenanceSchema = z.object({
  vehicle_id: z.string().uuid("Select a vehicle."),
  maintenance_type: z.enum(["OIL_SERVICE", "TIRES", "BRAKES", "INSPECTION", "REGISTRATION", "INSURANCE", "GENERAL", "REPAIR"]),
  service_date: z.string().trim().min(1, "Service date is required."),
  mileage: z.coerce.number().int().nonnegative().optional(),
  cost: z.coerce.number().nonnegative().default(0),
  currency: z.string().trim().default("EUR"),
  vendor: z.string().trim().optional().or(z.literal("")),
  description: z.string().trim().optional().or(z.literal("")),
  next_service_date: z.string().trim().optional().or(z.literal("")),
  next_service_mileage: z.coerce.number().int().nonnegative().optional(),
});

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

export type FormState = { error?: string } | undefined;

export async function createMaintenanceRecord(formData: FormData): Promise<void> {
  const profile = await requireRole(MANAGE_OPS);
  const raw = Object.fromEntries(formData);
  const parsed = MaintenanceSchema.safeParse({
    ...raw,
    mileage: raw.mileage || undefined,
    next_service_mileage: raw.next_service_mileage || undefined,
  });
  if (!parsed.success) {
    redirect(`/admin/fleet/maintenance?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.from("vehicle_maintenance").insert({
    vehicle_id: parsed.data.vehicle_id,
    maintenance_type: parsed.data.maintenance_type,
    service_date: parsed.data.service_date,
    mileage: parsed.data.mileage ?? null,
    cost: parsed.data.cost,
    currency: parsed.data.currency,
    vendor: toNullable(parsed.data.vendor),
    description: toNullable(parsed.data.description),
    next_service_date: toNullable(parsed.data.next_service_date),
    next_service_mileage: parsed.data.next_service_mileage ?? null,
    created_by: profile.id,
  });
  if (error) redirect(`/admin/fleet/maintenance?error=${encodeURIComponent(error.message)}`);

  // Keep the vehicle's current_mileage current if this service reported a
  // higher reading than what's on file.
  if (parsed.data.mileage) {
    await supabase.rpc("bump_vehicle_mileage", { p_vehicle_id: parsed.data.vehicle_id, p_mileage: parsed.data.mileage });
  }

  revalidatePath("/admin/fleet/maintenance");
  revalidatePath("/admin/fleet");
  redirect("/admin/fleet/maintenance?success=Maintenance+record+added");
}
