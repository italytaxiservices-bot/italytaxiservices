import Link from "next/link";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { ADMIN_ONLY, ROLE_LABELS } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { SettingsForm } from "@/components/admin/settings/SettingsForm";

export const metadata: Metadata = { title: "Settings" };

const PERMISSION_MATRIX: [string, string][] = [
  ["SUPER_ADMIN", "Full access to every module, including user management and role changes."],
  ["ADMIN", "Full access to every module except elevating other users' roles."],
  ["OPERATIONS", "Manages leads, customers, quotations, bookings, dispatch, drivers, vehicles. Read-only on finance."],
  ["FINANCE", "Manages invoices, payments, receipts, expenses. Read-only on CRM/operations."],
  ["DISPATCHER", "Manages bookings, dispatch, drivers, vehicles. No access to financial modules."],
  ["VIEWER", "Read-only across every module."],
];

export default async function SettingsPage() {
  await requireRole(ADMIN_ONLY);
  const supabase = await createClient();
  const { data: settings } = await supabase.from("company_settings").select("*").limit(1).single();

  return (
    <div>
      <PageHeader title="Settings" description="Company details, document numbering, and access control." />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Section title="Company &amp; documents">
            <div className="p-4">{settings ? <SettingsForm settings={settings} /> : null}</div>
          </Section>
        </div>

        <div className="space-y-4">
          <Section title="Users &amp; roles">
            <div className="p-4 space-y-3">
              <p className="text-sm text-admin-stone">Manage admin accounts, roles, and activation.</p>
              <Link href="/admin/users" className="inline-block text-sm bg-admin-navy text-admin-ivory px-3 py-2 rounded-sm hover:bg-admin-navy-deep">
                Manage users
              </Link>
              <Link href="/admin/activity" className="block text-sm text-admin-gold hover:underline">
                View activity log →
              </Link>
              <Link href="/admin/settings/pricing" className="block text-sm text-admin-gold hover:underline">
                Manage pricing engine →
              </Link>
              <Link href="/admin/settings/templates" className="block text-sm text-admin-gold hover:underline">
                Edit notification templates →
              </Link>
              <div className="pt-2 border-t border-admin-line space-y-2">
                {PERMISSION_MATRIX.map(([role, desc]) => (
                  <div key={role} className="text-xs">
                    <p className="font-semibold text-admin-ink">{ROLE_LABELS[role as keyof typeof ROLE_LABELS]}</p>
                    <p className="text-admin-stone">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Notifications &amp; email">
            <div className="p-4 text-sm text-admin-stone space-y-2">
              <p>
                Transactional email currently sends through the Gmail/Nodemailer account already configured for the public
                booking form (<code>GMAIL_USER</code>, <code>GMAIL_APP_PASSWORD</code>).
              </p>
              <p>
                To switch to Resend, set <code>RESEND_API_KEY</code> and update <code>lib/notifications/mailer.ts</code> — the
                notification service is provider-agnostic.
              </p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
