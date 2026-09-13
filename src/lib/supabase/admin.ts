import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";
import { supabaseServiceRoleKey, supabaseUrl } from "@/lib/supabase/env";

/**
 * Service-role Supabase client. BYPASSES Row Level Security entirely.
 *
 * Only import this in server-only code (route handlers, server actions) for
 * operations that must cross RLS boundaries by design — e.g. SUPER_ADMIN
 * creating a new admin user via Supabase Auth. Never import it from a
 * client component, and never use it as a shortcut around a missing RLS
 * policy for a normal data operation.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(supabaseUrl(), supabaseServiceRoleKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
