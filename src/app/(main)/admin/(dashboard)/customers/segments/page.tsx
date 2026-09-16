import Link from "next/link";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_CRM } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { StatCard } from "@/components/admin/ui/Card";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { ConfirmButton } from "@/components/admin/ui/ConfirmButton";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import { clearCustomerSegmentOverride } from "@/lib/admin/actions/segments";

export const metadata: Metadata = { title: "Customer segments" };

const SEGMENT_LABELS: Record<string, string> = {
  NEW: "New",
  RETURNING: "Returning",
  VIP: "VIP / high-value",
  CORPORATE: "Corporate",
  INACTIVE: "Inactive (180+ days)",
  HIGH_FREQUENCY: "High frequency",
};

export default async function CustomerSegmentsPage({ searchParams }: { searchParams: Promise<{ segment?: string }> }) {
  await requireRole(MANAGE_CRM);
  const { segment: filterSegment } = await searchParams;
  const supabase = await createClient();

  const [{ data: customers }, { data: overrides }] = await Promise.all([
    supabase.from("customers").select("id, full_name, email, customer_type").is("deleted_at", null).limit(500),
    supabase.from("customer_segment_overrides").select("customer_id, segment, note, customers(full_name)").order("created_at", { ascending: false }),
  ]);
  const overrideMap = new Map((overrides ?? []).map((o) => [o.customer_id, o.segment]));

  // get_customer_metrics is per-customer — for a segment overview this
  // means one RPC call per customer. Fine at this business's data volume;
  // if the customer base grows into the thousands, this would need to move
  // to a materialized view instead of N calls.
  const withMetrics = await Promise.all(
    (customers ?? []).map(async (c) => {
      const { data } = await supabase.rpc("get_customer_metrics", { p_customer_id: c.id });
      return { ...c, metrics: data?.[0] ?? null, segment: overrideMap.get(c.id) ?? data?.[0]?.segment ?? "NEW" };
    })
  );

  const bySegment = new Map<string, typeof withMetrics>();
  for (const c of withMetrics) {
    if (!bySegment.has(c.segment)) bySegment.set(c.segment, []);
    bySegment.get(c.segment)!.push(c);
  }

  // The six computed segments always show as tabs; any custom segment a
  // manual override introduced (e.g. "KEY_ACCOUNT") shows alongside them —
  // overrides are free text, not a fixed enum, per the task's "custom
  // segments allowed" requirement.
  const segments = [...Object.keys(SEGMENT_LABELS), ...[...bySegment.keys()].filter((s) => !SEGMENT_LABELS[s])];
  const activeSegment = filterSegment && segments.includes(filterSegment) ? filterSegment : null;
  const displayRows = activeSegment ? bySegment.get(activeSegment) ?? [] : [];

  return (
    <div>
      <PageHeader
        title="Customer segments"
        description="Computed live from booking history — never a fixed label. New: 0 bookings. Returning: 2+ bookings. High frequency: 5+ completed trips. VIP: €2,000+ lifetime revenue. Corporate: company account. Inactive: no booking in 180+ days."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {segments.map((seg) => (
          <Link key={seg} href={`/admin/customers/segments?segment=${seg}`}>
            <StatCard label={SEGMENT_LABELS[seg] ?? seg.replaceAll("_", " ")} value={bySegment.get(seg)?.length ?? 0} />
          </Link>
        ))}
      </div>

      {activeSegment ? (
        <Section title={SEGMENT_LABELS[activeSegment] ?? activeSegment.replaceAll("_", " ")}>
          {displayRows.length === 0 ? (
            <EmptyState title="No customers in this segment" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-admin-stone border-b border-admin-line">
                    <th className="px-4 py-2.5 font-medium">Customer</th>
                    <th className="px-4 py-2.5 font-medium text-right">Bookings</th>
                    <th className="px-4 py-2.5 font-medium text-right">Total revenue</th>
                    <th className="px-4 py-2.5 font-medium text-right">Avg booking</th>
                    <th className="px-4 py-2.5 font-medium">Last booking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-line">
                  {displayRows.map((c) => (
                    <tr key={c.id} className="hover:bg-admin-ivory-deep">
                      <td className="px-4 py-2.5">
                        <Link href={`/admin/customers/${c.id}`} className="text-admin-ink hover:underline">
                          {c.full_name}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-right">{c.metrics?.total_bookings ?? 0}</td>
                      <td className="px-4 py-2.5 text-right">{formatCurrency(c.metrics?.total_revenue ?? 0)}</td>
                      <td className="px-4 py-2.5 text-right">{formatCurrency(c.metrics?.avg_booking_value ?? 0)}</td>
                      <td className="px-4 py-2.5">{c.metrics?.last_booking_date ? formatDate(c.metrics.last_booking_date) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>
      ) : (
        <Section title="Select a segment above">
          <EmptyState title="Click a segment card to see who's in it" />
        </Section>
      )}

      <div className="mt-4">
        <Section title={`Manual overrides (${overrides?.length ?? 0})`}>
          {!overrides || overrides.length === 0 ? (
            <EmptyState title="No manual overrides — go to a customer's page to set one" />
          ) : (
            <ul className="divide-y divide-admin-line">
              {overrides.map((o) => (
                <li key={o.customer_id} className="px-4 py-3 flex items-center justify-between text-sm gap-3">
                  <div>
                    <Link href={`/admin/customers/${o.customer_id}`} className="text-admin-ink hover:underline font-medium">
                      {o.customers?.full_name ?? "—"}
                    </Link>
                    {o.note ? <p className="text-xs text-admin-stone mt-0.5">{o.note}</p> : null}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={o.segment} />
                    <form action={clearCustomerSegmentOverride.bind(null, o.customer_id)}>
                      <ConfirmButton confirmMessage="Remove this override?" className="text-xs text-red-700 hover:underline">
                        Clear
                      </ConfirmButton>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </div>
  );
}
