"use client";

import { useActionState, useState } from "react";
import type { FormState } from "@/lib/admin/actions/customers";

type Customer = {
  full_name: string;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  country: string | null;
  customer_type: string | null;
  company_name: string | null;
  billing_contact_name: string | null;
  billing_email: string | null;
  tax_vat_number: string | null;
  payment_terms: string | null;
  credit_limit: number | null;
  billing_address: string | null;
  notes: string | null;
};

export function CustomerForm({
  action,
  customer,
  submitLabel = "Save customer",
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  customer?: Partial<Customer>;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [customerType, setCustomerType] = useState(customer?.customer_type ?? "INDIVIDUAL");

  return (
    <form action={formAction} className="space-y-4 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" name="full_name" defaultValue={customer?.full_name} required />
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Customer type</label>
          <select name="customer_type" value={customerType} onChange={(e) => setCustomerType(e.target.value)} className="input-luxe">
            <option value="INDIVIDUAL">Individual</option>
            <option value="COMPANY">Company</option>
          </select>
        </div>
        <Field label="Company name" name="company_name" defaultValue={customer?.company_name ?? ""} />
        <Field label="Email" name="email" type="email" defaultValue={customer?.email ?? ""} />
        <Field label="Phone" name="phone" defaultValue={customer?.phone ?? ""} />
        <Field label="WhatsApp" name="whatsapp" defaultValue={customer?.whatsapp ?? ""} />
        <Field label="Country" name="country" defaultValue={customer?.country ?? ""} />
      </div>

      {customerType === "COMPANY" ? (
        <fieldset className="border border-admin-line rounded-sm p-4 space-y-4">
          <legend className="text-sm font-medium text-admin-ink-soft px-1">Corporate billing</legend>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Billing contact name" name="billing_contact_name" defaultValue={customer?.billing_contact_name ?? ""} />
            <Field label="Billing email" name="billing_email" type="email" defaultValue={customer?.billing_email ?? ""} />
            <Field label="Tax / VAT number" name="tax_vat_number" defaultValue={customer?.tax_vat_number ?? ""} />
            <div>
              <label className="block text-sm font-medium text-admin-ink-soft mb-1">Payment terms</label>
              <select name="payment_terms" defaultValue={customer?.payment_terms ?? "PAY_NOW"} className="input-luxe">
                <option value="PAY_NOW">Pay now</option>
                <option value="DUE_7">Net 7</option>
                <option value="DUE_15">Net 15</option>
                <option value="DUE_30">Net 30</option>
                <option value="CUSTOM">Custom</option>
              </select>
            </div>
            <Field label="Credit limit (optional)" name="credit_limit" type="number" defaultValue={customer?.credit_limit?.toString() ?? ""} />
          </div>
        </fieldset>
      ) : null}

      <div>
        <label className="block text-sm font-medium text-admin-ink-soft mb-1">Billing address</label>
        <textarea name="billing_address" defaultValue={customer?.billing_address ?? ""} rows={2} className="input-luxe" />
      </div>

      <div>
        <label className="block text-sm font-medium text-admin-ink-soft mb-1">Notes</label>
        <textarea name="notes" defaultValue={customer?.notes ?? ""} rows={3} className="input-luxe" />
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
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="input-luxe"
      />
    </div>
  );
}
