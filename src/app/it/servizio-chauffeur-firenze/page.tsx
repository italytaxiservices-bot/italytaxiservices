import type { Metadata } from 'next'
import CityPageTemplate from '@/components/templates/CityPageTemplate'
import { cities } from '@/data/cities'

export const metadata: Metadata = {
  title: 'Servizio Chauffeur Privato Firenze | NCC Firenze | Italy Chauffeur',
  description: 'Chauffeur privato NCC a Firenze. Transfer Peretola FLR, Pisa PSA. Tour Toscana, Siena, Chianti, Pisa, Roma. Prezzi fissi. Prenota ora.',
  alternates: {
    canonical: '/it/servizio-chauffeur-firenze',
    languages: { en: '/florence-chauffeur-service', it: '/it/servizio-chauffeur-firenze' },
  },
}

const city = cities.find(c => c.slug === 'florence')!

export default function FirenzeePage() {
  return (
    <CityPageTemplate
      city={city}
      locale="it"
      baseHref="/it"
      airportHrefFn={(slug) => `/${slug === 'florence' ? 'florence' : 'pisa'}-airport-transfer`}
      routeHrefFn={(slug) => {
        const map: Record<string, string> = {
          'florence-to-pisa': '/it/firenze-pisa',
          'florence-to-siena': '/florence-to-siena',
        }
        return map[slug] ?? `/${slug}`
      }}
      highlights={[
        'Transfer Aeroporto Peretola (FLR) e Pisa (PSA)',
        'Tour Toscana — Siena, Chianti, San Gimignano',
        'Pisa e Torre Pendente',
        'Trasferimenti a lunga percorrenza verso Roma',
      ]}
      about={`Firenze è la culla del Rinascimento italiano — una città di inestimabile valore artistico e culturale. Con due aeroporti nelle vicinanze (Peretola/Firenze e Pisa Galileo Galilei) e un'ottima posizione geografica al centro della Toscana, Firenze è il punto di partenza ideale per esplorare la regione.

Il nostro servizio NCC a Firenze copre tutti i principali trasferimenti: dall'aeroporto di Peretola al centro storico, da Pisa a Firenze, e da Firenze verso le principali destinazioni toscane — Siena, San Gimignano, il Chianti, Lucca e la Val d'Orcia.

Operiamo anche sulla tratta Firenze–Roma, uno dei percorsi interregionali più richiesti d'Italia, e verso Pisa per le gite giornaliere alla Torre Pendente.`}
      services={[
        {
          title: 'Transfer Aeroporto Firenze (FLR)',
          description: 'Transfer dall\'Aeroporto Amerigo Vespucci di Firenze al centro storico e alle principali strutture ricettive. Da €55.',
        },
        {
          title: 'Transfer Aeroporto Pisa (PSA)',
          description: 'Collegamento dall\'aeroporto Galileo Galilei di Pisa verso Firenze e tutta la Toscana. Da €95.',
        },
        {
          title: 'Tour Toscana Privati',
          description: 'Escursioni private con autista verso Siena, San Gimignano, Montalcino, il Chianti e la Val d\'Orcia.',
        },
        {
          title: 'Firenze → Pisa Giornaliero',
          description: 'Transfer andata e ritorno Firenze–Pisa con sosta alla Torre Pendente. Autista in attesa durante la visita.',
        },
        {
          title: 'Firenze → Siena',
          description: 'Transfer privato nella città medievale più bella della Toscana. Ideale in abbinata con il Chianti Classico.',
        },
        {
          title: 'Firenze → Roma',
          description: 'Trasferimento interregionale Firenze–Roma in massimo comfort. Circa 3h via autostrada. Da €320.',
        },
      ]}
    />
  )
}
