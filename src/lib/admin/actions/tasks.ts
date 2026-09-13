"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/dal";

const TaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  description: z.string().trim().optional().or(z.literal("")),
  assigned_to: z.string().uuid().optional().or(z.literal("")),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  due_date: z.string().trim().optional().or(z.literal("")),
  related_entity_type: z.enum(["lead", "customer", "booking", "driver", "vehicle", "invoice", "quotation"]).optional().or(z.literal("")),
  related_entity_id: z.string().uuid().optional().or(z.literal("")),
});

function toNullable(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

export async function createTask(formData: FormData): Promise<void> {
  const profile = await requireUser();
  const parsed = TaskSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/tasks?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { error } = await supabase.from("tasks").insert({
    title: parsed.data.title,
    description: toNullable(parsed.data.description),
    assigned_to: toNullable(parsed.data.assigned_to),
    priority: parsed.data.priority,
    due_date: toNullable(parsed.data.due_date),
    related_entity_type: toNullable(parsed.data.related_entity_type),
    related_entity_id: toNullable(parsed.data.related_entity_id),
    created_by: profile.id,
  });
  if (error) redirect(`/admin/tasks?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/admin/tasks");
  redirect("/admin/tasks?success=Task+created");
}

export async function setTaskStatus(id: string, status: "TODO" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED") {
  await requireUser();
  const supabase = await createClient();
  const { error } = await supabase.from("tasks").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/tasks");
}
