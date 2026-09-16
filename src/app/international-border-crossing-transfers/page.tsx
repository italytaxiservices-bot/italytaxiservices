import type { Metadata } from 'next'
import { ServicePageBody, getServiceMetadata } from '@/components/templates/ServicePage'

export const metadata: Metadata = getServiceMetadata('international-border-crossing-transfers')

export default function Page() {
  return <ServicePageBody slug="international-border-crossing-transfers" />
}
