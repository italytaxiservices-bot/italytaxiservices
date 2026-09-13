"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_CRM } from "@/lib/auth/roles";
import { notifyCustomer } from "@/lib/notifications/service";
import { formatCurrency, formatDate, formatTime } from "@/lib/admin/format";
import { recordDiscountIfNeeded } from "@/lib/admin/actions/discounts";
import { getQuotationPdfDocument } from "@/lib/pdf/quotation";
import { renderToBuffer } from "@react-pdf/renderer";

export type FormState = { error?: string } | undefined;

const ItemSchema = z.object({
  description: z.string().trim().min(1),
  quantity: z.coerce.number().positive(),
  unit_price: z.coerce.number().nonnegative(),
  service_id: z.string().uuid().optional().or(z.literal("")),
});

const QuotationSchema = z.object({
  customer_id: z.string().uuid("Select a customer."),
  lead_id: z.string().uuid().optional().or(z.literal("")),
  pickup: z.string().trim().optional().or(z.literal("")),
  dropoff: z.string().trim().optional().or(z.literal("")),
  trip_date: z.string().trim().optional().or(z.literal("")),
  trip_time: z.string().trim().optional().or(z.literal("")),
  passengers: z.coerce.number().int().positive().optional(),
  luggage: z.coerce.number().int().nonnegative().optional(),
  vehicle_id: z.string().uuid().optional().or(z.literal("")),
  driver_id: z.string().uuid().optional().or(z.literal("")),
  discount: z.coerce.number().nonnegative().default(0),
  tax_rate: z.coerce.number().nonnegative().default(0),
  currency: z.string().trim().default("EUR"),
  valid_until: z.string().trim().optional().or(z.literal("")),
  payment_terms: z.string().trim().optional().or(z.literal("")),
  terms_and_conditions: z.string().trim().optional().or(z.literal("")),
  internal_notes: z.string().trim().optional().or(z.literal("")),
  items: z.string().min(1),
  pricing_breakdown: z.string().optional().or(z.literal("")),
});

function parsePricingBreakdown(raw: string | undefined) {
  if (!raw) return { breakdown: null as Record<string, unknown> | null, distanceKm: null as number | null };
  try {
    const parsed = JSON.parse(raw);
    const distanceKm = typeof parsed.distanceKm === "number" ? parsed.distanceKm : null;
    return { breakdown: parsed, distanceKm };
  } catch {
    return { breakdown: null, distanceKm: null };
  }
}

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

function parseQuotationForm(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = QuotationSchema.safeParse({
    ...raw,
    passengers: raw.passengers || undefined,
    luggage: raw.luggage || undefined,
  });
  if (!parsed.success) return { success: false as const, error: parsed.error.issues[0]?.message ?? "Invalid input." };

  let items: z.infer<typeof ItemSchema>[];
  try {
    items = z.array(ItemSchema).min(1, "Add at least one line item.").parse(JSON.parse(parsed.data.items));
  } catch {
    return { success: false as const, error: "Add at least one valid line item." };
  }

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
  const discount = parsed.data.discount;
  const taxAmount = Math.max(0, subtotal - discount) * (parsed.data.tax_rate / 100);
  const total = Math.max(0, subtotal - discount) + taxAmount;
  const { breakdown: pricingBreakdown, distanceKm } = parsePricingBreakdown(parsed.data.pricing_breakdown);

  return { success: true as const, data: parsed.data, items, subtotal, taxAmount, total, pricingBreakdown, distanceKm };
}

export async function createQuotation(_prevState: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireRole(MANAGE_CRM);
  const parsed = parseQuotationForm(formData);
  if (!parsed.success) return { error: parsed.error };

  const supabase = await createClient();
  const { data: quotation, error } = await supabase
    .from("quotations")
    .insert({
      // Filled in by the assign_quotation_number trigger.
      quotation_number: undefined!,
      customer_id: parsed.data.customer_id,
      lead_id: toNullable(parsed.data.lead_id),
      pickup: toNullable(parsed.data.pickup),
      dropoff: toNullable(parsed.data.dropoff),
      trip_date: toNullable(parsed.data.trip_date),
      trip_time: toNullable(parsed.data.trip_time),
      passengers: parsed.data.passengers ?? null,
      luggage: parsed.data.luggage ?? null,
      vehicle_id: toNullable(parsed.data.vehicle_id),
      driver_id: toNullable(parsed.data.driver_id),
      subtotal: parsed.subtotal,
      discount: parsed.data.discount,
      tax_rate: parsed.data.tax_rate,
      tax_amount: parsed.taxAmount,
      total: parsed.total,
      currency: parsed.data.currency,
      valid_until: toNullable(parsed.data.valid_until),
      payment_terms: toNullable(parsed.data.payment_terms),
      terms_and_conditions: toNullable(parsed.data.terms_and_conditions),
      internal_notes: toNullable(parsed.data.internal_notes),
      distance_km: parsed.distanceKm,
      pricing_breakdown: parsed.pricingBreakdown,
      created_by: profile.id,
    })
    .select("id")
    .single();

  if (error || !quotation) return { error: error?.message ?? "Could not create quotation." };

  const { error: itemsError } = await supabase.from("quotation_items").insert(
    parsed.items.map((item, index) => ({
      quotation_id: quotation.id,
      service_id: item.service_id || null,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      amount: item.quantity * item.unit_price,
      sort_order: index,
    }))
  );
  if (itemsError) return { error: itemsError.message };

  await supabase.rpc("log_activity", {
    p_action: "quotation.created",
    p_entity_type: "quotation",
    p_entity_id: quotation.id,
    p_metadata: {},
  });

  await recordDiscountIfNeeded(supabase, {
    entityType: "quotation",
    entityId: quotation.id,
    originalPrice: parsed.subtotal,
    discountAmount: parsed.data.discount,
    finalPrice: parsed.total,
    requestedBy: profile.id,
  });

  revalidatePath("/admin/quotations");
  redirect(`/admin/quotations/${quotation.id}?success=Quotation+created`);
}

export async function updateQuotation(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireRole(MANAGE_CRM);
  const parsed = parseQuotationForm(formData);
  if (!parsed.success) return { error: parsed.error };

  const supabase = await createClient();
  const { error } = await supabase
    .from("quotations")
    .update({
      customer_id: parsed.data.customer_id,
      pickup: toNullable(parsed.data.pickup),
      dropoff: toNullable(parsed.data.dropoff),
      trip_date: toNullable(parsed.data.trip_date),
      trip_time: toNullable(parsed.data.trip_time),
      passengers: parsed.data.passengers ?? null,
      luggage: parsed.data.luggage ?? null,
      vehicle_id: toNullable(parsed.data.vehicle_id),
      driver_id: toNullable(parsed.data.driver_id),
      subtotal: parsed.subtotal,
      discount: parsed.data.discount,
      tax_rate: parsed.data.tax_rate,
      tax_amount: parsed.taxAmount,
      total: parsed.total,
      currency: parsed.data.currency,
      valid_until: toNullable(parsed.data.valid_until),
      payment_terms: toNullable(parsed.data.payment_terms),
      terms_and_conditions: toNullable(parsed.data.terms_and_conditions),
      internal_notes: toNullable(parsed.data.internal_notes),
      distance_km: parsed.distanceKm,
      pricing_breakdown: parsed.pricingBreakdown,
    })
    .eq("id", id);
  if (error) return { error: error.message };

  await supabase.from("quotation_items").delete().eq("quotation_id", id);
  const { error: itemsError } = await supabase.from("quotation_items").insert(
    parsed.items.map((item, index) => ({
      quotation_id: id,
      service_id: item.service_id || null,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      amount: item.quantity * item.unit_price,
      sort_order: index,
    }))
  );
  if (itemsError) return { error: itemsError.message };

  await recordDiscountIfNeeded(supabase, {
    entityType: "quotation",
    entityId: id,
    originalPrice: parsed.subtotal,
    discountAmount: parsed.data.discount,
    finalPrice: parsed.total,
    requestedBy: profile.id,
  });

  revalidatePath(`/admin/quotations/${id}`);
  redirect(`/admin/quotations/${id}?success=Changes+saved`);
}

export async function sendQuotation(id: string) {
  await requireRole(MANAGE_CRM);
  const supabase = await createClient();
  const { error } = await supabase
    .from("quotations")
    .update({ status: "SENT", sent_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);

  const { data: quotation } = await supabase
    .from("quotations")
    .select("quotation_number, total, currency, valid_until, pickup, dropoff, trip_date, trip_time, customers(full_name, email)")
    .eq("id", id)
    .maybeSingle();
  const customer = (quotation as any)?.customers;
  if (quotation && customer?.email) {
    // Best-effort PDF attachment — a failed render must never block the
    // email itself (the customer should still get the quotation summary
    // even if the PDF generation has a problem).
    let attachments: { filename: string; content: Buffer }[] | undefined;
    try {
      const doc = await getQuotationPdfDocument(id);
      if (doc) {
        const buffer = await renderToBuffer(doc.element as any);
        attachments = [{ filename: doc.filename, content: buffer }];
      }
    } catch (err) {
      console.error("quotation PDF attachment failed", err instanceof Error ? err.message : err);
    }

    await notifyCustomer({
      templateKey: "quotation_sent",
      to: customer.email,
      vars: {
        customer_name: customer.full_name ?? "",
        quotation_number: quotation.quotation_number,
        total: formatCurrency(quotation.total, quotation.currency),
        valid_until: quotation.valid_until ? formatDate(quotation.valid_until) : "—",
        pickup: quotation.pickup ?? "",
        dropoff: quotation.dropoff ?? "",
        date: quotation.trip_date ? formatDate(quotation.trip_date) : "",
        time: quotation.trip_time ? formatTime(quotation.trip_time) : "",
        pdf_note: attachments ? " (attached as a PDF)" : "",
      },
      relatedEntityType: "quotation",
      relatedEntityId: id,
      attachments,
    });
  }

  revalidatePath(`/admin/quotations/${id}`);
}

export async function markQuotationAccepted(id: string) {
  await requireRole(MANAGE_CRM);
  const supabase = await createClient();
  const { error } = await supabase
    .from("quotations")
    .update({ status: "ACCEPTED", accepted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);

  await supabase.rpc("log_activity", { p_action: "quotation.accepted", p_entity_type: "quotation", p_entity_id: id, p_metadata: {} });

  revalidatePath(`/admin/quotations/${id}`);
}

export async function markQuotationRejected(id: string) {
  await requireRole(MANAGE_CRM);
  const supabase = await createClient();
  const { error } = await supabase
    .from("quotations")
    .update({ status: "REJECTED", rejected_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);

  await supabase.rpc("log_activity", { p_action: "quotation.rejected", p_entity_type: "quotation", p_entity_id: id, p_metadata: {} });

  revalidatePath(`/admin/quotations/${id}`);
}

export async function duplicateQuotation(id: string) {
  const profile = await requireRole(MANAGE_CRM);
  const supabase = await createClient();

  const { data: original } = await supabase.from("quotations").select("*, quotation_items(*)").eq("id", id).single();
  if (!original) throw new Error("Quotation not found.");

  const { data: copy, error } = await supabase
    .from("quotations")
    .insert({
      // Filled in by the assign_quotation_number trigger.
      quotation_number: undefined!,
      customer_id: original.customer_id,
      pickup: original.pickup,
      dropoff: original.dropoff,
      trip_date: original.trip_date,
      trip_time: original.trip_time,
      passengers: original.passengers,
      luggage: original.luggage,
      vehicle_id: original.vehicle_id,
      driver_id: original.driver_id,
      subtotal: original.subtotal,
      discount: original.discount,
      tax_rate: original.tax_rate,
      tax_amount: original.tax_amount,
      total: original.total,
      currency: original.currency,
      payment_terms: original.payment_terms,
      terms_and_conditions: original.terms_and_conditions,
      created_by: profile.id,
    })
    .select("id")
    .single();
  if (error || !copy) throw new Error(error?.message ?? "Could not duplicate quotation.");

  const items = (original.quotation_items ?? []) as any[];
  if (items.length) {
    await supabase.from("quotation_items").insert(
      items.map((item, index) => ({
        quotation_id: copy.id,
        service_id: item.service_id ?? null,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        amount: item.amount,
        sort_order: index,
      }))
    );
  }

  revalidatePath("/admin/quotations");
  redirect(`/admin/quotations/${copy.id}?success=Quotation+duplicated`);
}

export async function convertQuotationToBooking(id: string) {
  const profile = await requireRole(MANAGE_CRM);
  const supabase = await createClient();
  const { data: bookingId, error } = await supabase.rpc("convert_quotation_to_booking", { p_quotation_id: id });
  if (error) throw new Error(error.message);

  await supabase.rpc("log_activity", {
    p_action: "quotation.converted_to_booking",
    p_entity_type: "quotation",
    p_entity_id: id,
    p_metadata: { booking_id: bookingId, converted_by: profile.id },
  });

  revalidatePath(`/admin/quotations/${id}`);
  revalidatePath("/admin/bookings");
  redirect(`/admin/bookings/${bookingId}?success=Booking+created+from+quotation`);
}
