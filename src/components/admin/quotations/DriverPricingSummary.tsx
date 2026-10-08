import { formatCurrency } from "@/lib/admin/format";
import { readDriverPrice } from "@/lib/pricing/engine";

/**
 * Internal-only view of driver price vs. what the customer pays. The
 * commission is computed from the *current* customer price (after discount),
 * not the calculator's original figure, so a later manual edit or discount
 * is reflected — and a loss-making trip shows up in red.
 */
export function DriverPricingSummary({
  breakdown,
  customerPrice,
  currency,
}: {
  breakdown: unknown;
  customerPrice: number;
  currency: string;
}) {
  const driverPrice = readDriverPrice(breakdown);
  if (driverPrice === null) {
    return (
      <p className="p-4 text-xs text-admin-stone">
        No driver price recorded. Use &ldquo;Driver price + commission&rdquo; in the quotation&apos;s price calculator to keep track of what the driver gets.
      </p>
    );
  }

  const commission = customerPrice - driverPrice;
  return (
    <div className="p-4 space-y-1.5 text-sm">
      <div className="flex items-center justify-between text-admin-stone">
        <span>Customer price</span>
        <span className="text-admin-ink">{formatCurrency(customerPrice, currency)}</span>
      </div>
      <div className="flex items-center justify-between text-admin-stone">
        <span>Driver price</span>
        <span className="text-admin-ink">-{formatCurrency(driverPrice, currency)}</span>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-admin-line font-semibold text-admin-ink">
        <span>Our commission</span>
        <span className={commission < 0 ? "text-red-700" : ""}>{formatCurrency(commission, currency)}</span>
      </div>
      {commission < 0 ? <p className="text-xs text-red-700">Customer price is below the driver price — this trip loses money.</p> : null}
    </div>
  );
}
