import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/dal";

const ENTITIES = ["customers", "drivers", "vehicles", "bookings", "profiles"] as const;
type Entity = (typeof ENTITIES)[number];

const TABLES: Record<Entity, { columns: string; label: (row: any) => string }> = {
  customers: {
    columns: "id, full_name, email, phone",
    label: (r) => `${r.full_name}${r.phone ? ` · ${r.phone}` : r.email ? ` · ${r.email}` : ""}`,
  },
  drivers: {
    columns: "id, full_name, phone",
    label: (r) => `${r.full_name}${r.phone ? ` · ${r.phone}` : ""}`,
  },
  vehicles: {
    columns: "id, name, category, registration_number",
    label: (r) => `${r.name}${r.registration_number ? ` · ${r.registration_number}` : ""}`,
  },
  bookings: {
    columns: "id, booking_reference, pickup, dropoff",
    label: (r) => `${r.booking_reference} · ${r.pickup} → ${r.dropoff}`,
  },
  profiles: {
    columns: "id, full_name, email",
    label: (r) => `${r.full_name || r.email}`,
  },
};

// Small authenticated lookup endpoint backing the EntityPicker combobox.
// Reads through the request-scoped Supabase client, so results are already
// bounded by the same RLS the rest of the admin app respects.
export async function GET(request: NextRequest) {
  const profile = await getCurrentProfile();
  if (!profile || !profile.active) {
    return NextResponse.json({ results: [] }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const rawEntity = searchParams.get("entity") ?? "";
  const q = searchParams.get("q")?.trim() ?? "";
  if (!ENTITIES.includes(rawEntity as Entity)) {
    return NextResponse.json({ error: "Unknown entity" }, { status: 400 });
  }
  const entity = rawEntity as Entity;
  const table = TABLES[entity];

  const supabase = await createClient();
  let query = supabase.from(entity).select(table.columns).limit(20);

  // query's row type is the intersection across all four possible tables
  // (only columns common to all of them, like id/created_at, type-check on
  // it directly) since `entity` is a union at the point .from() was called —
  // the "active" cast below is safe because it's gated by the matching
  // runtime check just above it.
  if (entity === "customers") query = query.is("deleted_at", null);
  if (entity === "vehicles") query = query.eq("active" as any, true);
  if (entity === "drivers") query = query.eq("active" as any, true);
  if (entity === "bookings") query = query.is("deleted_at", null).order("trip_date", { ascending: false });
  if (entity === "profiles") query = query.eq("active" as any, true);

  if (q) {
    if (entity === "customers") {
      query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`);
    } else if (entity === "drivers") {
      query = query.or(`full_name.ilike.%${q}%,phone.ilike.%${q}%`);
    } else if (entity === "vehicles") {
      query = query.or(`name.ilike.%${q}%,registration_number.ilike.%${q}%`);
    } else if (entity === "bookings") {
      query = query.ilike("booking_reference", `%${q}%`);
    } else if (entity === "profiles") {
      query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%`);
    }
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results = (data ?? []).map((row: any) => ({ id: row.id, label: table.label(row) }));
  return NextResponse.json({ results });
}
