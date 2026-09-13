import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/supabase/types";
import { supabasePublishableKey, supabaseUrl } from "@/lib/supabase/env";

/**
 * Server-side Supabase client scoped to the current request's session cookie.
 * Respects Row Level Security as the signed-in user — this is the client
 * every server component, server action, and route handler should use.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl(), supabasePublishableKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component during static rendering — the
          // proxy is responsible for refreshing the session in that case.
        }
      },
    },
  });
}
