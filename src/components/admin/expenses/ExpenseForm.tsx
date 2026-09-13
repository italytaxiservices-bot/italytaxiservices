"use client";

import { useActionState } from "react";
import { EntityPicker } from "@/components/admin/ui/EntityPicker";
import { createExpense, type FormState } from "@/lib/admin/actions/expenses";

const CATEGORIES = ["DRIVER", "FUEL", "TOLL", "PARKING", "MAINTENANCE", "AIRPORT", "COMMISSION", "OTHER"];

export function ExpenseForm({ today }: { today: string }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(createExpense, undefined);

  return (
    <form action={formAction} className="space-y-4 max-w-xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Category</label>
          <select name="category" className="input-luxe">
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Amount</label>
          <input name="amount" type="number" step="0.01" min={0} required className="input-luxe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Date</label>
          <input name="expense_date" type="date" defaultValue={today} required className="input-luxe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Currency</label>
          <input name="currency" defaultValue="EUR" className="input-luxe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Trip (optional)</label>
          <EntityPicker entity="bookings" name="booking_id" placeholder="Search bookings…" />
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Driver (optional)</label>
          <EntityPicker entity="drivers" name="driver_id" placeholder="Search drivers…" />
        </div>
        <div>
          <label className="block text-sm font-medium text-admin-ink-soft mb-1">Vehicle (optional)</label>
          <EntityPicker entity="vehicles" name="vehicle_id" placeholder="Search vehicles…" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-admin-ink-soft mb-1">Description</label>
        <textarea name="description" rows={2} className="input-luxe" />
      </div>

      {state?.error ? (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-3 py-2">
          {state.error}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="bg-admin-navy text-admin-ivory text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-admin-navy-deep disabled:opacity-60">
        {pending ? "Saving…" : "Save expense"}
      </button>
    </form>
  );
}
