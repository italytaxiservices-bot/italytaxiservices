import "server-only";

import { createClient } from "@/lib/supabase/server";

/**
 * "Sent to driver" events are stored as internal notes with this prefix, so
 * they show up in the booking's internal-notes timeline too and need no
 * schema change. The prefix is also how the briefing box finds them again.
 */
export const DRIVER_BRIEFING_NOTE_PREFIX = "Driver briefing:";

export type DriverBriefingLogEntry = { id: string; note: string; created_at: string; by: string | null };

/** Which of these bookings/leads have already been sent to a driver — one query for a whole list page. */
export async function getDriverNotifiedIds(entityType: "booking" | "lead", entityIds: string[]): Promise<Set<string>> {
  if (entityIds.length === 0) return new Set();
  const supabase = await createClient();
  const { data } = await supabase
    .from("internal_notes")
    .select("entity_id")
    .eq("entity_type", entityType)
    .in("entity_id", entityIds)
    .ilike("note", `${DRIVER_BRIEFING_NOTE_PREFIX}%`);
  return new Set((data ?? []).map((n) => n.entity_id));
}

export async function getDriverBriefingLog(entityType: "booking" | "lead", entityId: string): Promise<DriverBriefingLogEntry[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("internal_notes")
    .select("id, note, created_at, profiles(full_name)")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .ilike("note", `${DRIVER_BRIEFING_NOTE_PREFIX}%`)
    .order("created_at", { ascending: false })
    .limit(10);

  return (data ?? []).map((n) => ({
    id: n.id,
    note: n.note.slice(DRIVER_BRIEFING_NOTE_PREFIX.length).trim(),
    created_at: n.created_at,
    by: (n.profiles as { full_name: string | null } | null)?.full_name ?? null,
  }));
}
