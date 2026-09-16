import type { Metadata } from 'next'
import { ServicePageBody, getServiceMetadata } from '@/components/templates/ServicePage'

export const metadata: Metadata = getServiceMetadata('city-to-city-transfers')

export default function Page() {
  return <ServicePageBody slug="city-to-city-transfers" />
}
