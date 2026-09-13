'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import Header from './Header'
import Footer from './Footer'
import LanguageSelector from '@/components/LanguageSelector'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <LanguageSelector />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Google Analytics */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-Z3KBQT2WL1" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Z3KBQT2WL1');
        `}
      </Script>

      {/* Microsoft Clarity */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "yhm4fipxmh");
        `}
      </Script>

      {/* Ahrefs Analytics */}
      <Script src="https://analytics.ahrefs.com/analytics.js" data-key="rRfBWj06sPesk+Nayz+xmQ" strategy="afterInteractive" />
    </>
  )
}
