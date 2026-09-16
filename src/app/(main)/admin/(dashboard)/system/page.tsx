import type { Metadata } from "next";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { requireRole } from "@/lib/auth/dal";
import { ADMIN_ONLY } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { formatDateTime } from "@/lib/admin/format";

export const metadata: Metadata = { title: "System health" };

type CheckStatus = "ok" | "warn" | "fail";

function StatusIcon({ status }: { status: CheckStatus }) {
  if (status === "ok") return <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />;
  if (status === "warn") return <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />;
  return <XCircle className="h-4 w-4 text-red-600 shrink-0" />;
}

const CORE_TABLES = ["customers", "leads", "quotations", "bookings", "invoices", "payments", "drivers", "vehicles"] as const;

export default async function SystemHealthPage() {
  await requireRole(ADMIN_ONLY);
  const supabase = await createClient();

  // Database connectivity — a real query, not a hardcoded "healthy".
  const dbCheckStart = Date.now();
  const { error: dbError } = await supabase.from("company_settings").select("id").limit(1).maybeSingle();
  const dbLatencyMs = Date.now() - dbCheckStart;

  const [{ data: recentRuns }, { data: definitions }, tableCountsRes] = await Promise.all([
    supabase.from("automation_runs").select("automation_key, status, started_at, affected_count").order("started_at", { ascending: false }).limit(20),
    supabase.from("automation_definitions").select("key, label, kind, enabled"),
    Promise.all(CORE_TABLES.map((t) => supabase.from(t).select("id", { count: "exact", head: true }).is("deleted_at", null))),
  ]);

  const tableCounts = CORE_TABLES.map((t, i) => ({ table: t, count: tableCountsRes[i].count ?? 0 }));

  const cronDefs = (definitions ?? []).filter((d) => d.kind === "CRON");
  const cronHealth = cronDefs.map((d) => {
    const lastRun = recentRuns?.find((r) => r.automation_key === d.key);
    const hoursSinceRun = lastRun ? (Date.now() - new Date(lastRun.started_at).getTime()) / 3_600_000 : null;
    let status: CheckStatus = "fail";
    if (!d.enabled) status = "warn";
    else if (hoursSinceRun !== null && hoursSinceRun < 30) status = "ok";
    else if (hoursSinceRun !== null) status = "warn";
    return { ...d, lastRun, hoursSinceRun, status };
  });

  // Env var presence only — never render actual values.
  const envChecks = [
    { name: "NEXT_PUBLIC_SUPABASE_URL", present: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) },
    { name: "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", present: Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) },
    { name: "SUPABASE_SERVICE_ROLE_KEY", present: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY) },
    { name: "CRON_SECRET", present: Boolean(process.env.CRON_SECRET) },
    { name: "GMAIL_USER", present: Boolean(process.env.GMAIL_USER) },
    { name: "GMAIL_APP_PASSWORD", present: Boolean(process.env.GMAIL_APP_PASSWORD) },
    { name: "MAIL_FROM_BOOKING", present: Boolean(process.env.MAIL_FROM_BOOKING) },
    { name: "MAIL_TO_BOOKING", present: Boolean(process.env.MAIL_TO_BOOKING) },
  ];

  return (
    <div>
      <PageHeader title="System health" description="Live checks — nothing on this page is a placeholder or a fabricated status." />

      <div className="grid lg:grid-cols-2 gap-4">
        <Section title="Database">
          <div className="p-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <StatusIcon status={dbError ? "fail" : "ok"} />
              <span>{dbError ? `Query failed: ${dbError.message}` : `Connected — round trip ${dbLatencyMs}ms`}</span>
            </div>
          </div>
        </Section>

        <Section title="Environment configuration">
          <ul className="p-4 space-y-1.5 text-sm">
            {envChecks.map((c) => (
              <li key={c.name} className="flex items-center gap-2">
                <StatusIcon status={c.present ? "ok" : "fail"} />
                <code className="text-xs">{c.name}</code>
                {!c.present ? <span className="text-xs text-red-600">not set</span> : null}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Scheduled automations">
          <ul className="p-4 space-y-2 text-sm">
            {cronHealth.map((c) => (
              <li key={c.key} className="flex items-start gap-2">
                <StatusIcon status={c.status} />
                <div>
                  <p>{c.label}</p>
                  <p className="text-xs text-admin-stone">
                    {!c.enabled
                      ? "Disabled in /admin/automations"
                      : c.lastRun
                        ? `Last ran ${formatDateTime(c.lastRun.started_at)} (${c.lastRun.status}, ${c.lastRun.affected_count} affected)`
                        : "Never run yet — check vercel.json crons are deployed and CRON_SECRET is set in Vercel's env vars"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Record counts">
          <ul className="p-4 grid grid-cols-2 gap-2 text-sm">
            {tableCounts.map((t) => (
              <li key={t.table} className="flex justify-between">
                <span className="text-admin-stone capitalize">{t.table}</span>
                <span className="font-medium">{t.count}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
