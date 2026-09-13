import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { ADMIN_ONLY } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { TemplateEditor } from "@/components/admin/settings/TemplateEditor";

export const metadata: Metadata = { title: "Notification templates" };

export default async function NotificationTemplatesPage() {
  await requireRole(ADMIN_ONLY);
  const supabase = await createClient();
  const { data: templates } = await supabase.from("notification_templates").select("*").order("label");

  return (
    <div>
      <PageHeader
        title="Notification templates"
        description="Edit the wording of every automated email. Unedited templates use the built-in default — nothing here can break a send if a field is left blank, since a customized template still requires subject + body to save."
      />
      <div className="space-y-2">{(templates ?? []).map((t) => <TemplateEditor key={t.key} template={t} />)}</div>
    </div>
  );
}
