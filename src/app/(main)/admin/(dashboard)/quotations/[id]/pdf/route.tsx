import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth/dal";
import { getQuotationPdfDocument } from "@/lib/pdf/quotation";
import { pdfResponse } from "@/lib/pdf/render";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const { id } = await params;

  const doc = await getQuotationPdfDocument(id);
  if (!doc) notFound();

  return pdfResponse(doc.element, doc.filename);
}
