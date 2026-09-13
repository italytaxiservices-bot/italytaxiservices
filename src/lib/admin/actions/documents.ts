"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole, requireUser } from "@/lib/auth/dal";

export type FormState = { error?: string } | undefined;

const UploadSchema = z.object({
  entity_type: z.string().trim().min(1),
  entity_id: z.string().uuid(),
  doc_type: z.enum(["QUOTATION", "INVOICE", "RECEIPT", "BOOKING_CONFIRMATION", "DRIVER_DOCUMENT", "VEHICLE_DOCUMENT", "OTHER"]),
  document_subtype: z.string().trim().optional().or(z.literal("")),
  expiry_date: z.string().trim().optional().or(z.literal("")),
});

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

export async function uploadDocument(_prevState: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireRole(["SUPER_ADMIN", "ADMIN", "OPERATIONS", "FINANCE"]);
  const parsed = UploadSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose a file to upload." };

  const supabase = await createClient();
  const storagePath = `${parsed.data.entity_type}/${parsed.data.entity_id}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage.from("documents").upload(storagePath, file, {
    contentType: file.type || "application/octet-stream",
  });
  if (uploadError) return { error: uploadError.message };

  const { error } = await supabase.from("documents").insert({
    entity_type: parsed.data.entity_type,
    entity_id: parsed.data.entity_id,
    doc_type: parsed.data.doc_type,
    document_subtype: toNullable(parsed.data.document_subtype),
    expiry_date: toNullable(parsed.data.expiry_date),
    file_name: file.name,
    storage_path: storagePath,
    mime_type: file.type || null,
    size_bytes: file.size,
    uploaded_by: profile.id,
  });
  if (error) return { error: error.message };

  revalidatePath("/admin/documents");
  return undefined;
}

export async function getDocumentDownloadUrl(storagePath: string) {
  await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from("documents").createSignedUrl(storagePath, 60);
  if (error || !data) throw new Error(error?.message ?? "Could not generate download link.");
  return data.signedUrl;
}

export async function deleteDocument(id: string, storagePath: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"]);
  const supabase = await createClient();
  await supabase.storage.from("documents").remove([storagePath]);
  const { error } = await supabase.from("documents").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/documents");
}
