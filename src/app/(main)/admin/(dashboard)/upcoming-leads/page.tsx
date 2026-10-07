import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/dal";
import { canManageCrm } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { LeadContactButtons } from "@/components/admin/leads/LeadContactButtons";
import { businessToday, formatDate, formatTime, formatReceived } from "@/lib/admin/format";
import { siteConfig } from "@/lib/siteConfig";
import { hasCountryCode } from "@/lib/phone";

export const metadata: Metadata = { title: "Upcoming trips" };

const LIMIT = 200;

const VIEWS = {
  new: { label: "To contact", hint: "New, nobody has reached out yet" },
  open: { label: "All open", hint: "Everything not won or lost" },
  all: { label: "All", hint: "Including won and lost" },
} as const;
type View = keyof typeof VIEWS;

/**
 * Leads whose trip is today or later, soonest first — the call list for
 * reaching out to every upcoming enquiry one by one before the trip date
 * passes.
 */
export default async function UpcomingLeadsPage({ searchParams }: { searchParams: Promise<{ show?: string; q?: string }> }) {
  const profile = await requireUser();
  const { show, q } = await searchParams;
  const view: View = show && show in VIEWS ? (show as View) : "new";
  const canContact = canManageCrm(profile.role);
  const today = businessToday();

  const supabase = await createClient();
  const base = () => supabase.from("leads").select("id", { count: "exact", head: true }).is("deleted_at", null).gte("trip_date", today);
  const [newCount, openCount, allCount] = await Promise.all([
    base().eq("status", "NEW"),
    base().not("status", "in", "(WON,LOST)"),
    base(),
  ]);
  const counts: Record<View, number> = { new: newCount.count ?? 0, open: openCount.count ?? 0, all: allCount.count ?? 0 };

  let query = supabase
    .from("leads")
    .select("id, lead_number, full_name, phone, whatsapp, email, status, pickup, dropoff, trip_date, trip_time, passengers, notes, created_at")
    .is("deleted_at", null)
    .gte("trip_date", today)
    .order("trip_date", { ascending: true })
    .order("trip_time", { ascending: true, nullsFirst: false })
    .limit(LIMIT);
  if (view === "new") query = query.eq("status", "NEW");
  if (view === "open") query = query.not("status", "in", "(WON,LOST)");
  if (q) query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%,pickup.ilike.%${q}%,dropoff.ilike.%${q}%`);
  const { data: leads } = await query;
  const rows = leads ?? [];

  // Latest "Customer contacted ..." note per lead (written by markLeadContacted).
  const { data: contactNotes } = rows.length
    ? await supabase
        .from("internal_notes")
        .select("entity_id, note, created_at")
        .eq("entity_type", "lead")
        .in("entity_id", rows.map((l) => l.id))
        .ilike("note", "Customer contacted%")
        .order("created_at", { ascending: false })
    : { data: [] as { entity_id: string; note: string; created_at: string }[] };
  const lastContact = new Map<string, { note: string; created_at: string }>();
  for (const n of contactNotes ?? []) if (!lastContact.has(n.entity_id)) lastContact.set(n.entity_id, n);

  // Group by trip date so the list reads like a calendar.
  const groups = new Map<string, typeof rows>();
  for (const l of rows) {
    const key = l.trip_date as string;
    groups.set(key, [...(groups.get(key) ?? []), l]);
  }

  return (
    <div>
      <PageHeader
        title="Upcoming trips (leads)"
        description={`Enquiries with a trip date from ${formatDate(today)} onwards, soonest first. Message them one by one.`}
        actions={
          <>
            {profile.role !== "DISPATCHER" ? (
              <a href="/admin/exports/trips?dataset=leads&period=upcoming" className="text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-white">⬇ Export to sheet</a>
            ) : null}
            <Link href="/admin/leads" className="text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-white">
              All leads
            </Link>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 bg-white border border-admin-line rounded-sm p-1">
          {(Object.keys(VIEWS) as View[]).map((key) => (
            <Link
              key={key}
              href={`/admin/upcoming-leads?show=${key}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              title={VIEWS[key].hint}
              className={`px-3 py-1.5 text-xs rounded-sm ${view === key ? "bg-admin-navy text-admin-ivory" : "text-admin-stone hover:bg-admin-ivory-deep"}`}
            >
              {VIEWS[key].label} ({counts[key]})
            </Link>
          ))}
        </div>
        <form className="flex gap-2">
          <input type="hidden" name="show" value={view} />
          <input type="search" name="q" defaultValue={q} placeholder="Search name, phone, place…" className="input-luxe max-w-xs" />
          <button type="submit" className="border border-admin-line px-4 py-2 rounded-sm text-sm hover:bg-white">
            Search
          </button>
        </form>
      </div>

      {rows.length === 0 ? (
        <Card>
          <EmptyState title={view === "new" ? "Everyone upcoming has been contacted 🎉" : "No upcoming trips"} />
        </Card>
      ) : (
        <div className="space-y-6">
          {[...groups.entries()].map(([date, items]) => (
            <section key={date}>
              <h2 className="text-sm font-semibold text-admin-ink-soft mb-2">
                {dayLabel(date, today)} <span className="text-admin-stone font-normal">· {items.length}</span>
              </h2>
              <Card>
                <ul className="divide-y divide-admin-line">
                  {items.map((l) => {
                    const phone = l.whatsapp || l.phone;
                    const contact = lastContact.get(l.id);
                    return (
                      <li key={l.id} className="px-4 py-3 space-y-2">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="min-w-0">
                            <Link href={`/admin/leads/${l.id}`} className="text-sm font-semibold text-admin-ink hover:text-admin-gold">
                              {l.full_name}
                            </Link>
                            <span className="text-xs text-admin-stone"> · {l.lead_number}</span>
                            <p className="text-xs text-admin-ink">
                              🕒 {formatTime(l.trip_time)} · 📍 {l.pickup ?? "—"} → {l.dropoff ?? "—"}
                              {l.passengers ? ` · 👥 ${l.passengers}` : ""}
                            </p>
                            <p className="text-xs text-admin-stone">
                              {[phone, l.email].filter(Boolean).join(" · ") || "No contact details"} · Received {formatReceived(l.created_at)}
                            </p>
                            {phone && !hasCountryCode(phone) ? (
                              <p className="text-xs text-red-700 font-medium">⚠️ Phone has no country code — WhatsApp may open the wrong number. Fix it on the lead page.</p>
                            ) : null}
                            {contact ? (
                              <p className="text-xs text-emerald-700 font-medium">
                                ✅ {contact.note} · {formatReceived(contact.created_at)}
                              </p>
                            ) : null}
                          </div>
                          <StatusBadge status={l.status} />
                        </div>
                        {canContact ? (
                          <LeadContactButtons
                            leadId={l.id}
                            phone={phone}
                            email={l.email}
                            subject={`Your transfer ${l.pickup ?? ""} → ${l.dropoff ?? ""} on ${formatDate(l.trip_date)} — ${siteConfig.name}`}
                            message={outreachMessage(l)}
                          />
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </section>
          ))}
          {rows.length === LIMIT ? <p className="text-xs text-admin-stone">Showing the first {LIMIT}. Use search to narrow down.</p> : null}
        </div>
      )}
    </div>
  );
}

function outreachMessage(l: { full_name: string; pickup: string | null; dropoff: string | null; trip_date: string | null; trip_time: string | null }) {
  const firstName = l.full_name.split(" ")[0];
  const when = `${formatDate(l.trip_date)}${l.trip_time ? ` at ${formatTime(l.trip_time)}` : ""}`;
  return [
    `Hi ${firstName}, this is ${siteConfig.name} 🚖`,
    ``,
    `We received your transfer request ${l.pickup ?? ""} → ${l.dropoff ?? ""} on ${when}.`,
    `Would you like us to confirm it? We can send you a fixed price right away.`,
    ``,
    `Thank you!`,
  ].join("\n");
}

/** "Today", "Tomorrow", or e.g. "Wed, 08 Oct · in 2 days". Dates are YYYY-MM-DD in business time. */
function dayLabel(date: string, today: string) {
  const days = Math.round((Date.parse(`${date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  const label = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "2-digit", month: "short", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
  return `${label} · in ${days} days`;
}
