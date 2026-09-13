import type { Metadata } from 'next'
import CityPageTemplate from '@/components/templates/CityPageTemplate'
import { cities } from '@/data/cities'

export const metadata: Metadata = {
  title: 'Servizio Chauffeur Privato Roma | NCC Roma',
  description: 'Chauffeur privato NCC a Roma. Transfer Fiumicino FCO, Ciampino CIA, Civitavecchia, Costiera Amalfitana. Prezzi fissi, meet & greet. Prenota ora.',
  alternates: {
    canonical: '/it/servizio-chauffeur-roma',
    languages: { en: '/rome-chauffeur-service', it: '/it/servizio-chauffeur-roma', 'x-default': '/rome-chauffeur-service' },
  },
}

const city = cities.find(c => c.slug === 'rome')!

export default function RomaPage() {
  return (
    <CityPageTemplate
      city={city}
      locale="it"
      baseHref="/it"
      airportHrefFn={(slug) => {
        const map: Record<string, string> = {
          fiumicino: '/it/transfer-aeroporto-fiumicino',
          ciampino: '/ciampino-airport-transfer',
        }
        return map[slug] ?? `/${slug}-airport-transfer`
      }}
      routeHrefFn={(slug) => {
        const map: Record<string, string> = {
          'fiumicino-to-rome': '/it/fiumicino-roma',
          'fiumicino-to-civitavecchia': '/it/fiumicino-civitavecchia',
          'rome-to-amalfi-coast': '/it/roma-costiera-amalfitana',
        }
        return map[slug] ?? `/${slug}`
      }}
      highlights={[
        'Transfer Fiumicino FCO e Ciampino CIA',
        'Trasferimenti per Civitavecchia',
        'Costiera Amalfitana e Napoli',
        'Tour privati e servizio VIP',
      ]}
      about={`Roma è la Capitale d'Italia e una delle mete turistiche più visitate al mondo. Con due aeroporti internazionali — Fiumicino (FCO) e Ciampino (CIA) — e il porto crocieristico di Civitavecchia, la città genera un enorme flusso di transfer privati tutto l'anno.

Il nostro servizio NCC a Roma copre tutti i principali spostamenti: dall'aeroporto di Fiumicino al centro storico, da Ciampino agli alberghi di lusso, e da Roma verso le destinazioni più richieste del Centro e Sud Italia.

Siamo specializzati anche nei transfer verso il porto di Civitavecchia (crociere), la Costiera Amalfitana, Napoli e Pompei — percorsi che richiedono autisti esperti e veicoli adeguati.`}
      services={[
        {
          title: 'Transfer Aeroporto Fiumicino (FCO)',
          description: 'Transfer privato dal Leonardo da Vinci — il principale aeroporto di Roma. Da €65 per berlina. Meet & greet nel terminal arrivi.',
        },
        {
          title: 'Transfer Aeroporto Ciampino (CIA)',
          description: 'Transfer dall\'aeroporto low-cost di Ciampino. Servizio puntuale per voli Ryanair, easyJet e altri vettori. Da €55.',
        },
        {
          title: 'Transfer Porto Civitavecchia',
          description: 'Trasferimento diretto da Roma al porto crocieristico di Civitavecchia. Ideale per imbarco e sbarco crociere. Da €110.',
        },
        {
          title: 'Costiera Amalfitana',
          description: 'Transfer privato da Roma verso Positano, Amalfi, Ravello e tutta la Costiera. Autisti esperti sulla SS163. Da €380.',
        },
        {
          title: 'Tour e Escursioni',
          description: 'Tour privati con autista da Roma verso Pompei, Castel Gandolfo, Tivoli e le principali attrazioni laziali e campane.',
        },
        {
          title: 'Servizio Aziendale Roma',
          description: 'NCC per aziende, ambasciatori, politici e VIP. Fatturazione B2B. Discrezione e professionalità garantite.',
        },
      ]}
    />
  )
}
