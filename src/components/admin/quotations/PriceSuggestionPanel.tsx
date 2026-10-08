"use client";

import { useState, useTransition } from "react";
import { Sparkles, AlertTriangle } from "lucide-react";
import { getPriceSuggestion } from "@/lib/admin/actions/pricing";
import { formatCurrency } from "@/lib/admin/format";
import {
  COMMISSION_TIERS,
  computeDriverCommissionPrice,
  estimateDriverCost,
  minimumSafePrice,
  recommendedPrice,
  type CommissionMode,
  type PricingSuggestion,
  type VehicleCategoryKey,
} from "@/lib/pricing/engine";

const VEHICLE_CATEGORIES = ["SEDAN", "SUV", "VAN", "LUXURY", "MINIBUS"] as const;

type Mode = "DRIVER" | "ENGINE";

const TIERS_HINT = COMMISSION_TIERS.map((t, i) => {
  const from = i === 0 ? 0 : COMMISSION_TIERS[i - 1].upToKm!;
  return t.upToKm === null ? `${from}+ km €${t.amount}` : `${from}–${t.upToKm} km €${t.amount}`;
}).join(" · ");

/**
 * Assistive only — never writes into the form on its own; staff click
 * "Add as line item" to use the number.
 *
 * Two ways to price:
 * - Driver price + commission (default): how the office actually quotes —
 *   the driver/partner's price plus our commission on top. Both figures are
 *   kept in the pricing breakdown so the booking shows what the driver gets.
 * - Rate card / fixed route: the configured pricing engine. Priced by vehicle
 *   *category* rather than the specific vehicle, since a quote is often given
 *   before a unit is assigned. A per-km rate card refuses to suggest a price
 *   without a distance — base price alone badly undercharges.
 */
export function PriceSuggestionPanel({
  pickup,
  dropoff,
  tripDate,
  tripTime,
  currency,
  onApply,
}: {
  pickup: string;
  dropoff: string;
  tripDate: string;
  tripTime: string;
  currency: string;
  onApply: (description: string, amount: number, breakdown: PricingSuggestion) => void;
}) {
  const [mode, setMode] = useState<Mode>("DRIVER");

  return (
    <div className="border border-admin-line rounded-sm p-3 bg-admin-ivory-deep/40 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-admin-ink">
          <Sparkles className="h-3.5 w-3.5 text-admin-gold" /> Price calculator
        </div>
        <div className="flex text-[11px] border border-admin-line rounded-sm overflow-hidden">
          <ModeButton active={mode === "DRIVER"} onClick={() => setMode("DRIVER")}>
            Driver price + commission
          </ModeButton>
          <ModeButton active={mode === "ENGINE"} onClick={() => setMode("ENGINE")}>
            Rate card
          </ModeButton>
        </div>
      </div>

      {mode === "DRIVER" ? (
        <DriverCommissionCalculator currency={currency} pickup={pickup} dropoff={dropoff} onApply={onApply} />
      ) : (
        <EngineSuggestion pickup={pickup} dropoff={dropoff} tripDate={tripDate} tripTime={tripTime} currency={currency} onApply={onApply} />
      )}
    </div>
  );
}

function DriverCommissionCalculator({
  currency,
  pickup,
  dropoff,
  onApply,
}: {
  currency: string;
  pickup: string;
  dropoff: string;
  onApply: (description: string, amount: number, breakdown: PricingSuggestion) => void;
}) {
  const [driverPrice, setDriverPrice] = useState("");
  const [distanceKm, setDistanceKm] = useState("");
  const [commissionMode, setCommissionMode] = useState<CommissionMode>("DISTANCE");
  const [commissionValue, setCommissionValue] = useState("");
  const [applied, setApplied] = useState(false);

  const driver = Number(driverPrice);
  const km = Number(distanceKm);
  const hasDistance = distanceKm !== "" && km > 0;
  const commissionReady = commissionMode === "DISTANCE" ? hasDistance : commissionValue !== "" && Number(commissionValue) >= 0;
  const valid = driverPrice !== "" && driver > 0 && commissionReady;
  const result = valid
    ? computeDriverCommissionPrice({
        currency: currency as PricingSuggestion["currency"],
        driverPrice: driver,
        commissionMode,
        commissionValue: Number(commissionValue),
        distanceKm: hasDistance ? km : null,
      })
    : null;

  function apply() {
    if (!result) return;
    const route = pickup && dropoff ? `${pickup} → ${dropoff}` : "Private transfer";
    onApply(route, result.subtotal, result);
    setApplied(true);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-2">
        <div>
          <label className="block text-[11px] text-admin-stone mb-1">Driver price ({currency})</label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={driverPrice}
            onChange={(e) => {
              setDriverPrice(e.target.value);
              setApplied(false);
            }}
            placeholder="110"
            className="input-luxe text-xs py-1.5 w-28"
          />
        </div>
        <div>
          <label className="block text-[11px] text-admin-stone mb-1">Distance (km)</label>
          <input
            type="number"
            min={0}
            step="1"
            value={distanceKm}
            onChange={(e) => {
              setDistanceKm(e.target.value);
              setApplied(false);
            }}
            placeholder="48"
            className="input-luxe text-xs py-1.5 w-24"
          />
        </div>
        <div>
          <label className="block text-[11px] text-admin-stone mb-1">Our commission</label>
          <div className="flex gap-1">
            <select
              value={commissionMode}
              onChange={(e) => {
                setCommissionMode(e.target.value as CommissionMode);
                setApplied(false);
              }}
              className="input-luxe text-xs py-1.5"
            >
              <option value="DISTANCE">Auto (by distance)</option>
              <option value="FIXED">Fixed {currency}</option>
              <option value="PERCENT">%</option>
            </select>
            {commissionMode !== "DISTANCE" ? (
              <input
                type="number"
                min={0}
                step="0.01"
                value={commissionValue}
                onChange={(e) => {
                  setCommissionValue(e.target.value);
                  setApplied(false);
                }}
                className="input-luxe text-xs py-1.5 w-20"
              />
            ) : null}
          </div>
        </div>
      </div>

      {commissionMode === "DISTANCE" ? <p className="text-[11px] text-admin-stone">Auto commission: {TIERS_HINT}</p> : null}
      {hasDistance && currency === "EUR" ? (
        <p className="text-[11px] text-admin-stone">
          Market for {km} km: a sedan driver usually asks ~{formatCurrency(estimateDriverCost("SEDAN", km), currency)}, a V-Class ~
          {formatCurrency(estimateDriverCost("VAN", km), currency)}.
        </p>
      ) : null}

      {result ? (
        <div className="text-xs space-y-1 border-t border-admin-line pt-2">
          <div className="flex justify-between">
            <span className="text-admin-stone">Driver price</span>
            <span>{formatCurrency(result.driverPrice ?? 0, currency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-admin-stone">
              Commission
              {commissionMode === "PERCENT" ? ` (${commissionValue}%)` : commissionMode === "DISTANCE" ? ` (auto, ${km} km)` : ""}
            </span>
            <span>+{formatCurrency(result.commission ?? 0, currency)}</span>
          </div>
          <div className="flex justify-between font-semibold text-admin-ink pt-1 border-t border-admin-line">
            <span>Customer price</span>
            <span>{formatCurrency(result.subtotal, currency)}</span>
          </div>
          <button type="button" onClick={apply} className="mt-1 text-xs text-admin-gold hover:underline">
            {applied ? "✓ Added — add again" : "+ Add as line item"}
          </button>
          <p className="text-[11px] text-admin-stone">Driver price and commission are saved with the quote and shown on the booking — never on the customer&apos;s PDF.</p>
        </div>
      ) : (
        <p className="text-[11px] text-admin-stone">
          Enter what the driver will charge{commissionMode === "DISTANCE" ? " and the trip distance" : ""}; the commission is added on top to give the customer price.
        </p>
      )}
    </div>
  );
}

function EngineSuggestion({
  pickup,
  dropoff,
  tripDate,
  tripTime,
  currency,
  onApply,
}: {
  pickup: string;
  dropoff: string;
  tripDate: string;
  tripTime: string;
  currency: string;
  onApply: (description: string, amount: number, breakdown: PricingSuggestion) => void;
}) {
  const [vehicleCategory, setVehicleCategory] = useState<(typeof VEHICLE_CATEGORIES)[number]>("SEDAN");
  const [distanceKm, setDistanceKm] = useState("");
  const [result, setResult] = useState<PricingSuggestion | { error: string } | null>(null);
  const [pending, startTransition] = useTransition();

  function fetchSuggestion() {
    startTransition(async () => {
      const res = await getPriceSuggestion({
        vehicleCategory,
        currency,
        pickup: pickup || "",
        dropoff: dropoff || "",
        distanceKm: distanceKm ? Number(distanceKm) : null,
        tripDate: tripDate || null,
        tripTime: tripTime || null,
      });
      setResult("error" in res ? res : res.suggestion);
    });
  }

  const suggestion = result && !("error" in result) ? result : null;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-2">
        <div>
          <label className="block text-[11px] text-admin-stone mb-1">Vehicle category</label>
          <select
            value={vehicleCategory}
            onChange={(e) => {
              setVehicleCategory(e.target.value as typeof vehicleCategory);
              setResult(null);
            }}
            className="input-luxe text-xs py-1.5"
          >
            {VEHICLE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] text-admin-stone mb-1">Distance (km)</label>
          <input
            type="number"
            min={0}
            step="0.1"
            value={distanceKm}
            onChange={(e) => {
              setDistanceKm(e.target.value);
              setResult(null);
            }}
            className="input-luxe text-xs py-1.5 w-28"
          />
        </div>
        <button
          type="button"
          onClick={fetchSuggestion}
          disabled={pending}
          className="text-xs bg-admin-navy text-admin-ivory px-3 py-1.5 rounded-sm hover:bg-admin-navy-deep disabled:opacity-60"
        >
          {pending ? "Calculating…" : "Get suggested price"}
        </button>
      </div>

      {result && "error" in result ? <p className="text-xs text-red-700">{result.error}</p> : null}

      {suggestion ? (
        <div className="text-xs space-y-1 border-t border-admin-line pt-2">
          {suggestion.source === "NONE" ? (
            <p className="text-admin-stone">No rate card or fixed route configured for {vehicleCategory} in {currency}. Set one up in Settings → Pricing engine, or use &ldquo;Driver price + commission&rdquo;.</p>
          ) : suggestion.needsDistance ? (
            <p className="flex items-start gap-1.5 text-red-700 bg-red-50 border border-red-200 rounded-sm px-2 py-1.5">
              <AlertTriangle className="h-3.5 w-3.5 mt-px shrink-0" />
              <span>
                &ldquo;{suggestion.matchedRuleLabel}&rdquo; charges per km — enter the distance first. Without it the price would only be the base fare (
                {formatCurrency(suggestion.base, currency)}), far too low for most trips.
              </span>
            </p>
          ) : (
            <>
              <p className="text-admin-stone">
                Matched: <span className="text-admin-ink">{suggestion.matchedRuleLabel}</span> ({suggestion.source === "ROUTE_RATE" ? "fixed route" : "rate card"})
              </p>
              <div className="flex justify-between">
                <span className="text-admin-stone">Base</span>
                <span>{formatCurrency(suggestion.base, currency)}</span>
              </div>
              {suggestion.distanceCharge > 0 ? (
                <div className="flex justify-between">
                  <span className="text-admin-stone">Distance ({distanceKm} km)</span>
                  <span>{formatCurrency(suggestion.distanceCharge, currency)}</span>
                </div>
              ) : null}
              {suggestion.surcharges.map((s, i) => (
                <div key={i} className="flex justify-between text-amber-700">
                  <span>{s.label}</span>
                  <span>+{formatCurrency(s.amount, currency)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold text-admin-ink pt-1 border-t border-admin-line">
                <span>Suggested price</span>
                <span>{formatCurrency(suggestion.subtotal, currency)}</span>
              </div>
              <MarketCheck price={suggestion.subtotal} category={vehicleCategory} distanceKm={distanceKm ? Number(distanceKm) : null} currency={currency} />
              <button
                type="button"
                onClick={() => onApply(suggestion.matchedRuleLabel ?? "Trip fare", suggestion.subtotal, suggestion)}
                className="mt-1 text-xs text-admin-gold hover:underline"
              >
                + Add as line item
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Compares a suggested customer price with the estimated driver cost for the
 * distance, so a rate card or fixed route set too low is caught before the
 * quote goes out and no driver will take the job.
 */
function MarketCheck({ price, category, distanceKm, currency }: { price: number; category: VehicleCategoryKey; distanceKm: number | null; currency: string }) {
  // The cost model is in EUR; other currencies would need an FX rate we don't have here.
  if (currency !== "EUR" || !distanceKm) {
    return <p className="text-[11px] text-admin-stone">Check this against what the driver will charge before sending — rate cards don&apos;t know the driver&apos;s price.</p>;
  }
  const cost = estimateDriverCost(category, distanceKm);
  const floor = minimumSafePrice(category, distanceKm);
  const recommended = recommendedPrice(category, distanceKm);

  if (price < floor) {
    return (
      <p className="flex items-start gap-1.5 text-red-700 bg-red-50 border border-red-200 rounded-sm px-2 py-1.5 text-[11px]">
        <AlertTriangle className="h-3.5 w-3.5 mt-px shrink-0" />
        <span>
          Too low — a driver usually asks about {formatCurrency(cost, currency)} for {distanceKm} km in a {category.toLowerCase()}, so this may not find a driver. Quote at
          least {formatCurrency(floor, currency)}; normal price {formatCurrency(recommended, currency)}. Confirm the driver price first.
        </span>
      </p>
    );
  }
  return (
    <p className="text-[11px] text-admin-stone">
      Market check: driver ~{formatCurrency(cost, currency)}, normal price ~{formatCurrency(recommended, currency)}. Still confirm the driver&apos;s price before sending.
    </p>
  );
}

function ModeButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2.5 py-1 ${active ? "bg-admin-navy text-admin-ivory" : "bg-white text-admin-stone hover:text-admin-ink"}`}
    >
      {children}
    </button>
  );
}
