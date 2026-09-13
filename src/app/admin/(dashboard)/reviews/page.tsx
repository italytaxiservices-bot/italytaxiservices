import type { Metadata } from "next";
import { Star } from "lucide-react";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_CRM } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { StatCard } from "@/components/admin/ui/Card";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { EntityPicker } from "@/components/admin/ui/EntityPicker";
import { formatDate } from "@/lib/admin/format";
import { createStaffReview, setReviewPublished } from "@/lib/admin/actions/reviews";

export const metadata: Metadata = { title: "Reviews" };

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex text-amber-500">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="h-3.5 w-3.5" fill={i < rating ? "currentColor" : "none"} />
      ))}
    </span>
  );
}

export default async function ReviewsPage() {
  await requireRole(MANAGE_CRM);
  const supabase = await createClient();

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*, customers(full_name), bookings(booking_reference)")
    .order("created_at", { ascending: false });

  const avg = reviews && reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const published = reviews?.filter((r) => r.is_published).length ?? 0;

  return (
    <div>
      <PageHeader title="Reviews" description="Customer feedback — submitted through the portal, or logged by staff from a phone call, email, or Google review. Every entry records its real source." />

      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <StatCard label="Average rating" value={reviews && reviews.length > 0 ? avg.toFixed(1) : "—"} hint={`${reviews?.length ?? 0} total`} />
        <StatCard label="Published" value={published} hint="Visible on the public site" />
        <StatCard label="Awaiting moderation" value={(reviews?.length ?? 0) - published} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Section title="All reviews">
            {!reviews || reviews.length === 0 ? (
              <EmptyState title="No reviews yet" description="Reviews submitted by customers or logged by staff will appear here." />
            ) : (
              <ul className="divide-y divide-admin-line">
                {reviews.map((r) => (
                  <li key={r.id} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Stars rating={r.rating} />
                          <span className="text-xs text-admin-stone">{r.source.replaceAll("_", " ")}</span>
                        </div>
                        <p className="text-sm text-admin-ink mt-1">{r.comment ?? <span className="text-admin-stone italic">No comment</span>}</p>
                        <p className="text-xs text-admin-stone mt-1">
                          {(r as any).customers?.full_name ?? "Unknown customer"}
                          {(r as any).bookings?.booking_reference ? ` · ${(r as any).bookings.booking_reference}` : ""} · {formatDate(r.created_at)}
                        </p>
                      </div>
                      <form action={setReviewPublished.bind(null, r.id)}>
                        <input type="hidden" name="is_published" value={r.is_published ? "0" : "1"} />
                        <button
                          type="submit"
                          className={`text-xs px-2.5 py-1 rounded-full border shrink-0 ${
                            r.is_published ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-admin-line text-admin-stone"
                          }`}
                        >
                          {r.is_published ? "Published" : "Publish"}
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </div>

        <div>
          <Section title="Log a review">
            <form action={createStaffReview} className="p-4 space-y-3">
              <div>
                <label className="block text-xs text-admin-stone mb-1">Customer</label>
                <EntityPicker entity="customers" name="customer_id" placeholder="Search customers…" required />
              </div>
              <div>
                <label className="block text-xs text-admin-stone mb-1">Booking (optional)</label>
                <EntityPicker entity="bookings" name="booking_id" placeholder="Search bookings…" />
              </div>
              <div>
                <label className="block text-xs text-admin-stone mb-1">Rating</label>
                <select name="rating" className="input-luxe" required defaultValue="5">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} star{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-admin-stone mb-1">Comment</label>
                <textarea name="comment" rows={3} className="input-luxe" placeholder="What the customer actually said" />
              </div>
              <div>
                <label className="block text-xs text-admin-stone mb-1">Source</label>
                <select name="source" className="input-luxe" required defaultValue="STAFF_ENTERED">
                  <option value="STAFF_ENTERED">Staff entered (phone/email)</option>
                  <option value="GOOGLE">Google review</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <button type="submit" className="w-full text-sm bg-admin-navy text-admin-ivory px-3 py-2 rounded-sm hover:bg-admin-navy-deep">
                Add review
              </button>
            </form>
          </Section>
        </div>
      </div>
    </div>
  );
}
