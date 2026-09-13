"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_FINANCE } from "@/lib/auth/roles";

const PayoutSchema = z.object({
  driver_id: z.string().uuid("Select a driver."),
  period_start: z.string().trim().min(1, "Start date is required."),
  period_end: z.string().trim().min(1, "End date is required."),
  adjustments: z.coerce.number().default(0),
  expenses: z.coerce.number().nonnegative().default(0),
  currency: z.string().trim().default("EUR"),
  notes: z.string().trim().optional().or(z.literal("")),
});

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

/** Bundles every APPROVED-but-not-yet-paid earning for a driver in the given
 * period into a new payout batch. Earnings already attached to another
 * payout are excluded by construction (payout_id is null filter). */
export async function createDriverPayout(formData: FormData): Promise<void> {
  const profile = await requireRole(MANAGE_FINANCE);
  const parsed = PayoutSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/driver-payouts?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();

  const { data: earnings } = await supabase
    .from("driver_earnings")
    .select("id, driver_earning, currency, booking_id, bookings(trip_date)")
    .eq("driver_id", parsed.data.driver_id)
    .eq("status", "APPROVED")
    .is("payout_id", null);

  const inPeriod = (earnings ?? []).filter((e) => {
    const tripDate = (e as any).bookings?.trip_date as string | undefined;
    if (!tripDate) return true;
    return tripDate >= parsed.data.period_start && tripDate <= parsed.data.period_end;
  });

  const grossEarnings = inPeriod.reduce((s, e) => s + Number(e.driver_earning), 0);
  const netPayout = grossEarnings + parsed.data.adjustments - parsed.data.expenses;

  const { data: payout, error } = await supabase
    .from("driver_payouts")
    .insert({
      driver_id: parsed.data.driver_id,
      period_start: parsed.data.period_start,
      period_end: parsed.data.period_end,
      gross_earnings: grossEarnings,
      adjustments: parsed.data.adjustments,
      expenses: parsed.data.expenses,
      net_payout: netPayout,
      currency: parsed.data.currency,
      notes: toNullable(parsed.data.notes),
      created_by: profile.id,
    })
    .select("id")
    .single();
  if (error || !payout) redirect(`/admin/driver-payouts?error=${encodeURIComponent(error?.message ?? "Could not create payout.")}`);

  if (inPeriod.length > 0) {
    await supabase
      .from("driver_earnings")
      .update({ payout_id: payout!.id })
      .in("id", inPeriod.map((e) => e.id));
  }

  revalidatePath("/admin/driver-payouts");
  redirect("/admin/driver-payouts?success=Payout+created");
}

export async function approveDriverPayout(id: string): Promise<void> {
  const profile = await requireRole(MANAGE_FINANCE);
  const supabase = await createClient();
  const { error } = await supabase
    .from("driver_payouts")
    .update({ status: "APPROVED", approved_by: profile.id, approved_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "PENDING");
  if (error) throw new Error(error.message);
  revalidatePath("/admin/driver-payouts");
}

const MarkPaidSchema = z.object({
  payment_reference: z.string().trim().min(1, "A payment reference is required to mark a payout as paid."),
});

/** Never auto-marks a payout PAID — requires an explicit reference the
 * finance user is attesting actually corresponds to a real payment made. */
export async function markDriverPayoutPaid(id: string, formData: FormData): Promise<void> {
  await requireRole(MANAGE_FINANCE);
  const parsed = MarkPaidSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/driver-payouts?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { error } = await supabase
    .from("driver_payouts")
    .update({ status: "PAID", payment_reference: parsed.data.payment_reference, paid_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "APPROVED");
  if (error) redirect(`/admin/driver-payouts?error=${encodeURIComponent(error.message)}`);

  const { data: payout } = await supabase.from("driver_payouts").select("id").eq("id", id).single();
  if (payout) {
    await supabase.from("driver_earnings").update({ status: "PAID" }).eq("payout_id", id);
  }

  revalidatePath("/admin/driver-payouts");
  redirect("/admin/driver-payouts?success=Payout+marked+paid");
}

export async function approveDriverEarning(id: string): Promise<void> {
  const profile = await requireRole(MANAGE_FINANCE);
  const supabase = await createClient();
  const { error } = await supabase
    .from("driver_earnings")
    .update({ status: "APPROVED", approved_by: profile.id, approved_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "PENDING");
  if (error) throw new Error(error.message);
  revalidatePath("/admin/driver-payouts");
}
