import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth/dal";
import { VIEW_FINANCE } from "@/lib/auth/roles";
import { getInvoicePdfDocument } from "@/lib/pdf/invoice";
import { pdfResponse } from "@/lib/pdf/render";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireRole(VIEW_FINANCE);
  const { id } = await params;

  const doc = await getInvoicePdfDocument(id);
  if (!doc) notFound();

  return pdfResponse(doc.element, doc.filename);
}
