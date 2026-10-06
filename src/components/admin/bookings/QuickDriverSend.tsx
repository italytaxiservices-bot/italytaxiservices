"use client";

import { useState, useTransition } from "react";
import { MessageCircle, Copy, Check } from "lucide-react";
import { logDriverBriefingSent } from "@/lib/admin/actions/notes";

export type DriverOption = { id: string; name: string; phone: string | null; hint?: string };

/**
 * Compact "send this trip to a driver" control for list views (By city):
 * choose a driver, then copy or WhatsApp the trip summary. Each send is
 * logged exactly like the full DriverBriefing box on the detail page.
 */
export function QuickDriverSend({
  text,
  entityType,
  entityId,
  drivers,
  defaultDriverId,
  sentLabel,
}: {
  text: string;
  entityType: "booking" | "lead";
  entityId: string;
  drivers: DriverOption[];
  defaultDriverId?: string | null;
  sentLabel?: string | null;
}) {
  const [driverId, setDriverId] = useState(defaultDriverId ?? "");
  const [showText, setShowText] = useState(false);
  const [copied, setCopied] = useState(false);
  const [justSent, setJustSent] = useState(false);
  const [, startTransition] = useTransition();

  const driver = drivers.find((d) => d.id === driverId) ?? null;
  const digits = driver?.phone?.replace(/[^\d]/g, "") ?? "";

  function record(method: "whatsapp" | "copy") {
    setJustSent(true);
    startTransition(async () => {
      await logDriverBriefingSent({ entityType, entityId, method, driverName: driver?.name ?? null });
    });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API unavailable (non-HTTPS / older browser): fall back to a hidden textarea.
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    record("copy");
  }

  const btn = "inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-sm border";

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <select value={driverId} onChange={(e) => setDriverId(e.target.value)} className="input-luxe text-xs py-1 max-w-[200px]">
          <option value="">Choose driver…</option>
          {drivers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
              {d.hint ? ` · ${d.hint}` : ""}
              {d.phone ? "" : " (no phone)"}
            </option>
          ))}
        </select>
        <button type="button" onClick={copy} className={`${btn} border-admin-line hover:bg-admin-ivory-deep`}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy"}
        </button>
        <a
          href={`https://wa.me/${digits}?text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => record("whatsapp")}
          className={`${btn} border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700`}
        >
          <MessageCircle className="h-3.5 w-3.5" /> {driver ? `WhatsApp ${driver.name.split(" ")[0]}` : "WhatsApp"}
        </a>
        <button type="button" onClick={() => setShowText((v) => !v)} className="text-xs text-admin-stone hover:underline">
          {showText ? "Hide text" : "View text"}
        </button>
        {justSent ? (
          <span className="text-xs font-semibold text-emerald-700">✅ Logged</span>
        ) : sentLabel ? (
          <span className="text-xs font-semibold text-emerald-700">✅ {sentLabel}</span>
        ) : (
          <span className="text-xs font-semibold text-amber-700">⚠️ Not sent yet</span>
        )}
      </div>
      {showText ? <pre className="whitespace-pre-wrap text-xs bg-admin-ivory-deep border border-admin-line rounded-sm p-2">{text}</pre> : null}
    </div>
  );
}
