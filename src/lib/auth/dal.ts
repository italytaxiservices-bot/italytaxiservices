import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/auth/roles";

export type SessionProfile = {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  role: UserRole;
  active: boolean;
};

/**
 * Reads the current session's profile. Memoized per request (React `cache`)
 * so every server component/action on a page can call this cheaply without
 * re-querying. Returns null when signed out OR when the auth user has no
 * matching (active) profile — callers decide what to do with that.
 */
export const getCurrentProfile = cache(async (): Promise<SessionProfile | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, phone, role, active")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) return null;

  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    phone: profile.phone,
    role: profile.role as UserRole,
    active: profile.active,
  };
});

/** Redirects to login if signed out, or to the pending-activation notice if not yet activated. */
export async function requireUser(): Promise<SessionProfile> {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/admin/login");
  if (!profile.active) redirect("/admin/pending-activation");
  return profile;
}

/** requireUser(), plus a role check. Redirects to /admin/unauthorized if the role doesn't qualify. */
export async function requireRole(roles: UserRole[]): Promise<SessionProfile> {
  const profile = await requireUser();
  if (!roles.includes(profile.role)) redirect("/admin/unauthorized");
  return profile;
}
