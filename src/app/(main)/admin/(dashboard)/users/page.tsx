import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { ADMIN_ONLY, ROLE_LABELS, type UserRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { StatusBadge } from "@/components/admin/ui/Badge";
import { formatDate } from "@/lib/admin/format";
import { setUserActive } from "@/lib/admin/actions/users";
import { RoleSelect } from "@/components/admin/users/RoleSelect";
import { InviteUserForm } from "@/components/admin/users/InviteUserForm";
import { ConfirmButton } from "@/components/admin/ui/ConfirmButton";

export const metadata: Metadata = { title: "Users" };

export default async function UsersPage() {
  const profile = await requireRole(ADMIN_ONLY);
  const supabase = await createClient();
  const { data: users } = await supabase.from("profiles").select("id, full_name, email, role, active, created_at").order("created_at", { ascending: true });

  const isSuperAdmin = profile.role === "SUPER_ADMIN";

  return (
    <div>
      <PageHeader title="Users" description="Admin accounts and access." />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Section title="Team">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-admin-stone border-b border-admin-line">
                    <th className="px-4 py-2.5 font-medium">Name</th>
                    <th className="px-4 py-2.5 font-medium">Email</th>
                    <th className="px-4 py-2.5 font-medium">Role</th>
                    <th className="px-4 py-2.5 font-medium">Status</th>
                    <th className="px-4 py-2.5 font-medium">Since</th>
                    {isSuperAdmin ? <th className="px-4 py-2.5 font-medium" /> : null}
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-line">
                  {(users ?? []).map((u) => (
                    <tr key={u.id}>
                      <td className="px-4 py-2.5 font-medium text-admin-ink">{u.full_name || "—"}</td>
                      <td className="px-4 py-2.5 text-admin-stone">{u.email}</td>
                      <td className="px-4 py-2.5">
                        {isSuperAdmin && u.id !== profile.id ? (
                          <RoleSelect userId={u.id} currentRole={u.role as UserRole} />
                        ) : (
                          ROLE_LABELS[u.role as UserRole]
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={u.active ? "ACTIVE" : "INACTIVE"} />
                      </td>
                      <td className="px-4 py-2.5 text-admin-stone">{formatDate(u.created_at)}</td>
                      {isSuperAdmin ? (
                        <td className="px-4 py-2.5">
                          {u.id !== profile.id ? (
                            <form action={setUserActive.bind(null, u.id, !u.active)}>
                              {u.active ? (
                                <ConfirmButton
                                  confirmMessage={`Deactivate ${u.full_name || u.email}? They'll immediately lose admin access.`}
                                  className="text-xs text-admin-gold hover:underline"
                                >
                                  Deactivate
                                </ConfirmButton>
                              ) : (
                                <button type="submit" className="text-xs text-admin-gold hover:underline">
                                  Activate
                                </button>
                              )}
                            </form>
                          ) : (
                            <span className="text-xs text-admin-stone">You</span>
                          )}
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>

        {isSuperAdmin ? (
          <Section title="Invite user">
            <InviteUserForm />
          </Section>
        ) : null}
      </div>
    </div>
  );
}
