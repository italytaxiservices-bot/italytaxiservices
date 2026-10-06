"use client";

import { useState } from "react";
import { EntityPicker } from "@/components/admin/ui/EntityPicker";

/**
 * Customer selector for booking/quotation forms: pick an existing customer,
 * or enter a new one inline so staff don't have to leave the form (and lose
 * what they typed) just to create the customer first. The server resolves
 * new_customer_* into a customer via ensureCustomerFromContact, which reuses
 * an existing record when the email/phone already matches.
 */
export function CustomerField({ defaultValue, defaultLabel }: { defaultValue?: string; defaultLabel?: string }) {
  const [mode, setMode] = useState<"existing" | "new">("existing");

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-medium text-admin-ink-soft">
          Customer <span className="text-red-600">*</span>
        </label>
        <div className="flex text-xs border border-admin-line rounded-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setMode("existing")}
            className={`px-2 py-1 ${mode === "existing" ? "bg-admin-navy text-admin-ivory" : "hover:bg-admin-ivory-deep"}`}
          >
            Existing
          </button>
          <button
            type="button"
            onClick={() => setMode("new")}
            className={`px-2 py-1 ${mode === "new" ? "bg-admin-navy text-admin-ivory" : "hover:bg-admin-ivory-deep"}`}
          >
            + New customer
          </button>
        </div>
      </div>

      {/* Both panels stay mounted (just hidden) so switching back and forth
          never discards what was typed. */}
      <input type="hidden" name="customer_mode" value={mode} />
      <div className={mode === "existing" ? "" : "hidden"}>
        <EntityPicker entity="customers" name="customer_id" defaultValue={defaultValue} defaultLabel={defaultLabel} placeholder="Search customers by name, phone or email…" />
      </div>
      <div className={mode === "new" ? "grid sm:grid-cols-3 gap-2" : "hidden"}>
        <input name="new_customer_name" placeholder="Full name *" className="input-luxe" />
        <input name="new_customer_phone" placeholder="Phone / WhatsApp" className="input-luxe" />
        <input name="new_customer_email" type="email" placeholder="Email" className="input-luxe" />
      </div>
    </div>
  );
}
