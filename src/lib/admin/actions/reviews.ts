"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_CRM } from "@/lib/auth/roles";

const StaffReviewSchema = z.object({
  customer_id: z.string().uuid("Select a customer."),
  booking_id: z.string().uuid().optional().or(z.literal("")),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().optional().or(z.literal("")),
  source: z.enum(["STAFF_ENTERED", "GOOGLE", "OTHER"]),
});

export async function createStaffReview(formData: FormData): Promise<void> {
  const profile = await requireRole(MANAGE_CRM);
  const parsed = StaffReviewSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/reviews?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);

  const supabase = await createClient();
  const { error } = await supabase.from("reviews").insert({
    customer_id: parsed.data.customer_id,
    booking_id: parsed.data.booking_id || null,
    rating: parsed.data.rating,
    comment: parsed.data.comment || null,
    source: parsed.data.source,
    created_by: profile.id,
  });
  if (error) {
    const message = error.message.includes("unique") ? "This booking already has a review." : error.message;
    redirect(`/admin/reviews?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/reviews");
  redirect("/admin/reviews?success=Review+added");
}

export async function setReviewPublished(id: string, formData: FormData) {
  await requireRole(MANAGE_CRM);
  const isPublished = formData.get("is_published") === "1";

  const supabase = await createClient();
  const { error } = await supabase.from("reviews").update({ is_published: isPublished }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/reviews");
}
