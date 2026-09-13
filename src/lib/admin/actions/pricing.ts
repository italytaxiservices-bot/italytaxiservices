"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { ADMIN_ONLY, MANAGE_CRM } from "@/lib/auth/roles";
import { computePricingSuggestion, type PricingSuggestion } from "@/lib/pricing/engine";
import { isSupportedCurrency, SUPPORTED_CURRENCIES } from "@/lib/pricing/currencies";
import type { Database } from "@/lib/supabase/types";

type VehicleCategory = Database["public"]["Enums"]["vehicle_category"];

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

// ---------------------------------------------------------------------------
// Suggestion — called directly from a client component (not a form action),
// used by the quotation/booking forms to compute a suggested price without
// silently applying it. Available to anyone who can create quotations/
// bookings, not just admins (admins only gate *editing the rules themselves*).
// ---------------------------------------------------------------------------
export async function getPriceSuggestion(input: {
  vehicleCategory: VehicleCategory;
  currency: string;
  pickup: string;
  dropoff: string;
  distanceKm: number | null;
  tripDate: string | null;
  tripTime: string | null;
  enabledSurchargeIds?: string[];
}): Promise<{ error: string } | { suggestion: PricingSuggestion }> {
  await requireRole(MANAGE_CRM);
  if (!isSupportedCurrency(input.currency)) return { error: "Unsupported currency." };

  const supabase = await createClient();

  const [{ data: routeRates }, { data: rateCards }, { data: surchargeRules }, { data: holiday }] = await Promise.all([
    supabase
      .from("pricing_route_rates")
      .select("pickup_label, dropoff_label, price")
      .eq("vehicle_category", input.vehicleCategory)
      .eq("currency", input.currency)
      .eq("active", true)
      .is("deleted_at", null)
      .ilike("pickup_label", input.pickup.trim())
      .ilike("dropoff_label", input.dropoff.trim())
      .limit(1),
    supabase
      .from("pricing_rate_cards")
      .select("label, base_price, price_per_km, min_price")
      .eq("vehicle_category", input.vehicleCategory)
      .eq("currency", input.currency)
      .eq("active", true)
      .is("deleted_at", null)
      .limit(1),
    supabase
      .from("pricing_surcharge_rules")
      .select("id, label, kind, starts_at, ends_at, is_percent, amount, currency")
      .eq("active", true)
      .is("deleted_at", null),
    input.tripDate
      ? supabase.from("pricing_holiday_dates").select("id").eq("holiday_date", input.tripDate).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const matchedRoute = routeRates?.[0];
  const matchedRateCard = rateCards?.[0];

  const suggestion = computePricingSuggestion({
    currency: input.currency,
    distanceKm: input.distanceKm,
    tripDate: input.tripDate,
    tripTime: input.tripTime,
    isHoliday: Boolean(holiday),
    routeRate: matchedRoute ? { label: `${matchedRoute.pickup_label} → ${matchedRoute.dropoff_label}`, price: matchedRoute.price } : null,
    rateCard: matchedRateCard ? { label: matchedRateCard.label, base_price: matchedRateCard.base_price, price_per_km: matchedRateCard.price_per_km, min_price: matchedRateCard.min_price } : null,
    surchargeRules: (surchargeRules ?? []) as never,
    enabledSurchargeIds: input.enabledSurchargeIds,
  });

  return { suggestion };
}

// ---------------------------------------------------------------------------
// Rate cards
// ---------------------------------------------------------------------------
const RateCardSchema = z.object({
  label: z.string().trim().min(1, "Label is required."),
  vehicle_category: z.enum(["SEDAN", "SUV", "VAN", "LUXURY", "MINIBUS"]),
  currency: z.enum(SUPPORTED_CURRENCIES),
  base_price: z.coerce.number().nonnegative(),
  price_per_km: z.coerce.number().nonnegative().optional(),
  min_price: z.coerce.number().nonnegative().optional(),
});

export async function createRateCard(formData: FormData): Promise<void> {
  const profile = await requireRole(ADMIN_ONLY);
  const parsed = RateCardSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/settings/pricing?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { error } = await supabase.from("pricing_rate_cards").insert({
    label: parsed.data.label,
    vehicle_category: parsed.data.vehicle_category,
    currency: parsed.data.currency,
    base_price: parsed.data.base_price,
    price_per_km: parsed.data.price_per_km ?? null,
    min_price: parsed.data.min_price ?? null,
    created_by: profile.id,
  });
  if (error) {
    const message = error.message.includes("unique") ? "An active rate card already exists for this vehicle category + currency." : error.message;
    redirect(`/admin/settings/pricing?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/settings/pricing");
  redirect("/admin/settings/pricing?success=Rate+card+added");
}

export async function deleteRateCard(id: string) {
  await requireRole(ADMIN_ONLY);
  const supabase = await createClient();
  await supabase.from("pricing_rate_cards").update({ deleted_at: new Date().toISOString(), active: false }).eq("id", id);
  revalidatePath("/admin/settings/pricing");
}

// ---------------------------------------------------------------------------
// Route rates
// ---------------------------------------------------------------------------
const RouteRateSchema = z.object({
  pickup_label: z.string().trim().min(1, "Pickup is required."),
  dropoff_label: z.string().trim().min(1, "Drop-off is required."),
  vehicle_category: z.enum(["SEDAN", "SUV", "VAN", "LUXURY", "MINIBUS"]),
  currency: z.enum(SUPPORTED_CURRENCIES),
  price: z.coerce.number().nonnegative(),
});

export async function createRouteRate(formData: FormData): Promise<void> {
  const profile = await requireRole(ADMIN_ONLY);
  const parsed = RouteRateSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/settings/pricing?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { error } = await supabase.from("pricing_route_rates").insert({ ...parsed.data, created_by: profile.id });
  if (error) redirect(`/admin/settings/pricing?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/admin/settings/pricing");
  redirect("/admin/settings/pricing?success=Route+rate+added");
}

export async function deleteRouteRate(id: string) {
  await requireRole(ADMIN_ONLY);
  const supabase = await createClient();
  await supabase.from("pricing_route_rates").update({ deleted_at: new Date().toISOString(), active: false }).eq("id", id);
  revalidatePath("/admin/settings/pricing");
}

// ---------------------------------------------------------------------------
// Surcharge rules
// ---------------------------------------------------------------------------
const SurchargeSchema = z.object({
  label: z.string().trim().min(1, "Label is required."),
  kind: z.enum(["NIGHT", "HOLIDAY", "WAITING", "EXTRA_STOP", "CUSTOM"]),
  starts_at: z.string().trim().optional().or(z.literal("")),
  ends_at: z.string().trim().optional().or(z.literal("")),
  is_percent: z.string().optional(),
  amount: z.coerce.number().nonnegative(),
  currency: z.string().trim().optional().or(z.literal("")),
});

export async function createSurchargeRule(formData: FormData): Promise<void> {
  const profile = await requireRole(ADMIN_ONLY);
  const parsed = SurchargeSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/settings/pricing?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);
  if (parsed.data.kind === "NIGHT" && (!parsed.data.starts_at || !parsed.data.ends_at)) {
    redirect(`/admin/settings/pricing?error=${encodeURIComponent("Night surcharges need a start and end time.")}`);
  }
  if (parsed.data.currency && !isSupportedCurrency(parsed.data.currency)) {
    redirect(`/admin/settings/pricing?error=${encodeURIComponent("Unsupported currency.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.from("pricing_surcharge_rules").insert({
    label: parsed.data.label,
    kind: parsed.data.kind,
    starts_at: toNullable(parsed.data.starts_at),
    ends_at: toNullable(parsed.data.ends_at),
    is_percent: parsed.data.is_percent === "on",
    amount: parsed.data.amount,
    currency: toNullable(parsed.data.currency),
    created_by: profile.id,
  });
  if (error) redirect(`/admin/settings/pricing?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/admin/settings/pricing");
  redirect("/admin/settings/pricing?success=Surcharge+rule+added");
}

export async function deleteSurchargeRule(id: string) {
  await requireRole(ADMIN_ONLY);
  const supabase = await createClient();
  await supabase.from("pricing_surcharge_rules").update({ deleted_at: new Date().toISOString(), active: false }).eq("id", id);
  revalidatePath("/admin/settings/pricing");
}

// ---------------------------------------------------------------------------
// Holiday dates
// ---------------------------------------------------------------------------
const HolidaySchema = z.object({
  holiday_date: z.string().trim().min(1, "Date is required."),
  label: z.string().trim().optional().or(z.literal("")),
});

export async function createHolidayDate(formData: FormData): Promise<void> {
  const profile = await requireRole(ADMIN_ONLY);
  const parsed = HolidaySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/settings/pricing?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { error } = await supabase.from("pricing_holiday_dates").insert({
    holiday_date: parsed.data.holiday_date,
    label: toNullable(parsed.data.label),
    created_by: profile.id,
  });
  if (error) {
    const message = error.message.includes("unique") ? "That date is already marked as a holiday." : error.message;
    redirect(`/admin/settings/pricing?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/settings/pricing");
  redirect("/admin/settings/pricing?success=Holiday+added");
}

export async function deleteHolidayDate(id: string) {
  await requireRole(ADMIN_ONLY);
  const supabase = await createClient();
  await supabase.from("pricing_holiday_dates").delete().eq("id", id);
  revalidatePath("/admin/settings/pricing");
}
