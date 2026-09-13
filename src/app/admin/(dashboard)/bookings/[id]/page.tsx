import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/dal";
import { canManageOps, canManageFinance, canViewFinance } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { EntityPicker } from "@/components/admin/ui/EntityPicker";
import { ConfirmButton } from "@/components/admin/ui/ConfirmButton";
import { BookingForm } from "@/components/admin/bookings/BookingForm";
import { formatDateTime, formatCurrency, formatDate, formatTime } from "@/lib/admin/format";
import { updateBooking, setBookingStatus, assignDriverAndVehicle, cancelBookingWithDetails, markNoShowWithDetails } from "@/lib/admin/actions/bookings";
import { createInvoiceForBooking } from "@/lib/admin/actions/invoices";
import { buildWhatsAppLink } from "@/lib/notifications/whatsapp";
import { changedFields, formatDiffValue } from "@/lib/admin/activityDiff";
import { InternalNotes } from "@/components/admin/notes/InternalNotes";

export const metadata: Metadata = { title: "Booking" };

const STATUS_FLOW = [
  "PENDING",
  "CONFIRMED",
  "ASSIGNED",
  "DRIVER_EN_ROUTE",
  "PASSENGER_PICKED_UP",
  "IN_PROGRESS",
  "COMPLETED",
] as const;

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await requireUser();
  const supabase = await createClient();

  const { data: booking } = await supabase
    .from("bookings")
    .select("*, customers(id, full_name, phone, email), vehicles(id, name), drivers(id, full_name, phone)")
    .eq("id", id)
    .maybeSingle();
  if (!booking) notFound();

  const showFinance = canViewFinance(profile.role);

  const [{ data: invoice }, { data: history }, { data: tripExpenses }, { data: changeLog }, { data: priceOverrides }] = await Promise.all([
    supabase.from("invoices").select("id, invoice_number, status, balance_due").eq("booking_id", id).maybeSingle(),
    supabase.from("booking_status_history").select("id, from_status, to_status, changed_at").eq("booking_id", id).order("changed_at", { ascending: false }),
    showFinance
      ? supabase.from("expenses").select("category, amount").eq("booking_id", id).is("deleted_at", null)
      : Promise.resolve({ data: [] as { category: string; amount: number }[] }),
    supabase
      .from("activity_logs")
      .select("id, before_state, after_state, created_at, profiles(full_name)")
      .eq("entity_type", "bookings")
      .eq("entity_id", id)
      .order("created_at", { ascending: false })
      .limit(20),
    showFinance
      ? supabase
          .from("price_override_log")
          .select("id, original_price, new_price, reason, changed_at, profiles(full_name)")
          .eq("entity_type", "booking")
          .eq("entity_id", id)
          .order("changed_at", { ascending: false })
      : Promise.resolve({ data: [] as { id: string; original_price: number; new_price: number; reason: string; changed_at: string; profiles: { full_name: string } | null }[] }),
  ]);

  const canEdit = canManageOps(profile.role);
  const isTerminal = booking.status === "COMPLETED" || booking.status === "CANCELLED" || booking.status === "NO_SHOW";

  // Estimated per-trip profitability: revenue - tax - driver cost - vehicle
  // cost - other trip expenses. Expense categories don't map 1:1 onto
  // "driver"/"vehicle" so this groups them the closest reasonable way;
  // labeled "estimated" throughout since it's a derived figure, not an
  // accounting record.
  const expenseRows = tripExpenses ?? [];
  const driverCost = expenseRows.filter((e) => e.category === "DRIVER").reduce((sum, e) => sum + Number(e.amount), 0);
  const vehicleCost = expenseRows
    .filter((e) => e.category === "FUEL" || e.category === "MAINTENANCE")
    .reduce((sum, e) => sum + Number(e.amount), 0);
  const otherCost = expenseRows
    .filter((e) => !["DRIVER", "FUEL", "MAINTENANCE"].includes(e.category))
    .reduce((sum, e) => sum + Number(e.amount), 0);
  const totalTripExpenses = driverCost + vehicleCost + otherCost;
  const estimatedProfit = Number(booking.total) - Number(booking.tax_amount) - totalTripExpenses;

  return (
    <div>
      <PageHeader
        title={booking.booking_reference}
        description={(booking as any).customers?.full_name}
        actions={
          <div className="flex items-center gap-2">
            <StatusBadge status={booking.payment_status} />
            <StatusBadge status={booking.status} />
            <Link href={`/admin/bookings/${id}/confirmation`} target="_blank" className="text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-white">
              Confirmation PDF
            </Link>
          </div>
        }
      />

      {invoice ? (
        <Link href={`/admin/invoices/${invoice.id}`} className="inline-block mb-4 text-sm text-admin-gold hover:underline">
          View invoice {invoice.invoice_number} →
        </Link>
      ) : canManageFinance(profile.role) ? (
        <form action={createInvoiceForBooking.bind(null, id)} className="mb-4">
          <button type="submit" className="text-sm border border-admin-line px-3 py-1.5 rounded-sm hover:bg-white">
            Create invoice
          </button>
        </form>
      ) : null}

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Section title="Booking details">
            <div className="p-4">
              {canEdit ? (
                <BookingForm
                  action={updateBooking.bind(null, id)}
                  submitLabel="Save changes"
                  isEdit
                  defaults={{
                    customer_id: (booking as any).customers?.id,
                    customer_label: (booking as any).customers?.full_name,
                    pickup: booking.pickup,
                    dropoff: booking.dropoff,
                    trip_date: booking.trip_date,
                    trip_time: booking.trip_time,
                    passengers: booking.passengers ?? undefined,
                    luggage: booking.luggage ?? undefined,
                    vehicle_id: (booking as any).vehicles?.id,
                    vehicle_label: (booking as any).vehicles?.name,
                    driver_id: (booking as any).drivers?.id,
                    driver_label: (booking as any).drivers?.full_name,
                    flight_number: booking.flight_number ?? undefined,
                    is_airport_pickup: booking.is_airport_pickup ?? undefined,
                    flight_terminal: booking.flight_terminal ?? undefined,
                    flight_arrival_time: booking.flight_arrival_time ?? undefined,
                    flight_departure_time: booking.flight_departure_time ?? undefined,
                    meet_and_greet_notes: booking.meet_and_greet_notes ?? undefined,
                    special_requests: booking.special_requests ?? undefined,
                    price: Number(booking.price),
                    discount: Number(booking.discount),
                    tax_amount: Number(booking.tax_amount),
                    currency: booking.currency,
                    internal_notes: booking.internal_notes ?? undefined,
                    customer_notes: booking.customer_notes ?? undefined,
                  }}
                />
              ) : (
                <p className="text-sm text-admin-stone">
                  {booking.pickup} → {booking.dropoff} · {booking.trip_date} {booking.trip_time}
                </p>
              )}
            </div>
          </Section>

          {showFinance ? (
            <Section title="Estimated profitability">
              <div className="p-4 space-y-1.5 text-sm">
                <Row label="Revenue" value={formatCurrency(booking.total, booking.currency)} />
                <Row label="Tax" value={`-${formatCurrency(booking.tax_amount, booking.currency)}`} />
                <Row label="Driver cost" value={`-${formatCurrency(driverCost, booking.currency)}`} />
                <Row label="Vehicle cost (fuel/maintenance)" value={`-${formatCurrency(vehicleCost, booking.currency)}`} />
                <Row label="Other trip expenses" value={`-${formatCurrency(otherCost, booking.currency)}`} />
                <div className="flex items-center justify-between pt-2 border-t border-admin-line font-semibold text-admin-ink">
                  <span>Estimated profit</span>
                  <span className={estimatedProfit < 0 ? "text-red-700" : ""}>{formatCurrency(estimatedProfit, booking.currency)}</span>
                </div>
                <p className="text-xs text-admin-stone pt-1">
                  Estimate only — driver/vehicle costs are inferred from this trip&apos;s logged expenses by category, not a formal cost allocation.
                </p>
              </div>
            </Section>
          ) : null}

          <Section title="Status history">
            <ul className="divide-y divide-admin-line">
              {(history ?? []).length === 0 ? (
                <li className="px-4 py-3 text-sm text-admin-stone">No history yet.</li>
              ) : (
                history!.map((h) => (
                  <li key={h.id} className="px-4 py-3 text-sm flex items-center justify-between">
                    <span>{h.from_status ? `${h.from_status} → ${h.to_status}` : `Created as ${h.to_status}`}</span>
                    <span className="text-xs text-admin-stone">{formatDateTime(h.changed_at)}</span>
                  </li>
                ))
              )}
            </ul>
          </Section>

          <Section title="Change history">
            {!changeLog || changeLog.length === 0 ? (
              <p className="px-4 py-3 text-sm text-admin-stone">No field-level changes recorded yet (visible to admins only).</p>
            ) : (
              <ul className="divide-y divide-admin-line">
                {changeLog.map((entry) => {
                  const diffs = changedFields(entry.before_state, entry.after_state);
                  if (diffs.length === 0) return null;
                  return (
                    <li key={entry.id} className="px-4 py-3 text-sm">
                      <p className="text-xs text-admin-stone mb-1">
                        {(entry as any).profiles?.full_name ?? "System"} · {formatDateTime(entry.created_at)}
                      </p>
                      <ul className="space-y-0.5 text-xs">
                        {diffs.map((d) => (
                          <li key={d.field}>
                            <span className="font-medium">{d.field}</span>: {formatDiffValue(d.from)} → {formatDiffValue(d.to)}
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            )}
          </Section>

          {showFinance && priceOverrides && priceOverrides.length > 0 ? (
            <Section title="Price override history">
              <ul className="divide-y divide-admin-line">
                {priceOverrides.map((o) => (
                  <li key={o.id} className="px-4 py-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>
                        {formatCurrency(o.original_price, booking.currency)} → {formatCurrency(o.new_price, booking.currency)}
                      </span>
                      <span className="text-xs text-admin-stone">{formatDateTime(o.changed_at)}</span>
                    </div>
                    <p className="text-xs text-admin-stone mt-0.5">
                      {o.reason} — {o.profiles?.full_name ?? "Unknown"}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {canEdit ? (
            <Section title="Internal notes">
              <div className="p-4">
                <InternalNotes entityType="booking" entityId={id} />
              </div>
            </Section>
          ) : null}
        </div>

        {canEdit ? (
          <div className="space-y-4">
            <Section title="Trip status">
              {isTerminal ? (
                <p className="px-4 py-3 text-xs text-admin-stone">
                  This trip is {booking.status.replaceAll("_", " ").toLowerCase()} — a final status, no further changes allowed.
                </p>
              ) : (
                <div className="p-4 flex flex-wrap gap-1.5">
                  {STATUS_FLOW.map((s) => (
                    <form key={s} action={setBookingStatus.bind(null, id, s)}>
                      <button
                        type="submit"
                        disabled={booking.status === s}
                        className={`text-xs px-2.5 py-1.5 rounded-sm border ${
                          booking.status === s ? "border-admin-navy bg-admin-navy text-admin-ivory" : "border-admin-line hover:bg-admin-ivory-deep"
                        }`}
                      >
                        {s.replaceAll("_", " ")}
                      </button>
                    </form>
                  ))}
                  <details className="w-full">
                    <summary className="inline-block text-xs px-2.5 py-1.5 rounded-sm border border-admin-line hover:bg-red-50 hover:text-red-700 cursor-pointer select-none">
                      No-show
                    </summary>
                    <form action={markNoShowWithDetails.bind(null, id)} className="mt-2 p-3 border border-admin-line rounded-sm space-y-2 bg-admin-ivory-deep">
                      <div>
                        <label className="block text-xs text-admin-stone mb-1">Who didn&rsquo;t show</label>
                        <select name="no_show_type" required className="input-luxe text-sm">
                          <option value="PASSENGER">Passenger</option>
                          <option value="DRIVER">Driver</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-admin-stone mb-1">Notes / evidence</label>
                        <textarea name="no_show_notes" required rows={2} className="input-luxe text-sm" placeholder="What happened, wait time, contact attempts…" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-admin-stone mb-1">Charge</label>
                          <input type="number" step="0.01" min="0" name="no_show_charge" className="input-luxe text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs text-admin-stone mb-1">Refund</label>
                          <input type="number" step="0.01" min="0" name="no_show_refund_amount" className="input-luxe text-sm" />
                        </div>
                      </div>
                      <ConfirmButton
                        confirmMessage="Mark this booking as a no-show?"
                        className="text-xs px-3 py-1.5 rounded-sm border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                      >
                        Confirm no-show
                      </ConfirmButton>
                    </form>
                  </details>
                  <details className="w-full">
                    <summary className="inline-block text-xs px-2.5 py-1.5 rounded-sm border border-admin-line hover:bg-red-50 hover:text-red-700 cursor-pointer select-none">
                      Cancel
                    </summary>
                    <form action={cancelBookingWithDetails.bind(null, id)} className="mt-2 p-3 border border-admin-line rounded-sm space-y-2 bg-admin-ivory-deep">
                      <div>
                        <label className="block text-xs text-admin-stone mb-1">Initiated by</label>
                        <select name="cancellation_initiated_by" required className="input-luxe text-sm">
                          <option value="CUSTOMER">Customer</option>
                          <option value="DRIVER">Driver</option>
                          <option value="STAFF">Staff</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-admin-stone mb-1">Reason</label>
                        <textarea name="cancellation_reason" required rows={2} className="input-luxe text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-admin-stone mb-1">Cancellation fee</label>
                          <input type="number" step="0.01" min="0" name="cancellation_fee" className="input-luxe text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs text-admin-stone mb-1">Refund amount</label>
                          <input type="number" step="0.01" min="0" name="cancellation_refund_amount" className="input-luxe text-sm" />
                        </div>
                      </div>
                      <ConfirmButton
                        confirmMessage={`Cancel booking ${booking.booking_reference}?`}
                        className="text-xs px-3 py-1.5 rounded-sm border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                      >
                        Confirm cancellation
                      </ConfirmButton>
                    </form>
                  </details>
                </div>
              )}
            </Section>

            <Section title="Assign driver &amp; vehicle">
              <form action={assignDriverAndVehicle.bind(null, id)} className="p-4 space-y-3">
                <div>
                  <label className="block text-xs text-admin-stone mb-1">Driver</label>
                  <EntityPicker entity="drivers" name="driver_id" defaultValue={(booking as any).drivers?.id} defaultLabel={(booking as any).drivers?.full_name} placeholder="Search drivers…" />
                </div>
                <div>
                  <label className="block text-xs text-admin-stone mb-1">Vehicle</label>
                  <EntityPicker entity="vehicles" name="vehicle_id" defaultValue={(booking as any).vehicles?.id} defaultLabel={(booking as any).vehicles?.name} placeholder="Search vehicles…" />
                </div>
                <label className="flex items-center gap-2 text-xs text-admin-stone">
                  <input type="checkbox" name="force" value="1" />
                  Assign anyway if there&rsquo;s a schedule conflict
                </label>
                <button type="submit" className="w-full text-sm bg-admin-navy text-admin-ivory px-3 py-2 rounded-sm hover:bg-admin-navy-deep">
                  Assign
                </button>
              </form>
            </Section>

            {(booking as any).customers?.phone ? (
              <Section title="WhatsApp">
                <div className="p-4 space-y-2 text-sm">
                  <a
                    href={buildWhatsAppLink("booking_confirmation", (booking as any).customers.phone, {
                      customer_name: (booking as any).customers.full_name ?? "",
                      booking_reference: booking.booking_reference,
                      date: formatDate(booking.trip_date),
                      time: formatTime(booking.trip_time),
                      pickup: booking.pickup,
                      dropoff: booking.dropoff,
                      total: formatCurrency(booking.total, booking.currency),
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className="block border border-admin-line px-3 py-2 rounded-sm hover:bg-admin-ivory-deep"
                  >
                    Send booking confirmation
                  </a>
                  {(booking as any).drivers ? (
                    <a
                      href={buildWhatsAppLink("driver_details", (booking as any).customers.phone, {
                        customer_name: (booking as any).customers.full_name ?? "",
                        booking_reference: booking.booking_reference,
                        driver_name: (booking as any).drivers.full_name ?? "",
                        driver_phone: (booking as any).drivers.phone ?? "",
                        vehicle: (booking as any).vehicles?.name ?? "",
                      })}
                      target="_blank"
                      rel="noreferrer"
                      className="block border border-admin-line px-3 py-2 rounded-sm hover:bg-admin-ivory-deep"
                    >
                      Send driver details
                    </a>
                  ) : null}
                  <a
                    href={buildWhatsAppLink("pickup_reminder", (booking as any).customers.phone, {
                      customer_name: (booking as any).customers.full_name ?? "",
                      booking_reference: booking.booking_reference,
                      pickup: booking.pickup,
                      date: formatDate(booking.trip_date),
                      time: formatTime(booking.trip_time),
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className="block border border-admin-line px-3 py-2 rounded-sm hover:bg-admin-ivory-deep"
                  >
                    Send pickup reminder
                  </a>
                </div>
              </Section>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-admin-stone">
      <span>{label}</span>
      <span className="text-admin-ink">{value}</span>
    </div>
  );
}
