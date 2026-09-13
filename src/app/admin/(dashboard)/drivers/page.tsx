import Link from "next/link";
import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { canManageOps } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { SimpleTable } from "@/components/admin/ui/SimpleTable";

export const metadata: Metadata = { title: "Drivers" };

export default async function DriversPage() {
  const profile = await requireUser();
  const supabase = await createClient();
  const { data: drivers } = await supabase
    .from("drivers")
    .select("id, full_name, phone, availability, active, vehicles(name)")
    .is("deleted_at", null)
    .order("full_name");

  return (
    <div>
      <PageHeader
        title="Drivers"
        actions={
          canManageOps(profile.role) ? (
            <Link href="/admin/drivers/new" className="inline-flex items-center gap-1.5 bg-admin-navy text-admin-ivory text-sm font-semibold px-4 py-2 rounded-sm hover:bg-admin-navy-deep">
              <Plus className="h-4 w-4" /> New driver
            </Link>
          ) : undefined
        }
      />
      <Card>
        <SimpleTable
          rows={drivers ?? []}
          emptyTitle="No drivers yet"
          columns={[
            {
              header: "Name",
              cell: (d) => (
                <Link href={`/admin/drivers/${d.id}`} className="font-medium text-admin-ink hover:text-admin-gold">
                  {d.full_name}
                </Link>
              ),
            },
            { header: "Phone", cell: (d) => d.phone ?? "—" },
            { header: "Assigned vehicle", cell: (d: any) => d.vehicles?.name ?? "—" },
            { header: "Availability", cell: (d) => <StatusBadge status={d.availability} /> },
            { header: "Active", cell: (d) => (d.active ? <StatusBadge status="ACTIVE" /> : <StatusBadge status="INACTIVE" />) },
          ]}
        />
      </Card>
    </div>
  );
}
