import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_FINANCE } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { EntityPicker } from "@/components/admin/ui/EntityPicker";
import { ConfirmButton } from "@/components/admin/ui/ConfirmButton";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import { createDriverPayout, approveDriverPayout, markDriverPayoutPaid, approveDriverEarning } from "@/lib/admin/actions/payouts";

export const metadata: Metadata = { title: "Driver payouts" };

export default async function DriverPayoutsPage() {
  await requireRole(MANAGE_FINANCE);
  const supabase = await createClient();

  const [{ data: payouts }, { data: pendingEarnings }] = await Promise.all([
    supabase.from("driver_payouts").select("*, drivers(full_name)").order("created_at", { ascending: false }).limit(50),
    supabase
      .from("driver_earnings")
      .select("id, driver_earning, trip_revenue, currency, calculation_method, created_at, drivers(full_name), bookings(booking_reference, trip_date)")
      .eq("status", "PENDING")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  return (
    <div>
      <PageHeader title="Driver payouts" description="Per-trip earnings are calculated automatically from each driver's pay model when a trip completes. Nothing is marked PAID without a real payment reference." />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Section title="Pending earnings (need approval)">
            {!pendingEarnings || pendingEarnings.length === 0 ? (
              <EmptyState title="No pending earnings" description="Earnings appear here automatically when a trip with an assigned driver is completed." />
            ) : (
              <ul className="divide-y divide-admin-line">
                {pendingEarnings.map((e) => (
                  <li key={e.id} className="px-4 py-3 flex items-center justify-between gap-3 text-sm">
                    <div>
                      <p className="font-medium text-admin-ink">{(e as any).drivers?.full_name ?? "Unknown driver"}</p>
                      <p className="text-xs text-admin-stone">
                        {(e as any).bookings?.booking_reference ?? "—"} · {formatDate((e as any).bookings?.trip_date)} · {e.calculation_method}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-medium">{formatCurrency(e.driver_earning, e.currency)}</span>
                      <form action={approveDriverEarning.bind(null, e.id)}>
                        <button type="submit" className="text-xs border border-admin-line px-2.5 py-1 rounded-sm hover:bg-admin-ivory-deep">
                          Approve
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section title="Payout batches">
            {!payouts || payouts.length === 0 ? (
              <EmptyState title="No payouts yet" />
            ) : (
              <ul className="divide-y divide-admin-line">
                {payouts.map((p) => (
                  <li key={p.id} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-admin-ink">{(p as any).drivers?.full_name ?? "Unknown driver"}</p>
                        <p className="text-xs text-admin-stone">
                          {formatDate(p.period_start)} – {formatDate(p.period_end)}
                        </p>
                        <p className="text-xs text-admin-stone mt-1">
                          Gross {formatCurrency(p.gross_earnings, p.currency)}
                          {p.adjustments ? ` · Adj ${formatCurrency(p.adjustments, p.currency)}` : ""}
                          {p.expenses ? ` · Exp -${formatCurrency(p.expenses, p.currency)}` : ""}
                        </p>
                        {p.payment_reference ? <p className="text-xs text-admin-stone">Ref: {p.payment_reference}</p> : null}
                      </div>
                      <div className="text-right shrink-0">
                        <StatusBadge status={p.status} />
                        <p className="text-sm font-semibold text-admin-ink mt-1.5">{formatCurrency(p.net_payout, p.currency)}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      {p.status === "PENDING" ? (
                        <form action={approveDriverPayout.bind(null, p.id)}>
                          <button type="submit" className="text-xs border border-admin-line px-2.5 py-1 rounded-sm hover:bg-admin-ivory-deep">
                            Approve
                          </button>
                        </form>
                      ) : null}
                      {p.status === "APPROVED" ? (
                        <form action={markDriverPayoutPaid.bind(null, p.id)} className="flex items-center gap-2">
                          <input name="payment_reference" placeholder="Payment reference" required className="input-luxe text-xs py-1 w-40" />
                          <ConfirmButton confirmMessage="Mark this payout as paid?" className="text-xs bg-admin-navy text-admin-ivory px-2.5 py-1 rounded-sm hover:bg-admin-navy-deep">
                            Mark paid
                          </ConfirmButton>
                        </form>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </div>

        <div>
          <Section title="New payout batch">
            <form action={createDriverPayout} className="p-4 space-y-3">
              <div>
                <label className="block text-xs text-admin-stone mb-1">Driver</label>
                <EntityPicker entity="drivers" name="driver_id" placeholder="Search drivers…" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-admin-stone mb-1">Period start</label>
                  <input type="date" name="period_start" required className="input-luxe" />
                </div>
                <div>
                  <label className="block text-xs text-admin-stone mb-1">Period end</label>
                  <input type="date" name="period_end" required className="input-luxe" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-admin-stone mb-1">Adjustments (+/-)</label>
                  <input type="number" name="adjustments" step="0.01" defaultValue="0" className="input-luxe" />
                </div>
                <div>
                  <label className="block text-xs text-admin-stone mb-1">Deduct expenses</label>
                  <input type="number" name="expenses" min={0} step="0.01" defaultValue="0" className="input-luxe" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-admin-stone mb-1">Currency</label>
                <input name="currency" defaultValue="EUR" className="input-luxe" />
              </div>
              <div>
                <label className="block text-xs text-admin-stone mb-1">Notes</label>
                <textarea name="notes" rows={2} className="input-luxe" />
              </div>
              <p className="text-[11px] text-admin-stone">Bundles every APPROVED, not-yet-paid earning for this driver whose trip date falls in the period.</p>
              <button type="submit" className="w-full text-sm bg-admin-navy text-admin-ivory px-3 py-2 rounded-sm hover:bg-admin-navy-deep">
                Create payout
              </button>
            </form>
          </Section>
        </div>
      </div>
    </div>
  );
}
