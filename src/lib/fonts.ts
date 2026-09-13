import { Playfair_Display, Inter } from "next/font/google";

// Shared across every root layout (app/(en), app/it, app/admin, app/(customer))
// so the same font instances/CSS variables are reused instead of re-fetched —
// see Next.js's "Using Multiple Fonts" guidance for this exact pattern.
export const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
