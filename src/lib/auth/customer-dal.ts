import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type CustomerSession = { userId: string; email: string; customerId: string | null };

/**
 * Mirrors lib/auth/dal.ts's getCurrentProfile, but reads customer_accounts
 * instead of profiles — customer identity is intentionally a separate table
 * so a customer session can never pick up a staff role. customerId is null
 * when the signed-in email didn't match any existing `customers` row at
 * signup time; pages handle that as an empty/contact-us state rather than
 * treating it as unauthenticated.
 */
export const getCurrentCustomer = cache(async (): Promise<CustomerSession | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: account } = await supabase.from("customer_accounts").select("customer_id, email").eq("id", user.id).maybeSingle();
  if (!account) return null;

  return { userId: user.id, email: account.email, customerId: account.customer_id };
});

export async function requireCustomer(): Promise<CustomerSession> {
  const session = await getCurrentCustomer();
  if (!session) redirect("/my-login");
  return session;
}
