import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_CRM } from "@/lib/auth/roles";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { LeadForm } from "@/components/admin/leads/LeadForm";
import { createLead } from "@/lib/admin/actions/leads";

export const metadata: Metadata = { title: "New lead" };

export default async function NewLeadPage() {
  await requireRole(MANAGE_CRM);

  return (
    <div>
      <PageHeader title="New lead" />
      <Card className="p-6">
        <LeadForm action={createLead} submitLabel="Create lead" />
      </Card>
    </div>
  );
}
