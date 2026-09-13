"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_CRM } from "@/lib/auth/roles";
import { ensureCustomerFromContact } from "@/lib/admin/actions/customers";
import type { Database } from "@/lib/supabase/types";

export type FormState = { error?: string } | undefined;

type LeadStatus = Database["public"]["Enums"]["lead_status"];

const LeadSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required."),
  email: z.string().trim().email("Enter a valid email.").optional().or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
  whatsapp: z.string().trim().optional().or(z.literal("")),
  source: z.string().trim().min(1).default("WEBSITE"),
  pickup: z.string().trim().optional().or(z.literal("")),
  dropoff: z.string().trim().optional().or(z.literal("")),
  trip_date: z.string().trim().optional().or(z.literal("")),
  trip_time: z.string().trim().optional().or(z.literal("")),
  passengers: z.coerce.number().int().positive().optional(),
  estimated_value: z.coerce.number().nonnegative().optional(),
  notes: z.string().trim().optional().or(z.literal("")),
});

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

function parseLeadForm(formData: FormData) {
  const raw = Object.fromEntries(formData);
  return LeadSchema.safeParse({
    ...raw,
    passengers: raw.passengers || undefined,
    estimated_value: raw.estimated_value || undefined,
  });
}

export async function createLead(_prevState: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireRole(MANAGE_CRM);
  const parsed = parseLeadForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .insert({
      // Filled in by the assign_lead_number trigger.
      lead_number: undefined!,
      full_name: parsed.data.full_name,
      email: toNullable(parsed.data.email),
      phone: toNullable(parsed.data.phone),
      whatsapp: toNullable(parsed.data.whatsapp),
      source: parsed.data.source,
      pickup: toNullable(parsed.data.pickup),
      dropoff: toNullable(parsed.data.dropoff),
      trip_date: toNullable(parsed.data.trip_date),
      trip_time: toNullable(parsed.data.trip_time),
      passengers: parsed.data.passengers ?? null,
      estimated_value: parsed.data.estimated_value ?? null,
      notes: toNullable(parsed.data.notes),
      created_by: profile.id,
      assigned_to: profile.id,
    })
    .select("id")
    .single();

  if (error || !data) return { error: error?.message ?? "Could not create lead." };

  await supabase.rpc("log_activity", {
    p_action: "lead.created",
    p_entity_type: "lead",
    p_entity_id: data.id,
    p_metadata: {},
  });

  revalidatePath("/admin/leads");
  redirect(`/admin/leads/${data.id}?success=Lead+created`);
}

export async function updateLead(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireRole(MANAGE_CRM);
  const parsed = parseLeadForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({
      full_name: parsed.data.full_name,
      email: toNullable(parsed.data.email),
      phone: toNullable(parsed.data.phone),
      whatsapp: toNullable(parsed.data.whatsapp),
      source: parsed.data.source,
      pickup: toNullable(parsed.data.pickup),
      dropoff: toNullable(parsed.data.dropoff),
      trip_date: toNullable(parsed.data.trip_date),
      trip_time: toNullable(parsed.data.trip_time),
      passengers: parsed.data.passengers ?? null,
      estimated_value: parsed.data.estimated_value ?? null,
      notes: toNullable(parsed.data.notes),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath(`/admin/leads/${id}`);
  redirect(`/admin/leads/${id}?success=Changes+saved`);
}

export async function setLeadStatus(id: string, status: LeadStatus) {
  await requireRole(MANAGE_CRM);
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/leads");
}

export async function assignLead(id: string, formData: FormData) {
  await requireRole(MANAGE_CRM);
  const assignedTo = formData.get("assignedTo")?.toString();
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ assigned_to: assignedTo || null }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/leads/${id}`);
}

export async function scheduleLeadFollowUp(leadId: string, formData: FormData) {
  const profile = await requireRole(MANAGE_CRM);
  const dueDate = formData.get("due_date")?.toString();
  const notes = formData.get("notes")?.toString();
  if (!dueDate) throw new Error("Due date is required.");

  const supabase = await createClient();
  const { data: lead } = await supabase.from("leads").select("customer_id").eq("id", leadId).single();

  const { error } = await supabase.from("follow_ups").insert({
    lead_id: leadId,
    customer_id: lead?.customer_id ?? null,
    type: "NEW_LEAD",
    due_date: dueDate,
    notes: notes || null,
    assigned_to: profile.id,
    created_by: profile.id,
  });
  if (error) throw new Error(error.message);

  await supabase.from("leads").update({ next_follow_up_at: dueDate }).eq("id", leadId);

  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin/follow-ups");
}

/** Links (or creates) a customer record for this lead, without changing its status. */
export async function convertLeadToCustomer(leadId: string) {
  const supabase = await createClient();
  const { data: lead, error: leadError } = await supabase.from("leads").select("*").eq("id", leadId).single();
  if (leadError || !lead) throw new Error("Lead not found.");

  if (lead.customer_id) return lead.customer_id as string;

  const customerId = await ensureCustomerFromContact({
    full_name: lead.full_name,
    email: lead.email,
    phone: lead.phone,
    whatsapp: lead.whatsapp,
  });

  const { error } = await supabase.from("leads").update({ customer_id: customerId }).eq("id", leadId);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/leads/${leadId}`);
  return customerId;
}

/** Form-action wrapper around convertLeadToCustomer that discards the returned id (form actions must return void). */
export async function convertLeadToCustomerAction(leadId: string) {
  await convertLeadToCustomer(leadId);
}

/** Convenience action: ensure a customer exists, then jump into a pre-filled new-quotation form. */
export async function convertLeadToQuotation(leadId: string) {
  const customerId = await convertLeadToCustomer(leadId);
  redirect(`/admin/quotations/new?lead_id=${leadId}&customer_id=${customerId}`);
}

/** Convenience action: ensure a customer exists, then jump into a pre-filled new-booking form. */
export async function convertLeadToBooking(leadId: string) {
  const customerId = await convertLeadToCustomer(leadId);
  await setLeadStatus(leadId, "WON");
  redirect(`/admin/bookings/new?lead_id=${leadId}&customer_id=${customerId}`);
}
