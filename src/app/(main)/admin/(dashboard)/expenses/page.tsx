import Link from "next/link";
import type { Metadata } from "next";
import { Plus, Trash2 } from "lucide-react";
import { requireRole } from "@/lib/auth/dal";
import { VIEW_FINANCE, canManageFinance, canManageOps } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { Pagination } from "@/components/admin/ui/Pagination";
import { SimpleTable } from "@/components/admin/ui/SimpleTable";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { ConfirmButton } from "@/components/admin/ui/ConfirmButton";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import { deleteExpense, submitExpense, approveExpense, rejectExpense, markExpensePaid } from "@/lib/admin/actions/expenses";

export const metadata: Metadata = { title: "Expenses" };

const PAGE_SIZE = 25;

export default async function ExpensesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const profile = await requireRole(VIEW_FINANCE);
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const from = (page - 1) * PAGE_SIZE;

  const supabase = await createClient();
  const { data: expenses, count } = await supabase
    .from("expenses")
    .select("id, category, amount, currency, expense_date, description, status, bookings(booking_reference), drivers(full_name), vehicles(name)", { count: "exact" })
    .is("deleted_at", null)
    .order("expense_date", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  const canManage = canManageFinance(profile.role);
  const canSubmit = canManageOps(profile.role);

  return (
    <div>
      <PageHeader
        title="Expenses"
        actions={
          <Link href="/admin/expenses/new" className="inline-flex items-center gap-1.5 bg-admin-navy text-admin-ivory text-sm font-semibold px-4 py-2 rounded-sm hover:bg-admin-navy-deep">
            <Plus className="h-4 w-4" /> New expense
          </Link>
        }
      />
      <Card>
        <SimpleTable
          rows={expenses ?? []}
          emptyTitle="No expenses recorded yet"
          columns={[
            { header: "Date", cell: (e: any) => formatDate(e.expense_date) },
            { header: "Category", cell: (e: any) => e.category },
            { header: "Amount", cell: (e: any) => formatCurrency(e.amount, e.currency) },
            { header: "Trip", cell: (e: any) => e.bookings?.booking_reference ?? "—" },
            { header: "Driver / Vehicle", cell: (e: any) => e.drivers?.full_name ?? e.vehicles?.name ?? "—" },
            { header: "Description", cell: (e: any) => e.description ?? "—" },
            { header: "Status", cell: (e: any) => <StatusBadge status={e.status} /> },
            {
              header: "",
              cell: (e: any) => (
                <div className="flex items-center gap-2 justify-end">
                  {canSubmit && e.status === "DRAFT" ? (
                    <form action={submitExpense.bind(null, e.id)}>
                      <button type="submit" className="text-xs border border-admin-line px-2 py-1 rounded-sm hover:bg-admin-ivory-deep">
                        Submit
                      </button>
                    </form>
                  ) : null}
                  {canManage && e.status === "SUBMITTED" ? (
                    <>
                      <form action={approveExpense.bind(null, e.id)}>
                        <button type="submit" className="text-xs border border-emerald-200 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-sm hover:bg-emerald-100">
                          Approve
                        </button>
                      </form>
                      <form action={rejectExpense.bind(null, e.id)} className="flex items-center gap-1">
                        <input name="rejection_reason" placeholder="Reason" required className="input-luxe text-xs py-1 w-24" />
                        <button type="submit" className="text-xs border border-red-200 text-red-700 px-2 py-1 rounded-sm hover:bg-red-50">
                          Reject
                        </button>
                      </form>
                    </>
                  ) : null}
                  {canManage && e.status === "APPROVED" ? (
                    <form action={markExpensePaid.bind(null, e.id)} className="flex items-center gap-1">
                      <input name="payment_reference" placeholder="Ref" required className="input-luxe text-xs py-1 w-20" />
                      <button type="submit" className="text-xs bg-admin-navy text-admin-ivory px-2 py-1 rounded-sm hover:bg-admin-navy-deep">
                        Mark paid
                      </button>
                    </form>
                  ) : null}
                  {canManage && e.status === "DRAFT" ? (
                    <form action={deleteExpense.bind(null, e.id)}>
                      <ConfirmButton confirmMessage="Delete this expense?" className="text-admin-stone hover:text-red-600" aria-label="Delete expense">
                        <Trash2 className="h-4 w-4" />
                      </ConfirmButton>
                    </form>
                  ) : null}
                </div>
              ),
            },
          ]}
        />
        <Pagination page={page} pageSize={PAGE_SIZE} total={count ?? 0} basePath="/admin/expenses" />
      </Card>
    </div>
  );
}
