"use client";

import { useState, useTransition } from "react";
import { Sparkles } from "lucide-react";
import { getPriceSuggestion } from "@/lib/admin/actions/pricing";
import { formatCurrency } from "@/lib/admin/format";
import type { PricingSuggestion } from "@/lib/pricing/engine";

const VEHICLE_CATEGORIES = ["SEDAN", "SUV", "VAN", "LUXURY", "MINIBUS"] as const;

/**
 * Assistive only — computes what the pricing engine would charge and lets
 * staff add it as a line item with one click, but never writes into the form
 * on its own. Priced by vehicle *category* rather than the specific vehicle
 * chosen elsewhere in the form, since rate cards/route rates are category
 * rates and a quote is often given before a specific unit is assigned.
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
    <div className="border border-admin-line rounded-sm p-3 bg-admin-ivory-deep/40 space-y-3">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-admin-ink">
        <Sparkles className="h-3.5 w-3.5 text-admin-gold" /> Pricing engine suggestion
      </div>
      <div className="flex flex-wrap items-end gap-2">
        <div>
          <label className="block text-[11px] text-admin-stone mb-1">Vehicle category</label>
          <select value={vehicleCategory} onChange={(e) => setVehicleCategory(e.target.value as typeof vehicleCategory)} className="input-luxe text-xs py-1.5">
            {VEHICLE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] text-admin-stone mb-1">Distance (km, optional)</label>
          <input
            type="number"
            min={0}
            step="0.1"
            value={distanceKm}
            onChange={(e) => setDistanceKm(e.target.value)}
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
            <p className="text-admin-stone">No rate card or fixed route configured for {vehicleCategory} in {currency}. Set one up in Settings → Pricing engine, or price this manually.</p>
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
