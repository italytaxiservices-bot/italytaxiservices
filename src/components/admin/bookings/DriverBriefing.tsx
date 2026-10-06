"use client";

import { useState, useTransition } from "react";
import { logDriverBriefingSent } from "@/lib/admin/actions/notes";

export type DriverBriefingHistory = { id: string; note: string; createdLabel: string; by: string | null }[];

/**
 * Pre-filled trip summary staff can tweak, then copy or WhatsApp to a
 * driver. The textarea is editable so anything the driver shouldn't see
 * (or anything missing) can be fixed before it's sent. Every copy/send is
 * logged so the booking shows the driver has already been told.
 */
export function DriverBriefing({
  text,
  entityType,
  entityId,
  driverName,
  driverPhone,
  history = [],
}: {
  text: string;
  entityType: "booking" | "lead";
  entityId: string;
  driverName?: string | null;
  driverPhone?: string | null;
  history?: DriverBriefingHistory;
}) {
  const [value, setValue] = useState(text);
  const [copied, setCopied] = useState(false);
  // Leads have no assigned driver — let staff note who they sent it to.
  const [manualDriver, setManualDriver] = useState("");
  const [, startTransition] = useTransition();

  const recipient = driverName || manualDriver.trim() || null;

  function record(method: "whatsapp" | "copy") {
    startTransition(async () => {
      await logDriverBriefingSent({ entityType, entityId, method, driverName: recipient });
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

  const phoneDigits = driverPhone?.replace(/[^\d]/g, "");
  const waHref = `https://wa.me/${phoneDigits ?? ""}?text=${encodeURIComponent(value)}`;
  const latest = history[0];

  return (
    <div className="p-4 space-y-2 text-sm">
      {latest ? (
        <div className="rounded-sm border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
          <p className="font-semibold">✅ {latest.note}</p>
          <p>
            {latest.createdLabel}
            {latest.by ? ` · by ${latest.by}` : ""}
          </p>
        </div>
      ) : (
        <div className="rounded-sm border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 font-semibold">
          ⚠️ Not sent to a driver yet
        </div>
      )}

      {!driverName ? (
        <input
          value={manualDriver}
          onChange={(e) => setManualDriver(e.target.value)}
          placeholder="Driver name (optional, for the record)"
          className="input-luxe text-xs"
        />
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
        {copied ? "Copied ✓ (logged)" : "Copy booking details"}
      </button>
      <a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        onClick={() => record("whatsapp")}
        className="block text-center border border-admin-line px-3 py-2 rounded-sm hover:bg-admin-ivory-deep"
      >
        {phoneDigits ? `Send to ${driverName ?? "driver"} on WhatsApp` : "Share on WhatsApp"}
      </a>

      {history.length > 1 ? (
        <details className="text-xs text-admin-stone">
          <summary className="cursor-pointer select-none">Earlier sends ({history.length - 1})</summary>
          <ul className="mt-1 space-y-1">
            {history.slice(1).map((h) => (
              <li key={h.id}>
                {h.note} — {h.createdLabel}
                {h.by ? ` · ${h.by}` : ""}
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}
