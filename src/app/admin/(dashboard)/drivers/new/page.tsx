import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_OPS } from "@/lib/auth/roles";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { DriverForm } from "@/components/admin/drivers/DriverForm";
import { createDriver } from "@/lib/admin/actions/drivers";

export const metadata: Metadata = { title: "New driver" };

export default async function NewDriverPage() {
  await requireRole(MANAGE_OPS);
  return (
    <div>
      <PageHeader title="New driver" />
      <Card className="p-6">
        <DriverForm action={createDriver} submitLabel="Create driver" />
      </Card>
    </div>
  );
}
