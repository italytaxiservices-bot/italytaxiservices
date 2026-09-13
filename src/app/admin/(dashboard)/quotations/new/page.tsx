import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_CRM } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Card } from "@/components/admin/ui/Card";
import { QuotationForm } from "@/components/admin/quotations/QuotationForm";
import { createQuotation } from "@/lib/admin/actions/quotations";

export const metadata: Metadata = { title: "New quotation" };

export default async function NewQuotationPage({
  searchParams,
}: {
  searchParams: Promise<{ customer_id?: string; lead_id?: string }>;
}) {
  await requireRole(MANAGE_CRM);
  const { customer_id, lead_id } = await searchParams;

  let customerLabel: string | undefined;
  let leadDefaults: { pickup?: string; dropoff?: string; trip_date?: string; trip_time?: string; passengers?: number } = {};

  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("id, name, default_price, currency").eq("is_active", true).order("sort_order");

  if (customer_id || lead_id) {
    if (customer_id) {
      const { data } = await supabase.from("customers").select("full_name, phone, email").eq("id", customer_id).maybeSingle();
      if (data) customerLabel = `${data.full_name}${data.phone ? ` · ${data.phone}` : data.email ? ` · ${data.email}` : ""}`;
    }
    if (lead_id) {
      const { data: lead } = await supabase
        .from("leads")
        .select("pickup, dropoff, trip_date, trip_time, passengers")
        .eq("id", lead_id)
        .maybeSingle();
      if (lead) {
        leadDefaults = {
          pickup: lead.pickup ?? undefined,
          dropoff: lead.dropoff ?? undefined,
          trip_date: lead.trip_date ?? undefined,
          trip_time: lead.trip_time ?? undefined,
          passengers: lead.passengers ?? undefined,
        };
      }
    }
  }

  return (
    <div>
      <PageHeader title="New quotation" />
      <Card className="p-6">
        <QuotationForm
          action={createQuotation}
          submitLabel="Create quotation"
          services={services ?? undefined}
          defaults={{
            customer_id,
            customer_label: customerLabel,
            lead_id,
            ...leadDefaults,
          }}
        />
      </Card>
    </div>
  );
}
