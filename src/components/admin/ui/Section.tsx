import type { ReactNode } from "react";
import { Card } from "@/components/admin/ui/Card";

export function Section({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <Card>
      <div className="px-4 py-3 border-b border-admin-line flex items-center justify-between">
        <h3 className="text-sm font-semibold text-admin-ink">{title}</h3>
        {action}
      </div>
      {children}
    </Card>
  );
}
