"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/types";
import { supabasePublishableKey, supabaseUrl } from "@/lib/supabase/env";

export function createClient() {
  return createBrowserClient<Database>(supabaseUrl(), supabasePublishableKey());
}
