import type { Metadata } from 'next'
import CityPageTemplate from '@/components/templates/CityPageTemplate'
import { cities } from '@/data/cities'

export const metadata: Metadata = {
  title: 'Servizio Chauffeur Privato Milano | NCC Milano | Italy Taxi Services',
  description: 'Chauffeur privato NCC a Milano. Transfer Malpensa, Linate, Bergamo. Lago di Como, Lugano, centri congressi. Prezzi fissi, disponibilità 24/7. Prenota ora.',
  alternates: {
    canonical: '/it/servizio-chauffeur-milano',
    languages: { en: '/milan-chauffeur-service', it: '/it/servizio-chauffeur-milano', 'x-default': '/milan-chauffeur-service' },
  },
}

const city = cities.find(c => c.slug === 'milan')!

export default function MilanoPage() {
  return (
    <CityPageTemplate
      city={city}
      locale="it"
      baseHref="/it"
      airportHrefFn={(slug) => `/it/transfer-aeroporto-${slug === 'malpensa' ? 'malpensa' : slug === 'linate' ? 'linate' : 'bergamo'}`}
      routeHrefFn={(slug) => {
        const map: Record<string, string> = {
          'malpensa-to-milan': '/it/malpensa-milano',
          'malpensa-to-lake-como': '/it/malpensa-lago-como',
          'milan-to-venice': '/milan-to-venice',
        }
        return map[slug] ?? `/${slug}`
      }}
      highlights={[
        'Transfer Malpensa, Linate, Bergamo',
        'Servizio Lago di Como e Lugano',
        'Trasferimenti aziendali e VIP',
        'Disponibilità 24/7',
      ]}
      about={`Milano è il cuore economico e finanziario d'Italia — capitale della moda, del design e degli affari internazionali. Con tre aeroporti internazionali (Malpensa, Linate e Bergamo/Orio al Serio), la città genera un volume elevatissimo di transfer privati ogni giorno.

Il nostro servizio NCC a Milano copre tutti i principali trasferimenti: dall'aeroporto di Malpensa al centro città, dal Linate alle sedi aziendali, e dai terminal di Bergamo verso le destinazioni del Nord Italia.

Operiamo anche verso le destinazioni più richieste dalla clientela internazionale: il Lago di Como, Bellagio, Lugano (Svizzera), Bergamo città e le principali location congressuali della provincia.`}
      services={[
        {
          title: 'Transfer Aeroporto Malpensa (MXP)',
          description: 'Transfer privato dal più grande aeroporto della Lombardia. Da €85 per auto berlina. Monitoraggio volo e meet & greet inclusi.',
        },
        {
          title: 'Transfer Aeroporto Linate (LIN)',
          description: 'Transfer dall\'aeroporto cittadino di Milano. Ideale per i voli nazionali ed europei. Rapido accesso al centro città.',
        },
        {
          title: 'Transfer Aeroporto Bergamo (BGY)',
          description: 'Trasferimento dall\'aeroporto di Bergamo Orio al Serio verso Milano e tutta la Lombardia. Da €90.',
        },
        {
          title: 'Servizio Lago di Como',
          description: 'Transfer privato da Milano verso Como, Bellagio, Varenna, Cernobbio e tutte le località del lago. Da €130 da Malpensa.',
        },
        {
          title: 'Trasferimenti Aziendali',
          description: 'Servizio NCC per aziende, roadshow, congressi e fiere. Fatturazione B2B disponibile. Gestione di più veicoli per eventi.',
        },
        {
          title: 'Trasferimenti a Lunga Percorrenza',
          description: 'Da Milano verso Venezia, Firenze, Bologna, Torino e tutta l\'Italia. Prezzi fissi concordati in anticipo.',
        },
      ]}
    />
  )
}
