"use client";

import { useActionState, useState } from "react";
import { EntityPicker } from "@/components/admin/ui/EntityPicker";
import { LineItemsEditor, type LineItem, type ServiceOption } from "@/components/admin/quotations/LineItemsEditor";
import { PriceSuggestionPanel } from "@/components/admin/quotations/PriceSuggestionPanel";
import { SUPPORTED_CURRENCIES } from "@/lib/pricing/currencies";
import type { PricingSuggestion } from "@/lib/pricing/engine";
import type { FormState } from "@/lib/admin/actions/quotations";

type QuotationDefaults = {
  customer_id?: string;
  customer_label?: string;
  lead_id?: string;
  pickup?: string;
  dropoff?: string;
  trip_date?: string;
  trip_time?: string;
  passengers?: number;
  luggage?: number;
  vehicle_id?: string;
  vehicle_label?: string;
  driver_id?: string;
  driver_label?: string;
  discount?: number;
  tax_rate?: number;
  currency?: string;
  valid_until?: string;
  payment_terms?: string;
  terms_and_conditions?: string;
  internal_notes?: string;
  items?: LineItem[];
};

export function QuotationForm({
  action,
  defaults,
  submitLabel = "Save quotation",
  services,
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  defaults?: QuotationDefaults;
  submitLabel?: string;
  services?: ServiceOption[];
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [discount, setDiscount] = useState(defaults?.discount ?? 0);
  const [taxRate, setTaxRate] = useState(defaults?.tax_rate ?? 0);
  const [items, setItems] = useState<LineItem[]>(defaults?.items?.length ? defaults.items : [{ description: "", quantity: 1, unit_price: 0 }]);
  const [currency, setCurrency] = useState(defaults?.currency ?? "EUR");
  const [pickup, setPickup] = useState(defaults?.pickup ?? "");
  const [dropoff, setDropoff] = useState(defaults?.dropoff ?? "");
  const [tripDate, setTripDate] = useState(defaults?.trip_date ?? "");
  const [tripTime, setTripTime] = useState(defaults?.trip_time ?? "");
  const [pricingBreakdown, setPricingBreakdown] = useState<PricingSuggestion | null>(null);

  function applySuggestion(description: string, amount: number, breakdown: PricingSuggestion) {
    setItems((prev) => {
      const rest = prev.filter((i) => i.description.trim() !== "" || i.quantity !== 1 || i.unit_price !== 0);
      return [...rest, { description, quantity: 1, unit_price: amount }];
    });
    setPricingBreakdown(breakdown);
  }

  return (
    <form action={formAction} className="space-y-6 max-w-3xl">
      {defaults?.lead_id ? <input type="hidden" name="lead_id" value={defaults.lead_id} /> : null}
      {pricingBreakdown ? <input type="hidden" name="pricing_breakdown" value={JSON.stringify(pricingBreakdown)} /> : null}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">
            Customer <span className="text-red-600">*</span>
          </label>
          <EntityPicker
            entity="customers"
            name="customer_id"
            defaultValue={defaults?.customer_id}
            defaultLabel={defaults?.customer_label}
            placeholder="Search customers…"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-admin-ink-soft mb-1">Currency</label>
            <select name="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="input-luxe">
              {SUPPORTED_CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-ink-soft mb-1">Valid until</label>
            <input type="date" name="valid_until" defaultValue={defaults?.valid_until ?? ""} className="input-luxe" />
          </div>
        </div>

        <Field label="Pickup" name="pickup" value={pickup} onChange={setPickup} />
        <Field label="Drop-off" name="dropoff" value={dropoff} onChange={setDropoff} />
        <Field label="Trip date" name="trip_date" type="date" value={tripDate} onChange={setTripDate} />
        <Field label="Trip time" name="trip_time" type="time" value={tripTime} onChange={setTripTime} />
        <Field label="Passengers" name="passengers" type="number" defaultValue={defaults?.passengers?.toString()} />
        <Field label="Luggage" name="luggage" type="number" defaultValue={defaults?.luggage?.toString()} />

        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Vehicle</label>
          <EntityPicker entity="vehicles" name="vehicle_id" defaultValue={defaults?.vehicle_id} defaultLabel={defaults?.vehicle_label} placeholder="Search vehicles…" />
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Driver</label>
          <EntityPicker entity="drivers" name="driver_id" defaultValue={defaults?.driver_id} defaultLabel={defaults?.driver_label} placeholder="Search drivers…" />
        </div>
      </div>

      <PriceSuggestionPanel pickup={pickup} dropoff={dropoff} tripDate={tripDate} tripTime={tripTime} currency={currency} onApply={applySuggestion} />

      <div>
        <label className="block text-sm font-medium text-admin-ink-soft mb-2">Line items</label>
        <LineItemsEditor
          name="items"
          items={items}
          onItemsChange={setItems}
          discount={discount}
          taxRate={taxRate}
          currency={currency}
          onDiscountChange={setDiscount}
          onTaxRateChange={setTaxRate}
          services={services}
        />
        <input type="hidden" name="discount" value={discount} />
        <input type="hidden" name="tax_rate" value={taxRate} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Payment terms</label>
          <textarea name="payment_terms" defaultValue={defaults?.payment_terms ?? "50% deposit, balance due on the day of travel."} rows={2} className="input-luxe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Terms &amp; conditions</label>
          <textarea name="terms_and_conditions" defaultValue={defaults?.terms_and_conditions ?? ""} rows={2} className="input-luxe" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-admin-ink-soft mb-1">Internal notes</label>
        <textarea name="internal_notes" defaultValue={defaults?.internal_notes ?? ""} rows={2} className="input-luxe" />
      </div>

      {state?.error ? (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-3 py-2">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="bg-admin-navy text-admin-ivory text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-admin-navy-deep transition-colors disabled:opacity-60"
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-admin-ink-soft mb-1">
        {label}
      </label>
      {onChange ? (
        <input id={name} name={name} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="input-luxe" />
      ) : (
        <input id={name} name={name} type={type} defaultValue={defaultValue} className="input-luxe" />
      )}
    </div>
  );
}
