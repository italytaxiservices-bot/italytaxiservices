import { NextResponse, type NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createAdminClient } from "@/lib/supabase/admin";
import { notifyCustomer } from "@/lib/notifications/service";
import { getQuotationPdfDocument } from "@/lib/pdf/quotation";
import { formatCurrency } from "@/lib/admin/format";
import { isoDate } from "@/lib/admin/date-range";

// Intended to be hit by an external scheduler once daily. See
// app/api/cron/overdue-invoices/route.ts for the auth scheme.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
  const today = isoDate(new Date());

  const { data: quotations } = await supabase
    .from("quotations")
    .select("id, quotation_number, total, currency, valid_until, sent_at, customers(full_name, email)")
    .eq("status", "SENT")
    .lte("sent_at", twoDaysAgo)
    .is("deleted_at", null);

  let emailed = 0;
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

  for (const quotation of quotations ?? []) {
    // A reminder for an already-expired quote isn't useful and reads like
    // spam — only nudge while it's still something they could accept.
    if (quotation.valid_until && quotation.valid_until < today) continue;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customer = (quotation as any).customers;
    if (!customer?.email) continue;

    const { data: recentNotification } = await supabase
      .from("notifications")
      .select("id")
      .eq("event_type", "quotation_reminder")
      .eq("related_entity_id", quotation.id)
      .gte("created_at", threeDaysAgo)
      .maybeSingle();
    if (recentNotification) continue;

    // Best-effort PDF re-attachment — a failed render must never block the
    // reminder email itself.
    let attachments: { filename: string; content: Buffer }[] | undefined;
    try {
      const doc = await getQuotationPdfDocument(quotation.id, supabase);
      if (doc) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const buffer = await renderToBuffer(doc.element as any);
        attachments = [{ filename: doc.filename, content: buffer }];
      }
    } catch (err) {
      console.error("quotation reminder PDF attachment failed", err instanceof Error ? err.message : err);
    }

    await notifyCustomer({
      templateKey: "quotation_reminder",
      to: customer.email,
      vars: {
        customer_name: customer.full_name ?? "",
        quotation_number: quotation.quotation_number,
        total: formatCurrency(quotation.total, quotation.currency),
      },
      relatedEntityType: "quotation",
      relatedEntityId: quotation.id,
      attachments,
    });
    emailed++;
  }

  return NextResponse.json({ emailed });
}
