"use client";

import { useActionState } from "react";
import type { FormState } from "@/lib/admin/actions/vehicles";

type Vehicle = {
  name: string;
  make: string | null;
  model: string | null;
  year: number | null;
  color: string | null;
  category: string;
  seats: number | null;
  luggage_capacity: number | null;
  registration_number: string | null;
  vin: string | null;
  current_mileage: number | null;
  description: string | null;
  registration_expiry: string | null;
  insurance_expiry: string | null;
  purchase_date: string | null;
  purchase_price: number | null;
  lease_monthly_amount: number | null;
  lease_end_date: string | null;
};

const CATEGORIES = ["SEDAN", "SUV", "VAN", "LUXURY", "MINIBUS"];

export function VehicleForm({
  action,
  vehicle,
  submitLabel = "Save vehicle",
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  vehicle?: Partial<Vehicle>;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-4 max-w-xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" name="name" defaultValue={vehicle?.name} required />
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Category</label>
          <select name="category" defaultValue={vehicle?.category ?? "SEDAN"} className="input-luxe">
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <Field label="Make" name="make" defaultValue={vehicle?.make ?? ""} />
        <Field label="Model" name="model" defaultValue={vehicle?.model ?? ""} />
        <Field label="Year" name="year" type="number" defaultValue={vehicle?.year?.toString() ?? ""} />
        <Field label="Color" name="color" defaultValue={vehicle?.color ?? ""} />
        <Field label="Registration number" name="registration_number" defaultValue={vehicle?.registration_number ?? ""} />
        <Field label="VIN" name="vin" defaultValue={vehicle?.vin ?? ""} />
        <Field label="Seats" name="seats" type="number" defaultValue={vehicle?.seats?.toString() ?? ""} />
        <Field label="Luggage capacity" name="luggage_capacity" type="number" defaultValue={vehicle?.luggage_capacity?.toString() ?? ""} />
        <Field label="Current mileage" name="current_mileage" type="number" defaultValue={vehicle?.current_mileage?.toString() ?? ""} />
        <Field label="Registration expiry" name="registration_expiry" type="date" defaultValue={vehicle?.registration_expiry ?? ""} />
        <Field label="Insurance expiry" name="insurance_expiry" type="date" defaultValue={vehicle?.insurance_expiry ?? ""} />
      </div>
      <div>
        <label className="block text-sm font-medium text-admin-ink-soft mb-1">Description</label>
        <textarea name="description" defaultValue={vehicle?.description ?? ""} rows={3} className="input-luxe" />
      </div>

      <fieldset className="border border-admin-line rounded-sm p-4 space-y-4">
        <legend className="text-sm font-medium text-admin-ink-soft px-1">Purchase / lease (optional)</legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Purchase date" name="purchase_date" type="date" defaultValue={vehicle?.purchase_date ?? ""} />
          <Field label="Purchase price" name="purchase_price" type="number" defaultValue={vehicle?.purchase_price?.toString() ?? ""} />
          <Field label="Lease monthly amount" name="lease_monthly_amount" type="number" defaultValue={vehicle?.lease_monthly_amount?.toString() ?? ""} />
          <Field label="Lease end date" name="lease_end_date" type="date" defaultValue={vehicle?.lease_end_date ?? ""} />
        </div>
      </fieldset>

      {state?.error ? (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-3 py-2">
          {state.error}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="bg-admin-navy text-admin-ivory text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-admin-navy-deep disabled:opacity-60">
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", defaultValue, required }: { label: string; name: string; type?: string; defaultValue?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-admin-ink-soft mb-1">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>
      <input id={name} name={name} type={type} defaultValue={defaultValue} required={required} className="input-luxe" />
    </div>
  );
}
