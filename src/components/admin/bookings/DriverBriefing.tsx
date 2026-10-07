"use client";

import { useState, useTransition } from "react";
import { logDriverBriefingSent } from "@/lib/admin/actions/notes";
import { BRIEFING_METHOD_LABELS, parseBriefingNote } from "@/lib/admin/driverBriefingText";
import type { DriverOption } from "@/components/admin/bookings/QuickDriverSend";

export type DriverBriefingHistory = { id: string; note: string; createdLabel: string; by: string | null }[];

const OTHER = "__other__";

/**
 * Pre-filled trip summary staff can tweak, then copy or WhatsApp to a
 * driver. The textarea is editable so anything the driver shouldn't see
 * (or anything missing) can be fixed before it's sent. Staff pick who it's
 * going to, and every copy/send is logged with that name, so the booking
 * always shows who the trip was given to.
 */
export function DriverBriefing({
  text,
  entityType,
  entityId,
  options,
  defaultDriverId,
  history = [],
}: {
  text: string;
  entityType: "booking" | "lead";
  entityId: string;
  options: DriverOption[];
  defaultDriverId?: string | null;
  history?: DriverBriefingHistory;
}) {
  const [value, setValue] = useState(text);
  const [copied, setCopied] = useState(false);
  const [driverId, setDriverId] = useState(defaultDriverId ?? "");
  const [otherName, setOtherName] = useState("");
  const [justGiven, setJustGiven] = useState<{ name: string | null; method: "whatsapp" | "copy" } | null>(null);
  const [, startTransition] = useTransition();

  const selected = driverId === OTHER ? null : options.find((o) => o.id === driverId) ?? null;
  const recipient = driverId === OTHER ? otherName.trim() || null : selected?.name ?? null;

  function record(method: "whatsapp" | "copy") {
    setJustGiven({ name: recipient, method });
    startTransition(async () => {
      await logDriverBriefingSent({ entityType, entityId, method, driverName: recipient, isPartner: selected?.id.startsWith("partner:") });
    });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard API is unavailable on non-HTTPS origins / some browsers.
      const el = document.getElementById("driver-briefing-text") as HTMLTextAreaElement | null;
      el?.select();
      document.execCommand("copy");
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    record("copy");
  }

  const phoneDigits = selected?.phone?.replace(/[^\d]/g, "") ?? "";
  const waHref = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(value)}`;

  // What the banner shows: this session's send, else the latest logged one.
  const latest = justGiven
    ? { recipient: justGiven.name, method: justGiven.method, when: "just now", by: null as string | null }
    : history[0]
      ? { ...parseBriefingNote(history[0].note), when: history[0].createdLabel, by: history[0].by }
      : null;

  return (
    <div className="p-4 space-y-2 text-sm">
      {latest ? (
        <div className="rounded-sm border border-emerald-300 bg-emerald-50 px-3 py-2 text-emerald-900">
          <p className="text-[11px] uppercase tracking-wide font-semibold text-emerald-700">Given to</p>
          <p className="text-base font-bold">🚘 {latest.recipient ?? "Driver (name not recorded)"}</p>
          <p className="text-xs">
            {latest.method ? BRIEFING_METHOD_LABELS[latest.method] : "Sent"} · {latest.when}
            {latest.by ? ` · by ${latest.by}` : ""}
          </p>
        </div>
      ) : (
        <div className="rounded-sm border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 font-semibold">
          ⚠️ Not given to any driver yet
        </div>
      )}

      <label className="block text-xs text-admin-stone">
        Give to
        <select value={driverId} onChange={(e) => setDriverId(e.target.value)} className="input-luxe text-sm mt-1">
          <option value="">Choose driver / partner…</option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
              {o.hint ? ` · ${o.hint}` : ""}
              {o.phone ? "" : " (no phone)"}
            </option>
          ))}
          <option value={OTHER}>Other (type a name)…</option>
        </select>
      </label>
      {driverId === OTHER ? (
        <input value={otherName} onChange={(e) => setOtherName(e.target.value)} placeholder="Driver name" className="input-luxe text-sm" />
      ) : null}

      <textarea
        id="driver-briefing-text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={12}
        className="input-luxe text-xs font-mono"
      />
      <button
        type="button"
        onClick={copy}
        className="w-full text-sm bg-admin-navy text-admin-ivory px-3 py-2 rounded-sm hover:bg-admin-navy-deep"
      >
        {copied ? `Copied ✓ — logged as given to ${recipient ?? "driver"}` : recipient ? `Copy for ${recipient}` : "Copy booking details"}
      </button>
      <a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        onClick={() => record("whatsapp")}
        className="block text-center text-sm border border-emerald-600 bg-emerald-600 text-white px-3 py-2 rounded-sm hover:bg-emerald-700"
      >
        {selected?.phone ? `Send to ${selected.name} on WhatsApp` : "Share on WhatsApp"}
      </a>
      {!recipient ? <p className="text-xs text-amber-700">Choose who you&apos;re giving it to, so the booking records the driver&apos;s name.</p> : null}

      {history.length > (justGiven ? 0 : 1) ? (
        <details className="text-xs text-admin-stone">
          <summary className="cursor-pointer select-none">Earlier ({history.length - (justGiven ? 0 : 1)})</summary>
          <ul className="mt-1 space-y-1">
            {history.slice(justGiven ? 0 : 1).map((h) => {
              const p = parseBriefingNote(h.note);
              return (
                <li key={h.id}>
                  🚘 {p.recipient ?? "Driver"} · {p.method ? BRIEFING_METHOD_LABELS[p.method] : "Sent"} — {h.createdLabel}
                  {h.by ? ` · ${h.by}` : ""}
                </li>
              );
            })}
          </ul>
        </details>
      ) : null}
    </div>
  );
}
