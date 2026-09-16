import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import AirportTransfers from '@/components/home/AirportTransfers'
import PopularRoutes from '@/components/home/PopularRoutes'
import DestinationsSection from '@/components/home/DestinationsSection'
import HowItWorks from '@/components/home/HowItWorks'
import FleetSection from '@/components/home/FleetSection'
import WhyUs from '@/components/home/WhyUs'
import Reviews from '@/components/home/Reviews'
import FAQ from '@/components/home/FAQ'
import FinalCTA from '@/components/home/FinalCTA'
import SEOContent from '@/components/home/SEOContent'
import { JsonLd, localBusinessSchema, webSiteSchema, taxiServiceSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Italy Taxi Services | Private NCC Transfers — Fixed Prices, 24/7',
  description: 'Rated 4.9★ by 847 travellers. Licensed NCC chauffeurs across Italy — airport transfers, city routes, Amalfi Coast, Lake Como. Fixed price, meet & greet, instant quote.',
  alternates: { canonical: '/', languages: { en: '/', it: '/it', 'x-default': '/' } },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/',
    title: 'Italy Taxi Services | Private NCC Transfers — Fixed Prices, 24/7',
    description: 'Rated 4.9★ by 847 travellers. Licensed NCC chauffeurs across Italy — airport transfers, city routes, Amalfi Coast, Lake Como. Fixed price, meet & greet, instant quote.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Italy Taxi Services | Private NCC Transfers — Fixed Prices, 24/7',
    description: 'Rated 4.9★ by 847 travellers. Licensed NCC chauffeurs across Italy — airport transfers, city routes, Amalfi Coast, Lake Como. Fixed price, meet & greet, instant quote.',
    images: ['/logo.webp'],
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={webSiteSchema()} />
      <JsonLd data={taxiServiceSchema({
        name: 'Private NCC Transfer Service Italy',
        description: 'Licensed NCC private chauffeur transfers across Italy. Airport transfers, city-to-city, Amalfi Coast, Lake Como, cruise ports. Fixed prices, meet & greet, 24/7.',
        url: '/',
        priceFrom: 45,
      })} />
      <Hero />
      <AirportTransfers />
      <PopularRoutes />
      <DestinationsSection />
      <HowItWorks />
      <FleetSection />
      <WhyUs />
      <Reviews />
      <SEOContent />
      <FAQ />
      <FinalCTA />
    </>
  )
}
