import type { ReactNode } from "react";
import { siteConfig } from "@/lib/siteConfig";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-admin-navy flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-display text-2xl text-admin-ivory">{siteConfig.name}</span>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-admin-gold-light">Operations Console</p>
        </div>
        <div className="bg-admin-ivory rounded-sm shadow-xl p-8">{children}</div>
      </div>
    </div>
  );
}
