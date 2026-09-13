import Link from "next/link";
import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { requireRole } from "@/lib/auth/dal";
import { VIEW_FINANCE, canManageFinance } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { Pagination } from "@/components/admin/ui/Pagination";
import { SimpleTable } from "@/components/admin/ui/SimpleTable";
import { formatCurrency, formatDate } from "@/lib/admin/format";

export const metadata: Metadata = { title: "Invoices" };

const PAGE_SIZE = 20;
const STATUSES = ["DRAFT", "SENT", "PARTIALLY_PAID", "PAID", "OVERDUE", "VOID", "REFUNDED"] as const;

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const profile = await requireRole(VIEW_FINANCE);
  const { q, status: rawStatus, page: pageParam } = await searchParams;
  const status = STATUSES.includes(rawStatus as (typeof STATUSES)[number]) ? (rawStatus as (typeof STATUSES)[number]) : undefined;
  const page = Math.max(1, Number(pageParam) || 1);
  const from = (page - 1) * PAGE_SIZE;

  const supabase = await createClient();
  let query = supabase
    .from("invoices")
    .select("id, invoice_number, status, total, amount_paid, balance_due, currency, due_date, customers(full_name)", { count: "exact" })
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (status) query = query.eq("status", status);
  if (q) query = query.ilike("invoice_number", `%${q}%`);

  const { data: invoices, count } = await query;

  return (
    <div>
      <PageHeader
        title="Invoices"
        actions={
          canManageFinance(profile.role) ? (
            <Link href="/admin/invoices/new" className="inline-flex items-center gap-1.5 bg-admin-navy text-admin-ivory text-sm font-semibold px-4 py-2 rounded-sm hover:bg-admin-navy-deep">
              <Plus className="h-4 w-4" /> New invoice
            </Link>
          ) : undefined
        }
      />

      <form className="mb-4 flex flex-wrap gap-2">
        <input type="search" name="q" defaultValue={q} placeholder="Search by invoice number…" className="input-luxe max-w-sm" />
        <select name="status" defaultValue={status ?? ""} className="input-luxe max-w-[180px]">
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replaceAll("_", " ")}
            </option>
          ))}
        </select>
        <button type="submit" className="border border-admin-line px-4 py-2 rounded-sm text-sm hover:bg-white">
          Filter
        </button>
      </form>

      <Card>
        <SimpleTable
          rows={invoices ?? []}
          emptyTitle="No invoices found"
          columns={[
            {
              header: "Number",
              cell: (i) => (
                <Link href={`/admin/invoices/${i.id}`} className="font-medium text-admin-ink hover:text-admin-gold">
                  {i.invoice_number}
                </Link>
              ),
            },
            { header: "Customer", cell: (i: any) => i.customers?.full_name ?? "—" },
            { header: "Due", cell: (i) => formatDate(i.due_date) },
            { header: "Total", cell: (i) => formatCurrency(i.total, i.currency) },
            { header: "Balance", cell: (i) => formatCurrency(i.balance_due, i.currency) },
            { header: "Status", cell: (i) => <StatusBadge status={i.status} /> },
          ]}
        />
        <Pagination page={page} pageSize={PAGE_SIZE} total={count ?? 0} basePath="/admin/invoices" searchParams={{ q, status }} />
      </Card>
    </div>
  );
}
