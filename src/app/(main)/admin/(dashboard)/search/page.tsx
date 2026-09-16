import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { EmptyState } from "@/components/admin/ui/EmptyState";

export const metadata: Metadata = { title: "Search" };

type Result = { label: string; sublabel?: string; href: string };
type Category = { type: string; results: Result[] };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  await requireUser();
  const { q } = await searchParams;
  const query = q?.trim();

  let categories: Category[] = [];
  let totalCount = 0;

  if (query) {
    const supabase = await createClient();
    const like = `%${query}%`;

    // Each query runs under the signed-in user's own session, so RLS already
    // scopes results to what that role can see (e.g. a DISPATCHER's invoice
    // search returns nothing rather than leaking financial data) — no
    // separate role check needed here.
    const [customers, bookings, quotations, invoices, receipts, drivers, vehicles] = await Promise.all([
      supabase.from("customers").select("id, full_name, phone, email").or(`full_name.ilike.${like},phone.ilike.${like},email.ilike.${like}`).limit(8),
      supabase.from("bookings").select("id, booking_reference, pickup, dropoff").ilike("booking_reference", like).limit(8),
      supabase.from("quotations").select("id, quotation_number").ilike("quotation_number", like).limit(8),
      supabase.from("invoices").select("id, invoice_number").ilike("invoice_number", like).limit(8),
      supabase.from("receipts").select("id, receipt_number").ilike("receipt_number", like).limit(8),
      supabase.from("drivers").select("id, full_name, phone").or(`full_name.ilike.${like},phone.ilike.${like}`).limit(8),
      supabase.from("vehicles").select("id, name, registration_number").or(`name.ilike.${like},registration_number.ilike.${like}`).limit(8),
    ]);

    categories = [
      { type: "Customers", results: (customers.data ?? []).map((c) => ({ label: c.full_name, sublabel: c.phone ?? c.email ?? undefined, href: `/admin/customers/${c.id}` })) },
      { type: "Bookings", results: (bookings.data ?? []).map((b) => ({ label: b.booking_reference, sublabel: `${b.pickup} → ${b.dropoff}`, href: `/admin/bookings/${b.id}` })) },
      { type: "Quotations", results: (quotations.data ?? []).map((qt) => ({ label: qt.quotation_number, href: `/admin/quotations/${qt.id}` })) },
      { type: "Invoices", results: (invoices.data ?? []).map((i) => ({ label: i.invoice_number, href: `/admin/invoices/${i.id}` })) },
      { type: "Receipts", results: (receipts.data ?? []).map((r) => ({ label: r.receipt_number, href: `/admin/receipts/${r.id}` })) },
      { type: "Drivers", results: (drivers.data ?? []).map((d) => ({ label: d.full_name, sublabel: d.phone ?? undefined, href: `/admin/drivers/${d.id}` })) },
      { type: "Vehicles", results: (vehicles.data ?? []).map((v) => ({ label: v.name, sublabel: v.registration_number ?? undefined, href: `/admin/vehicles/${v.id}` })) },
    ].filter((c) => c.results.length > 0);
    totalCount = categories.reduce((sum, c) => sum + c.results.length, 0);
  }

  return (
    <div>
      <PageHeader title="Search" description={query ? `${totalCount} result${totalCount === 1 ? "" : "s"} for "${query}"` : "Enter a search term"} />
      {!query ? (
        <Card>
          <EmptyState title="Type a booking reference, customer, invoice, quotation, driver, or vehicle" />
        </Card>
      ) : categories.length === 0 ? (
        <Card>
          <EmptyState title="No matches found" />
        </Card>
      ) : (
        <div className="space-y-4">
          {categories.map((cat) => (
            <Card key={cat.type}>
              <div className="px-4 py-2.5 border-b border-admin-line text-xs font-semibold uppercase tracking-wide text-admin-stone">
                {cat.type} ({cat.results.length})
              </div>
              <ul className="divide-y divide-admin-line">
                {cat.results.map((r, i) => (
                  <li key={i}>
                    <Link href={r.href} className="flex items-center justify-between px-4 py-3 hover:bg-admin-ivory-deep">
                      <div>
                        <p className="text-sm font-medium text-admin-ink">{r.label}</p>
                        {r.sublabel ? <p className="text-xs text-admin-stone">{r.sublabel}</p> : null}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
