import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/dal";
import { MANAGE_CRM } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Section } from "@/components/admin/ui/Section";
import { SimpleTable } from "@/components/admin/ui/SimpleTable";
import { formatCurrency } from "@/lib/admin/format";
import { createService, toggleServiceActive } from "@/lib/admin/actions/services";
import { SUPPORTED_CURRENCIES } from "@/lib/pricing/currencies";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage() {
  await requireRole(MANAGE_CRM);
  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("*").order("sort_order").order("name");

  return (
    <div>
      <PageHeader title="Services" description="The catalog quotations and bookings can draw line items from." />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Section title="Catalog">
            <SimpleTable
              rows={services ?? []}
              emptyTitle="No services yet"
              columns={[
                { header: "Name", cell: (s) => s.name },
                { header: "Pricing", cell: (s) => s.pricing_model },
                { header: "Default price", cell: (s) => (s.default_price ? formatCurrency(s.default_price, s.currency ?? "EUR") : "—") },
                { header: "Tax", cell: (s) => s.tax_behavior },
                {
                  header: "Active",
                  cell: (s) => (
                    <form action={toggleServiceActive.bind(null, s.id)}>
                      <input type="hidden" name="is_active" value={s.is_active ? "0" : "1"} />
                      <button
                        type="submit"
                        className={`text-xs px-2.5 py-1 rounded-full border ${s.is_active ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-admin-line text-admin-stone"}`}
                      >
                        {s.is_active ? "Active" : "Inactive"}
                      </button>
                    </form>
                  ),
                },
              ]}
            />
          </Section>
        </div>

        <div>
          <Section title="Add service">
            <form action={createService} className="p-4 space-y-3">
              <input name="name" placeholder="Name" required className="input-luxe" />
              <textarea name="description" placeholder="Description" rows={2} className="input-luxe" />
              <select name="pricing_model" defaultValue="FLAT" className="input-luxe">
                <option value="FLAT">Flat rate</option>
                <option value="HOURLY">Hourly</option>
                <option value="PER_KM">Per km</option>
                <option value="CUSTOM">Custom</option>
              </select>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" name="default_price" min={0} step="0.01" placeholder="Default price" className="input-luxe" />
                <select name="currency" defaultValue="EUR" className="input-luxe">
                  {SUPPORTED_CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <select name="tax_behavior" defaultValue="TAXABLE" className="input-luxe">
                <option value="TAXABLE">Taxable</option>
                <option value="EXEMPT">Tax exempt</option>
              </select>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" name="default_duration_minutes" min={1} placeholder="Duration (min)" className="input-luxe" />
                <input type="number" name="default_buffer_minutes" min={0} placeholder="Buffer (min)" className="input-luxe" />
              </div>
              <button type="submit" className="w-full text-sm bg-admin-navy text-admin-ivory px-3 py-2 rounded-sm hover:bg-admin-navy-deep">
                Add service
              </button>
            </form>
          </Section>
        </div>
      </div>
    </div>
  );
}
