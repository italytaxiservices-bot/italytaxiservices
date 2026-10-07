"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/dal";
import { DRIVER_BRIEFING_NOTE_PREFIX } from "@/lib/admin/driverBriefing";

const NoteSchema = z.object({ note: z.string().trim().min(1, "Note can't be empty.") });

export async function addInternalNote(entityType: string, entityId: string, formData: FormData) {
  const profile = await requireUser();
  const parsed = NoteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;

  const supabase = await createClient();
  const { error } = await supabase.from("internal_notes").insert({
    entity_type: entityType,
    entity_id: entityId,
    note: parsed.data.note,
    created_by: profile.id,
  });
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/${entityType}s/${entityId}`);
}

/**
 * Records that the trip details went to a driver (WhatsApp or copied), so
 * anyone opening the booking can see the driver has already been told.
 */
export async function logDriverBriefingSent(input: {
  entityType: "booking" | "lead";
  entityId: string;
  method: "whatsapp" | "copy" | "email";
  driverName?: string | null;
  /** Partner companies are named as-is, not as "driver X". */
  isPartner?: boolean;
}) {
  const profile = await requireUser();
  const supabase = await createClient();

  const who = input.driverName ? (input.isPartner ? input.driverName : `driver ${input.driverName}`) : "driver";
  const how = {
    whatsapp: `sent to ${who} via WhatsApp`,
    email: `emailed to ${who}`,
    copy: `copied to send to ${who}`,
  }[input.method];
  const { error } = await supabase.from("internal_notes").insert({
    entity_type: input.entityType,
    entity_id: input.entityId,
    note: `${DRIVER_BRIEFING_NOTE_PREFIX} Booking details ${how}`,
    created_by: profile.id,
  });
  if (error) return { ok: false as const, error: error.message };

  revalidatePath(`/admin/${input.entityType}s/${input.entityId}`);
  revalidatePath("/admin/by-city");
  return { ok: true as const };
}
