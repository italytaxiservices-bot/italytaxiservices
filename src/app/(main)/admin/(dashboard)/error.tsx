"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <AlertTriangle className="h-10 w-10 text-amber-600 mb-4" />
      <h1 className="font-display text-xl text-admin-ink mb-2">Something went wrong</h1>
      <p className="text-sm text-admin-stone max-w-sm mb-1">
        This section hit an unexpected error. It&apos;s been logged — try again, or head back to the dashboard.
      </p>
      {error.digest ? <p className="text-xs text-admin-stone/70 mb-6">Reference: {error.digest}</p> : <div className="mb-6" />}
      <div className="flex gap-2">
        <button onClick={() => reset()} className="text-sm bg-admin-navy text-admin-ivory px-4 py-2 rounded-sm hover:bg-admin-navy-deep">
          Try again
        </button>
        <Link href="/admin" className="text-sm border border-admin-line px-4 py-2 rounded-sm hover:bg-white">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
