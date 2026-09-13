import { siteConfig } from "@/lib/siteConfig";

export type EmailTemplateKey =
  | "lead_received"
  | "quotation_sent"
  | "quotation_reminder"
  | "booking_confirmation"
  | "driver_assignment"
  | "invoice_created"
  | "payment_confirmation"
  | "receipt"
  | "upcoming_trip_reminder"
  | "trip_completed"
  | "review_request"
  | "payment_overdue";

export type TemplateVars = Record<string, string>;

// {{variable}} substitution, per the spec's dynamic-variable convention
// (customer_name, booking_reference, pickup, dropoff, date, time, vehicle,
// total, amount_paid, balance_due, ...). Unknown variables are left blank
// rather than leaking the raw "{{token}}" into a sent email. Exported for
// the DB-editable template path (notification_templates table) and the
// template-builder preview to reuse the exact same substitution logic.
export function fill(template: string, vars: TemplateVars): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? "");
}

function wrapHtml(bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f2ede2;font-family:Helvetica,Arial,sans-serif;color:#12161f;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2ede2;padding:32px 0;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;">
<tr><td style="background:#0d1526;padding:20px 32px;">
<span style="color:#faf7f1;font-size:18px;font-weight:600;">${siteConfig.name}</span>
</td></tr>
<tr><td style="padding:32px;">${bodyHtml}</td></tr>
<tr><td style="padding:20px 32px;background:#f2ede2;font-size:11px;color:#6f6a60;">
${siteConfig.name} · ${siteConfig.email}
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function paragraphBlock(lines: string[]): string {
  return lines.map((l) => `<p style="margin:0 0 12px;font-size:14px;line-height:1.6;">${l}</p>`).join("");
}

function ctaButton(label: string, note?: string): string {
  if (!note) return "";
  return `<p style="margin:20px 0 0;font-size:13px;color:#6f6a60;">${label}: ${note}</p>`;
}

type TemplateDef = { subject: (v: TemplateVars) => string; bodyLines: (v: TemplateVars) => string[] };

const TEMPLATES: Record<EmailTemplateKey, TemplateDef> = {
  lead_received: {
    subject: () => `We've received your request — ${siteConfig.name}`,
    bodyLines: (v) => [
      `Dear {{customer_name}},`,
      `Thank you — your request for {{pickup}} → {{dropoff}} on {{date}} at {{time}} has been received.`,
      `A member of our team will review availability and pricing, then get back to you shortly to confirm.`,
    ].map((l) => fill(l, v)),
  },
  quotation_sent: {
    subject: (v) => `Your quotation ${v.quotation_number} from {{company_name}}`.replace("{{company_name}}", siteConfig.name),
    bodyLines: (v) => [
      `Dear {{customer_name}},`,
      `Thank you for your interest — please find your quotation <strong>{{quotation_number}}</strong> for {{pickup}} → {{dropoff}} on {{date}} at {{time}}{{pdf_note}}.`,
      `Total: <strong>{{total}}</strong>. This quotation is valid until {{valid_until}}.`,
      `Reply to this email to confirm.`,
    ].map((l) => fill(l, v)),
  },
  quotation_reminder: {
    subject: () => `Following up on your quotation`,
    bodyLines: (v) => [
      `Dear {{customer_name}},`,
      `Just checking in about quotation <strong>{{quotation_number}}</strong> (total {{total}}) — let us know if you'd like to go ahead or have any questions.`,
    ].map((l) => fill(l, v)),
  },
  booking_confirmation: {
    subject: (v) => `Booking confirmed — ${v.booking_reference}`,
    bodyLines: (v) => [
      `Dear {{customer_name}},`,
      `Your booking <strong>{{booking_reference}}</strong> is confirmed.`,
      `Pickup: {{pickup}}<br/>Drop-off: {{dropoff}}<br/>Date: {{date}} at {{time}}<br/>Vehicle: {{vehicle}}`,
      `Total: <strong>{{total}}</strong>.`,
    ].map((l) => fill(l, v)),
  },
  driver_assignment: {
    subject: (v) => `Your driver is confirmed — ${v.booking_reference}`,
    bodyLines: (v) => [
      `Dear {{customer_name}},`,
      `Your driver for booking <strong>{{booking_reference}}</strong> has been assigned.`,
      `Driver: {{driver_name}}<br/>Vehicle: {{vehicle}}`,
    ].map((l) => fill(l, v)),
  },
  invoice_created: {
    subject: (v) => `Invoice ${v.invoice_number} from ${siteConfig.name}`,
    bodyLines: (v) => [`Dear {{customer_name}},`, `Please find invoice <strong>{{invoice_number}}</strong> for {{total}}, due {{due_date}}{{pdf_note}}.`].map((l) => fill(l, v)),
  },
  payment_confirmation: {
    subject: (v) => `Payment received — ${v.invoice_number}`,
    bodyLines: (v) => [
      `Dear {{customer_name}},`,
      `We've received your payment of <strong>{{amount_paid}}</strong> against invoice {{invoice_number}}.`,
      `Remaining balance: {{balance_due}}.`,
      `Receipt {{receipt_number}} is attached to your account — contact us if you'd like a copy.`,
    ].map((l) => fill(l, v)),
  },
  receipt: {
    subject: (v) => `Receipt ${v.receipt_number}`,
    bodyLines: (v) => [`Dear {{customer_name}},`, `Receipt <strong>{{receipt_number}}</strong> for {{amount_paid}} paid on {{date}}.`].map((l) => fill(l, v)),
  },
  upcoming_trip_reminder: {
    subject: (v) => `Reminder: your trip on ${v.date}`,
    bodyLines: (v) => [
      `Dear {{customer_name}},`,
      `A reminder that your trip <strong>{{booking_reference}}</strong> is coming up on {{date}} at {{time}}.`,
      `Pickup: {{pickup}}<br/>Drop-off: {{dropoff}}`,
    ].map((l) => fill(l, v)),
  },
  trip_completed: {
    subject: () => `Thank you for travelling with us`,
    bodyLines: (v) => [
      `Dear {{customer_name}},`,
      `Thank you for choosing ${siteConfig.name} for your trip {{booking_reference}}. We hope it was a great experience.`,
    ].map((l) => fill(l, v)),
  },
  review_request: {
    subject: () => `How was your trip?`,
    bodyLines: (v) => [
      `Dear {{customer_name}},`,
      `We'd love to hear your feedback on trip {{booking_reference}} — it helps us improve.`,
      `Leave a review in your account: {{review_link}}`,
      `Or on Trustpilot: {{trustpilot_url}}`,
    ].map((l) => fill(l, v)),
  },
  payment_overdue: {
    subject: (v) => `Payment overdue — ${v.invoice_number}`,
    bodyLines: (v) => [
      `Dear {{customer_name}},`,
      `Invoice <strong>{{invoice_number}}</strong> for {{balance_due}} was due on {{due_date}} and remains unpaid. Please arrange payment at your earliest convenience.`,
    ].map((l) => fill(l, v)),
  },
};

export function renderEmail(key: EmailTemplateKey, vars: TemplateVars): { subject: string; html: string; text: string } {
  const def = TEMPLATES[key];
  const subject = def.subject(vars);
  const lines = def.bodyLines(vars);
  const html = wrapHtml(paragraphBlock(lines) + ctaButton("Questions", siteConfig.email));
  const text = lines.map((l) => l.replace(/<[^>]+>/g, "")).join("\n\n");
  return { subject, html, text };
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Same {{var}} substitution as fill(), but HTML-escapes each substituted
 * value (not the surrounding template text) — the template body itself is
 * admin-authored trusted markup, but variable values like customer_name can
 * originate from a customer-controlled field (public booking form, portal
 * profile edit), so they must not be interpolated as raw HTML. */
function fillHtmlSafe(template: string, vars: TemplateVars): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => escapeHtml(vars[key] ?? ""));
}

/**
 * Renders a raw subject/body pair (from notification_templates, or the
 * template-builder preview) through the same {{var}} substitution + HTML
 * envelope as the code-defined templates, so an admin-edited template looks
 * identical in kind to the default ones. Body paragraphs are separated by a
 * blank line, matching how templates are seeded and edited in the builder.
 */
export function renderEmailFromRaw(subjectTemplate: string, bodyTemplate: string, vars: TemplateVars): { subject: string; html: string; text: string } {
  const subject = fill(subjectTemplate, vars);
  const htmlLines = bodyTemplate.split(/\n\n+/).map((l) => fillHtmlSafe(l, vars));
  const textLines = bodyTemplate.split(/\n\n+/).map((l) => fill(l, vars));
  const html = wrapHtml(paragraphBlock(htmlLines) + ctaButton("Questions", siteConfig.email));
  const text = textLines.join("\n\n");
  return { subject, html, text };
}
