import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_OPS } from "@/lib/auth/roles";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { VehicleForm } from "@/components/admin/vehicles/VehicleForm";
import { createVehicle } from "@/lib/admin/actions/vehicles";

export const metadata: Metadata = { title: "New vehicle" };

export default async function NewVehiclePage() {
  await requireRole(MANAGE_OPS);
  return (
    <div>
      <PageHeader title="New vehicle" />
      <Card className="p-6">
        <VehicleForm action={createVehicle} submitLabel="Create vehicle" />
      </Card>
    </div>
  );
}
