import Link from "next/link";
import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { canManageCrm } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { Pagination } from "@/components/admin/ui/Pagination";
import { formatDate } from "@/lib/admin/format";

export const metadata: Metadata = { title: "Customers" };

const PAGE_SIZE = 20;

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const profile = await requireUser();
  const { q, page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const from = (page - 1) * PAGE_SIZE;

  const supabase = await createClient();
  let query = supabase
    .from("customers")
    .select("id, full_name, email, phone, company_name, created_at", { count: "exact" })
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (q) {
    query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%,company_name.ilike.%${q}%`);
  }

  const { data: customers, count } = await query;

  return (
    <div>
      <PageHeader
        title="Customers"
        description="Every customer this business has ever quoted, booked, or invoiced."
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/customers/segments"
              className="inline-flex items-center gap-1.5 border border-admin-line text-sm px-4 py-2 rounded-sm hover:bg-white transition-colors"
            >
              Segments
            </Link>
            {canManageCrm(profile.role) ? (
              <Link
                href="/admin/customers/new"
                className="inline-flex items-center gap-1.5 bg-admin-navy text-admin-ivory text-sm font-semibold px-4 py-2 rounded-sm hover:bg-admin-navy-deep transition-colors"
              >
                <Plus className="h-4 w-4" /> New customer
              </Link>
            ) : null}
          </div>
        }
      />

      <form className="mb-4">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search by name, email, phone, or company…"
          className="input-luxe max-w-sm"
        />
      </form>

      <Card>
        {!customers || customers.length === 0 ? (
          <EmptyState title="No customers found" description={q ? "Try a different search." : "Customers appear here once created."} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-admin-stone border-b border-admin-line">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Added</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-line">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-admin-ivory-deep">
                    <td className="px-4 py-3">
                      <Link href={`/admin/customers/${c.id}`} className="font-medium text-admin-ink hover:text-admin-gold">
                        {c.full_name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-admin-stone">{c.company_name ?? "—"}</td>
                    <td className="px-4 py-3 text-admin-stone">{c.email ?? "—"}</td>
                    <td className="px-4 py-3 text-admin-stone">{c.phone ?? "—"}</td>
                    <td className="px-4 py-3 text-admin-stone">{formatDate(c.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination page={page} pageSize={PAGE_SIZE} total={count ?? 0} basePath="/admin/customers" searchParams={{ q }} />
      </Card>
    </div>
  );
}
