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

// Milan-based providers that also cover Genoa ↔ Milan / Malpensa, listed under both cities.
const CAR_DRIVER_MILANO: CityPartner = {
  slug: "cardrivermilano",
  kind: "company",
  name: "CarDriverMilano",
  phone: "+39 347 825 7440",
  email: null,
  website: null,
  description: "Milan chauffeur · Milan / Malpensa transfers",
};
const TRANSFER_MILAN: CityPartner = {
  slug: "transfermilan",
  kind: "company",
  name: "TransferMilan LLC",
  phone: "+39 351 769 9952",
  email: null,
  website: null,
  description: "Milan Malpensa airport transfers",
};
const NCC_MILANO_GENOA: CityPartner = {
  slug: "ncc-milano-genoa",
  kind: "company",
  name: "NCC Milano Genoa",
  phone: "+39 02 871 996 94",
  email: null,
  website: null,
  description: "Long-distance Milan ↔ Genoa chauffeur transfers · landline, call (WhatsApp may not work)",
};

export const CITY_PARTNERS: Partial<Record<CityKey, CityPartner[]>> = {
  catania: [
    {
      slug: "giuseppe-nicotra",
      kind: "driver",
      name: "Giuseppe Nicotra",
      phone: "+39 349 462 9666",
      email: "nccetnamare@gmail.com",
      website: "https://transferetnamare.it/",
      description: "Transfer Etna Mare · Catania airport, Taormina, Etna & eastern Sicily",
    },
  ],
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
    {
      slug: "malpensa-cloud",
      kind: "company",
      name: "Malpensa Cloud",
      phone: "+39 334 974 8558",
      email: null,
      website: "https://ncc-malpensa.it/",
      description: "Malpensa ↔ Milan transfers · accepts WhatsApp · best first contact for Malpensa",
    },
    {
      slug: "transfer-malpensa-airport",
      kind: "company",
      name: "Transfer Malpensa AirPort",
      phone: "+39 344 294 8830",
      email: null,
      website: null,
      description: "Malpensa airport chauffeur service",
    },
    {
      slug: "luxury-black-driver",
      kind: "company",
      name: "Luxury Black Driver",
      phone: "+39 349 087 7889",
      email: null,
      website: null,
      description: "Taxi / personal driver, Milan",
    },
    {
      slug: "transfer-lounge",
      kind: "company",
      name: "Transfer Lounge",
      phone: "+39 340 948 2779",
      email: null,
      website: null,
      description: "Milan / Malpensa transfers",
    },
    CAR_DRIVER_MILANO,
    TRANSFER_MILAN,
    NCC_MILANO_GENOA,
  ],
  genoa: [
    {
      slug: "ncc-aeroporto-genova-danilo",
      kind: "company",
      name: "NCC Aeroporto Genova (Danilo)",
      phone: "+39 329 338 2777",
      email: null,
      website: null,
      description: "NCC Transfer di Danilo · Genoa airport transfers, incl. Genoa → Milan Malpensa",
    },
    {
      slug: "blurental-ncc-genova",
      kind: "company",
      name: "Blurental NCC Genova",
      phone: "+39 010 705 1015",
      email: null,
      website: null,
      description: "Genoa airport transfers · landline, call (WhatsApp may not work)",
    },
    {
      slug: "mb-rent-car",
      kind: "company",
      name: "MB Rent Car s.r.l.",
      phone: "+39 010 646 6818",
      email: null,
      website: null,
      description: "Car hire with driver, Genoa · landline, call (WhatsApp may not work)",
    },
    NCC_MILANO_GENOA,
    CAR_DRIVER_MILANO,
    TRANSFER_MILAN,
  ],
  venice: [
    {
      slug: "venice-car",
      kind: "driver",
      name: "Venice Transfer Car (NCC & Cab)",
      phone: "+39 388 252 6555",
      email: null,
      website: null,
      description: "Venice NCC & cab · Marco Polo, Treviso, Piazzale Roma, Mestre, long-distance (e.g. → Verona)",
    },
    {
      slug: "ncc-aeroporto-venezia",
      kind: "company",
      name: "NCC Aeroporto di Venezia",
      phone: "+39 338 279 9864",
      email: null,
      website: null,
      description: "Private airport & long-distance transfers · WhatsApp",
    },
    {
      slug: "venice-chauffeur-service",
      kind: "company",
      name: "Venice Chauffeur Service",
      phone: "+39 393 385 8250",
      email: null,
      website: null,
      description: "Venice chauffeur service",
    },
    {
      slug: "prime-ncc-venice",
      kind: "company",
      name: "Prime NCC Venice",
      phone: "+39 393 236 7773",
      email: null,
      website: null,
      description: "Venice NCC",
    },
    {
      slug: "navetta-italia",
      kind: "company",
      name: "Navetta Italia",
      phone: "+39 328 151 1513",
      email: null,
      website: null,
      description: "Private transfers",
    },
    {
      slug: "my-venice-transfer",
      kind: "company",
      name: "My Venice Transfer (NCC Venezia)",
      phone: "+39 320 294 8232",
      email: null,
      website: null,
      description: "Venice NCC",
    },
    {
      slug: "mc-driver-ncc",
      kind: "company",
      name: "MC Driver NCC",
      phone: "+39 329 832 8133",
      email: null,
      website: null,
      description: "Airport, railway station & long-distance transfers · WhatsApp",
    },
  ],
  verona: [
    {
      slug: "luxury-transfer-verona",
      kind: "company",
      name: "Luxury Transfer Verona",
      phone: "+39 379 288 4944",
      email: null,
      website: null,
      description: "NCC & chauffeur · Verona airport (VRN) transfers",
    },
    {
      slug: "best-ncc-verona",
      kind: "company",
      name: "BEST NCC Verona",
      phone: "+39 340 649 0836",
      email: null,
      website: null,
      description: "Noleggio con conducente · chauffeur service",
    },
    {
      slug: "fabio-zivelonghi",
      kind: "driver",
      name: "Fabio Zivelonghi (NCC Verona)",
      phone: "+39 348 892 4962",
      email: null,
      website: null,
      description: "Verona NCC driver",
    },
    {
      slug: "xtransfer-ncc-verona",
      kind: "company",
      name: "Xtransfer NCC Verona",
      phone: "+39 351 510 0200",
      email: null,
      website: null,
      description: "Private hire / taxi",
    },
    {
      slug: "greencab",
      kind: "company",
      name: "GreenCab.it",
      phone: "+39 333 669 8525",
      email: null,
      website: null,
      description: "NCC · private taxi",
    },
    {
      slug: "ncc-verona-service",
      kind: "company",
      name: "NCC Verona Service",
      phone: "+39 348 225 2110",
      email: null,
      website: null,
      description: "Verona transfers · WhatsApp",
    },
    {
      slug: "ncc-verona-airport",
      kind: "company",
      name: "NCC Verona Airport",
      phone: "+39 393 508 0289",
      email: null,
      website: null,
      description: "Airport transfers · WhatsApp",
    },
    {
      slug: "ncc-andrea-verona",
      kind: "driver",
      name: "Andrea (NCC Verona)",
      phone: "+39 391 386 0516",
      email: null,
      website: null,
      description: "Verona NCC driver · WhatsApp",
    },
  ],
  florence: [
    {
      slug: "cristian-rocchigiani",
      kind: "driver",
      name: "Cristian Rocchigiani NCC",
      phone: "+39 333 501 4211",
      email: null,
      website: null,
      description: "Florence private driver · 24/7",
    },
    {
      slug: "florence-on-the-go",
      kind: "company",
      name: "Florence On The Go",
      phone: "+39 370 346 6836",
      email: null,
      website: null,
      description: "Private driver Tuscany · 24/7",
    },
    {
      slug: "ncc-firenze-gc",
      kind: "company",
      name: "NCC Firenze Tuscany by GC",
      phone: "+39 338 678 2191",
      email: null,
      website: null,
      description: "Private driver · 24/7",
    },
    {
      slug: "maurizio-bellini",
      kind: "driver",
      name: "Maurizio Bellini NCC",
      phone: "+39 329 225 0775",
      email: null,
      website: null,
      description: "Florence private driver for Tuscany tours · 24/7",
    },
    {
      slug: "beni-driver-service",
      kind: "company",
      name: "Beni Driver Service",
      phone: "+39 320 880 8389",
      email: null,
      website: null,
      description: "Car rental with driver, Florence NCC",
    },
    {
      slug: "ncc-florence",
      kind: "company",
      name: "NCC Florence (NCC Firenze)",
      phone: "+39 348 140 2548",
      email: null,
      website: null,
      description: "Florence NCC · reachable on WhatsApp",
    },
    {
      slug: "ellis-to-go",
      kind: "company",
      name: "Ellis To Go",
      phone: "+39 380 798 7455",
      email: null,
      website: null,
      description: "Mercedes V-Class · Florence / Tuscany",
    },
    {
      slug: "mr-move",
      kind: "company",
      name: "Mr. Move",
      phone: "+39 380 375 9252",
      email: null,
      website: null,
      description: "Florence / Tuscany chauffeur",
    },
    {
      slug: "ncc-aeroporto-firenze",
      kind: "company",
      name: "NCC Aeroporto Firenze",
      phone: "+39 339 792 0922",
      email: null,
      website: null,
      description: "Florence airport transfers · 24/7",
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
    {
      slug: "puglia-vip-ncc",
      kind: "company",
      name: "Puglia VIP NCC Bari",
      phone: "+39 344 448 4882",
      email: null,
      website: null,
      description: "Airport transfers & private tours",
    },
    {
      slug: "francesco-mazzoccoli",
      kind: "driver",
      name: "Francesco Mazzoccoli (Bari NCC)",
      phone: "+39 333 396 2468",
      email: null,
      website: null,
      description: "Bari NCC driver",
    },
    {
      slug: "pasquale-macchia",
      kind: "driver",
      name: "Pasquale Macchia (PM Personal Driver)",
      phone: "+39 349 123 5151",
      email: null,
      website: null,
      description: "Ncc Bari · personal driver",
    },
    {
      slug: "we-go-transfer",
      kind: "company",
      name: "We Go Transfer NCC",
      phone: "+39 327 927 5000",
      email: null,
      website: null,
      description: "Transfers & personal driver across Puglia",
    },
    {
      slug: "puglia-driver",
      kind: "company",
      name: "Puglia Driver",
      phone: "+39 345 039 1490",
      email: null,
      website: null,
      description: "Puglia transfers",
    },
    {
      slug: "barimove",
      kind: "company",
      name: "BariMove Srl",
      phone: "+39 388 820 7600",
      email: null,
      website: null,
      description: "Bari transfers",
    },
    {
      slug: "koala-vip-ncc",
      kind: "company",
      name: "Koala VIP NCC Bari",
      phone: "+39 370 319 2778",
      email: null,
      website: null,
      description: "Airport transfers & private tours",
    },
    {
      slug: "bari-airport-ncc",
      kind: "company",
      name: "Bari Airport NCC",
      phone: "+39 338 800 4611",
      email: null,
      website: null,
      description: "Bari airport transfers · Mercedes sedan & van · on WhatsApp",
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
