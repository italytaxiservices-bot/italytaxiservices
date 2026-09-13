"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/dal";

const NoteSchema = z.object({ note: z.string().trim().min(1, "Note can't be empty.") });

export async function addInternalNote(entityType: string, entityId: string, formData: FormData) {
  const profile = await requireUser();
  const parsed = NoteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;

  const supabase = await createClient();
  const { error } = await supabase.from("internal_notes").insert({
    entity_type: entityType,
    entity_id: entityId,
    note: parsed.data.note,
    created_by: profile.id,
  });
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/${entityType}s/${entityId}`);
}
