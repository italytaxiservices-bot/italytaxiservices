"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireRole, requireUser } from "@/lib/auth/dal";
import { USER_ROLES, type UserRole } from "@/lib/auth/roles";
import { siteConfig } from "@/lib/siteConfig";

export type FormState = { error?: string; success?: boolean } | undefined;

async function getBaseUrl() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  return host ? `${proto}://${host}` : siteConfig.domain;
}

const InviteSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  full_name: z.string().trim().min(1, "Name is required."),
  role: z.enum(USER_ROLES),
});

/** SUPER_ADMIN only: creates a Supabase Auth user (email invite) and activates their profile with the chosen role. */
export async function inviteUser(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireRole(["SUPER_ADMIN"]);
  const parsed = InviteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const admin = createAdminClient();
  const baseUrl = await getBaseUrl();

  const { data, error } = await admin.auth.admin.inviteUserByEmail(parsed.data.email, {
    data: { full_name: parsed.data.full_name },
    redirectTo: `${baseUrl}/admin/auth/confirm?next=/admin/reset-password`,
  });
  if (error || !data.user) {
    return { error: error?.message ?? "Could not invite user." };
  }

  // handle_new_auth_user already created a VIEWER/inactive profile row in
  // the same transaction as the auth.users insert above — this activates it
  // with the role chosen here. Uses the admin client because the
  // protect_profile_privileges trigger only exempts service-role writes.
  const { error: profileError } = await admin
    .from("profiles")
    .update({ full_name: parsed.data.full_name, role: parsed.data.role, active: true })
    .eq("id", data.user.id);
  if (profileError) return { error: profileError.message };

  // Via the session-bound client, not `admin` — log_activity() reads
  // auth.uid() from the caller's JWT, which the service-role client doesn't carry.
  const supabase = await createClient();
  await supabase.rpc("log_activity", {
    p_action: "user.invited",
    p_entity_type: "profile",
    p_entity_id: data.user.id,
    p_metadata: { email: parsed.data.email, role: parsed.data.role },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

const RoleSchema = z.enum(USER_ROLES);

/** SUPER_ADMIN only. Regular (non-admin) client is enough — the protect_profile_privileges trigger allows SUPER_ADMIN through RLS. */
export async function setUserRole(userId: string, role: UserRole) {
  const actingProfile = await requireRole(["SUPER_ADMIN"]);
  if (actingProfile.id === userId) {
    throw new Error("You cannot change your own role.");
  }
  const parsedRole = RoleSchema.parse(role);
  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update({ role: parsedRole }).eq("id", userId);
  if (error) throw new Error(error.message);

  await supabase.rpc("log_activity", {
    p_action: "user.role_changed",
    p_entity_type: "profile",
    p_entity_id: userId,
    p_metadata: { role: parsedRole },
  });

  revalidatePath("/admin/users");
}

/** Form-compatible wrapper for <select> auto-submit in RoleSelect. */
export async function setUserRoleFromForm(userId: string, formData: FormData) {
  const role = RoleSchema.parse(formData.get("role"));
  await setUserRole(userId, role);
}

export async function setUserActive(userId: string, active: boolean) {
  const actingProfile = await requireRole(["SUPER_ADMIN"]);
  if (actingProfile.id === userId) {
    throw new Error("You cannot deactivate your own account.");
  }
  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update({ active }).eq("id", userId);
  if (error) throw new Error(error.message);

  await supabase.rpc("log_activity", {
    p_action: active ? "user.activated" : "user.deactivated",
    p_entity_type: "profile",
    p_entity_id: userId,
    p_metadata: {},
  });

  revalidatePath("/admin/users");
}

const ProfileSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required."),
  phone: z.string().trim().optional().or(z.literal("")),
});

/** Any signed-in user editing their own name/phone (not role/active — blocked by the DB trigger regardless). */
export async function updateOwnProfile(_prevState: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireUser();
  const parsed = ProfileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ full_name: parsed.data.full_name, phone: parsed.data.phone || null })
    .eq("id", profile.id);
  if (error) return { error: error.message };

  revalidatePath("/admin");
  return { success: true };
}
