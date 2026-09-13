"use client";

import { useActionState } from "react";
import type { FormState } from "@/lib/admin/actions/drivers";

type Driver = {
  full_name: string;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  nationality: string | null;
  license_number: string | null;
  license_expiry: string | null;
  notes: string | null;
};

export function DriverForm({
  action,
  driver,
  submitLabel = "Save driver",
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  driver?: Partial<Driver>;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-4 max-w-xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" name="full_name" defaultValue={driver?.full_name} required />
        <Field label="Nationality" name="nationality" defaultValue={driver?.nationality ?? ""} />
        <Field label="Phone" name="phone" defaultValue={driver?.phone ?? ""} />
        <Field label="WhatsApp" name="whatsapp" defaultValue={driver?.whatsapp ?? ""} />
        <Field label="Email" name="email" type="email" defaultValue={driver?.email ?? ""} />
        <Field label="License number" name="license_number" defaultValue={driver?.license_number ?? ""} />
        <Field label="License expiry" name="license_expiry" type="date" defaultValue={driver?.license_expiry ?? ""} />
      </div>
      <div>
        <label className="block text-sm font-medium text-admin-ink-soft mb-1">Notes</label>
        <textarea name="notes" defaultValue={driver?.notes ?? ""} rows={3} className="input-luxe" />
      </div>

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
