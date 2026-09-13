import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CalendarClock } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { canManageOps, canViewFinance, canManageFinance } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { SimpleTable } from "@/components/admin/ui/SimpleTable";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { StatCard } from "@/components/admin/ui/Card";
import { DriverForm } from "@/components/admin/drivers/DriverForm";
import { DocumentUploadForm } from "@/components/admin/documents/DocumentUploadForm";
import { DocumentExpiryList } from "@/components/admin/documents/DocumentExpiryList";
import { InternalNotes } from "@/components/admin/notes/InternalNotes";
import { formatCurrency, formatDate, formatTime } from "@/lib/admin/format";
import { updateDriver, setDriverActive, setDriverAvailability, updateDriverPay } from "@/lib/admin/actions/drivers";

export const metadata: Metadata = { title: "Driver" };

const AVAILABILITY = ["AVAILABLE", "ON_TRIP", "OFF_DUTY"] as const;

export default async function DriverDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await requireUser();
  const supabase = await createClient();

  const { data: driver } = await supabase.from("drivers").select("*").eq("id", id).maybeSingle();
  if (!driver) notFound();

  const showFinance = canViewFinance(profile.role);

  const [{ data: trips }, { data: driverExpenses }, { data: documents }, { data: driverEarnings }] = await Promise.all([
    supabase
      .from("bookings")
      .select("id, booking_reference, pickup, dropoff, trip_date, trip_time, status")
      .eq("driver_id", id)
      .order("trip_date", { ascending: false })
      .limit(20),
    showFinance
      ? supabase.from("expenses").select("category, amount, currency, expense_date, description, bookings(booking_reference)").eq("driver_id", id).is("deleted_at", null).order("expense_date", { ascending: false })
      : Promise.resolve({ data: [] as any[] }),
    supabase.from("documents").select("*").eq("entity_type", "driver").eq("entity_id", id).order("created_at", { ascending: false }),
    canViewFinance(profile.role)
      ? supabase.from("driver_earnings").select("status, driver_earning, currency").eq("driver_id", id)
      : Promise.resolve({ data: [] as { status: string; driver_earning: number; currency: string }[] }),
  ]);

  const canEdit = canManageOps(profile.role);
  const canEditPay = canManageFinance(profile.role);
  const pendingEarnings = (driverEarnings ?? []).filter((e) => e.status === "PENDING").reduce((s, e) => s + Number(e.driver_earning), 0);
  const approvedEarnings = (driverEarnings ?? []).filter((e) => e.status === "APPROVED").reduce((s, e) => s + Number(e.driver_earning), 0);
  const paidEarnings = (driverEarnings ?? []).filter((e) => e.status === "PAID").reduce((s, e) => s + Number(e.driver_earning), 0);
  const earningsCurrency = driverEarnings?.[0]?.currency ?? driver.pay_currency ?? "EUR";
  const upcomingCount = (trips ?? []).filter((t) => !["COMPLETED", "CANCELLED", "NO_SHOW"].includes(t.status)).length;
  const completedCount = (trips ?? []).filter((t) => t.status === "COMPLETED").length;
  const expenseRows = driverExpenses ?? [];
  const totalExpenses = expenseRows.reduce((sum, e) => sum + Number(e.amount), 0);
  const currency = expenseRows[0]?.currency ?? "EUR";

  return (
    <div>
      <PageHeader
        title={driver.full_name}
        actions={
          <div className="flex items-center gap-2">
            <Link href={`/admin/drivers/${id}/schedule`} className="inline-flex items-center gap-1.5 border border-admin-line px-3 py-2 rounded-sm text-sm hover:bg-white">
              <CalendarClock className="h-4 w-4" /> Schedule
            </Link>
            <StatusBadge status={driver.availability} />
            <StatusBadge status={driver.active ? "ACTIVE" : "INACTIVE"} />
          </div>
        }
      />

      <div className={`grid gap-3 mb-4 ${showFinance ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" : "grid-cols-2"}`}>
        <StatCard label="Upcoming trips" value={upcomingCount} />
        <StatCard label="Completed trips" value={completedCount} />
        {showFinance ? <StatCard label="Pending earnings" value={formatCurrency(pendingEarnings, earningsCurrency)} /> : null}
        {showFinance ? <StatCard label="Approved earnings" value={formatCurrency(approvedEarnings, earningsCurrency)} /> : null}
        {showFinance ? <StatCard label="Paid out" value={formatCurrency(paidEarnings, earningsCurrency)} /> : null}
        {showFinance ? <StatCard label="Logged expenses" value={formatCurrency(totalExpenses, currency)} /> : null}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Section title="Driver details">
            <div className="p-4">
              {canEdit ? (
                <DriverForm action={updateDriver.bind(null, id)} driver={driver} submitLabel="Save changes" />
              ) : (
                <p className="text-sm text-admin-stone">{driver.phone}</p>
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

          {showFinance ? (
            <Section title="Expenses">
              <SimpleTable
                rows={expenseRows.map((e, i) => ({ ...e, id: String(i) }))}
                emptyTitle="No expenses logged for this driver"
                columns={[
                  { header: "Date", cell: (e: any) => formatDate(e.expense_date) },
                  { header: "Category", cell: (e: any) => e.category },
                  { header: "Trip", cell: (e: any) => e.bookings?.booking_reference ?? "—" },
                  { header: "Amount", cell: (e: any) => formatCurrency(e.amount, e.currency) },
                  { header: "Description", cell: (e: any) => e.description ?? "—" },
                ]}
              />
            </Section>
          ) : null}
        </div>

        {canEdit ? (
          <div className="space-y-4">
            {canEditPay ? (
              <Section title="Pay & commission">
                <form action={updateDriverPay.bind(null, id)} className="p-4 space-y-3">
                  <div>
                    <label className="block text-xs text-admin-stone mb-1">Pay model</label>
                    <select name="pay_model" defaultValue={driver.pay_model ?? "FIXED_PER_TRIP"} className="input-luxe">
                      <option value="FIXED_PER_TRIP">Fixed amount per trip</option>
                      <option value="PERCENTAGE">Percentage commission</option>
                      <option value="DAILY_RATE">Daily rate</option>
                      <option value="CUSTOM">Custom (manual per payout)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-admin-stone mb-1">Rate</label>
                    <input type="number" name="pay_rate" min={0} step="0.01" defaultValue={driver.pay_rate ?? ""} className="input-luxe" />
                    <p className="text-[11px] text-admin-stone mt-1">Flat amount, or 0-100 for percentage. Ignored for Custom.</p>
                  </div>
                  <div>
                    <label className="block text-xs text-admin-stone mb-1">Currency</label>
                    <input name="pay_currency" defaultValue={driver.pay_currency ?? "EUR"} className="input-luxe" />
                  </div>
                  <button type="submit" className="w-full text-sm bg-admin-navy text-admin-ivory px-3 py-2 rounded-sm hover:bg-admin-navy-deep">
                    Save pay settings
                  </button>
                </form>
              </Section>
            ) : null}
            <Section title="Documents">
              <div className="p-4 space-y-3">
                <DocumentExpiryList documents={documents ?? []} />
                <DocumentUploadForm entityType="driver" entityId={id} defaultDocType="DRIVER_DOCUMENT" />
              </div>
            </Section>
            <Section title="Availability">
              <div className="p-4 flex flex-wrap gap-1.5">
                {AVAILABILITY.map((a) => (
                  <form key={a} action={setDriverAvailability.bind(null, id, a)}>
                    <button
                      type="submit"
                      disabled={driver.availability === a}
                      className={`text-xs px-2.5 py-1.5 rounded-sm border ${driver.availability === a ? "border-admin-navy bg-admin-navy text-admin-ivory" : "border-admin-line hover:bg-admin-ivory-deep"}`}
                    >
                      {a.replaceAll("_", " ")}
                    </button>
                  </form>
                ))}
              </div>
            </Section>
            <Section title="Status">
              <div className="p-4">
                <form action={setDriverActive.bind(null, id, !driver.active)}>
                  <button type="submit" className="w-full text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-admin-ivory-deep">
                    {driver.active ? "Deactivate" : "Activate"}
                  </button>
                </form>
              </div>
            </Section>
            <Section title="Internal notes">
              <div className="p-4">
                <InternalNotes entityType="driver" entityId={id} />
              </div>
            </Section>
          </div>
        ) : null}
      </div>
    </div>
  );
}
