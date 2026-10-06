/**
 * International phone handling for the public booking form. Every number
 * must carry a country code so staff can open WhatsApp (wa.me needs the
 * full international number) without guessing where the customer is from.
 */

export const DIAL_CODES: { code: string; country: string; flag: string }[] = [
  { code: "39", country: "Italy", flag: "🇮🇹" },
  { code: "44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "1", country: "USA / Canada", flag: "🇺🇸" },
  { code: "61", country: "Australia", flag: "🇦🇺" },
  { code: "49", country: "Germany", flag: "🇩🇪" },
  { code: "33", country: "France", flag: "🇫🇷" },
  { code: "34", country: "Spain", flag: "🇪🇸" },
  { code: "41", country: "Switzerland", flag: "🇨🇭" },
  { code: "31", country: "Netherlands", flag: "🇳🇱" },
  { code: "32", country: "Belgium", flag: "🇧🇪" },
  { code: "43", country: "Austria", flag: "🇦🇹" },
  { code: "353", country: "Ireland", flag: "🇮🇪" },
  { code: "351", country: "Portugal", flag: "🇵🇹" },
  { code: "46", country: "Sweden", flag: "🇸🇪" },
  { code: "47", country: "Norway", flag: "🇳🇴" },
  { code: "45", country: "Denmark", flag: "🇩🇰" },
  { code: "358", country: "Finland", flag: "🇫🇮" },
  { code: "48", country: "Poland", flag: "🇵🇱" },
  { code: "420", country: "Czech Republic", flag: "🇨🇿" },
  { code: "36", country: "Hungary", flag: "🇭🇺" },
  { code: "40", country: "Romania", flag: "🇷🇴" },
  { code: "30", country: "Greece", flag: "🇬🇷" },
  { code: "385", country: "Croatia", flag: "🇭🇷" },
  { code: "356", country: "Malta", flag: "🇲🇹" },
  { code: "352", country: "Luxembourg", flag: "🇱🇺" },
  { code: "354", country: "Iceland", flag: "🇮🇸" },
  { code: "7", country: "Russia / Kazakhstan", flag: "🇷🇺" },
  { code: "380", country: "Ukraine", flag: "🇺🇦" },
  { code: "90", country: "Turkey", flag: "🇹🇷" },
  { code: "972", country: "Israel", flag: "🇮🇱" },
  { code: "971", country: "United Arab Emirates", flag: "🇦🇪" },
  { code: "966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "974", country: "Qatar", flag: "🇶🇦" },
  { code: "965", country: "Kuwait", flag: "🇰🇼" },
  { code: "973", country: "Bahrain", flag: "🇧🇭" },
  { code: "968", country: "Oman", flag: "🇴🇲" },
  { code: "961", country: "Lebanon", flag: "🇱🇧" },
  { code: "962", country: "Jordan", flag: "🇯🇴" },
  { code: "20", country: "Egypt", flag: "🇪🇬" },
  { code: "212", country: "Morocco", flag: "🇲🇦" },
  { code: "27", country: "South Africa", flag: "🇿🇦" },
  { code: "234", country: "Nigeria", flag: "🇳🇬" },
  { code: "91", country: "India", flag: "🇮🇳" },
  { code: "92", country: "Pakistan", flag: "🇵🇰" },
  { code: "86", country: "China", flag: "🇨🇳" },
  { code: "852", country: "Hong Kong", flag: "🇭🇰" },
  { code: "81", country: "Japan", flag: "🇯🇵" },
  { code: "82", country: "South Korea", flag: "🇰🇷" },
  { code: "65", country: "Singapore", flag: "🇸🇬" },
  { code: "60", country: "Malaysia", flag: "🇲🇾" },
  { code: "62", country: "Indonesia", flag: "🇮🇩" },
  { code: "66", country: "Thailand", flag: "🇹🇭" },
  { code: "63", country: "Philippines", flag: "🇵🇭" },
  { code: "84", country: "Vietnam", flag: "🇻🇳" },
  { code: "64", country: "New Zealand", flag: "🇳🇿" },
  { code: "55", country: "Brazil", flag: "🇧🇷" },
  { code: "54", country: "Argentina", flag: "🇦🇷" },
  { code: "52", country: "Mexico", flag: "🇲🇽" },
  { code: "56", country: "Chile", flag: "🇨🇱" },
  { code: "57", country: "Colombia", flag: "🇨🇴" },
  { code: "51", country: "Peru", flag: "🇵🇪" },
];

/**
 * Builds "+<code> <number>" from the form's country-code select and the
 * number the customer typed. A number already typed in international form
 * ("+44 …" or "0044 …") is kept as-is, whatever the select says.
 * Returns null when no country code can be determined.
 */
export function toInternationalPhone(dialCode: string | null | undefined, number: string): string | null {
  const raw = number.trim();
  if (/^(\+|00)/.test(raw)) {
    const digits = raw.replace(/^00/, "").replace(/\D/g, "");
    return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
  }
  const code = (dialCode ?? "").replace(/\D/g, "");
  if (!code) return null;
  // Drop a national trunk "0" (UK 07…, DE 01…); Italian numbers keep it, it's part of the number.
  const local = raw.replace(/\D/g, "").replace(code === "39" ? /^$/ : /^0+/, "");
  const full = `${code}${local}`;
  return local.length >= 6 && full.length <= 15 ? `+${code} ${local}` : null;
}

/** True for a phone that already carries a country code ("+…" / "00…"). */
export function hasCountryCode(phone: string | null | undefined) {
  return !!phone && /^\s*(\+|00)\d/.test(phone);
}
