import type { Metadata } from "next";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_OPS } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { EntityPicker } from "@/components/admin/ui/EntityPicker";
import { formatDateTime } from "@/lib/admin/format";
import { setAlertStatus, snoozeAlert, assignAlert } from "@/lib/admin/actions/alerts";

export const metadata: Metadata = { title: "Alerts" };

function SeverityIcon({ severity }: { severity: string }) {
  if (severity === "CRITICAL") return <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />;
  if (severity === "WARNING") return <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />;
  return <Info className="h-4 w-4 text-blue-600 shrink-0" />;
}

export default async function AlertsPage() {
  await requireRole(MANAGE_OPS);
  const supabase = await createClient();

  // Refresh live conditions into the alerts table before rendering.
  await supabase.rpc("refresh_operational_alerts");

  const { data: alerts } = await supabase
    .from("operational_alerts")
    .select("*, profiles!operational_alerts_assigned_to_fkey(full_name)")
    .order("severity", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(200);

  const now = Date.now();
  const visible = (alerts ?? []).filter((a) => {
    if (a.status === "RESOLVED") return false;
    if (a.status === "SNOOZED" && a.snoozed_until && new Date(a.snoozed_until).getTime() > now) return false;
    return true;
  });

  const bySeverity = { CRITICAL: 0, WARNING: 0, INFO: 0 } as Record<string, number>;
  for (const a of visible) bySeverity[a.severity] = (bySeverity[a.severity] ?? 0) + 1;

  return (
    <div>
      <PageHeader
        title="Alerts"
        description={`${bySeverity.CRITICAL} critical · ${bySeverity.WARNING} warning · ${bySeverity.INFO} info — refreshed on every page load from live data.`}
      />

      <Card>
        {visible.length === 0 ? (
          <EmptyState title="All clear" description="No open alerts right now." />
        ) : (
          <ul className="divide-y divide-admin-line">
            {visible.map((a) => (
              <li key={a.id} className="px-4 py-3">
                <div className="flex items-start gap-3">
                  <SeverityIcon severity={a.severity} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-admin-ink">{a.title}</p>
                    {a.message ? <p className="text-xs text-admin-stone mt-0.5">{a.message}</p> : null}
                    <p className="text-[11px] text-admin-stone mt-1">
                      {formatDateTime(a.created_at)}
                      {(a as any).profiles?.full_name ? ` · assigned to ${(a as any).profiles.full_name}` : ""}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <form action={setAlertStatus.bind(null, a.id, "ACKNOWLEDGED")}>
                        <button type="submit" className="text-xs border border-admin-line px-2 py-1 rounded-sm hover:bg-admin-ivory-deep" disabled={a.status === "ACKNOWLEDGED"}>
                          Acknowledge
                        </button>
                      </form>
                      <form action={setAlertStatus.bind(null, a.id, "RESOLVED")}>
                        <button type="submit" className="text-xs border border-emerald-200 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-sm hover:bg-emerald-100">
                          Resolve
                        </button>
                      </form>
                      <form action={snoozeAlert.bind(null, a.id, 3)}>
                        <button type="submit" className="text-xs border border-admin-line px-2 py-1 rounded-sm hover:bg-admin-ivory-deep">
                          Snooze 3d
                        </button>
                      </form>
                      <form action={assignAlert.bind(null, a.id)} className="flex items-center gap-1 w-56">
                        <EntityPicker entity="profiles" name="assigned_to" placeholder="Assign to…" />
                        <button type="submit" className="text-xs border border-admin-line px-2 py-1 rounded-sm hover:bg-admin-ivory-deep shrink-0">
                          Go
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
