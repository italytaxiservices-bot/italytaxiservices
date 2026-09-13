"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, X } from "lucide-react";

/**
 * Reads ?success=/?error= off the URL and shows a dismissible banner, then
 * strips the param so a refresh doesn't re-show it. Mounted once in
 * AdminShell (a Client Component) rather than per-page — layouts can't read
 * searchParams, but this can via the hook, and it covers every admin page
 * that redirects with one of these params after a mutation. Visibility is
 * derived straight from the URL rather than mirrored into local state, so
 * there's no effect needed to sync the two.
 */
export function FlashBanner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const error = searchParams.get("error");
  const message = success ?? error;

  if (!message) return null;

  function dismiss() {
    const params = new URLSearchParams(searchParams);
    params.delete("success");
    params.delete("error");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div
      role="status"
      className={`fixed top-4 right-4 z-[100] flex max-w-sm items-start gap-2 rounded-sm px-4 py-3 text-sm shadow-lg ${
        success ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
      }`}
    >
      {success ? <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" /> : <XCircle className="h-4 w-4 shrink-0 mt-0.5" />}
      <p className="flex-1">{message}</p>
      <button onClick={dismiss} aria-label="Dismiss" className="shrink-0">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
