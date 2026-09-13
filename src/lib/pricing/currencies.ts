export const SUPPORTED_CURRENCIES = ["EUR", "USD", "GBP", "SAR", "AED", "KWD"] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export function isSupportedCurrency(value: string): value is SupportedCurrency {
  return (SUPPORTED_CURRENCIES as readonly string[]).includes(value);
}
