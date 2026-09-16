import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { Section } from "@/components/admin/ui/Section";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { SimpleTable } from "@/components/admin/ui/SimpleTable";
import { ScheduleFollowUpForm } from "@/components/admin/follow-ups/ScheduleFollowUpForm";
import { formatDate } from "@/lib/admin/format";
import { completeFollowUp, cancelFollowUp } from "@/lib/admin/actions/follow-ups";

export const metadata: Metadata = { title: "Follow-ups" };

const FOLLOW_UP_STATUSES = ["PENDING", "COMPLETED", "CANCELLED"] as const;

export default async function FollowUpsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireUser();
  const { status } = await searchParams;
  const activeStatus = FOLLOW_UP_STATUSES.includes(status as (typeof FOLLOW_UP_STATUSES)[number])
    ? (status as (typeof FOLLOW_UP_STATUSES)[number])
    : "PENDING";

  const supabase = await createClient();
  const { data: followUps } = await supabase
    .from("follow_ups")
    .select("id, type, status, due_date, notes, customers(full_name), leads(full_name), bookings(booking_reference), invoices(invoice_number), quotations(quotation_number)")
    .eq("status", activeStatus)
    .order("due_date", { ascending: true })
    .limit(100);

  return (
    <div>
      <PageHeader title="Follow-ups" description="CRM tasks — some created automatically, some scheduled manually." />

      <div className="flex gap-2 mb-4 text-sm">
        {["PENDING", "COMPLETED", "CANCELLED"].map((s) => (
          <Link key={s} href={`/admin/follow-ups?status=${s}`} className={`px-3 py-1.5 rounded-sm border ${activeStatus === s ? "border-admin-navy bg-admin-navy text-admin-ivory" : "border-admin-line hover:bg-white"}`}>
            {s}
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card>
            <SimpleTable
              rows={followUps ?? []}
              emptyTitle="Nothing here"
              columns={[
                { header: "Type", cell: (f: any) => f.type.replaceAll("_", " ") },
                {
                  header: "Related to",
                  cell: (f: any) =>
                    f.customers?.full_name ?? f.leads?.full_name ?? f.bookings?.booking_reference ?? f.invoices?.invoice_number ?? f.quotations?.quotation_number ?? "—",
                },
                { header: "Due", cell: (f: any) => formatDate(f.due_date) },
                { header: "Notes", cell: (f: any) => f.notes ?? "—" },
                { header: "Status", cell: (f: any) => <StatusBadge status={f.status} /> },
                ...(activeStatus === "PENDING"
                  ? [
                      {
                        header: "",
                        cell: (f: any) => (
                          <div className="flex gap-2">
                            <form action={completeFollowUp.bind(null, f.id)}>
                              <button type="submit" className="text-emerald-700 hover:text-emerald-900" aria-label="Complete">
                                <Check className="h-4 w-4" />
                              </button>
                            </form>
                            <form action={cancelFollowUp.bind(null, f.id)}>
                              <button type="submit" className="text-admin-stone hover:text-red-600" aria-label="Cancel">
                                <X className="h-4 w-4" />
                              </button>
                            </form>
                          </div>
                        ),
                      },
                    ]
                  : []),
              ]}
            />
          </Card>
        </div>

        <Section title="Schedule follow-up">
          <ScheduleFollowUpForm />
        </Section>
      </div>
    </div>
  );
}
