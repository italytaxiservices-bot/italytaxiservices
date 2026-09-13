"use client";

import { Suspense, useState, type ReactNode } from "react";
import { Sidebar } from "@/components/admin/layout/Sidebar";
import { Topbar } from "@/components/admin/layout/Topbar";
import { FlashBanner } from "@/components/admin/layout/FlashBanner";
import type { UserRole } from "@/lib/auth/roles";

export function AdminShell({
  profile,
  children,
}: {
  profile: { fullName: string; email: string; role: UserRole };
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-admin-ivory-deep">
      <Suspense fallback={null}>
        <FlashBanner />
      </Suspense>
      <Sidebar role={profile.role} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar profile={profile} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
