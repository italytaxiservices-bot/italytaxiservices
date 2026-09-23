import type { Metadata } from 'next'
import { Roboto, Poppins } from 'next/font/google'
import '../globals.css'

// Google-style typography: Roboto for body/UI, Poppins (a free Google Sans-like
// geometric sans) for display headings. Mapped onto the existing --font-sans /
// --font-serif CSS variables so no component styles need to change.
const poppins = Poppins({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})
import SiteChrome from '@/components/layout/SiteChrome'

const roboto = Roboto({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
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
    url: '/',
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
    <html lang="en" className={`${roboto.variable} ${poppins.variable} h-full`}>
      <body className={`${poppins.variable} min-h-full flex flex-col`} suppressHydrationWarning>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
