import Link from "next/link";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_OPS } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { EntityPicker } from "@/components/admin/ui/EntityPicker";
import { formatTime } from "@/lib/admin/format";
import { isoDate } from "@/lib/admin/date-range";
import { assignDriverAndVehicle } from "@/lib/admin/actions/bookings";

export const metadata: Metadata = { title: "Dispatch" };

export default async function DispatchPage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  await requireRole(MANAGE_OPS);
  const { date } = await searchParams;
  const day = date || isoDate(new Date());

  const supabase = await createClient();
  const { data: trips } = await supabase
    .from("bookings")
    .select("id, booking_reference, trip_time, pickup, dropoff, status, payment_status, customers(full_name, phone), vehicles(id, name), drivers(id, full_name)")
    .eq("trip_date", day)
    .is("deleted_at", null)
    .not("status", "in", "(CANCELLED,NO_SHOW)")
    .order("trip_time", { ascending: true });

  return (
    <div>
      <PageHeader
        title="Dispatch"
        description="Today's operations control center."
        actions={
          <form className="flex items-center gap-2">
            <input type="date" name="date" defaultValue={day} className="input-luxe" />
            <button type="submit" className="border border-admin-line px-3 py-2 rounded-sm text-sm hover:bg-white">
              Go
            </button>
          </form>
        }
      />

      <div className="flex gap-2 mb-4 text-sm">
        <Link href="/admin/dispatch" className="text-admin-gold hover:underline">
          Today
        </Link>
      </div>

      <Card>
        {!trips || trips.length === 0 ? (
          <EmptyState title="No trips scheduled" description="Nothing on the board for this date." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-admin-stone border-b border-admin-line">
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Booking</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Route</th>
                  <th className="px-4 py-3 font-medium min-w-[220px]">Driver / Vehicle</th>
                  <th className="px-4 py-3 font-medium">Payment</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-line">
                {trips.map((t: any) => {
                  const unassigned = !t.drivers && !t.vehicles;
                  return (
                    <tr key={t.id} className={unassigned ? "bg-amber-50/60" : ""}>
                      <td className="px-4 py-3 font-medium">{formatTime(t.trip_time)}</td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/bookings/${t.id}`} className="text-admin-ink hover:text-admin-gold font-medium">
                          {t.booking_reference}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <p>{t.customers?.full_name}</p>
                        <p className="text-xs text-admin-stone">{t.customers?.phone}</p>
                      </td>
                      <td className="px-4 py-3 text-admin-stone">
                        {t.pickup} → {t.dropoff}
                      </td>
                      <td className="px-4 py-3">
                        <form action={assignDriverAndVehicle.bind(null, t.id)} className="flex flex-col gap-1.5">
                          <EntityPicker entity="drivers" name="driver_id" defaultValue={t.drivers?.id} defaultLabel={t.drivers?.full_name} placeholder="Assign driver…" />
                          <EntityPicker entity="vehicles" name="vehicle_id" defaultValue={t.vehicles?.id} defaultLabel={t.vehicles?.name} placeholder="Assign vehicle…" />
                          <button type="submit" className="text-xs self-start text-admin-gold hover:underline">
                            Save
                          </button>
                        </form>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={t.payment_status} />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={t.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
