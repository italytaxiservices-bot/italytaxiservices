import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { EntityPicker } from "@/components/admin/ui/EntityPicker";
import { formatDate } from "@/lib/admin/format";
import { createTask, setTaskStatus } from "@/lib/admin/actions/tasks";

export const metadata: Metadata = { title: "Tasks" };

const STATUSES = ["TODO", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;
const PRIORITY_TONE: Record<string, string> = {
  LOW: "text-admin-stone",
  MEDIUM: "text-admin-ink",
  HIGH: "text-amber-700",
  URGENT: "text-red-700",
};

export default async function TasksPage() {
  const profile = await requireUser();
  const supabase = await createClient();

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*, profiles!tasks_assigned_to_fkey(full_name)")
    .neq("status", "CANCELLED")
    .order("status")
    .order("due_date", { ascending: true, nullsFirst: false })
    .limit(200);

  const mine = (tasks ?? []).filter((t) => t.assigned_to === profile.id);
  const others = (tasks ?? []).filter((t) => t.assigned_to !== profile.id);

  return (
    <div>
      <PageHeader title="Tasks" description="Internal work items, optionally attached to a customer, booking, driver, vehicle, invoice, or quotation." />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Section title={`My tasks (${mine.length})`}>
            <TaskList tasks={mine} />
          </Section>
          <Section title={`Other tasks (${others.length})`}>
            <TaskList tasks={others} />
          </Section>
        </div>

        <div>
          <Section title="New task">
            <form action={createTask} className="p-4 space-y-3">
              <input name="title" placeholder="Title" required className="input-luxe" />
              <textarea name="description" placeholder="Description" rows={2} className="input-luxe" />
              <div>
                <label className="block text-xs text-admin-stone mb-1">Assign to</label>
                <EntityPicker entity="profiles" name="assigned_to" placeholder="Search staff…" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select name="priority" defaultValue="MEDIUM" className="input-luxe">
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
                <input type="date" name="due_date" className="input-luxe" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select name="related_entity_type" defaultValue="" className="input-luxe">
                  <option value="">No linked entity</option>
                  <option value="customer">Customer</option>
                  <option value="booking">Booking</option>
                  <option value="driver">Driver</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="invoice">Invoice</option>
                  <option value="quotation">Quotation</option>
                  <option value="lead">Lead</option>
                </select>
                <input name="related_entity_id" placeholder="Entity ID (optional)" className="input-luxe" />
              </div>
              <button type="submit" className="w-full text-sm bg-admin-navy text-admin-ivory px-3 py-2 rounded-sm hover:bg-admin-navy-deep">
                Add task
              </button>
            </form>
          </Section>
        </div>
      </div>
    </div>
  );
}

function TaskList({ tasks }: { tasks: any[] }) {
  if (tasks.length === 0) return <EmptyState title="Nothing here" />;
  return (
    <ul className="divide-y divide-admin-line">
      {tasks.map((t) => (
        <li key={t.id} className="px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-admin-ink">{t.title}</p>
              {t.description ? <p className="text-xs text-admin-stone mt-0.5">{t.description}</p> : null}
              <p className="text-[11px] text-admin-stone mt-1">
                <span className={PRIORITY_TONE[t.priority]}>{t.priority}</span>
                {t.due_date ? ` · Due ${formatDate(t.due_date)}` : ""}
                {t.profiles?.full_name ? ` · ${t.profiles.full_name}` : ""}
                {t.related_entity_type ? ` · ${t.related_entity_type}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <StatusBadge status={t.status} />
            </div>
          </div>
          <div className="mt-2 flex gap-1.5">
            {STATUSES.filter((s) => s !== t.status).map((s) => (
              <form key={s} action={setTaskStatus.bind(null, t.id, s)}>
                <button type="submit" className="text-xs border border-admin-line px-2 py-1 rounded-sm hover:bg-admin-ivory-deep">
                  {s.replaceAll("_", " ")}
                </button>
              </form>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
