import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_OPS } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { EntityPicker } from "@/components/admin/ui/EntityPicker";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import { createMaintenanceRecord } from "@/lib/admin/actions/fleet";

export const metadata: Metadata = { title: "Vehicle maintenance" };

const MAINTENANCE_TYPES = ["OIL_SERVICE", "TIRES", "BRAKES", "INSPECTION", "REGISTRATION", "INSURANCE", "GENERAL", "REPAIR"];

export default async function FleetMaintenancePage() {
  await requireRole(MANAGE_OPS);
  const supabase = await createClient();

  const { data: records } = await supabase
    .from("vehicle_maintenance")
    .select("*, vehicles(name)")
    .order("service_date", { ascending: false })
    .limit(100);

  const today = new Date().toISOString().slice(0, 10);
  const dueSoon = (records ?? []).filter((r) => r.next_service_date && r.next_service_date <= today);

  return (
    <div>
      <PageHeader title="Vehicle maintenance" description="Full service history — records are never deleted, only added to." />

      {dueSoon.length > 0 ? (
        <div className="mb-4 flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-3 py-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {dueSoon.length} vehicle{dueSoon.length > 1 ? "s" : ""} past their next service date — see /admin/alerts.
        </div>
      ) : null}

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Section title="Service history">
            {!records || records.length === 0 ? (
              <EmptyState title="No maintenance recorded yet" />
            ) : (
              <ul className="divide-y divide-admin-line">
                {records.map((r) => (
                  <li key={r.id} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-admin-ink">
                          {(r as any).vehicles?.name ?? "Unknown vehicle"} · {r.maintenance_type.replaceAll("_", " ")}
                        </p>
                        <p className="text-xs text-admin-stone mt-0.5">
                          {formatDate(r.service_date)}
                          {r.mileage ? ` · ${r.mileage.toLocaleString()} km` : ""}
                          {r.vendor ? ` · ${r.vendor}` : ""}
                        </p>
                        {r.description ? <p className="text-xs text-admin-stone mt-1">{r.description}</p> : null}
                        {r.next_service_date ? (
                          <p className="text-xs text-amber-700 mt-1">Next service: {formatDate(r.next_service_date)}</p>
                        ) : null}
                      </div>
                      <span className="text-sm font-medium text-admin-ink shrink-0">{formatCurrency(r.cost, r.currency)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </div>

        <div>
          <Section title="Log service">
            <form action={createMaintenanceRecord} className="p-4 space-y-3">
              <div>
                <label className="block text-xs text-admin-stone mb-1">Vehicle</label>
                <EntityPicker entity="vehicles" name="vehicle_id" placeholder="Search vehicles…" required />
              </div>
              <div>
                <label className="block text-xs text-admin-stone mb-1">Type</label>
                <select name="maintenance_type" className="input-luxe" required defaultValue="GENERAL">
                  {MAINTENANCE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-admin-stone mb-1">Service date</label>
                <input type="date" name="service_date" required defaultValue={today} className="input-luxe" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-admin-stone mb-1">Mileage</label>
                  <input type="number" name="mileage" min={0} className="input-luxe" />
                </div>
                <div>
                  <label className="block text-xs text-admin-stone mb-1">Cost</label>
                  <input type="number" name="cost" min={0} step="0.01" defaultValue="0" className="input-luxe" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-admin-stone mb-1">Vendor</label>
                <input name="vendor" className="input-luxe" />
              </div>
              <div>
                <label className="block text-xs text-admin-stone mb-1">Description</label>
                <textarea name="description" rows={2} className="input-luxe" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-admin-stone mb-1">Next service date</label>
                  <input type="date" name="next_service_date" className="input-luxe" />
                </div>
                <div>
                  <label className="block text-xs text-admin-stone mb-1">Next service mileage</label>
                  <input type="number" name="next_service_mileage" min={0} className="input-luxe" />
                </div>
              </div>
              <button type="submit" className="w-full text-sm bg-admin-navy text-admin-ivory px-3 py-2 rounded-sm hover:bg-admin-navy-deep">
                Add record
              </button>
            </form>
          </Section>
        </div>
      </div>
    </div>
  );
}
