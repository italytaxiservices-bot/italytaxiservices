import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { getDocumentDownloadUrl } from "@/lib/admin/actions/documents";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const { id } = await params;
  const supabase = await createClient();

  const { data: doc } = await supabase.from("documents").select("storage_path").eq("id", id).maybeSingle();
  if (!doc) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  const url = await getDocumentDownloadUrl(doc.storage_path);
  return NextResponse.redirect(url);
}
