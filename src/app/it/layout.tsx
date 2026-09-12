import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Italy Taxi Services — Servizio NCC Privato in Italia',
    template: '%s | Italy Taxi Services',
  },
  description: 'Servizio chauffeur privato e transfer NCC in Italia. Transfer aeroporto, servizio auto con conducente, prezzi fissi. Milano, Roma, Venezia, Firenze.',
  alternates: {
    canonical: '/it',
    languages: {
      'en': '/',
      'it': '/it',
    },
  },
}

export default function ItLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
