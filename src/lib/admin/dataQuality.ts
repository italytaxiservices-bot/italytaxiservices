import "server-only";

import { createClient } from "@/lib/supabase/server";

export type DataQualityFinding = {
  category: string;
  label: string;
  count: number;
  rows: { id: string; label: string; detail?: string }[];
};

/** Detection only — never deletes or merges anything automatically. Every
 * finding here needs a human to look and decide. */
export async function getDataQualityFindings(): Promise<DataQualityFinding[]> {
  const supabase = await createClient();

  const [
    { data: customers },
    { data: bookingsNoDriver },
    { data: bookingsNoVehicle },
    { data: paymentsNoInvoice },
    { data: expiredDriverDocs },
    { data: expiredVehicleDocs },
  ] = await Promise.all([
    supabase.from("customers").select("id, full_name, email, phone").is("deleted_at", null),
    supabase
      .from("bookings")
      .select("id, booking_reference")
      .is("driver_id", null)
      .not("status", "in", "(CANCELLED,COMPLETED,NO_SHOW)")
      .is("deleted_at", null),
    supabase
      .from("bookings")
      .select("id, booking_reference")
      .is("vehicle_id", null)
      .not("status", "in", "(CANCELLED,COMPLETED,NO_SHOW)")
      .is("deleted_at", null),
    supabase.from("payments").select("id, amount, currency").is("invoice_id", null).is("deleted_at", null),
    supabase.from("documents").select("id, file_name, expiry_date").eq("entity_type", "driver").not("expiry_date", "is", null).lt("expiry_date", new Date().toISOString().slice(0, 10)),
    supabase.from("documents").select("id, file_name, expiry_date").eq("entity_type", "vehicle").not("expiry_date", "is", null).lt("expiry_date", new Date().toISOString().slice(0, 10)),
  ]);

  // Duplicate customers: same (lowercased) email or same phone across
  // different rows — the create-flow already prevents this going forward
  // (findExistingCustomer), so any hits here predate that check or came
  // from a different entry path.
  const byEmail = new Map<string, typeof customers>();
  const byPhone = new Map<string, typeof customers>();
  const missingPhone: typeof customers = [];
  const missingEmail: typeof customers = [];
  for (const c of customers ?? []) {
    if (c.email) {
      const key = c.email.toLowerCase();
      byEmail.set(key, [...(byEmail.get(key) ?? []), c]);
    } else {
      missingEmail.push(c);
    }
    if (c.phone) {
      byPhone.set(c.phone, [...(byPhone.get(c.phone) ?? []), c]);
    } else {
      missingPhone.push(c);
    }
  }
  const duplicateEmailGroups = [...byEmail.values()].filter((g) => (g?.length ?? 0) > 1);
  const duplicatePhoneGroups = [...byPhone.values()].filter((g) => (g?.length ?? 0) > 1);
  const duplicateCustomerIds = new Set<string>();
  for (const g of [...duplicateEmailGroups, ...duplicatePhoneGroups]) for (const c of g ?? []) duplicateCustomerIds.add(c.id);
  const duplicateCustomers = (customers ?? []).filter((c) => duplicateCustomerIds.has(c.id));

  return [
    {
      category: "customers",
      label: "Possible duplicate customers (same email or phone)",
      count: duplicateCustomers.length,
      rows: duplicateCustomers.map((c) => ({ id: c.id, label: c.full_name, detail: c.email ?? c.phone ?? undefined })),
    },
    {
      category: "customers",
      label: "Customers missing a phone number",
      count: missingPhone.length,
      rows: missingPhone.slice(0, 50).map((c) => ({ id: c.id, label: c.full_name, detail: c.email ?? undefined })),
    },
    {
      category: "customers",
      label: "Customers missing an email",
      count: missingEmail.length,
      rows: missingEmail.slice(0, 50).map((c) => ({ id: c.id, label: c.full_name, detail: c.phone ?? undefined })),
    },
    {
      category: "bookings",
      label: "Active bookings with no driver assigned",
      count: bookingsNoDriver?.length ?? 0,
      rows: (bookingsNoDriver ?? []).map((b) => ({ id: b.id, label: b.booking_reference })),
    },
    {
      category: "bookings",
      label: "Active bookings with no vehicle assigned",
      count: bookingsNoVehicle?.length ?? 0,
      rows: (bookingsNoVehicle ?? []).map((b) => ({ id: b.id, label: b.booking_reference })),
    },
    {
      category: "payments",
      label: "Payments not linked to any invoice",
      count: paymentsNoInvoice?.length ?? 0,
      rows: (paymentsNoInvoice ?? []).map((p) => ({ id: p.id, label: `${p.amount} ${p.currency}` })),
    },
    {
      category: "documents",
      label: "Expired driver documents still on file",
      count: expiredDriverDocs?.length ?? 0,
      rows: (expiredDriverDocs ?? []).map((d) => ({ id: d.id, label: d.file_name, detail: `Expired ${d.expiry_date}` })),
    },
    {
      category: "documents",
      label: "Expired vehicle documents still on file",
      count: expiredVehicleDocs?.length ?? 0,
      rows: (expiredVehicleDocs ?? []).map((d) => ({ id: d.id, label: d.file_name, detail: `Expired ${d.expiry_date}` })),
    },
  ];
}
