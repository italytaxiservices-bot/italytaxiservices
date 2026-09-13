"use client";

import { useState } from "react";
import { updateNotificationTemplate, resetNotificationTemplate } from "@/lib/admin/actions/templates";

const SAMPLE_VARS: Record<string, string> = {
  customer_name: "Marco Rossi",
  quotation_number: "QUO-2026-000123",
  booking_reference: "BK-2026-000456",
  invoice_number: "INV-2026-000789",
  receipt_number: "RCP-2026-000321",
  pickup: "Rome Fiumicino Airport",
  dropoff: "Rome city centre",
  date: "12 Oct 2026",
  time: "14:30",
  vehicle: "Mercedes E-Class",
  driver_name: "Luca Bianchi",
  total: "€180.00",
  amount_paid: "€90.00",
  balance_due: "€90.00",
  due_date: "19 Oct 2026",
  valid_until: "26 Sep 2026",
};

function fillPreview(template: string): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => SAMPLE_VARS[key] ?? `{{${key}}}`);
}

type Template = { key: string; label: string; subject_template: string; body_template: string; is_customized: boolean };

export function TemplateEditor({ template }: { template: Template }) {
  const [subject, setSubject] = useState(template.subject_template);
  const [body, setBody] = useState(template.body_template);
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-admin-line rounded-sm">
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between px-4 py-3 text-left">
        <div>
          <p className="text-sm font-semibold text-admin-ink">{template.label}</p>
          <p className="text-xs text-admin-stone">{template.is_customized ? "Customized" : "Factory default"}</p>
        </div>
        <span className="text-xs text-admin-gold">{open ? "Collapse" : "Edit"}</span>
      </button>

      {open ? (
        <div className="border-t border-admin-line p-4 grid md:grid-cols-2 gap-4">
          <form action={updateNotificationTemplate.bind(null, template.key)} className="space-y-3">
            <div>
              <label className="block text-xs text-admin-stone mb-1">Subject</label>
              <input name="subject_template" value={subject} onChange={(e) => setSubject(e.target.value)} className="input-luxe" />
            </div>
            <div>
              <label className="block text-xs text-admin-stone mb-1">Body (blank line = new paragraph)</label>
              <textarea name="body_template" value={body} onChange={(e) => setBody(e.target.value)} rows={8} className="input-luxe font-mono text-xs" />
            </div>
            <div className="flex items-center gap-2">
              <button type="submit" className="text-sm bg-admin-navy text-admin-ivory px-4 py-2 rounded-sm hover:bg-admin-navy-deep">
                Save
              </button>
              {template.is_customized ? (
                <button
                  type="submit"
                  formAction={resetNotificationTemplate.bind(null, template.key)}
                  className="text-xs text-admin-stone hover:text-red-600"
                >
                  Reset to default
                </button>
              ) : null}
            </div>
          </form>

          <div>
            <p className="text-xs text-admin-stone mb-1">Preview (sample data)</p>
            <div className="border border-admin-line rounded-sm p-3 bg-admin-ivory-deep/40 text-sm space-y-2">
              <p className="font-semibold text-admin-ink">{fillPreview(subject)}</p>
              <div className="whitespace-pre-wrap text-admin-ink-soft">{fillPreview(body)}</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
