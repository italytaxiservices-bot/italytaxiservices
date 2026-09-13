import Link from "next/link";

export function Pagination({
  page,
  pageSize,
  total,
  basePath,
  searchParams = {},
}: {
  page: number;
  pageSize: number;
  total: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (value) params.set(key, value);
    }
    params.set("page", String(p));
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-admin-line text-sm">
      <p className="text-admin-stone">
        Page {page} of {totalPages} · {total} total
      </p>
      <div className="flex items-center gap-2">
        <Link
          href={buildHref(Math.max(1, page - 1))}
          aria-disabled={page <= 1}
          className={`px-3 py-1.5 rounded-sm border border-admin-line ${page <= 1 ? "pointer-events-none opacity-40" : "hover:bg-admin-ivory-deep"}`}
        >
          Previous
        </Link>
        <Link
          href={buildHref(Math.min(totalPages, page + 1))}
          aria-disabled={page >= totalPages}
          className={`px-3 py-1.5 rounded-sm border border-admin-line ${page >= totalPages ? "pointer-events-none opacity-40" : "hover:bg-admin-ivory-deep"}`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
