import type { ReactNode } from "react";
import { EmptyState } from "@/components/admin/ui/EmptyState";

export function SimpleTable<T extends { id: string }>({
  rows,
  columns,
  emptyTitle = "Nothing here yet",
}: {
  rows: T[];
  columns: { header: string; cell: (row: T) => ReactNode }[];
  emptyTitle?: string;
}) {
  if (rows.length === 0) return <EmptyState title={emptyTitle} />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-admin-stone border-b border-admin-line">
            {columns.map((c) => (
              <th key={c.header} className="px-4 py-2.5 font-medium">
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-admin-line">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-admin-ivory-deep">
              {columns.map((c) => (
                <td key={c.header} className="px-4 py-2.5">
                  {c.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
