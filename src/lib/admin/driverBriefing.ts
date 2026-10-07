import "server-only";

import { createClient } from "@/lib/supabase/server";
import { tripCity } from "@/lib/admin/cities";
import { partnerOption, partnersFor } from "@/lib/admin/cityDrivers";
import type { DriverOption } from "@/components/admin/bookings/QuickDriverSend";

/**
 * "Sent to driver" events are stored as internal notes with this prefix, so
 * they show up in the booking's internal-notes timeline too and need no
 * schema change. The prefix is also how the briefing box finds them again.
 */
export const DRIVER_BRIEFING_NOTE_PREFIX = "Driver briefing:";

export type DriverBriefingLogEntry = { id: string; note: string; created_at: string; by: string | null };

/** Which of these bookings/leads have already been sent to a driver — one query per 200 ids (a list page is one). */
export async function getDriverNotifiedIds(entityType: "booking" | "lead", entityIds: string[]): Promise<Set<string>> {
  const notified = new Set<string>();
  if (entityIds.length === 0) return notified;
  const supabase = await createClient();
  // Chunked so a big export doesn't build an over-long `in (...)` URL.
  for (let i = 0; i < entityIds.length; i += 200) {
    const { data } = await supabase
      .from("internal_notes")
      .select("entity_id")
      .eq("entity_type", entityType)
      .in("entity_id", entityIds.slice(i, i + 200))
      .ilike("note", `${DRIVER_BRIEFING_NOTE_PREFIX}%`);
    for (const n of data ?? []) notified.add(n.entity_id);
  }
  return notified;
}

/** Latest "sent to driver" note per booking/lead, for list views and exports (queried 200 ids at a time). */
export async function getLatestDriverBriefings(
  entityType: "booking" | "lead",
  entityIds: string[]
): Promise<Map<string, { note: string; created_at: string }>> {
  const latest = new Map<string, { note: string; created_at: string }>();
  if (entityIds.length === 0) return latest;
  const supabase = await createClient();
  for (let i = 0; i < entityIds.length; i += 200) {
    const { data } = await supabase
      .from("internal_notes")
      .select("entity_id, note, created_at")
      .eq("entity_type", entityType)
      .in("entity_id", entityIds.slice(i, i + 200))
      .ilike("note", `${DRIVER_BRIEFING_NOTE_PREFIX}%`)
      .order("created_at", { ascending: false });
    for (const n of data ?? []) {
      if (!latest.has(n.entity_id)) {
        latest.set(n.entity_id, { note: n.note.slice(DRIVER_BRIEFING_NOTE_PREFIX.length).trim(), created_at: n.created_at });
      }
    }
  }
  return latest;
}

/**
 * Everyone a trip in this city can be given to, for the detail-page
 * "Copy for driver" picker: the city's own drivers/partners first, then
 * active drivers from Admin → Drivers (minus names already listed).
 */
export async function getDriverPickerOptions(pickup: string | null, dropoff: string | null): Promise<DriverOption[]> {
  const city = tripCity(pickup, dropoff);
  const local = partnersFor(city).map(partnerOption);
  const supabase = await createClient();
  const { data } = await supabase.from("drivers").select("id, full_name, phone, whatsapp, email").eq("active", true).is("deleted_at", null).order("full_name");
  const taken = new Set(local.map((o) => o.name.toLowerCase()));
  const fromDb = (data ?? [])
    .filter((d) => !taken.has(d.full_name.toLowerCase()))
    .map((d) => ({ id: d.id, name: d.full_name, phone: d.whatsapp || d.phone, email: d.email }));
  return [...local, ...fromDb];
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
