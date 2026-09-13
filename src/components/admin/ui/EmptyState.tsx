import type { ReactNode } from "react";

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="text-center py-16 px-4">
      <p className="text-sm font-medium text-admin-ink">{title}</p>
      {description ? <p className="text-sm text-admin-stone mt-1">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
