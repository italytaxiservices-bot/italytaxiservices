import type { CityKey } from "@/lib/admin/cities";

/**
 * Main driver(s) per city for the Trips by city page: their name is
 * pre-selected on every trip in that city, so sending is copy → WhatsApp.
 * Names are matched (case-insensitively) against active drivers in
 * Admin → Drivers, which is where the WhatsApp number comes from.
 * First name in each list is the default.
 */
export const CITY_MAIN_DRIVERS: Partial<Record<CityKey, string[]>> = {
  rome: ["Carlos Rodriguez"],
  milan: ["Mohsin"],
};

/**
 * Partner companies we hand trips to in cities we don't cover ourselves.
 * A city with a partner shows it first and pre-selected on every trip, on
 * Trips by city and on the booking/lead pages.
 */
export type CityPartner = {
  /** Stable id, used as the picker value ("partner:<slug>"). */
  slug: string;
  name: string;
  phone: string;
  email: string | null;
  website: string | null;
  description: string;
};

export const CITY_PARTNERS: Partial<Record<CityKey, CityPartner[]>> = {
  bari: [
    {
      slug: "pugliacab",
      name: "Puglia Cab (NCC Bari)",
      phone: "+39 346 615 3134",
      email: "nccbariaeroporto@gmail.com",
      website: "https://pugliacab.com/",
      description: "Premium chauffeur service in Bari & all of Puglia · airports, ports, stations, private tours & events · Mercedes V-Class & E-Class",
    },
  ],
};

export function partnersFor(city: CityKey): CityPartner[] {
  return CITY_PARTNERS[city] ?? [];
}

/** A partner as an entry in the driver picker. */
export function partnerOption(p: CityPartner) {
  return { id: `partner:${p.slug}`, name: p.name, phone: p.phone, email: p.email, hint: "🤝 partner company" };
}

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

/** Active drivers matching the configured names for a city, in config order. */
export function mainDriversFor<T extends { name: string }>(city: CityKey, drivers: T[]): { matched: T[]; missing: string[] } {
  const names = CITY_MAIN_DRIVERS[city] ?? [];
  const matched: T[] = [];
  const missing: string[] = [];
  for (const name of names) {
    const want = normalize(name);
    // Exact name first, then a driver whose name starts with it ("Mohsin" → "Mohsin Ali").
    const hit = drivers.find((d) => normalize(d.name) === want) ?? drivers.find((d) => normalize(d.name).startsWith(`${want} `));
    if (hit) matched.push(hit);
    else missing.push(name);
  }
  return { matched, missing };
}
