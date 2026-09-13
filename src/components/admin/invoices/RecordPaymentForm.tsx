"use client";

import { useActionState } from "react";
import type { FormState } from "@/lib/admin/actions/invoices";

const METHODS = ["CASH", "BANK_TRANSFER", "CARD", "ONLINE", "OTHER"];

export function RecordPaymentForm({
  action,
  balanceDue,
  currency,
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  balanceDue: number;
  currency: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={formAction} className="p-4 space-y-3">
      <div>
        <label className="block text-xs text-admin-stone mb-1">Amount ({currency})</label>
        <input name="amount" type="number" step="0.01" min={0.01} max={balanceDue || undefined} defaultValue={balanceDue > 0 ? balanceDue : undefined} required className="input-luxe" />
        <p className="text-xs text-admin-stone mt-1">Balance due: {balanceDue.toFixed(2)} {currency}</p>
      </div>
      <div>
        <label className="block text-xs text-admin-stone mb-1">Method</label>
        <select name="method" className="input-luxe" defaultValue="BANK_TRANSFER">
          {METHODS.map((m) => (
            <option key={m} value={m}>
              {m.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs text-admin-stone mb-1">Reference number</label>
        <input name="reference_number" className="input-luxe" />
      </div>
      <div>
        <label className="block text-xs text-admin-stone mb-1">Payment date</label>
        <input name="payment_date" type="date" defaultValue={today} required className="input-luxe" />
      </div>
      <div>
        <label className="block text-xs text-admin-stone mb-1">Notes</label>
        <textarea name="notes" rows={2} className="input-luxe" />
      </div>

      {state?.error ? (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-3 py-2">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending || balanceDue <= 0}
        className="w-full bg-admin-navy text-admin-ivory text-sm font-semibold px-3 py-2 rounded-sm hover:bg-admin-navy-deep disabled:opacity-50"
      >
        {pending ? "Recording…" : balanceDue <= 0 ? "Fully paid" : "Record payment"}
      </button>
    </form>
  );
}
