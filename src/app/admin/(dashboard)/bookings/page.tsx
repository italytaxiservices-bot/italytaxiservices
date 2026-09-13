import Link from "next/link";
import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { canManageOps } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { Pagination } from "@/components/admin/ui/Pagination";
import { SimpleTable } from "@/components/admin/ui/SimpleTable";
import { formatCurrency, formatDate, formatTime } from "@/lib/admin/format";

export const metadata: Metadata = { title: "Bookings" };

const PAGE_SIZE = 20;
const STATUSES = ["PENDING", "CONFIRMED", "ASSIGNED", "DRIVER_EN_ROUTE", "PASSENGER_PICKED_UP", "IN_PROGRESS", "COMPLETED", "CANCELLED", "NO_SHOW"] as const;

export default async function BookingsPage({
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
    .from("bookings")
    .select("id, booking_reference, pickup, dropoff, trip_date, trip_time, status, payment_status, total, currency, customers(full_name), drivers(full_name)", { count: "exact" })
    .is("deleted_at", null)
    .order("trip_date", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (status) query = query.eq("status", status);
  if (q) query = query.ilike("booking_reference", `%${q}%`);

  const { data: bookings, count } = await query;

  return (
    <div>
      <PageHeader
        title="Bookings"
        actions={
          canManageOps(profile.role) ? (
            <Link href="/admin/bookings/new" className="inline-flex items-center gap-1.5 bg-admin-navy text-admin-ivory text-sm font-semibold px-4 py-2 rounded-sm hover:bg-admin-navy-deep">
              <Plus className="h-4 w-4" /> New booking
            </Link>
          ) : undefined
        }
      />

      <form className="mb-4 flex flex-wrap gap-2">
        <input type="search" name="q" defaultValue={q} placeholder="Search by booking reference…" className="input-luxe max-w-sm" />
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
          rows={bookings ?? []}
          emptyTitle="No bookings found"
          columns={[
            {
              header: "Reference",
              cell: (b) => (
                <Link href={`/admin/bookings/${b.id}`} className="font-medium text-admin-ink hover:text-admin-gold">
                  {b.booking_reference}
                </Link>
              ),
            },
            { header: "Customer", cell: (b: any) => b.customers?.full_name ?? "—" },
            { header: "Route", cell: (b) => `${b.pickup} → ${b.dropoff}` },
            { header: "Date", cell: (b) => `${formatDate(b.trip_date)} ${formatTime(b.trip_time)}` },
            { header: "Driver", cell: (b: any) => b.drivers?.full_name ?? "Unassigned" },
            { header: "Total", cell: (b) => formatCurrency(b.total, b.currency) },
            { header: "Payment", cell: (b) => <StatusBadge status={b.payment_status} /> },
            { header: "Status", cell: (b) => <StatusBadge status={b.status} /> },
          ]}
        />
        <Pagination page={page} pageSize={PAGE_SIZE} total={count ?? 0} basePath="/admin/bookings" searchParams={{ q, status }} />
      </Card>
    </div>
  );
}
