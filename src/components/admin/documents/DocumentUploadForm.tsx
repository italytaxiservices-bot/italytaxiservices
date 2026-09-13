"use client";

import { useActionState, useRef } from "react";
import { uploadDocument, type FormState } from "@/lib/admin/actions/documents";

const DOC_TYPES = ["QUOTATION", "INVOICE", "RECEIPT", "BOOKING_CONFIRMATION", "DRIVER_DOCUMENT", "VEHICLE_DOCUMENT", "OTHER"];

export function DocumentUploadForm({
  entityType,
  entityId,
  defaultDocType = "OTHER",
}: {
  entityType: string;
  entityId: string;
  defaultDocType?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<FormState, FormData>(async (prevState, formData) => {
    const result = await uploadDocument(prevState, formData);
    if (!result?.error) formRef.current?.reset();
    return result;
  }, undefined);

  const tracksExpiry = entityType === "driver" || entityType === "vehicle";

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <input type="hidden" name="entity_type" value={entityType} />
      <input type="hidden" name="entity_id" value={entityId} />
      <select name="doc_type" defaultValue={defaultDocType} className="input-luxe">
        {DOC_TYPES.map((t) => (
          <option key={t} value={t}>
            {t.replaceAll("_", " ")}
          </option>
        ))}
      </select>
      {tracksExpiry ? (
        <>
          <input name="document_subtype" placeholder="e.g. Driving License, Insurance Policy" className="input-luxe" />
          <div>
            <label className="block text-xs text-admin-stone mb-1">Expiry date (optional — enables expiry alerts)</label>
            <input type="date" name="expiry_date" className="input-luxe" />
          </div>
        </>
      ) : null}
      <input type="file" name="file" required className="text-sm" />
      {state?.error ? <p className="text-sm text-red-700">{state.error}</p> : null}
      <button type="submit" disabled={pending} className="text-sm border border-admin-line px-3 py-1.5 rounded-sm hover:bg-admin-ivory-deep disabled:opacity-60">
        {pending ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}
