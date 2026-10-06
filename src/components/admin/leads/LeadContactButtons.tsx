"use client";

import { useState, useTransition } from "react";
import { MessageCircle, Mail, Phone, Check } from "lucide-react";
import { markLeadContacted } from "@/lib/admin/actions/leads";

/**
 * One-click outreach for a lead: opens WhatsApp / email with an editable,
 * pre-filled message and records the contact (NEW → CONTACTED + a note),
 * so working down the Upcoming trips list one by one stays trackable.
 */
export function LeadContactButtons({
  leadId,
  phone,
  email,
  message,
  subject,
}: {
  leadId: string;
  phone?: string | null;
  email?: string | null;
  message: string;
  subject: string;
}) {
  const [text, setText] = useState(message);
  const [editing, setEditing] = useState(false);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  function record(channel: "whatsapp" | "email" | "phone" | "manual") {
    setDone(true);
    startTransition(async () => {
      await markLeadContacted(leadId, channel);
    });
  }

  const digits = phone?.replace(/[^\d]/g, "");
  const btn = "inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-sm border";

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {digits ? (
          <a
            href={`https://wa.me/${digits}?text=${encodeURIComponent(text)}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => record("whatsapp")}
            className={`${btn} border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700`}
          >
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </a>
        ) : null}
        {email ? (
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`}
            onClick={() => record("email")}
            className={`${btn} border-admin-line hover:bg-admin-ivory-deep`}
          >
            <Mail className="h-3.5 w-3.5" /> Email
          </a>
        ) : null}
        {phone ? (
          <a href={`tel:${phone}`} onClick={() => record("phone")} className={`${btn} border-admin-line hover:bg-admin-ivory-deep`}>
            <Phone className="h-3.5 w-3.5" /> Call
          </a>
        ) : null}
        <button type="button" onClick={() => setEditing((v) => !v)} className={`${btn} border-admin-line hover:bg-admin-ivory-deep`}>
          ✏️ {editing ? "Hide message" : "Edit message"}
        </button>
        <button
          type="button"
          disabled={done || pending}
          onClick={() => record("manual")}
          className={`${btn} border-admin-line hover:bg-admin-ivory-deep disabled:opacity-60`}
        >
          <Check className="h-3.5 w-3.5" /> {done ? "Marked contacted" : "Mark contacted"}
        </button>
      </div>
      {editing ? <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="input-luxe text-xs" /> : null}
    </div>
  );
}
