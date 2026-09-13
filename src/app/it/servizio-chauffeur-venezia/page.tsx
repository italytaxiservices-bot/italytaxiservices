import type { Metadata } from 'next'
import CityPageTemplate from '@/components/templates/CityPageTemplate'
import { cities } from '@/data/cities'

export const metadata: Metadata = {
  title: 'Servizio Chauffeur Privato Venezia | NCC Venezia',
  description: 'Chauffeur privato NCC a Venezia. Transfer Marco Polo VCE, Treviso. Terminal crociere, Verona, Padova, Bologna. Prezzi fissi. Prenota ora.',
  alternates: {
    canonical: '/it/servizio-chauffeur-venezia',
    languages: { en: '/venice-chauffeur-service', it: '/it/servizio-chauffeur-venezia', 'x-default': '/venice-chauffeur-service' },
  },
}

const city = cities.find(c => c.slug === 'venice')!

export default function VeneziaPage() {
  return (
    <CityPageTemplate
      city={city}
      locale="it"
      baseHref="/it"
      airportHrefFn={() => '/it/transfer-aeroporto-venezia'}
      routeHrefFn={(slug) => `/${slug}`}
      highlights={[
        'Transfer Aeroporto Marco Polo VCE',
        'Trasferimenti Terminal Crociere',
        'Verona, Padova, Treviso',
        'Gruppi e pullman disponibili',
      ]}
      about={`Venezia è una delle destinazioni più affascinanti e uniche al mondo. Il servizio NCC a Venezia opera principalmente da Venezia Mestre e da piazzale Roma — poiché il centro storico non è accessibile ai veicoli — e copre tutte le destinazioni raggiungibili in terraferma.

L'aeroporto di Venezia Marco Polo (VCE) è uno dei principali scali del Nord-Est Italia, con collegamenti verso le principali destinazioni europee e intercontinentali. Operiamo anche dal minor aeroporto di Treviso (TSF), usato da compagnie low-cost.

Oltre all'aeroporto, siamo specializzati nei transfer per il Terminal Crociere di Venezia — uno degli scali crocieristici più frequentati del Mediterraneo — e nei trasferimenti verso Verona, Padova, Bologna e il lago di Garda.`}
      services={[
        {
          title: 'Transfer Aeroporto Marco Polo (VCE)',
          description: 'Transfer privato dall\'aeroporto di Venezia verso Mestre, Venezia centro, Padova, Verona e tutto il Veneto. Prezzi fissi.',
        },
        {
          title: 'Transfer Terminal Crociere Venezia',
          description: 'Transfer diretto al terminal crocieristico di Venezia da qualsiasi destinazione del Veneto e del Nord Italia.',
        },
        {
          title: 'Transfer per Verona',
          description: 'Collegamento privato Venezia–Verona, ideale per visitare l\'Arena, il Festival lirico e le principali attrazioni veronesi.',
        },
        {
          title: 'Transfer per Padova',
          description: 'Servizio NCC tra Venezia e Padova, con possibilità di visite guidate private alla Cappella degli Scrovegni e al Santo.',
        },
        {
          title: 'Transfer per Treviso e Dintorni',
          description: 'Servizio dall\'aeroporto di Treviso (TSF) e dalle principali stazioni ferroviarie verso le destinazioni del Veneto.',
        },
        {
          title: 'Trasferimenti di Gruppo',
          description: 'Van e minibus per gruppi fino a 8 persone. Ideale per tour operator, agenzie viaggi e gruppi familiari.',
        },
      ]}
    />
  )
}
