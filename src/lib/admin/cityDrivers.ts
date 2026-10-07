import type { CityKey } from "@/lib/admin/cities";

/**
 * Main driver(s) per city for the Trips by city page: their name is
 * pre-selected on every trip in that city, so sending is copy → WhatsApp.
 * Names are matched (case-insensitively) against active drivers in
 * Admin → Drivers, which is where the WhatsApp number comes from.
 * First name in each list is the default. Drivers whose number we have
 * directly belong in CITY_PARTNERS below instead.
 */
export const CITY_MAIN_DRIVERS: Partial<Record<CityKey, string[]>> = {};

/**
 * Outside drivers and partner companies we hand trips to, per city. They
 * don't need to exist in Admin → Drivers. The first entry is pre-selected
 * on every trip in that city, on Trips by city and on the booking/lead
 * pages.
 */
export type CityPartner = {
  /** Stable id, used as the picker value ("partner:<slug>" / "citydriver:<slug>"). */
  slug: string;
  kind: "driver" | "company";
  name: string;
  phone: string;
  email: string | null;
  website: string | null;
  description: string;
};

export const CITY_PARTNERS: Partial<Record<CityKey, CityPartner[]>> = {
  rome: [
    {
      slug: "carlos-rodriguez",
      kind: "driver",
      name: "Carlos Rodriguez",
      phone: "+39 352 233 4674",
      email: "luxwaydrivers@gmail.com",
      website: "https://luxwayrome.com/",
      description: "Driver for Rome transfers (Luxway Rome)",
    },
  ],
  milan: [
    {
      slug: "mohsin",
      kind: "driver",
      name: "Mohsin",
      phone: "+39 320 094 4260",
      email: null,
      website: null,
      description: "Driver for Milan transfers",
    },
  ],
  bari: [
    {
      slug: "romeo-stramaglia",
      kind: "driver",
      name: "Romeo Stramaglia",
      phone: "+39 335 818 7628",
      email: null,
      website: null,
      description: "Driver for Bari airport & Puglia transfers (e.g. Bari airport → Masseria Auraterrae)",
    },
    {
      slug: "emanuele",
      kind: "driver",
      name: "Emanuele",
      phone: "+39 347 103 6580",
      email: null,
      website: null,
      description: "Driver for Bari airport & Puglia transfers (e.g. Bari airport → Masseria Auraterrae)",
    },
    {
      slug: "pugliacab",
      kind: "company",
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

/** A partner as an entry in the driver picker. Only companies get the "partner:" prefix (logged by name, not as "driver X"). */
export function partnerOption(p: CityPartner) {
  return p.kind === "company"
    ? { id: `partner:${p.slug}`, name: p.name, phone: p.phone, email: p.email, hint: "🤝 partner company" }
    : { id: `citydriver:${p.slug}`, name: p.name, phone: p.phone, email: p.email, hint: "⭐ local driver" };
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
