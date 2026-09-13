"use client";

import { useActionState } from "react";
import type { FormState } from "@/lib/admin/actions/leads";

type Lead = {
  full_name: string;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  source: string;
  pickup: string | null;
  dropoff: string | null;
  trip_date: string | null;
  trip_time: string | null;
  passengers: number | null;
  estimated_value: number | null;
  notes: string | null;
};

const SOURCES = ["WEBSITE", "PHONE", "EMAIL", "WHATSAPP", "REFERRAL", "WALK_IN", "OTHER"];

export function LeadForm({
  action,
  lead,
  submitLabel = "Save lead",
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  lead?: Partial<Lead>;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-4 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" name="full_name" defaultValue={lead?.full_name} required />
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Source</label>
          <select name="source" defaultValue={lead?.source ?? "WEBSITE"} className="input-luxe">
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <Field label="Email" name="email" type="email" defaultValue={lead?.email ?? ""} />
        <Field label="Phone" name="phone" defaultValue={lead?.phone ?? ""} />
        <Field label="WhatsApp" name="whatsapp" defaultValue={lead?.whatsapp ?? ""} />
        <Field label="Estimated value (€)" name="estimated_value" type="number" defaultValue={lead?.estimated_value?.toString() ?? ""} />
        <Field label="Pickup" name="pickup" defaultValue={lead?.pickup ?? ""} />
        <Field label="Drop-off" name="dropoff" defaultValue={lead?.dropoff ?? ""} />
        <Field label="Trip date" name="trip_date" type="date" defaultValue={lead?.trip_date ?? ""} />
        <Field label="Trip time" name="trip_time" type="time" defaultValue={lead?.trip_time ?? ""} />
        <Field label="Passengers" name="passengers" type="number" defaultValue={lead?.passengers?.toString() ?? ""} />
      </div>

      <div>
        <label className="block text-sm font-medium text-admin-ink-soft mb-1">Notes</label>
        <textarea name="notes" defaultValue={lead?.notes ?? ""} rows={3} className="input-luxe" />
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
  required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
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
