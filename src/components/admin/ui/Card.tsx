import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white border border-admin-line rounded-sm ${className}`}>{children}</div>;
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <Card className="p-4">
      <p className="text-xs uppercase tracking-wide text-admin-stone">{label}</p>
      <p className="font-display text-2xl text-admin-ink mt-1">{value}</p>
      {hint ? <p className="text-xs text-admin-stone mt-1">{hint}</p> : null}
    </Card>
  );
}
