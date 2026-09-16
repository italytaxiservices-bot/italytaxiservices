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

export const metadata: Metadata = { title: "Payments" };

const PAGE_SIZE = 25;

export default async function PaymentsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await requireRole(VIEW_FINANCE);
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const from = (page - 1) * PAGE_SIZE;

  const supabase = await createClient();
  const { data: payments, count } = await supabase
    .from("payments")
    .select("id, amount, currency, method, payment_date, reference_number, invoices(id, invoice_number), customers(full_name)", { count: "exact" })
    .is("deleted_at", null)
    .order("payment_date", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  return (
    <div>
      <PageHeader title="Payments" description="Every payment recorded against an invoice." />
      <Card>
        <SimpleTable
          rows={payments ?? []}
          emptyTitle="No payments recorded yet"
          columns={[
            { header: "Date", cell: (p: any) => formatDate(p.payment_date) },
            { header: "Customer", cell: (p: any) => p.customers?.full_name ?? "—" },
            {
              header: "Invoice",
              cell: (p: any) => (p.invoices ? <Link href={`/admin/invoices/${p.invoices.id}`} className="text-admin-ink hover:text-admin-gold">{p.invoices.invoice_number}</Link> : "—"),
            },
            { header: "Amount", cell: (p: any) => formatCurrency(p.amount, p.currency) },
            { header: "Method", cell: (p: any) => p.method.replaceAll("_", " ") },
            { header: "Reference", cell: (p: any) => p.reference_number ?? "—" },
          ]}
        />
        <Pagination page={page} pageSize={PAGE_SIZE} total={count ?? 0} basePath="/admin/payments" />
      </Card>
    </div>
  );
}
