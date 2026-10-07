/**
 * Groups trips by operating city from the free-text pickup/drop-off the
 * customer typed ("Fiumicino Airport T3", "Hotel near Termini, Roma", ...).
 * Airports, ports and nearby hotspots map to the city whose drivers usually
 * cover them.
 * Add an alias here when a place keeps landing in "Other".
 */
export type CityKey =
  | "rome"
  | "milan"
  | "venice"
  | "florence"
  | "naples"
  | "bologna"
  | "turin"
  | "genoa"
  | "verona"
  | "bari"
  | "catania"
  | "palermo"
  | "cagliari"
  | "olbia"
  | "other";

export const CITY_LABELS: Record<CityKey, string> = {
  rome: "Rome",
  milan: "Milan",
  venice: "Venice",
  florence: "Florence / Pisa",
  naples: "Naples / Amalfi",
  bologna: "Bologna",
  turin: "Turin",
  genoa: "Genoa / Cinque Terre",
  verona: "Verona / Garda",
  bari: "Bari / Puglia",
  catania: "Catania / Taormina",
  palermo: "Palermo",
  cagliari: "Cagliari",
  olbia: "Olbia / Costa Smeralda",
  other: "Other / unknown",
};

// Aliases are matched as whole words, case-insensitively.
const ALIASES: [CityKey, string[]][] = [
  ["rome", ["rome", "roma", "fiumicino", "fco", "ciampino", "vatican", "colosseum", "termini", "civitavecchia"]],
  ["milan", ["milan", "milano", "malpensa", "mxp", "linate", "bergamo", "bgy", "orio al serio", "como", "lake como", "bellagio"]],
  ["venice", ["venice", "venezia", "piazzale roma", "marco polo", "vce", "mestre", "treviso", "tsf"]],
  ["florence", ["florence", "firenze", "flr", "peretola", "pisa", "psa", "siena", "tuscany", "toscana", "chianti", "lucca"]],
  ["naples", ["naples", "napoli", "capodichino", "nap", "sorrento", "amalfi", "positano", "pompeii", "pompei", "ravello", "salerno"]],
  ["bologna", ["bologna", "blq", "rimini", "rmi"]],
  ["turin", ["turin", "torino", "trn", "caselle"]],
  ["genoa", ["genoa", "genova", "goa", "portofino", "cinque terre", "la spezia", "santa margherita"]],
  ["verona", ["verona", "vrn", "garda", "lake garda", "sirmione"]],
  [
    "bari",
    [
      "bari", "bri", "palese", "karol wojtyla", "brindisi", "bds", "puglia", "apulia", "lecce", "polignano", "monopoli",
      "ostuni", "alberobello", "fasano", "savelletri", "locorotondo", "martina franca", "cisternino", "castellana grotte",
      "matera", "otranto", "gallipoli", "trani", "taranto", "foggia", "vieste", "salento",
    ],
  ],
  ["catania", ["catania", "cta", "taormina", "fontanarossa"]],
  ["palermo", ["palermo", "pmo", "punta raisi"]],
  ["cagliari", ["cagliari", "cag", "elmas"]],
  ["olbia", ["olbia", "olb", "costa smeralda", "porto cervo"]],
];

const PATTERNS: [CityKey, RegExp][] = ALIASES.map(([city, words]) => [
  city,
  new RegExp(`\\b(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "i"),
]);

// The alias that appears earliest in the text wins (longest on a tie), so
// "Venezia, Piazzale Roma" is Venice rather than Rome.
function matchCity(text: string | null | undefined): CityKey | null {
  if (!text) return null;
  let best: { city: CityKey; index: number; length: number } | null = null;
  for (const [city, re] of PATTERNS) {
    const m = re.exec(text);
    if (!m) continue;
    if (!best || m.index < best.index || (m.index === best.index && m[0].length > best.length)) {
      best = { city, index: m.index, length: m[0].length };
    }
  }
  return best?.city ?? null;
}

/** City of a trip: where the driver starts (pickup), falling back to the drop-off. */
export function tripCity(pickup: string | null | undefined, dropoff: string | null | undefined): CityKey {
  return matchCity(pickup) ?? matchCity(dropoff) ?? "other";
}

export const CITY_ORDER = Object.keys(CITY_LABELS) as CityKey[];
