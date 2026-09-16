import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/dal";
import { canManageCrm, canViewFinance } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { StatCard } from "@/components/admin/ui/Card";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { Section } from "@/components/admin/ui/Section";
import { SimpleTable } from "@/components/admin/ui/SimpleTable";
import { CustomerForm } from "@/components/admin/customers/CustomerForm";
import { InternalNotes } from "@/components/admin/notes/InternalNotes";
import { ConfirmButton } from "@/components/admin/ui/ConfirmButton";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/admin/format";
import { updateCustomer } from "@/lib/admin/actions/customers";
import { setCustomerSegmentOverride, clearCustomerSegmentOverride } from "@/lib/admin/actions/segments";

export const metadata: Metadata = { title: "Customer" };

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await requireUser();
  const supabase = await createClient();

  const { data: customer } = await supabase.from("customers").select("*").eq("id", id).maybeSingle();
  if (!customer) notFound();

  const showFinance = canViewFinance(profile.role);
  const canEditSegment = canManageCrm(profile.role);
  const [{ data: metricsRows }, { data: segmentOverride }] = await Promise.all([
    supabase.rpc("get_customer_metrics", { p_customer_id: id }),
    supabase.from("customer_segment_overrides").select("segment, note, created_at").eq("customer_id", id).maybeSingle(),
  ]);
  const metrics = metricsRows?.[0] ?? null;
  const effectiveSegment = segmentOverride?.segment ?? metrics?.segment ?? null;

  const [bookingsRes, quotationsRes, invoicesRes, followUpsRes] = await Promise.all([
    supabase
      .from("bookings")
      .select("id, booking_reference, pickup, dropoff, trip_date, status, total, currency")
      .eq("customer_id", id)
      .order("trip_date", { ascending: false })
      .limit(20),
    supabase
      .from("quotations")
      .select("id, quotation_number, status, total, currency, created_at")
      .eq("customer_id", id)
      .order("created_at", { ascending: false })
      .limit(20),
    showFinance
      ? supabase
          .from("invoices")
          .select("id, invoice_number, status, total, amount_paid, balance_due, currency, due_date")
          .eq("customer_id", id)
          .order("created_at", { ascending: false })
          .limit(20)
      : Promise.resolve({ data: [] as any[] }),
    supabase
      .from("follow_ups")
      .select("id, type, status, due_date, notes")
      .eq("customer_id", id)
      .order("due_date", { ascending: false })
      .limit(10),
  ]);

  const bookings = bookingsRes.data ?? [];
  const quotations = quotationsRes.data ?? [];
  const invoices = invoicesRes.data ?? [];
  const followUps = followUpsRes.data ?? [];

  const totalRevenue = invoices.reduce((sum, inv) => sum + Number(inv.amount_paid ?? 0), 0);
  const outstandingBalance = invoices.reduce(
    (sum, inv) => (inv.status !== "PAID" && inv.status !== "VOID" ? sum + Number(inv.balance_due ?? 0) : sum),
    0
  );

  return (
    <div>
      <PageHeader
        title={customer.full_name}
        description={customer.company_name ?? undefined}
        actions={
          <div className="flex gap-2 text-sm items-center">
            {effectiveSegment ? <StatusBadge status={effectiveSegment} /> : null}
            {canManageCrm(profile.role) ? (
              <Link href={`/admin/quotations/new?customer_id=${id}`} className="border border-admin-line px-3 py-2 rounded-sm hover:bg-white">
                New quotation
              </Link>
            ) : null}
            {canManageCrm(profile.role) ? (
              <Link href={`/admin/bookings/new?customer_id=${id}`} className="bg-admin-navy text-admin-ivory px-3 py-2 rounded-sm hover:bg-admin-navy-deep">
                New booking
              </Link>
            ) : null}
          </div>
        }
      />

      <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <StatCard label="Contact" value={customer.phone ?? customer.email ?? "—"} hint={customer.email && customer.phone ? customer.email : undefined} />
        {showFinance ? <StatCard label="Total revenue" value={formatCurrency(totalRevenue)} /> : null}
        {showFinance ? <StatCard label="Outstanding balance" value={formatCurrency(outstandingBalance)} /> : null}
        <StatCard label="Avg booking value" value={formatCurrency(metrics?.avg_booking_value ?? 0)} />
        <StatCard label="Last booking" value={metrics?.last_booking_date ? formatDate(metrics.last_booking_date) : "—"} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Section title="Bookings">
            {bookings.length === 0 ? (
              <EmptyState title="No bookings yet" />
            ) : (
              <SimpleTable
                rows={bookings}
                columns={[
                  { header: "Reference", cell: (b) => <Link href={`/admin/bookings/${b.id}`} className="text-admin-ink hover:text-admin-gold font-medium">{b.booking_reference}</Link> },
                  { header: "Route", cell: (b) => `${b.pickup} → ${b.dropoff}` },
                  { header: "Date", cell: (b) => formatDate(b.trip_date) },
                  { header: "Total", cell: (b) => formatCurrency(b.total, b.currency) },
                  { header: "Status", cell: (b) => <StatusBadge status={b.status} /> },
                ]}
              />
            )}
          </Section>

          <Section title="Quotations">
            {quotations.length === 0 ? (
              <EmptyState title="No quotations yet" />
            ) : (
              <SimpleTable
                rows={quotations}
                columns={[
                  { header: "Number", cell: (q) => <Link href={`/admin/quotations/${q.id}`} className="text-admin-ink hover:text-admin-gold font-medium">{q.quotation_number}</Link> },
                  { header: "Date", cell: (q) => formatDate(q.created_at) },
                  { header: "Total", cell: (q) => formatCurrency(q.total, q.currency) },
                  { header: "Status", cell: (q) => <StatusBadge status={q.status} /> },
                ]}
              />
            )}
          </Section>

          {showFinance ? (
            <Section title="Invoices">
              {invoices.length === 0 ? (
                <EmptyState title="No invoices yet" />
              ) : (
                <SimpleTable
                  rows={invoices}
                  columns={[
                    { header: "Number", cell: (i) => <Link href={`/admin/invoices/${i.id}`} className="text-admin-ink hover:text-admin-gold font-medium">{i.invoice_number}</Link> },
                    { header: "Due", cell: (i) => formatDate(i.due_date) },
                    { header: "Total", cell: (i) => formatCurrency(i.total, i.currency) },
                    { header: "Balance", cell: (i) => formatCurrency(i.balance_due, i.currency) },
                    { header: "Status", cell: (i) => <StatusBadge status={i.status} /> },
                  ]}
                />
              )}
            </Section>
          ) : null}
        </div>

        <div className="space-y-4">
          <Section title="Edit customer">
            <div className="p-4">
              <CustomerForm action={updateCustomer.bind(null, id)} customer={customer} submitLabel="Save changes" />
            </div>
          </Section>

          <Section title="Follow-ups">
            {followUps.length === 0 ? (
              <EmptyState title="No follow-ups" />
            ) : (
              <ul className="divide-y divide-admin-line">
                {followUps.map((f) => (
                  <li key={f.id} className="px-4 py-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-admin-ink">{f.type.replaceAll("_", " ")}</span>
                      <StatusBadge status={f.status} />
                    </div>
                    <p className="text-xs text-admin-stone mt-0.5">Due {formatDate(f.due_date)}{f.notes ? ` · ${f.notes}` : ""}</p>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          {canEditSegment ? (
            <Section title="Segment">
              <div className="p-4 space-y-3 text-sm">
                <div>
                  <span className="text-admin-stone">Computed from history: </span>
                  {metrics?.segment ? <StatusBadge status={metrics.segment} /> : "—"}
                </div>
                {segmentOverride ? (
                  <div className="border border-admin-line rounded-sm p-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-admin-stone">Manual override</span>
                      <StatusBadge status={segmentOverride.segment} />
                    </div>
                    {segmentOverride.note ? <p className="text-xs text-admin-stone">{segmentOverride.note}</p> : null}
                    <p className="text-xs text-admin-stone">Set {formatDateTime(segmentOverride.created_at)}</p>
                    <form action={clearCustomerSegmentOverride.bind(null, id)}>
                      <ConfirmButton confirmMessage="Remove this override and go back to the computed segment?" className="text-xs text-red-700 hover:underline">
                        Clear override
                      </ConfirmButton>
                    </form>
                  </div>
                ) : (
                  <form action={setCustomerSegmentOverride.bind(null, id)} className="space-y-2 border-t border-admin-line pt-3">
                    <div>
                      <label className="block text-xs text-admin-stone mb-1">Set a manual/custom segment</label>
                      <input name="segment" required placeholder="e.g. VIP, KEY_ACCOUNT, PARTNER" className="input-luxe text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-admin-stone mb-1">Note (optional)</label>
                      <textarea name="note" rows={2} className="input-luxe text-sm" placeholder="Why this override was set" />
                    </div>
                    <button type="submit" className="text-xs border border-admin-line px-3 py-1.5 rounded-sm hover:bg-admin-ivory-deep">
                      Save override
                    </button>
                  </form>
                )}
              </div>
            </Section>
          ) : null}

          <Section title="Internal notes">
            <div className="p-4">
              <InternalNotes entityType="customer" entityId={id} />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
