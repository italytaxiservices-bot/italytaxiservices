import type { Metadata } from "next";
import type { ReactNode } from "react";
import { playfair, inter } from "@/lib/fonts";
import { siteConfig } from "@/lib/siteConfig";

// This is nested under the marketing site's root layout (src/app/layout.tsx),
// which already provides <html>/<body> — so this renders a plain wrapper
// instead of its own <html>/<body> (Next.js only allows one of each per
// response). SiteChrome (in the root layout) skips the marketing
// header/footer/analytics for /admin/* routes based on pathname.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${playfair.variable} ${inter.variable} antialiased min-h-full flex flex-col bg-admin-ivory text-admin-ink`}>
      {children}
    </div>
  );
}
