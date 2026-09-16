import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { ADMIN_ONLY } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { SimpleTable } from "@/components/admin/ui/SimpleTable";
import { ConfirmButton } from "@/components/admin/ui/ConfirmButton";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import { SUPPORTED_CURRENCIES } from "@/lib/pricing/currencies";
import {
  createRateCard,
  createRouteRate,
  createSurchargeRule,
  createHolidayDate,
  deleteRateCard,
  deleteRouteRate,
  deleteSurchargeRule,
  deleteHolidayDate,
} from "@/lib/admin/actions/pricing";

export const metadata: Metadata = { title: "Pricing engine" };

const VEHICLE_CATEGORIES = ["SEDAN", "SUV", "VAN", "LUXURY", "MINIBUS"] as const;

export default async function PricingSettingsPage() {
  await requireRole(ADMIN_ONLY);
  const supabase = await createClient();

  const [{ data: rateCards }, { data: routeRates }, { data: surchargeRules }, { data: holidays }] = await Promise.all([
    supabase.from("pricing_rate_cards").select("*").is("deleted_at", null).order("vehicle_category"),
    supabase.from("pricing_route_rates").select("*").is("deleted_at", null).order("pickup_label"),
    supabase.from("pricing_surcharge_rules").select("*").is("deleted_at", null).order("kind"),
    supabase.from("pricing_holiday_dates").select("*").order("holiday_date"),
  ]);

  return (
    <div>
      <PageHeader
        title="Pricing engine"
        description="Default rate cards, fixed routes, and surcharges the quotation form suggests from. Manual override is always available — nothing here forces a price."
      />

      <div className="space-y-4">
        <Section title="Rate cards (per vehicle category + currency)">
          <div className="p-4 space-y-4">
            <SimpleTable
              rows={rateCards ?? []}
              emptyTitle="No rate cards yet"
              columns={[
                { header: "Label", cell: (r) => r.label },
                { header: "Vehicle", cell: (r) => r.vehicle_category },
                { header: "Currency", cell: (r) => r.currency },
                { header: "Base", cell: (r) => formatCurrency(r.base_price, r.currency) },
                { header: "Per km", cell: (r) => (r.price_per_km ? formatCurrency(r.price_per_km, r.currency) : "—") },
                { header: "Min", cell: (r) => (r.min_price ? formatCurrency(r.min_price, r.currency) : "—") },
                {
                  header: "",
                  cell: (r) => (
                    <form action={deleteRateCard.bind(null, r.id)}>
                      <ConfirmButton confirmMessage="Remove this rate card?" className="text-xs text-red-600 hover:underline">
                        Remove
                      </ConfirmButton>
                    </form>
                  ),
                },
              ]}
            />
            <form action={createRateCard} className="grid sm:grid-cols-6 gap-2 items-end border-t border-admin-line pt-4">
              <TextField label="Label" name="label" placeholder="Standard sedan" />
              <SelectField label="Vehicle" name="vehicle_category" options={VEHICLE_CATEGORIES} />
              <SelectField label="Currency" name="currency" options={SUPPORTED_CURRENCIES} />
              <NumberField label="Base price" name="base_price" />
              <NumberField label="Price / km" name="price_per_km" required={false} />
              <NumberField label="Min price" name="min_price" required={false} />
              <div className="sm:col-span-6">
                <SubmitButton>Add rate card</SubmitButton>
              </div>
            </form>
          </div>
        </Section>

        <Section title="Fixed-price routes">
          <div className="p-4 space-y-4">
            <SimpleTable
              rows={routeRates ?? []}
              emptyTitle="No fixed routes yet"
              columns={[
                { header: "Pickup", cell: (r) => r.pickup_label },
                { header: "Drop-off", cell: (r) => r.dropoff_label },
                { header: "Vehicle", cell: (r) => r.vehicle_category },
                { header: "Price", cell: (r) => formatCurrency(r.price, r.currency) },
                {
                  header: "",
                  cell: (r) => (
                    <form action={deleteRouteRate.bind(null, r.id)}>
                      <ConfirmButton confirmMessage="Remove this route rate?" className="text-xs text-red-600 hover:underline">
                        Remove
                      </ConfirmButton>
                    </form>
                  ),
                },
              ]}
            />
            <p className="text-xs text-admin-stone">
              Pickup/drop-off are matched exactly (case-insensitive) against what staff type on the quotation form — keep labels
              consistent, e.g. always &ldquo;Rome Fiumicino Airport&rdquo;.
            </p>
            <form action={createRouteRate} className="grid sm:grid-cols-6 gap-2 items-end border-t border-admin-line pt-4">
              <TextField label="Pickup" name="pickup_label" placeholder="Rome Fiumicino Airport" />
              <TextField label="Drop-off" name="dropoff_label" placeholder="Rome city centre" />
              <SelectField label="Vehicle" name="vehicle_category" options={VEHICLE_CATEGORIES} />
              <SelectField label="Currency" name="currency" options={SUPPORTED_CURRENCIES} />
              <NumberField label="Price" name="price" />
              <div className="sm:col-span-6">
                <SubmitButton>Add route rate</SubmitButton>
              </div>
            </form>
          </div>
        </Section>

        <Section title="Surcharges">
          <div className="p-4 space-y-4">
            <SimpleTable
              rows={surchargeRules ?? []}
              emptyTitle="No surcharge rules yet"
              columns={[
                { header: "Label", cell: (r) => r.label },
                { header: "Kind", cell: (r) => r.kind },
                { header: "Window", cell: (r) => (r.kind === "NIGHT" ? `${r.starts_at ?? "?"}–${r.ends_at ?? "?"}` : "—") },
                { header: "Amount", cell: (r) => (r.is_percent ? `${r.amount}%` : formatCurrency(r.amount, r.currency ?? "EUR")) },
                { header: "Auto-applied", cell: (r) => (r.kind === "NIGHT" || r.kind === "HOLIDAY" ? "Yes" : "Manual toggle") },
                {
                  header: "",
                  cell: (r) => (
                    <form action={deleteSurchargeRule.bind(null, r.id)}>
                      <ConfirmButton confirmMessage="Remove this surcharge?" className="text-xs text-red-600 hover:underline">
                        Remove
                      </ConfirmButton>
                    </form>
                  ),
                },
              ]}
            />
            <form action={createSurchargeRule} className="grid sm:grid-cols-6 gap-2 items-end border-t border-admin-line pt-4">
              <TextField label="Label" name="label" placeholder="Night surcharge" />
              <SelectField label="Kind" name="kind" options={["NIGHT", "HOLIDAY", "WAITING", "EXTRA_STOP", "CUSTOM"]} />
              <div>
                <label className="block text-xs text-admin-stone mb-1">Starts (night only)</label>
                <input type="time" name="starts_at" className="input-luxe" />
              </div>
              <div>
                <label className="block text-xs text-admin-stone mb-1">Ends (night only)</label>
                <input type="time" name="ends_at" className="input-luxe" />
              </div>
              <NumberField label="Amount" name="amount" />
              <label className="flex items-center gap-1.5 text-xs text-admin-stone">
                <input type="checkbox" name="is_percent" /> % of subtotal
              </label>
              <div className="sm:col-span-6">
                <SubmitButton>Add surcharge</SubmitButton>
              </div>
            </form>
          </div>
        </Section>

        <Section title="Holiday dates">
          <div className="p-4 space-y-4">
            <SimpleTable
              rows={holidays ?? []}
              emptyTitle="No holidays configured"
              columns={[
                { header: "Date", cell: (r) => formatDate(r.holiday_date) },
                { header: "Label", cell: (r) => r.label ?? "—" },
                {
                  header: "",
                  cell: (r) => (
                    <form action={deleteHolidayDate.bind(null, r.id)}>
                      <ConfirmButton confirmMessage="Remove this holiday?" className="text-xs text-red-600 hover:underline">
                        Remove
                      </ConfirmButton>
                    </form>
                  ),
                },
              ]}
            />
            <form action={createHolidayDate} className="grid sm:grid-cols-4 gap-2 items-end border-t border-admin-line pt-4">
              <div>
                <label className="block text-xs text-admin-stone mb-1">Date</label>
                <input type="date" name="holiday_date" required className="input-luxe" />
              </div>
              <TextField label="Label" name="label" placeholder="Christmas" required={false} />
              <div className="sm:col-span-2">
                <SubmitButton>Add holiday</SubmitButton>
              </div>
            </form>
          </div>
        </Section>
      </div>
    </div>
  );
}

function TextField({ label, name, placeholder, required = true }: { label: string; name: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs text-admin-stone mb-1">{label}</label>
      <input name={name} placeholder={placeholder} required={required} className="input-luxe" />
    </div>
  );
}

function NumberField({ label, name, required = true }: { label: string; name: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs text-admin-stone mb-1">{label}</label>
      <input type="number" step="0.01" min={0} name={name} required={required} className="input-luxe" />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: readonly string[] }) {
  return (
    <div>
      <label className="block text-xs text-admin-stone mb-1">{label}</label>
      <select name={name} className="input-luxe" required>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  return <button type="submit" className="text-sm bg-admin-navy text-admin-ivory px-4 py-2 rounded-sm hover:bg-admin-navy-deep">{children}</button>;
}
