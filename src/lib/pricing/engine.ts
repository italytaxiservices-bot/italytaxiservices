import type { SupportedCurrency } from "@/lib/pricing/currencies";

export type PricingBreakdownLine = { label: string; amount: number };

export type PricingSuggestion = {
  currency: SupportedCurrency;
  source: "ROUTE_RATE" | "RATE_CARD" | "NONE";
  matchedRuleLabel: string | null;
  base: number;
  distanceCharge: number;
  surcharges: PricingBreakdownLine[];
  subtotal: number;
  distanceKm: number | null;
  calculatedAt: string;
};

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

  return {
    currency: input.currency,
    source,
    matchedRuleLabel,
    base,
    distanceCharge,
    surcharges,
    subtotal,
    distanceKm: input.distanceKm,
    calculatedAt: new Date().toISOString(),
  };
}
