"use client";

import { useState } from "react";

/**
 * Pre-filled trip summary staff can tweak, then copy or WhatsApp to a
 * driver. The textarea is editable so anything the driver shouldn't see
 * (or anything missing) can be fixed before it's sent.
 */
export function DriverBriefing({ text, driverPhone }: { text: string; driverPhone?: string | null }) {
  const [value, setValue] = useState(text);
  const [copied, setCopied] = useState(false);

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
  }

  const phoneDigits = driverPhone?.replace(/[^\d]/g, "");
  const waHref = `https://wa.me/${phoneDigits ?? ""}?text=${encodeURIComponent(value)}`;

  return (
    <div className="p-4 space-y-2 text-sm">
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
        {copied ? "Copied ✓" : "Copy booking details"}
      </button>
      <a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        className="block text-center border border-admin-line px-3 py-2 rounded-sm hover:bg-admin-ivory-deep"
      >
        {phoneDigits ? "Send to driver on WhatsApp" : "Share on WhatsApp"}
      </a>
    </div>
  );
}
