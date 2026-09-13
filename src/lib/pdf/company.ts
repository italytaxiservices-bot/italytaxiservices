import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

export type CompanySettings = {
  company_name: string;
  legal_name: string | null;
  logo_url: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  website: string | null;
  tax_number: string | null;
  currency_default: string;
};

// Accepts an optional client so callers with no user session (cron routes,
// which must use the admin/service-role client since there's no cookie-based
// auth to read company_settings through) can pass one in explicitly.
export async function getCompanySettings(supabaseClient?: SupabaseClient<Database>): Promise<CompanySettings> {
  const supabase = supabaseClient ?? (await createClient());
  const { data } = await supabase.from("company_settings").select("*").limit(1).maybeSingle();
  return (
    data ?? {
      company_name: "Italy Limo Service",
      legal_name: null,
      logo_url: null,
      email: null,
      phone: null,
      whatsapp: null,
      address: null,
      website: null,
      tax_number: null,
      currency_default: "EUR",
    }
  );
}
