import type { Metadata } from 'next'
import { Geist, Playfair_Display } from 'next/font/google'
import '../globals.css'

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
})
import SiteChrome from '@/components/layout/SiteChrome'

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Italy Taxi Services | Private NCC Transfers Across Italy',
    template: '%s | Italy Taxi Services',
  },
  description: 'Professional private chauffeur and NCC transfer service across Italy. Airport transfers, luxury chauffeur, and long-distance private transfers. Licensed operators, fixed prices, meet & greet.',
  keywords: ['italy taxi services', 'private driver italy', 'NCC italy', 'airport transfer italy', 'malpensa transfer', 'fiumicino transfer', 'private chauffeur milan', 'private chauffeur rome'],
  authors: [{ name: 'Italy Taxi Services' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.italytaxiservices.com'),
  icons: {
    icon: '/logo.webp',
    shortcut: '/logo.webp',
    apple: '/logo.webp',
  },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    title: 'Italy Taxi Services | Private NCC Transfers Across Italy',
    description: 'Professional private chauffeur and NCC transfer service across Italy. Fixed prices, meet & greet, 24/7.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Italy Taxi Services | Private NCC Transfers',
    description: 'Professional private chauffeur and NCC transfer service across Italy.',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable} h-full`}>
      <body className={`${playfair.variable} min-h-full flex flex-col`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
