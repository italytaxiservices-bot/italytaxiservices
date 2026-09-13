import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import AirportTransfers from '@/components/home/AirportTransfers'
import PopularRoutes from '@/components/home/PopularRoutes'
import HowItWorks from '@/components/home/HowItWorks'
import FleetSection from '@/components/home/FleetSection'
import WhyUs from '@/components/home/WhyUs'
import Reviews from '@/components/home/Reviews'
import FAQ from '@/components/home/FAQ'
import FinalCTA from '@/components/home/FinalCTA'
import SEOContent from '@/components/home/SEOContent'

export const metadata: Metadata = {
  title: 'Italy Taxi Services | Private NCC Transfers Across Italy',
  description: 'Professional private chauffeur and NCC transfer service across Italy. Airport transfers from Malpensa, Fiumicino, Marco Polo. Luxury transfers to Lake Como, Amalfi Coast, and beyond. Fixed prices, meet & greet.',
  alternates: { canonical: '/' },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Italy Taxi Services',
  description: 'Professional private chauffeur and NCC transfer service across Italy',
  url: 'https://www.italytaxiservices.com',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['English', 'Italian'],
  },
  areaServed: { '@type': 'Country', name: 'Italy' },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Private Chauffeur & NCC Transfer Service Italy',
  provider: { '@type': 'Organization', name: 'Italy Taxi Services' },
  description: 'Licensed NCC private chauffeur transfers across Italy including airport transfers, long-distance routes, and luxury chauffeur service.',
  areaServed: { '@type': 'Country', name: 'Italy' },
  serviceType: 'Private Chauffeur Transfer',
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Hero />
      <AirportTransfers />
      <PopularRoutes />
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
