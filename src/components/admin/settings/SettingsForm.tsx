"use client";

import { useActionState } from "react";
import { updateCompanySettings, type FormState } from "@/lib/admin/actions/settings";

type CompanySettings = {
  company_name: string;
  legal_name: string | null;
  logo_url: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  website: string | null;
  tax_number: string | null;
  currency_default: string;
  tax_rate_default: number;
  quotation_prefix: string;
  invoice_prefix: string;
  receipt_prefix: string;
  booking_prefix: string;
  lead_prefix: string;
  payment_terms: string | null;
  terms_and_conditions: string | null;
  auto_generate_invoice_on_confirm: boolean;
};

export function SettingsForm({ settings }: { settings: CompanySettings }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(updateCompanySettings, undefined);

  return (
    <form action={formAction} className="space-y-8 max-w-3xl">
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-admin-ink mb-2">Company</legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Company name" name="company_name" defaultValue={settings.company_name} required />
          <Field label="Legal name" name="legal_name" defaultValue={settings.legal_name ?? ""} />
          <Field label="Email" name="email" type="email" defaultValue={settings.email ?? ""} />
          <Field label="Phone" name="phone" defaultValue={settings.phone ?? ""} />
          <Field label="WhatsApp" name="whatsapp" defaultValue={settings.whatsapp ?? ""} />
          <Field label="Website" name="website" defaultValue={settings.website ?? ""} />
          <Field label="Tax/VAT number" name="tax_number" defaultValue={settings.tax_number ?? ""} />
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Address</label>
          <textarea name="address" defaultValue={settings.address ?? ""} rows={2} className="input-luxe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Logo URL</label>
          <input name="logo_url" type="url" placeholder="https://…" defaultValue={settings.logo_url ?? ""} className="input-luxe" />
          <p className="text-xs text-admin-stone mt-1">
            A hosted image URL (upload to Supabase Storage or any image host and paste the link). Shown on quotation/invoice/receipt PDFs.
          </p>
          {settings.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.logo_url} alt="Company logo preview" className="mt-2 h-12 object-contain" />
          ) : null}
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-admin-ink mb-2">Currency &amp; tax</legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Default currency" name="currency_default" defaultValue={settings.currency_default} required />
          <Field label="Default tax rate (%)" name="tax_rate_default" type="number" defaultValue={String(settings.tax_rate_default)} />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-admin-ink mb-2">Document numbering</legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Lead prefix" name="lead_prefix" defaultValue={settings.lead_prefix} required />
          <Field label="Quotation prefix" name="quotation_prefix" defaultValue={settings.quotation_prefix} required />
          <Field label="Booking prefix" name="booking_prefix" defaultValue={settings.booking_prefix} required />
          <Field label="Invoice prefix" name="invoice_prefix" defaultValue={settings.invoice_prefix} required />
          <Field label="Receipt prefix" name="receipt_prefix" defaultValue={settings.receipt_prefix} required />
        </div>
        <label className="flex items-center gap-2 text-sm text-admin-ink-soft">
          <input type="checkbox" name="auto_generate_invoice_on_confirm" defaultChecked={settings.auto_generate_invoice_on_confirm} />
          Automatically create an invoice when a booking is confirmed
        </label>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-admin-ink mb-2">Default document text</legend>
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Payment terms</label>
          <textarea name="payment_terms" defaultValue={settings.payment_terms ?? ""} rows={2} className="input-luxe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Terms &amp; conditions</label>
          <textarea name="terms_and_conditions" defaultValue={settings.terms_and_conditions ?? ""} rows={4} className="input-luxe" />
        </div>
      </fieldset>

      {state?.error ? (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-3 py-2">
          {state.error}
        </p>
      ) : null}
      {state?.success ? <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-sm px-3 py-2">Settings saved.</p> : null}

      <button type="submit" disabled={pending} className="bg-admin-navy text-admin-ivory text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-admin-navy-deep disabled:opacity-60">
        {pending ? "Saving…" : "Save settings"}
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
