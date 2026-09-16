import type { Metadata } from 'next'
import { Geist, Playfair_Display } from 'next/font/google'
import '../globals.css'
import SiteChrome from '@/components/layout/SiteChrome'

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
})

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Italy Taxi Services — Servizio NCC Privato in Italia',
    template: '%s | Italy Taxi Services',
  },
  description: 'Servizio chauffeur privato e transfer NCC in Italia. Transfer aeroporto, servizio auto con conducente, prezzi fissi. Milano, Roma, Venezia, Firenze.',
  authors: [{ name: 'Italy Taxi Services' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.italytaxiservices.com'),
  icons: {
    icon: '/logo.webp',
    shortcut: '/logo.webp',
    apple: '/logo.webp',
  },
  alternates: {
    canonical: '/it',
    languages: {
      en: '/',
      it: '/it',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'Italy Taxi Services',
    url: '/it',
    title: 'Italy Taxi Services — Servizio NCC Privato in Italia',
    description: 'Servizio chauffeur privato e transfer NCC in Italia. Prezzi fissi, meet & greet, 24/7.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Italy Taxi Services — Servizio NCC Privato in Italia',
    description: 'Servizio chauffeur privato e transfer NCC in Italia.',
    images: ['/logo.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '3QLSx2WvXzTiR7hiJWkJlj5Fmk5-8I5u0mboY-0j1Jo',
    other: {
      'msvalidate.01': 'BC23B2D9B8C6EFC647D1245BDFAD512B',
      'p:domain_verify': '73d2c7f39b34f69816303282fd47a177',
    },
  },
}

export default function ItRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${geist.variable} ${playfair.variable} h-full`}>
      <body className={`${playfair.variable} min-h-full flex flex-col`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
