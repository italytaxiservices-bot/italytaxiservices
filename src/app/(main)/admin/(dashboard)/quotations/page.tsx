import Link from "next/link";
import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { canManageCrm } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { Pagination } from "@/components/admin/ui/Pagination";
import { SimpleTable } from "@/components/admin/ui/SimpleTable";
import { formatCurrency, formatDate } from "@/lib/admin/format";

export const metadata: Metadata = { title: "Quotations" };

const PAGE_SIZE = 20;
const STATUSES = ["DRAFT", "SENT", "VIEWED", "ACCEPTED", "REJECTED", "EXPIRED", "CONVERTED"] as const;

export default async function QuotationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const profile = await requireUser();
  const { q, status: rawStatus, page: pageParam } = await searchParams;
  const status = STATUSES.includes(rawStatus as (typeof STATUSES)[number]) ? (rawStatus as (typeof STATUSES)[number]) : undefined;
  const page = Math.max(1, Number(pageParam) || 1);
  const from = (page - 1) * PAGE_SIZE;

  const supabase = await createClient();
  let query = supabase
    .from("quotations")
    .select("id, quotation_number, status, total, currency, valid_until, created_at, customers(full_name)", { count: "exact" })
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (status) query = query.eq("status", status);
  if (q) query = query.ilike("quotation_number", `%${q}%`);

  const { data: quotations, count } = await query;

  return (
    <div>
      <PageHeader
        title="Quotations"
        actions={
          canManageCrm(profile.role) ? (
            <Link href="/admin/quotations/new" className="inline-flex items-center gap-1.5 bg-admin-navy text-admin-ivory text-sm font-semibold px-4 py-2 rounded-sm hover:bg-admin-navy-deep">
              <Plus className="h-4 w-4" /> New quotation
            </Link>
          ) : undefined
        }
      />

      <form className="mb-4 flex flex-wrap gap-2">
        <input type="search" name="q" defaultValue={q} placeholder="Search by quotation number…" className="input-luxe max-w-sm" />
        <select name="status" defaultValue={status ?? ""} className="input-luxe max-w-[160px]">
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button type="submit" className="border border-admin-line px-4 py-2 rounded-sm text-sm hover:bg-white">
          Filter
        </button>
      </form>

      <Card>
        <SimpleTable
          rows={quotations ?? []}
          emptyTitle="No quotations found"
          columns={[
            {
              header: "Number",
              cell: (q) => (
                <Link href={`/admin/quotations/${q.id}`} className="font-medium text-admin-ink hover:text-admin-gold">
                  {q.quotation_number}
                </Link>
              ),
            },
            { header: "Customer", cell: (q: any) => q.customers?.full_name ?? "—" },
            { header: "Total", cell: (q) => formatCurrency(q.total, q.currency) },
            { header: "Valid until", cell: (q) => formatDate(q.valid_until) },
            { header: "Status", cell: (q) => <StatusBadge status={q.status} /> },
          ]}
        />
        <Pagination page={page} pageSize={PAGE_SIZE} total={count ?? 0} basePath="/admin/quotations" searchParams={{ q, status }} />
      </Card>
    </div>
  );
}
