import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_CRM } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { Pagination } from "@/components/admin/ui/Pagination";
import { formatDateTime } from "@/lib/admin/format";

export const metadata: Metadata = { title: "Communications" };

const PAGE_SIZE = 30;
const STATUSES = ["ALL", "SENT", "FAILED", "PENDING"] as const;
const CHANNELS = ["ALL", "EMAIL", "WHATSAPP", "SYSTEM"] as const;

export default async function CommunicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; channel?: string; q?: string }>;
}) {
  await requireRole(MANAGE_CRM);
  const { page: pageParam, status, channel, q } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const supabase = await createClient();

  let query = supabase.from("notifications").select("*", { count: "exact" }).order("created_at", { ascending: false });
  if (status && STATUSES.includes(status as (typeof STATUSES)[number]) && status !== "ALL") {
    query = query.eq("status", status as Exclude<(typeof STATUSES)[number], "ALL">);
  }
  if (channel && CHANNELS.includes(channel as (typeof CHANNELS)[number]) && channel !== "ALL") {
    query = query.eq("channel", channel as Exclude<(typeof CHANNELS)[number], "ALL">);
  }
  if (q) query = query.ilike("subject", `%${q}%`);

  const { data: notifications, count } = await query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  return (
    <div>
      <PageHeader title="Communications" description="Every notification the system has sent or attempted, with delivery status." />

      <form className="flex flex-wrap gap-2 mb-4" method="get">
        <input name="q" defaultValue={q} placeholder="Search subject…" className="input-luxe max-w-xs" />
        <select name="status" defaultValue={status ?? "ALL"} className="input-luxe w-auto">
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select name="channel" defaultValue={channel ?? "ALL"} className="input-luxe w-auto">
          {CHANNELS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button type="submit" className="text-sm bg-admin-navy text-admin-ivory px-4 py-2 rounded-sm hover:bg-admin-navy-deep">
          Filter
        </button>
      </form>

      {!notifications || notifications.length === 0 ? (
        <EmptyState title="No notifications found" description="Nothing matches these filters yet." />
      ) : (
        <div className="border border-admin-line rounded-sm overflow-hidden bg-white">
          <ul className="divide-y divide-admin-line">
            {notifications.map((n) => (
              <li key={n.id} className="px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-admin-ink truncate">{n.subject || `(${n.event_type})`}</p>
                    <p className="text-xs text-admin-stone mt-0.5">
                      {n.channel} · {n.event_type} · {n.recipient_type}
                      {n.error ? <span className="text-red-700"> · {n.error}</span> : null}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <StatusBadge status={n.status} />
                    <p className="text-xs text-admin-stone mt-1">{formatDateTime(n.sent_at ?? n.created_at)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <Pagination page={page} pageSize={PAGE_SIZE} total={count ?? 0} basePath="/admin/communications" searchParams={{ status, channel, q }} />
      </div>
    </div>
  );
}
