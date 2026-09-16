import type { Metadata } from 'next'
import { ServicePageBody, getServiceMetadata } from '@/components/templates/ServicePage'

export const metadata: Metadata = getServiceMetadata('italy-private-tours')

export default function Page() {
  return <ServicePageBody slug="italy-private-tours" />
}
