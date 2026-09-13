import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { ADMIN_ONLY } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { Card } from "@/components/admin/ui/Card";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { formatDateTime } from "@/lib/admin/format";
import { setAutomationEnabled, setAutomationDelay } from "@/lib/admin/actions/automations";

export const metadata: Metadata = { title: "Automations" };

// The follow-up rules that take a configurable day-count, and which config
// field + label each one uses — everything else is a fixed on/off trigger.
const DELAY_RULES: Record<string, { field: "delay_days" | "days_ahead"; prompt: string }> = {
  quotation_follow_up: { field: "delay_days", prompt: "Follow up this many days after a quotation is sent" },
  post_trip_follow_up: { field: "delay_days", prompt: "Follow up this many days after a trip is completed" },
  upcoming_trip_reminders: { field: "days_ahead", prompt: "Remind this many days before the trip" },
};

export default async function AutomationsPage() {
  await requireRole(ADMIN_ONLY);
  const supabase = await createClient();

  const [{ data: definitions }, { data: runs }] = await Promise.all([
    supabase.from("automation_definitions").select("*").order("kind").order("label"),
    supabase.from("automation_runs").select("*").order("started_at", { ascending: false }).limit(50),
  ]);

  const runsByKey = new Map<string, number>();
  for (const r of runs ?? []) runsByKey.set(r.automation_key, (runsByKey.get(r.automation_key) ?? 0) + 1);

  return (
    <div>
      <PageHeader
        title="Automations"
        description="Every automated job in the system — invoice/receipt/follow-up triggers and the two daily cron jobs. Disable any one without touching code."
      />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-3">
          {(definitions ?? []).map((d) => (
            <Card key={d.key} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-admin-ink">{d.label}</p>
                  <p className="text-xs text-admin-stone mt-0.5">{d.description}</p>
                  <p className="text-[11px] text-admin-stone mt-1.5">
                    {d.kind === "CRON" ? "Runs on a daily schedule" : "Fires on the matching status change"} · {runsByKey.get(d.key) ?? 0} recent run{(runsByKey.get(d.key) ?? 0) === 1 ? "" : "s"}
                  </p>
                </div>
                <form action={setAutomationEnabled.bind(null, d.key)}>
                  <input type="hidden" name="enabled" value={d.enabled ? "0" : "1"} />
                  <button
                    type="submit"
                    className={`text-xs px-2.5 py-1 rounded-full border shrink-0 ${
                      d.enabled ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-admin-line text-admin-stone"
                    }`}
                  >
                    {d.enabled ? "Enabled" : "Disabled"}
                  </button>
                </form>
              </div>
              {DELAY_RULES[d.key] ? (
                <form
                  action={setAutomationDelay.bind(null, d.key, DELAY_RULES[d.key].field)}
                  className="mt-3 pt-3 border-t border-admin-line flex items-center gap-2 text-xs text-admin-stone"
                >
                  <label htmlFor={`${d.key}-days`}>{DELAY_RULES[d.key].prompt}:</label>
                  <input
                    id={`${d.key}-days`}
                    type="number"
                    name="days"
                    min={0}
                    max={365}
                    defaultValue={Number((d.config as Record<string, unknown>)?.[DELAY_RULES[d.key].field] ?? 0)}
                    className="input-luxe w-16 py-1"
                  />
                  <button type="submit" className="text-admin-gold hover:underline">
                    Save
                  </button>
                </form>
              ) : null}
            </Card>
          ))}
        </div>

        <div className="lg:col-span-2">
          <Section title="Recent runs">
            {runs && runs.length > 0 ? (
              <ul className="divide-y divide-admin-line">
                {runs.map((r) => (
                  <li key={r.id} className="px-4 py-3 flex items-center justify-between gap-3 text-sm">
                    <div>
                      <p className="font-medium text-admin-ink">{r.automation_key}</p>
                      <p className="text-xs text-admin-stone">
                        {r.triggered_by} · affected {r.affected_count} · {formatDateTime(r.started_at)}
                        {r.error_message ? ` · ${r.error_message}` : ""}
                      </p>
                    </div>
                    <StatusBadge status={r.status} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title="No automation runs yet" description="Runs are logged the next time a trigger fires or a cron job executes." />
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}
