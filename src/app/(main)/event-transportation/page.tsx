import type { Metadata } from 'next'
import { ServicePageBody, getServiceMetadata } from '@/components/templates/ServicePage'

export const metadata: Metadata = getServiceMetadata('event-transportation')

export default function Page() {
  return <ServicePageBody slug="event-transportation" />
}
