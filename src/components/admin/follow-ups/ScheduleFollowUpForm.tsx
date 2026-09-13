"use client";

import { useActionState } from "react";
import { EntityPicker } from "@/components/admin/ui/EntityPicker";
import { createFollowUp, type FormState } from "@/lib/admin/actions/follow-ups";

const FOLLOW_UP_TYPES = [
  "NEW_LEAD",
  "QUOTATION_FOLLOWUP",
  "UNPAID_INVOICE",
  "UPCOMING_TRIP",
  "POST_TRIP_FOLLOWUP",
  "REVIEW_REQUEST",
  "REPEAT_BOOKING",
  "CUSTOM",
];

export function ScheduleFollowUpForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(createFollowUp, undefined);

  return (
    <form action={formAction} className="p-4 space-y-3">
      <div>
        <label className="block text-xs text-admin-stone mb-1">Customer</label>
        <EntityPicker entity="customers" name="customer_id" placeholder="Search customers…" />
      </div>
      <div>
        <label className="block text-xs text-admin-stone mb-1">Type</label>
        <select name="type" className="input-luxe">
          {FOLLOW_UP_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs text-admin-stone mb-1">Due date</label>
        <input type="date" name="due_date" required className="input-luxe" />
      </div>
      <div>
        <label className="block text-xs text-admin-stone mb-1">Notes</label>
        <textarea name="notes" rows={2} className="input-luxe" />
      </div>

      {state?.error ? <p className="text-sm text-red-700">{state.error}</p> : null}

      <button type="submit" disabled={pending} className="w-full text-sm bg-admin-navy text-admin-ivory px-3 py-2 rounded-sm hover:bg-admin-navy-deep disabled:opacity-60">
        {pending ? "Scheduling…" : "Schedule"}
      </button>
    </form>
  );
}
