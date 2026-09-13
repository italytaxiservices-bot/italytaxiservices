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

export const metadata: Metadata = { title: "Vehicles" };

export default async function VehiclesPage() {
  const profile = await requireUser();
  const supabase = await createClient();
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("id, name, category, seats, registration_number, status")
    .is("deleted_at", null)
    .order("name");

  return (
    <div>
      <PageHeader
        title="Vehicles"
        actions={
          canManageOps(profile.role) ? (
            <Link href="/admin/vehicles/new" className="inline-flex items-center gap-1.5 bg-admin-navy text-admin-ivory text-sm font-semibold px-4 py-2 rounded-sm hover:bg-admin-navy-deep">
              <Plus className="h-4 w-4" /> New vehicle
            </Link>
          ) : undefined
        }
      />
      <Card>
        <SimpleTable
          rows={vehicles ?? []}
          emptyTitle="No vehicles yet"
          columns={[
            {
              header: "Name",
              cell: (v) => (
                <Link href={`/admin/vehicles/${v.id}`} className="font-medium text-admin-ink hover:text-admin-gold">
                  {v.name}
                </Link>
              ),
            },
            { header: "Category", cell: (v) => v.category },
            { header: "Seats", cell: (v) => v.seats ?? "—" },
            { header: "Registration", cell: (v) => v.registration_number ?? "—" },
            { header: "Status", cell: (v) => <StatusBadge status={v.status} /> },
          ]}
        />
      </Card>
    </div>
  );
}
