import Link from "next/link";
import type { Metadata } from "next";
import { Download, Trash2 } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { canManageOps } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { SimpleTable } from "@/components/admin/ui/SimpleTable";
import { formatDateTime } from "@/lib/admin/format";
import { deleteDocument } from "@/lib/admin/actions/documents";
import { ConfirmButton } from "@/components/admin/ui/ConfirmButton";

export const metadata: Metadata = { title: "Documents" };

const ENTITY_ROUTES: Record<string, string> = {
  booking: "/admin/bookings",
  quotation: "/admin/quotations",
  invoice: "/admin/invoices",
  receipt: "/admin/receipts",
  driver: "/admin/drivers",
  vehicle: "/admin/vehicles",
  customer: "/admin/customers",
};

export default async function DocumentsPage({ searchParams }: { searchParams: Promise<{ entity_type?: string }> }) {
  const profile = await requireUser();
  const { entity_type } = await searchParams;

  const supabase = await createClient();
  let query = supabase
    .from("documents")
    .select("id, entity_type, entity_id, doc_type, file_name, storage_path, size_bytes, created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  if (entity_type) query = query.eq("entity_type", entity_type);

  const { data: documents } = await query;
  const canDelete = canManageOps(profile.role);

  return (
    <div>
      <PageHeader title="Documents" description="Every quotation, invoice, receipt, driver/vehicle file kept on record." />

      <div className="flex flex-wrap gap-2 mb-4 text-sm">
        <Link href="/admin/documents" className={`px-3 py-1.5 rounded-sm border ${!entity_type ? "border-admin-navy bg-admin-navy text-admin-ivory" : "border-admin-line hover:bg-white"}`}>
          All
        </Link>
        {Object.keys(ENTITY_ROUTES).map((t) => (
          <Link key={t} href={`/admin/documents?entity_type=${t}`} className={`px-3 py-1.5 rounded-sm border capitalize ${entity_type === t ? "border-admin-navy bg-admin-navy text-admin-ivory" : "border-admin-line hover:bg-white"}`}>
            {t}
          </Link>
        ))}
      </div>

      <Card>
        <SimpleTable
          rows={documents ?? []}
          emptyTitle="No documents yet"
          columns={[
            { header: "File", cell: (d: any) => d.file_name },
            { header: "Type", cell: (d: any) => d.doc_type.replaceAll("_", " ") },
            {
              header: "Related to",
              cell: (d: any) =>
                ENTITY_ROUTES[d.entity_type] ? (
                  <Link href={`${ENTITY_ROUTES[d.entity_type]}/${d.entity_id}`} className="text-admin-gold hover:underline capitalize">
                    {d.entity_type}
                  </Link>
                ) : (
                  d.entity_type
                ),
            },
            { header: "Uploaded", cell: (d: any) => formatDateTime(d.created_at) },
            {
              header: "",
              cell: (d: any) => (
                <div className="flex items-center gap-3">
                  <a href={`/admin/documents/${d.id}/download`} target="_blank" className="text-admin-stone hover:text-admin-gold" aria-label="Download">
                    <Download className="h-4 w-4" />
                  </a>
                  {canDelete ? (
                    <form action={deleteDocument.bind(null, d.id, d.storage_path)}>
                      <ConfirmButton confirmMessage={`Delete "${d.file_name}"? This can't be undone.`} className="text-admin-stone hover:text-red-600" aria-label="Delete">
                        <Trash2 className="h-4 w-4" />
                      </ConfirmButton>
                    </form>
                  ) : null}
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
