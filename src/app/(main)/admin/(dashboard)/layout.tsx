import type { ReactNode } from "react";
import { requireUser } from "@/lib/auth/dal";
import { AdminShell } from "@/components/admin/layout/AdminShell";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const profile = await requireUser();

  return <AdminShell profile={profile}>{children}</AdminShell>;
}
