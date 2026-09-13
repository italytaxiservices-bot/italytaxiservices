import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_CRM } from "@/lib/auth/roles";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { CustomerForm } from "@/components/admin/customers/CustomerForm";
import { createCustomer } from "@/lib/admin/actions/customers";

export const metadata: Metadata = { title: "New customer" };

export default async function NewCustomerPage() {
  await requireRole(MANAGE_CRM);

  return (
    <div>
      <PageHeader title="New customer" />
      <Card className="p-6">
        <CustomerForm action={createCustomer} submitLabel="Create customer" />
      </Card>
    </div>
  );
}
