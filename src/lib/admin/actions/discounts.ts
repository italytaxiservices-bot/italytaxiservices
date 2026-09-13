"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_FINANCE } from "@/lib/auth/roles";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

/**
 * Called after a quotation/booking save that included a discount. Only logs
 * a discount_requests row when the discount actually exceeds the
 * configured threshold — routine small discounts aren't tracked as
 * "requiring approval" noise. This is deliberately additive/non-blocking:
 * the quotation/booking still saves and the discount still applies
 * immediately (matching the existing save flow, no regression), and an
 * over-threshold discount is routed to /admin/approvals for a manager to
 * review after the fact rather than being hard-blocked before save —
 * restructuring quotation creation into a blocking pre-approval gate would
 * be a much larger change to an already-working flow.
 */
export async function recordDiscountIfNeeded(
  supabase: SupabaseServerClient,
  params: {
    entityType: "quotation" | "booking";
    entityId: string;
    originalPrice: number;
    discountAmount: number;
    finalPrice: number;
    requestedBy: string;
  }
) {
  if (params.discountAmount <= 0 || params.originalPrice <= 0) return;
  const discountPercent = (params.discountAmount / params.originalPrice) * 100;

  const { data: settings } = await supabase.from("company_settings").select("discount_approval_threshold_percent").limit(1).single();
  const threshold = Number(settings?.discount_approval_threshold_percent ?? 5);
  if (discountPercent <= threshold) return;

  await supabase.from("discount_requests").insert({
    entity_type: params.entityType,
    entity_id: params.entityId,
    original_price: params.originalPrice,
    discount_amount: params.discountAmount,
    discount_percent: discountPercent,
    final_price: params.finalPrice,
    reason: `Discount of ${discountPercent.toFixed(1)}% exceeds the ${threshold}% approval threshold.`,
    threshold_percent: threshold,
    status: "PENDING",
    requested_by: params.requestedBy,
  });
}

export async function approveDiscountRequest(id: string) {
  const profile = await requireRole(MANAGE_FINANCE);
  const supabase = await createClient();
  const { error } = await supabase
    .from("discount_requests")
    .update({ status: "APPROVED", approved_by: profile.id, approved_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "PENDING");
  if (error) throw new Error(error.message);
  revalidatePath("/admin/approvals");
}

export async function rejectDiscountRequest(id: string) {
  const profile = await requireRole(MANAGE_FINANCE);
  const supabase = await createClient();
  const { error } = await supabase
    .from("discount_requests")
    .update({ status: "REJECTED", approved_by: profile.id, approved_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "PENDING");
  if (error) throw new Error(error.message);
  revalidatePath("/admin/approvals");
}
