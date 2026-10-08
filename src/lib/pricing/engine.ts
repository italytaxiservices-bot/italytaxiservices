import type { SupportedCurrency } from "@/lib/pricing/currencies";

export type PricingBreakdownLine = { label: string; amount: number };

export type PricingSuggestion = {
  currency: SupportedCurrency;
  source: "ROUTE_RATE" | "RATE_CARD" | "DRIVER_PLUS_COMMISSION" | "NONE";
  matchedRuleLabel: string | null;
  base: number;
  distanceCharge: number;
  surcharges: PricingBreakdownLine[];
  subtotal: number;
  distanceKm: number | null;
  /**
   * True when the matched rate card charges per km but no distance was
   * given — the subtotal is then only the base price and badly understates
   * the trip, so callers must not offer it as a price.
   */
  needsDistance: boolean;
  /** Only set for DRIVER_PLUS_COMMISSION: what the driver is paid and what we keep. */
  driverPrice?: number;
  commission?: number;
  commissionMode?: CommissionMode;
  commissionValue?: number;
  calculatedAt: string;
};

export type CommissionMode = "DISTANCE" | "FIXED" | "PERCENT";

/**
 * Default commission by trip distance (EUR), pitched at premium/luxury
 * chauffeur pricing (Oct 2026) rather than budget transfer apps: Malpensa→
 * Como (~60 km) sells for €150–220 and Bellagio (~90 km) ~€320 at premium
 * operators, Rome→Florence/Amalfi (~280 km) €550–950.
 * `upToKm` is inclusive; the last tier has no upper bound.
 */
export const COMMISSION_TIERS: { upToKm: number | null; amount: number }[] = [
  { upToKm: 20, amount: 20 },
  { upToKm: 50, amount: 40 },
  { upToKm: 100, amount: 60 },
  { upToKm: 150, amount: 80 },
  { upToKm: 250, amount: 120 },
  { upToKm: 400, amount: 160 },
  { upToKm: null, amount: 200 },
];

export function commissionForDistance(distanceKm: number): number {
  const tier = COMMISSION_TIERS.find((t) => t.upToKm === null || distanceKm <= t.upToKm);
  return tier!.amount;
}

export type VehicleCategoryKey = "SEDAN" | "SUV" | "VAN" | "LUXURY" | "MINIBUS";

/**
 * Rough estimate (EUR) of what a partner NCC driver asks for a one-way trip,
 * tolls, fuel and the empty drive back included. Fitted to Oct 2026 market
 * rates for an E-Class: ~€50 for a 13 km Venice airport run, ~€70 for
 * Fiumicino→Rome (35 km), ~€90 for Malpensa→Milan (48 km), ~€160 for
 * Malpensa→Bellagio (90 km), ~€480 for Rome→Florence (280 km), ~€850 for
 * Rome→Milan (580 km). The first 40 km are cheap because the driver is back
 * in their area quickly; past that the empty return roughly doubles the
 * per-km cost; past 300 km drivers price the whole day rather than per km.
 */
const DRIVER_COST_SEDAN = { minimum: 45, base: 35, perKmNear: 1.0, nearKm: 40, perKmFar: 1.7, farKm: 300, perKmLong: 1.2 };

/** Multiplier on the sedan cost — V-Class ~+20%, S-Class ~+50% at Italian NCCs. */
export const VEHICLE_COST_FACTOR: Record<VehicleCategoryKey, number> = {
  SEDAN: 1,
  VAN: 1.2,
  SUV: 1.25,
  LUXURY: 1.5,
  MINIBUS: 1.8,
};

/**
 * Extra driver cost when the trip ends abroad: Swiss vignette and fees plus a
 * long empty return (Malpensa→Zurich sells for ~€840, Milan→Geneva ~€1,280),
 * French/Monaco motorway tolls, Austrian Brenner toll. Slovenia prices like Italy.
 */
export type BorderCountry = "CH" | "FR" | "MC" | "AT" | "SI";
export const BORDER_COST_FACTOR: Record<BorderCountry, number> = { CH: 1.3, FR: 1.2, MC: 1.2, AT: 1.15, SI: 1 };

export function estimateDriverCost(category: VehicleCategoryKey, distanceKm: number, border?: BorderCountry): number {
  const m = DRIVER_COST_SEDAN;
  const km = Math.max(0, distanceKm);
  const sedan = Math.max(
    m.minimum,
    m.base +
      m.perKmNear * Math.min(km, m.nearKm) +
      m.perKmFar * Math.max(0, Math.min(km, m.farKm) - m.nearKm) +
      m.perKmLong * Math.max(0, km - m.farKm),
  );
  return Math.round(sedan * VEHICLE_COST_FACTOR[category] * (border ? BORDER_COST_FACTOR[border] : 1));
}

/**
 * Below this a driver is unlikely to take the job and we earn next to nothing:
 * estimated driver cost plus the smallest margin worth booking (10%, min €10).
 */
export function minimumSafePrice(category: VehicleCategoryKey, distanceKm: number, border?: BorderCountry): number {
  const cost = estimateDriverCost(category, distanceKm, border);
  return Math.round(cost + Math.max(10, cost * 0.1));
}

/** What we'd normally quote: estimated driver cost plus the distance-tier commission. */
export function recommendedPrice(category: VehicleCategoryKey, distanceKm: number, border?: BorderCountry): number {
  return estimateDriverCost(category, distanceKm, border) + commissionForDistance(distanceKm);
}

/**
 * The "from €X" shown on the public site for a sedan: driver cost plus 60% of
 * the tier commission, never under the safe minimum, rounded up to €5. Kept
 * below the full recommended price so headline prices stay competitive while
 * every one of them still leaves room to pay a driver.
 */
export function publicFromPrice(distanceKm: number, border?: BorderCountry): number {
  const cost = estimateDriverCost("SEDAN", distanceKm, border);
  const price = Math.max(minimumSafePrice("SEDAN", distanceKm, border), cost + commissionForDistance(distanceKm) * 0.6);
  return Math.ceil(price / 5) * 5;
}

export type SurchargeRuleInput = {
  id: string;
  label: string;
  kind: "NIGHT" | "HOLIDAY" | "WAITING" | "EXTRA_STOP" | "CUSTOM";
  starts_at: string | null;
  ends_at: string | null;
  is_percent: boolean;
  amount: number;
  currency: string | null;
};

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
}

/** Handles overnight windows (e.g. 22:00-06:00) where start > end. */
function isWithinTimeWindow(time: string, start: string, end: string): boolean {
  const t = timeToMinutes(time);
  const s = timeToMinutes(start);
  const e = timeToMinutes(end);
  if (s <= e) return t >= s && t < e;
  return t >= s || t < e;
}

/**
 * Pure calculation — every input is data the caller already fetched, so this
 * has no DB/network access and is trivially unit-testable. NIGHT and HOLIDAY
 * surcharges are auto-applied when the trip's time/date match; every other
 * kind (WAITING, EXTRA_STOP, CUSTOM) only applies when the caller explicitly
 * lists its id in `enabledSurchargeIds` — there is no way to auto-detect
 * "the driver waited" or "there was an extra stop" from booking data alone.
 */
export function computePricingSuggestion(input: {
  currency: SupportedCurrency;
  distanceKm: number | null;
  tripDate: string | null;
  tripTime: string | null;
  isHoliday: boolean;
  routeRate: { label: string; price: number } | null;
  rateCard: { label: string; base_price: number; price_per_km: number | null; min_price: number | null } | null;
  surchargeRules: SurchargeRuleInput[];
  enabledSurchargeIds?: string[];
}): PricingSuggestion {
  const enabled = new Set(input.enabledSurchargeIds ?? []);
  let base = 0;
  let distanceCharge = 0;
  let source: PricingSuggestion["source"] = "NONE";
  let matchedRuleLabel: string | null = null;

  if (input.routeRate) {
    base = input.routeRate.price;
    source = "ROUTE_RATE";
    matchedRuleLabel = input.routeRate.label;
  } else if (input.rateCard) {
    base = input.rateCard.base_price;
    source = "RATE_CARD";
    matchedRuleLabel = input.rateCard.label;
    if (input.rateCard.price_per_km && input.distanceKm) {
      distanceCharge = input.rateCard.price_per_km * input.distanceKm;
    }
  }

  let preSurchargeTotal = base + distanceCharge;
  if (source === "RATE_CARD" && input.rateCard?.min_price && preSurchargeTotal < input.rateCard.min_price) {
    const topUp = input.rateCard.min_price - preSurchargeTotal;
    preSurchargeTotal = input.rateCard.min_price;
    distanceCharge += topUp;
  }

  const surcharges: PricingBreakdownLine[] = [];
  for (const rule of input.surchargeRules) {
    if (rule.currency && rule.currency !== input.currency) continue;

    let applies = false;
    if (rule.kind === "NIGHT" && input.tripTime && rule.starts_at && rule.ends_at) {
      applies = isWithinTimeWindow(input.tripTime, rule.starts_at, rule.ends_at);
    } else if (rule.kind === "HOLIDAY") {
      applies = input.isHoliday;
    } else {
      applies = enabled.has(rule.id);
    }
    if (!applies) continue;

    const amount = rule.is_percent ? preSurchargeTotal * (rule.amount / 100) : rule.amount;
    surcharges.push({ label: rule.label, amount });
  }

  const subtotal = preSurchargeTotal + surcharges.reduce((sum, s) => sum + s.amount, 0);

  const needsDistance = source === "RATE_CARD" && Boolean(input.rateCard?.price_per_km) && !input.distanceKm;

  return {
    currency: input.currency,
    source,
    matchedRuleLabel,
    base,
    distanceCharge,
    surcharges,
    subtotal,
    distanceKm: input.distanceKm,
    needsDistance,
    calculatedAt: new Date().toISOString(),
  };
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Pulls the driver price out of a stored pricing_breakdown, if it was priced that way. */
export function readDriverPrice(breakdown: unknown): number | null {
  if (!breakdown || typeof breakdown !== "object") return null;
  const b = breakdown as Partial<PricingSuggestion>;
  return b.source === "DRIVER_PLUS_COMMISSION" && typeof b.driverPrice === "number" ? b.driverPrice : null;
}

/**
 * Customer price built the way the office actually prices trips: the amount
 * the driver/partner quoted plus our commission on top (a fixed amount or a
 * percentage of the driver price, or by default the distance tier from
 * COMMISSION_TIERS), e.g. driver €110 + €20 = customer €130.
 * In DISTANCE mode `commissionValue` is ignored and `distanceKm` is required.
 */
export function computeDriverCommissionPrice(input: {
  currency: SupportedCurrency;
  driverPrice: number;
  commissionMode: CommissionMode;
  commissionValue: number;
  distanceKm?: number | null;
}): PricingSuggestion {
  const driverPrice = round2(Math.max(0, input.driverPrice));
  const commissionValue =
    input.commissionMode === "DISTANCE" ? commissionForDistance(Math.max(0, input.distanceKm ?? 0)) : Math.max(0, input.commissionValue);
  const commission = round2(input.commissionMode === "PERCENT" ? driverPrice * (commissionValue / 100) : commissionValue);

  return {
    currency: input.currency,
    source: "DRIVER_PLUS_COMMISSION",
    matchedRuleLabel: null,
    base: driverPrice,
    distanceCharge: 0,
    surcharges: [],
    subtotal: round2(driverPrice + commission),
    distanceKm: input.distanceKm ?? null,
    needsDistance: false,
    driverPrice,
    commission,
    commissionMode: input.commissionMode,
    commissionValue,
    calculatedAt: new Date().toISOString(),
  };
}
