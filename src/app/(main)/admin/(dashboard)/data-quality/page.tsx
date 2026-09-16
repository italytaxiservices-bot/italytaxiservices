import Link from "next/link";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { ADMIN_ONLY } from "@/lib/auth/roles";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { getDataQualityFindings } from "@/lib/admin/dataQuality";

export const metadata: Metadata = { title: "Data quality" };

const ENTITY_LINKS: Record<string, (id: string) => string> = {
  customers: (id) => `/admin/customers/${id}`,
  bookings: (id) => `/admin/bookings/${id}`,
  payments: () => `/admin/payments`,
  documents: () => `/admin/documents`,
};

export default async function DataQualityPage() {
  await requireRole(ADMIN_ONLY);
  const findings = await getDataQualityFindings();
  const totalIssues = findings.reduce((s, f) => s + f.count, 0);

  return (
    <div>
      <PageHeader
        title="Data quality"
        description={`${totalIssues} finding${totalIssues === 1 ? "" : "s"} across the system. Detection only — nothing here deletes or merges automatically; every fix is a deliberate action taken from the record's own page.`}
      />

      <div className="grid lg:grid-cols-2 gap-4">
        {findings.map((f) => (
          <Section key={f.label} title={`${f.label} (${f.count})`}>
            {f.count === 0 ? (
              <EmptyState title="Clean" />
            ) : (
              <ul className="divide-y divide-admin-line max-h-72 overflow-y-auto">
                {f.rows.map((r) => (
                  <li key={r.id} className="px-4 py-2 text-sm flex justify-between">
                    <Link href={ENTITY_LINKS[f.category]?.(r.id) ?? "#"} className="text-admin-ink hover:underline truncate">
                      {r.label}
                    </Link>
                    {r.detail ? <span className="text-xs text-admin-stone shrink-0 ml-2">{r.detail}</span> : null}
                  </li>
                ))}
              </ul>
            )}
          </Section>
        ))}
      </div>
    </div>
  );
}
