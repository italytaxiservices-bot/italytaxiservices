import Link from "next/link";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { VIEW_FINANCE } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { Pagination } from "@/components/admin/ui/Pagination";
import { SimpleTable } from "@/components/admin/ui/SimpleTable";
import { formatCurrency, formatDate } from "@/lib/admin/format";

export const metadata: Metadata = { title: "Receipts" };

const PAGE_SIZE = 25;

export default async function ReceiptsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await requireRole(VIEW_FINANCE);
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const from = (page - 1) * PAGE_SIZE;

  const supabase = await createClient();
  const { data: receipts, count } = await supabase
    .from("receipts")
    .select("id, receipt_number, amount, method, payment_date, remaining_balance, customers(full_name)", { count: "exact" })
    .order("payment_date", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  return (
    <div>
      <PageHeader title="Receipts" description="Automatically issued whenever a payment is recorded." />
      <Card>
        <SimpleTable
          rows={receipts ?? []}
          emptyTitle="No receipts issued yet"
          columns={[
            {
              header: "Number",
              cell: (r: any) => (
                <Link href={`/admin/receipts/${r.id}`} className="font-medium text-admin-ink hover:text-admin-gold">
                  {r.receipt_number}
                </Link>
              ),
            },
            { header: "Customer", cell: (r: any) => r.customers?.full_name ?? "—" },
            { header: "Date", cell: (r: any) => formatDate(r.payment_date) },
            { header: "Amount", cell: (r: any) => formatCurrency(r.amount) },
            { header: "Remaining balance", cell: (r: any) => formatCurrency(r.remaining_balance) },
          ]}
        />
        <Pagination page={page} pageSize={PAGE_SIZE} total={count ?? 0} basePath="/admin/receipts" />
      </Card>
    </div>
  );
}
