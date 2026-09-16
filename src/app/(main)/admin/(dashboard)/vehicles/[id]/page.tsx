import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/dal";
import { canManageOps } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { SimpleTable } from "@/components/admin/ui/SimpleTable";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { VehicleForm } from "@/components/admin/vehicles/VehicleForm";
import { DocumentUploadForm } from "@/components/admin/documents/DocumentUploadForm";
import { DocumentExpiryList } from "@/components/admin/documents/DocumentExpiryList";
import { InternalNotes } from "@/components/admin/notes/InternalNotes";
import { ConfirmButton } from "@/components/admin/ui/ConfirmButton";
import { formatDate, formatTime } from "@/lib/admin/format";
import { updateVehicle, setVehicleStatus, archiveVehicle } from "@/lib/admin/actions/vehicles";

export const metadata: Metadata = { title: "Vehicle" };

const STATUSES = ["AVAILABLE", "MAINTENANCE", "INACTIVE"] as const;

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await requireUser();
  const supabase = await createClient();

  const { data: vehicle } = await supabase.from("vehicles").select("*, drivers(id, full_name)").eq("id", id).maybeSingle();
  if (!vehicle) notFound();

  const [{ data: trips }, { data: documents }] = await Promise.all([
    supabase
      .from("bookings")
      .select("id, booking_reference, pickup, dropoff, trip_date, trip_time, status")
      .eq("vehicle_id", id)
      .order("trip_date", { ascending: false })
      .limit(20),
    supabase.from("documents").select("*").eq("entity_type", "vehicle").eq("entity_id", id).order("created_at", { ascending: false }),
  ]);

  const canEdit = canManageOps(profile.role);

  return (
    <div>
      <PageHeader title={vehicle.name} actions={<StatusBadge status={vehicle.status} />} />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Section title="Vehicle details">
            <div className="p-4">
              {canEdit ? (
                <VehicleForm action={updateVehicle.bind(null, id)} vehicle={vehicle} submitLabel="Save changes" />
              ) : (
                <p className="text-sm text-admin-stone">{vehicle.registration_number}</p>
              )}
            </div>
          </Section>

          <Section title="Trips">
            <SimpleTable
              rows={trips ?? []}
              emptyTitle="No trips yet"
              columns={[
                { header: "Reference", cell: (t) => t.booking_reference },
                { header: "Route", cell: (t) => `${t.pickup} → ${t.dropoff}` },
                { header: "Date", cell: (t) => `${formatDate(t.trip_date)} ${formatTime(t.trip_time)}` },
                { header: "Status", cell: (t) => <StatusBadge status={t.status} /> },
              ]}
            />
          </Section>
        </div>

        {canEdit ? (
          <div className="space-y-4">
            <Section title="Documents">
              <div className="p-4 space-y-3">
                <DocumentExpiryList documents={documents ?? []} />
                <DocumentUploadForm entityType="vehicle" entityId={id} defaultDocType="VEHICLE_DOCUMENT" />
              </div>
            </Section>
            <Section title="Maintenance">
              <div className="p-4">
                <a href="/admin/fleet/maintenance" className="text-sm text-admin-gold hover:underline">
                  View / log maintenance →
                </a>
              </div>
            </Section>
            <Section title="Status">
              <div className="p-4 flex flex-wrap gap-1.5">
                {STATUSES.map((s) => (
                  <form key={s} action={setVehicleStatus.bind(null, id, s)}>
                    <button
                      type="submit"
                      disabled={vehicle.status === s}
                      className={`text-xs px-2.5 py-1.5 rounded-sm border ${vehicle.status === s ? "border-admin-navy bg-admin-navy text-admin-ivory" : "border-admin-line hover:bg-admin-ivory-deep"}`}
                    >
                      {s}
                    </button>
                  </form>
                ))}
              </div>
            </Section>
            <Section title="Archive">
              <div className="p-4">
                <form action={archiveVehicle.bind(null, id)}>
                  <ConfirmButton
                    confirmMessage={`Archive ${vehicle.name}? It'll disappear from pickers but historical bookings keep their record.`}
                    className="w-full text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-red-50 hover:text-red-700"
                  >
                    Archive vehicle
                  </ConfirmButton>
                </form>
              </div>
            </Section>
            <Section title="Internal notes">
              <div className="p-4">
                <InternalNotes entityType="vehicle" entityId={id} />
              </div>
            </Section>
          </div>
        ) : null}
      </div>
    </div>
  );
}
