import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { ExpenseForm } from "@/components/admin/expenses/ExpenseForm";
import type { UserRole } from "@/lib/auth/roles";

export const metadata: Metadata = { title: "New expense" };

const CREATORS: UserRole[] = ["SUPER_ADMIN", "ADMIN", "FINANCE", "OPERATIONS"];

export default async function NewExpensePage() {
  await requireRole(CREATORS);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <PageHeader title="New expense" />
      <Card className="p-6">
        <ExpenseForm today={today} />
      </Card>
    </div>
  );
}
