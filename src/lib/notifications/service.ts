import "server-only";

import { sendMail } from "@/lib/mailer";
import { renderEmail, renderEmailFromRaw, type EmailTemplateKey, type TemplateVars } from "@/lib/notifications/templates";
import { createAdminClient } from "@/lib/supabase/admin";
import { siteConfig } from "@/lib/siteConfig";

// Marketing-adjacent sends a customer can opt out of via /my-profile
// (customers.opt_out_marketing). Every other template is a transactional
// business record (booking confirmation, invoice, receipt, ...) and is
// never gated by this preference.
const OPT_OUT_ELIGIBLE: EmailTemplateKey[] = ["quotation_reminder", "review_request"];

/**
 * Sends a templated notification email and records it in `notifications`
 * (status PENDING -> SENT/FAILED) regardless of outcome, so there's always
 * an audit trail of what was attempted. Uses the service-role client because
 * the notifications table intentionally has no client-facing insert policy
 * (see 20260909120900_rls.sql) — this is the one sanctioned write path.
 *
 * Never throws: a failed send is logged, not surfaced to the caller, so a
 * broken mail provider can't block the booking/payment/quotation action
 * that triggered it.
 */
export async function notifyCustomer(params: {
  templateKey: EmailTemplateKey;
  to: string | null | undefined;
  vars: TemplateVars;
  relatedEntityType: string;
  relatedEntityId: string;
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
  bcc?: string;
}) {
  if (!params.to) return;

  const admin = createAdminClient();

  if (OPT_OUT_ELIGIBLE.includes(params.templateKey)) {
    const { data: customer } = await admin.from("customers").select("opt_out_marketing").eq("email", params.to).maybeSingle();
    if (customer?.opt_out_marketing) return;
  }

  const { data: override } = await admin
    .from("notification_templates")
    .select("subject_template, body_template, is_customized")
    .eq("key", params.templateKey)
    .maybeSingle();

  const { subject, html, text } =
    override?.is_customized ? renderEmailFromRaw(override.subject_template, override.body_template, params.vars) : renderEmail(params.templateKey, params.vars);

  const { data: notification } = await admin
    .from("notifications")
    .insert({
      recipient_type: "CUSTOMER",
      event_type: params.templateKey,
      channel: "EMAIL",
      subject,
      body: text,
      status: "PENDING",
      related_entity_type: params.relatedEntityType,
      related_entity_id: params.relatedEntityId,
    })
    .select("id")
    .single();

  const from = process.env.MAIL_FROM_BOOKING || process.env.GMAIL_USER;
  if (!from) {
    if (notification) {
      await admin.from("notifications").update({ status: "FAILED", error: "No sender email configured" }).eq("id", notification.id);
    }
    return;
  }

  try {
    await sendMail({ from: `"${siteConfig.name}" <${from}>`, to: params.to, subject, text, html, attachments: params.attachments, bcc: params.bcc });
    if (notification) {
      await admin.from("notifications").update({ status: "SENT", sent_at: new Date().toISOString() }).eq("id", notification.id);
    }
  } catch (err) {
    if (notification) {
      await admin
        .from("notifications")
        .update({ status: "FAILED", error: err instanceof Error ? err.message : String(err) })
        .eq("id", notification.id);
    }
  }
}
