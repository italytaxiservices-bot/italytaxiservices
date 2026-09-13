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

export const metadata: Metadata = { title: "Leads" };

const PAGE_SIZE = 20;
const STATUSES = ["NEW", "CONTACTED", "QUOTED", "NEGOTIATING", "WON", "LOST"] as const;

export default async function LeadsPage({
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
    .from("leads")
    .select("id, lead_number, full_name, phone, email, source, status, estimated_value, currency, next_follow_up_at, created_at", { count: "exact" })
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (status) query = query.eq("status", status);
  if (q) query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%,lead_number.ilike.%${q}%`);

  const { data: leads, count } = await query;

  return (
    <div>
      <PageHeader
        title="Leads"
        description="Enquiries that haven't become a confirmed booking yet."
        actions={
          canManageCrm(profile.role) ? (
            <Link href="/admin/leads/new" className="inline-flex items-center gap-1.5 bg-admin-navy text-admin-ivory text-sm font-semibold px-4 py-2 rounded-sm hover:bg-admin-navy-deep">
              <Plus className="h-4 w-4" /> New lead
            </Link>
          ) : undefined
        }
      />

      <form className="mb-4 flex flex-wrap gap-2">
        <input type="search" name="q" defaultValue={q} placeholder="Search leads…" className="input-luxe max-w-sm" />
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
          rows={leads ?? []}
          emptyTitle="No leads found"
          columns={[
            {
              header: "Lead",
              cell: (l) => (
                <Link href={`/admin/leads/${l.id}`} className="font-medium text-admin-ink hover:text-admin-gold">
                  {l.full_name}
                </Link>
              ),
            },
            { header: "Contact", cell: (l) => l.phone ?? l.email ?? "—" },
            { header: "Source", cell: (l) => l.source },
            { header: "Est. value", cell: (l) => (l.estimated_value ? formatCurrency(l.estimated_value, l.currency) : "—") },
            { header: "Next follow-up", cell: (l) => (l.next_follow_up_at ? formatDate(l.next_follow_up_at) : "—") },
            { header: "Status", cell: (l) => <StatusBadge status={l.status} /> },
          ]}
        />
        <Pagination page={page} pageSize={PAGE_SIZE} total={count ?? 0} basePath="/admin/leads" searchParams={{ q, status }} />
      </Card>
    </div>
  );
}
