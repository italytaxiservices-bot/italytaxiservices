import type { Metadata } from 'next'
import { Geist, Playfair_Display } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
})
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LanguageSelector from '@/components/LanguageSelector'

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Italy Chauffeur | Private NCC Transfers Across Italy',
    template: '%s | Italy Chauffeur',
  },
  description: 'Professional private chauffeur and NCC transfer service across Italy. Airport transfers, luxury chauffeur, and long-distance private transfers. Licensed operators, fixed prices, meet & greet.',
  keywords: ['italy chauffeur', 'private driver italy', 'NCC italy', 'airport transfer italy', 'malpensa transfer', 'fiumicino transfer', 'private chauffeur milan', 'private chauffeur rome'],
  authors: [{ name: 'Italy Chauffeur' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://italychauffeur.com'),
  openGraph: {
    type: 'website',
    siteName: 'Italy Chauffeur',
    title: 'Italy Chauffeur | Private NCC Transfers Across Italy',
    description: 'Professional private chauffeur and NCC transfer service across Italy. Fixed prices, meet & greet, 24/7.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Italy Chauffeur | Private NCC Transfers',
    description: 'Professional private chauffeur and NCC transfer service across Italy.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable} h-full`}>
      <body className={`${playfair.variable} min-h-full flex flex-col`}>
        <LanguageSelector />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
