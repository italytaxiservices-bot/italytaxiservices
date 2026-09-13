"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_OPS } from "@/lib/auth/roles";
import { notifyCustomer } from "@/lib/notifications/service";
import { formatCurrency, formatDate, formatTime } from "@/lib/admin/format";
import type { Json } from "@/lib/supabase/types";

export type FormState = { error?: string } | undefined;

/**
 * Activity logging must never take down a mutation that already succeeded —
 * a booking status change or assignment is the real outcome the user asked
 * for; a failed audit-log write is a monitoring gap, not a reason to bounce
 * the user to an error page after their change already committed.
 */
async function logActivitySafe(
  supabase: Awaited<ReturnType<typeof createClient>>,
  args: { p_action: string; p_entity_type: string; p_entity_id: string; p_metadata: Json }
) {
  const { error } = await supabase.rpc("log_activity", args);
  if (error) console.error("log_activity failed", args.p_action, error.message);
}

const BookingSchema = z.object({
  customer_id: z.string().uuid("Select a customer."),
  quotation_id: z.string().uuid().optional().or(z.literal("")),
  pickup: z.string().trim().min(1, "Pickup is required."),
  dropoff: z.string().trim().min(1, "Drop-off is required."),
  trip_date: z.string().trim().min(1, "Trip date is required."),
  trip_time: z.string().trim().min(1, "Trip time is required."),
  passengers: z.coerce.number().int().positive().optional(),
  luggage: z.coerce.number().int().nonnegative().optional(),
  vehicle_id: z.string().uuid().optional().or(z.literal("")),
  driver_id: z.string().uuid().optional().or(z.literal("")),
  flight_number: z.string().trim().optional().or(z.literal("")),
  is_airport_pickup: z.string().optional(),
  flight_terminal: z.string().trim().optional().or(z.literal("")),
  flight_arrival_time: z.string().trim().optional().or(z.literal("")),
  flight_departure_time: z.string().trim().optional().or(z.literal("")),
  meet_and_greet_notes: z.string().trim().optional().or(z.literal("")),
  special_requests: z.string().trim().optional().or(z.literal("")),
  price: z.coerce.number().nonnegative().default(0),
  discount: z.coerce.number().nonnegative().default(0),
  tax_amount: z.coerce.number().nonnegative().default(0),
  currency: z.string().trim().default("EUR"),
  internal_notes: z.string().trim().optional().or(z.literal("")),
  customer_notes: z.string().trim().optional().or(z.literal("")),
  price_override_reason: z.string().trim().optional().or(z.literal("")),
});

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

function parseBookingForm(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = BookingSchema.safeParse({ ...raw, passengers: raw.passengers || undefined, luggage: raw.luggage || undefined });
  if (!parsed.success) return { success: false as const, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  const total = Math.max(0, parsed.data.price - parsed.data.discount) + parsed.data.tax_amount;
  return { success: true as const, data: parsed.data, total };
}

export async function createBooking(_prevState: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireRole(MANAGE_OPS);
  const parsed = parseBookingForm(formData);
  if (!parsed.success) return { error: parsed.error };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      // Filled in by the assign_booking_reference trigger.
      booking_reference: undefined!,
      customer_id: parsed.data.customer_id,
      quotation_id: toNullable(parsed.data.quotation_id),
      pickup: parsed.data.pickup,
      dropoff: parsed.data.dropoff,
      trip_date: parsed.data.trip_date,
      trip_time: parsed.data.trip_time,
      passengers: parsed.data.passengers ?? null,
      luggage: parsed.data.luggage ?? null,
      vehicle_id: toNullable(parsed.data.vehicle_id),
      driver_id: toNullable(parsed.data.driver_id),
      flight_number: toNullable(parsed.data.flight_number),
      is_airport_pickup: parsed.data.is_airport_pickup === "on",
      flight_terminal: toNullable(parsed.data.flight_terminal),
      flight_arrival_time: toNullable(parsed.data.flight_arrival_time),
      flight_departure_time: toNullable(parsed.data.flight_departure_time),
      meet_and_greet_notes: toNullable(parsed.data.meet_and_greet_notes),
      special_requests: toNullable(parsed.data.special_requests),
      price: parsed.data.price,
      discount: parsed.data.discount,
      tax_amount: parsed.data.tax_amount,
      total: parsed.total,
      currency: parsed.data.currency,
      internal_notes: toNullable(parsed.data.internal_notes),
      customer_notes: toNullable(parsed.data.customer_notes),
      source: "ADMIN",
      created_by: profile.id,
    })
    .select("id")
    .single();

  if (error || !data) return { error: error?.message ?? "Could not create booking." };

  await logActivitySafe(supabase, {
    p_action: "booking.created",
    p_entity_type: "booking",
    p_entity_id: data.id,
    p_metadata: {},
  });

  revalidatePath("/admin/bookings");
  redirect(`/admin/bookings/${data.id}?success=Booking+created`);
}

export async function updateBooking(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireRole(MANAGE_OPS);
  const parsed = parseBookingForm(formData);
  if (!parsed.success) return { error: parsed.error };

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("bookings")
    .select("total, trip_date, trip_time, driver_id, vehicle_id, estimated_duration_minutes")
    .eq("id", id)
    .single();

  // A changed total is a price override — it needs a reason and a durable
  // audit trail (price_override_log), never a silent overwrite of what was
  // originally agreed.
  const priceChanged = existing && Math.abs(Number(existing.total) - parsed.total) > 0.01;
  if (priceChanged && !parsed.data.price_override_reason) {
    return { error: "Enter a reason for the price change." };
  }

  // Rescheduling (or reassigning) through this form must recheck
  // availability the same way the dedicated Assign panel does — otherwise
  // a date/time edit here could silently double-book a driver or vehicle
  // that assignDriverAndVehicle would have blocked.
  const newDriverId = toNullable(parsed.data.driver_id);
  const newVehicleId = toNullable(parsed.data.vehicle_id);
  const scheduleOrAssignmentChanged =
    existing &&
    (existing.trip_date !== parsed.data.trip_date ||
      existing.trip_time !== parsed.data.trip_time ||
      existing.driver_id !== newDriverId ||
      existing.vehicle_id !== newVehicleId);
  if (scheduleOrAssignmentChanged && (newDriverId || newVehicleId)) {
    const { data: conflicts } = await supabase.rpc("check_assignment_conflicts", {
      p_booking_id: id,
      p_driver_id: newDriverId as string,
      p_vehicle_id: newVehicleId as string,
      p_trip_date: parsed.data.trip_date,
      p_trip_time: parsed.data.trip_time,
      p_duration_minutes: existing.estimated_duration_minutes,
    });
    if (conflicts && conflicts.length > 0) {
      const summary = conflicts
        .map((c) => `${c.conflict_type === "DRIVER" ? "Driver" : "Vehicle"} already on ${c.booking_reference} (${c.trip_date} ${c.trip_time})`)
        .join("; ");
      return { error: `Schedule conflict — ${summary}. Use the Assign panel's "force" option if this is intentional.` };
    }
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      customer_id: parsed.data.customer_id,
      pickup: parsed.data.pickup,
      dropoff: parsed.data.dropoff,
      trip_date: parsed.data.trip_date,
      trip_time: parsed.data.trip_time,
      passengers: parsed.data.passengers ?? null,
      luggage: parsed.data.luggage ?? null,
      vehicle_id: toNullable(parsed.data.vehicle_id),
      driver_id: toNullable(parsed.data.driver_id),
      flight_number: toNullable(parsed.data.flight_number),
      is_airport_pickup: parsed.data.is_airport_pickup === "on",
      flight_terminal: toNullable(parsed.data.flight_terminal),
      flight_arrival_time: toNullable(parsed.data.flight_arrival_time),
      flight_departure_time: toNullable(parsed.data.flight_departure_time),
      meet_and_greet_notes: toNullable(parsed.data.meet_and_greet_notes),
      special_requests: toNullable(parsed.data.special_requests),
      price: parsed.data.price,
      discount: parsed.data.discount,
      tax_amount: parsed.data.tax_amount,
      total: parsed.total,
      currency: parsed.data.currency,
      internal_notes: toNullable(parsed.data.internal_notes),
      customer_notes: toNullable(parsed.data.customer_notes),
    })
    .eq("id", id);
  if (error) return { error: error.message };

  if (priceChanged && existing) {
    const { error: logError } = await supabase.from("price_override_log").insert({
      entity_type: "booking",
      entity_id: id,
      original_price: existing.total,
      new_price: parsed.total,
      reason: parsed.data.price_override_reason!,
      changed_by: profile.id,
    });
    if (logError) console.error("price_override_log insert failed", logError.message);
  }

  revalidatePath(`/admin/bookings/${id}`);
  redirect(`/admin/bookings/${id}?success=Changes+saved`);
}

type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "ASSIGNED"
  | "DRIVER_EN_ROUTE"
  | "PASSENGER_PICKED_UP"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export async function setBookingStatus(id: string, status: BookingStatus) {
  await requireRole(MANAGE_OPS);
  const supabase = await createClient();
  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) {
    // guard_booking_terminal_state raises a plain exception (not a
    // constraint violation), so this is the expected, user-facing path for
    // "that trip is already completed/cancelled/no-show" — redirect with the
    // message instead of throwing into the generic error boundary.
    redirect(`/admin/bookings/${id}?error=${encodeURIComponent(error.message)}`);
  }

  await logActivitySafe(supabase, {
    p_action: "booking.status_changed",
    p_entity_type: "booking",
    p_entity_id: id,
    p_metadata: { status },
  });

  if (status === "CONFIRMED" || status === "COMPLETED") {
    const { data: booking } = await supabase
      .from("bookings")
      .select("booking_reference, pickup, dropoff, trip_date, trip_time, total, currency, customers(full_name, email), vehicles(name)")
      .eq("id", id)
      .maybeSingle();
    const customer = (booking as any)?.customers;
    if (booking && customer?.email) {
      await notifyCustomer({
        templateKey: status === "CONFIRMED" ? "booking_confirmation" : "trip_completed",
        to: customer.email,
        vars: {
          customer_name: customer.full_name ?? "",
          booking_reference: booking.booking_reference,
          pickup: booking.pickup,
          dropoff: booking.dropoff,
          date: formatDate(booking.trip_date),
          time: formatTime(booking.trip_time),
          vehicle: (booking as any).vehicles?.name ?? "To be confirmed",
          total: formatCurrency(booking.total, booking.currency),
        },
        relatedEntityType: "booking",
        relatedEntityId: id,
      });
    }
  }

  revalidatePath(`/admin/bookings/${id}`);
  revalidatePath("/admin/bookings");
  revalidatePath("/admin/dispatch");
}

const CancelBookingSchema = z.object({
  cancellation_reason: z.string().trim().min(1, "A reason is required."),
  cancellation_initiated_by: z.enum(["CUSTOMER", "DRIVER", "STAFF"]),
  cancellation_fee: z.coerce.number().nonnegative().optional().or(z.literal("")),
  cancellation_refund_amount: z.coerce.number().nonnegative().optional().or(z.literal("")),
});

/** Cancelling loses no history — reason/initiator/fee/refund are captured
 * on the booking row itself (never just a bare status flip) so anyone
 * looking back later can see who cancelled it, why, and what money moved. */
export async function cancelBookingWithDetails(id: string, formData: FormData): Promise<void> {
  const profile = await requireRole(MANAGE_OPS);
  const parsed = CancelBookingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/bookings/${id}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { error } = await supabase
    .from("bookings")
    .update({
      status: "CANCELLED",
      cancelled_by: profile.id,
      cancellation_reason: parsed.data.cancellation_reason,
      cancellation_initiated_by: parsed.data.cancellation_initiated_by,
      cancellation_fee: parsed.data.cancellation_fee === "" ? null : parsed.data.cancellation_fee ?? null,
      cancellation_refund_amount: parsed.data.cancellation_refund_amount === "" ? null : parsed.data.cancellation_refund_amount ?? null,
    })
    .eq("id", id);
  if (error) redirect(`/admin/bookings/${id}?error=${encodeURIComponent(error.message)}`);

  await logActivitySafe(supabase, {
    p_action: "booking.cancelled",
    p_entity_type: "booking",
    p_entity_id: id,
    p_metadata: {
      reason: parsed.data.cancellation_reason,
      initiated_by: parsed.data.cancellation_initiated_by,
      fee: parsed.data.cancellation_fee || null,
      refund_amount: parsed.data.cancellation_refund_amount || null,
    },
  });

  revalidatePath(`/admin/bookings/${id}`);
  revalidatePath("/admin/bookings");
  revalidatePath("/admin/dispatch");
}

const NoShowSchema = z.object({
  no_show_type: z.enum(["PASSENGER", "DRIVER"]),
  no_show_notes: z.string().trim().min(1, "Notes / evidence are required."),
  no_show_charge: z.coerce.number().nonnegative().optional().or(z.literal("")),
  no_show_refund_amount: z.coerce.number().nonnegative().optional().or(z.literal("")),
});

/** Same principle as cancellation — who didn't show (passenger or driver),
 * the evidence/notes, and any charge or refund are recorded on the booking
 * rather than a bare status change with no explanation. */
export async function markNoShowWithDetails(id: string, formData: FormData): Promise<void> {
  await requireRole(MANAGE_OPS);
  const parsed = NoShowSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/bookings/${id}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { error } = await supabase
    .from("bookings")
    .update({
      status: "NO_SHOW",
      no_show_type: parsed.data.no_show_type,
      no_show_notes: parsed.data.no_show_notes,
      no_show_charge: parsed.data.no_show_charge === "" ? null : parsed.data.no_show_charge ?? null,
      no_show_refund_amount: parsed.data.no_show_refund_amount === "" ? null : parsed.data.no_show_refund_amount ?? null,
    })
    .eq("id", id);
  if (error) redirect(`/admin/bookings/${id}?error=${encodeURIComponent(error.message)}`);

  await logActivitySafe(supabase, {
    p_action: "booking.no_show",
    p_entity_type: "booking",
    p_entity_id: id,
    p_metadata: {
      type: parsed.data.no_show_type,
      notes: parsed.data.no_show_notes,
      charge: parsed.data.no_show_charge || null,
      refund_amount: parsed.data.no_show_refund_amount || null,
    },
  });

  revalidatePath(`/admin/bookings/${id}`);
  revalidatePath("/admin/bookings");
  revalidatePath("/admin/dispatch");
}

export async function assignDriverAndVehicle(id: string, formData: FormData) {
  const profile = await requireRole(MANAGE_OPS);
  const driverId = toNullable(formData.get("driver_id")?.toString());
  const vehicleId = toNullable(formData.get("vehicle_id")?.toString());
  const force = formData.get("force") === "1";

  const supabase = await createClient();
  const { data: booking } = await supabase
    .from("bookings")
    .select("status, trip_date, trip_time, estimated_duration_minutes")
    .eq("id", id)
    .single();
  if (!booking) throw new Error("Booking not found.");

  if ((driverId || vehicleId) && !force) {
    const { data: conflicts } = await supabase.rpc("check_assignment_conflicts", {
      p_booking_id: id,
      // The SQL function's uuid params genuinely accept null (unassigned
      // driver/vehicle); the generator just can't see that from the
      // declaration, so it types them as required `string`.
      p_driver_id: driverId as string,
      p_vehicle_id: vehicleId as string,
      p_trip_date: booking.trip_date,
      p_trip_time: booking.trip_time,
      p_duration_minutes: booking.estimated_duration_minutes,
    });
    if (conflicts && conflicts.length > 0) {
      const summary = conflicts
        .map((c) => `${c.conflict_type === "DRIVER" ? "Driver" : "Vehicle"} already on ${c.booking_reference} (${c.trip_date} ${c.trip_time})`)
        .join("; ");
      redirect(`/admin/bookings/${id}?error=${encodeURIComponent(`Schedule conflict — ${summary}. Assign anyway to override.`)}`);
    }
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      driver_id: driverId,
      vehicle_id: vehicleId,
      assigned_by: profile.id,
      assigned_at: new Date().toISOString(),
      status: driverId && ["PENDING", "CONFIRMED"].includes(booking.status) ? "ASSIGNED" : booking.status,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  if (driverId || vehicleId) {
    await supabase.from("driver_assignments").insert({
      booking_id: id,
      driver_id: driverId,
      vehicle_id: vehicleId,
      assigned_by: profile.id,
    });
  }

  await logActivitySafe(supabase, {
    p_action: "booking.driver_assigned",
    p_entity_type: "booking",
    p_entity_id: id,
    p_metadata: { driver_id: driverId, vehicle_id: vehicleId, forced: force },
  });

  if (driverId) {
    const { data: updated } = await supabase
      .from("bookings")
      .select("booking_reference, customers(full_name, email), vehicles(name), drivers(full_name)")
      .eq("id", id)
      .maybeSingle();
    const customer = (updated as any)?.customers;
    if (updated && customer?.email) {
      await notifyCustomer({
        templateKey: "driver_assignment",
        to: customer.email,
        vars: {
          customer_name: customer.full_name ?? "",
          booking_reference: updated.booking_reference,
          driver_name: (updated as any).drivers?.full_name ?? "",
          vehicle: (updated as any).vehicles?.name ?? "",
        },
        relatedEntityType: "booking",
        relatedEntityId: id,
      });
    }
  }

  revalidatePath(`/admin/bookings/${id}`);
  revalidatePath("/admin/dispatch");
}
