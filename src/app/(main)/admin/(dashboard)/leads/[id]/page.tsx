import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/dal";
import { canManageCrm } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { LeadForm } from "@/components/admin/leads/LeadForm";
import { formatDateTime } from "@/lib/admin/format";
import {
  updateLead,
  setLeadStatus,
  assignLead,
  scheduleLeadFollowUp,
  convertLeadToCustomerAction,
  convertLeadToQuotation,
  convertLeadToBooking,
} from "@/lib/admin/actions/leads";

export const metadata: Metadata = { title: "Lead" };

const STATUSES = ["NEW", "CONTACTED", "QUOTED", "NEGOTIATING", "WON", "LOST"] as const;

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await requireUser();
  const supabase = await createClient();

  const { data: lead } = await supabase.from("leads").select("*, customers(id, full_name)").eq("id", id).maybeSingle();
  if (!lead) notFound();

  const [{ data: staff }, { data: history }] = await Promise.all([
    supabase.from("profiles").select("id, full_name, email").eq("active", true).order("full_name"),
    supabase
      .from("lead_status_history")
      .select("id, from_status, to_status, changed_at")
      .eq("lead_id", id)
      .order("changed_at", { ascending: false }),
  ]);

  const canEdit = canManageCrm(profile.role);

  return (
    <div>
      <PageHeader
        title={lead.full_name}
        description={lead.lead_number}
        actions={<StatusBadge status={lead.status} />}
      />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Section title="Lead details">
            <div className="p-4">
              <LeadForm action={updateLead.bind(null, id)} lead={lead} submitLabel="Save changes" />
            </div>
          </Section>

          <Section title="Status history">
            <ul className="divide-y divide-admin-line">
              {(history ?? []).length === 0 ? (
                <li className="px-4 py-3 text-sm text-admin-stone">No history yet.</li>
              ) : (
                history!.map((h) => (
                  <li key={h.id} className="px-4 py-3 text-sm flex items-center justify-between">
                    <span>
                      {h.from_status ? `${h.from_status} → ${h.to_status}` : `Created as ${h.to_status}`}
                    </span>
                    <span className="text-xs text-admin-stone">{formatDateTime(h.changed_at)}</span>
                  </li>
                ))
              )}
            </ul>
          </Section>
        </div>

        <div className="space-y-4">
          {canEdit ? (
            <Section title="Pipeline">
              <div className="p-4 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {STATUSES.map((s) => (
                    <form key={s} action={setLeadStatus.bind(null, id, s)}>
                      <button
                        type="submit"
                        disabled={lead.status === s}
                        className={`text-xs px-2.5 py-1.5 rounded-sm border ${
                          lead.status === s ? "border-admin-navy bg-admin-navy text-admin-ivory" : "border-admin-line hover:bg-admin-ivory-deep"
                        }`}
                      >
                        {s}
                      </button>
                    </form>
                  ))}
                </div>

                <form action={assignLead.bind(null, id)} className="flex gap-2 pt-2 border-t border-admin-line">
                  <select name="assignedTo" defaultValue={lead.assigned_to ?? ""} className="input-luxe flex-1">
                    <option value="">Unassigned</option>
                    {(staff ?? []).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.full_name || s.email}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="border border-admin-line px-3 py-2 rounded-sm text-sm hover:bg-admin-ivory-deep">
                    Assign
                  </button>
                </form>
              </div>
            </Section>
          ) : null}

          {canEdit ? (
            <Section title="Convert">
              <div className="p-4 space-y-2">
                {lead.customer_id ? (
                  <Link href={`/admin/customers/${lead.customer_id}`} className="block text-sm text-admin-gold hover:underline">
                    View linked customer →
                  </Link>
                ) : (
                  <form action={convertLeadToCustomerAction.bind(null, id)}>
                    <button type="submit" className="w-full text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-admin-ivory-deep">
                      Convert to customer
                    </button>
                  </form>
                )}
                <form action={convertLeadToQuotation.bind(null, id)}>
                  <button type="submit" className="w-full text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-admin-ivory-deep">
                    Create quotation
                  </button>
                </form>
                <form action={convertLeadToBooking.bind(null, id)}>
                  <button type="submit" className="w-full text-sm bg-admin-navy text-admin-ivory px-3 py-2 rounded-sm hover:bg-admin-navy-deep">
                    Convert to booking
                  </button>
                </form>
              </div>
            </Section>
          ) : null}

          {canEdit ? (
            <Section title="Schedule follow-up">
              <form action={scheduleLeadFollowUp.bind(null, id)} className="p-4 space-y-3">
                <input type="date" name="due_date" required className="input-luxe" />
                <textarea name="notes" placeholder="Notes" rows={2} className="input-luxe" />
                <button type="submit" className="w-full text-sm border border-admin-line px-3 py-2 rounded-sm hover:bg-admin-ivory-deep">
                  Schedule
                </button>
              </form>
            </Section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
