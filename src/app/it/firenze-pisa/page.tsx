import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Transfer Privato Firenze Pisa | Torre Pendente | Italy Taxi Services',
  description: 'Transfer privato NCC da Firenze a Pisa. Torre Pendente, gita giornaliera o one-way. Da €95. Autista in attesa. Prenota ora.',
  alternates: {
    canonical: '/it/firenze-pisa',
    languages: { en: '/florence-to-pisa', it: '/it/firenze-pisa', 'x-default': '/florence-to-pisa' },
  },
}

const route = getRouteBySlug('florence-to-pisa')!

export default function FirenzePisaPage() {
  return (
    <RoutePageTemplate
      route={route}
      locale="it"
      baseHref="/it"
      about={`Il transfer privato NCC da Firenze a Pisa è una delle escursioni giornaliere più popolari della Toscana. Pisa ospita la famosa Torre Pendente in Piazza dei Miracoli — uno dei monumenti più iconici e fotografati d\'Italia e del mondo.

Il viaggio da Firenze a Pisa richiede circa 60–75 minuti via autostrada FI-PI-LI (Firenze–Pisa–Livorno) — un percorso comodo e veloce attraverso la campagna toscana.

Il servizio è disponibile sia come gita giornaliera (con autista in attesa a Pisa mentre visitate la Torre, il Duomo e il Battistero) sia come transfer one-way, incluso il collegamento con l\'Aeroporto Galileo Galilei di Pisa (PSA) — vicinissimo alla Torre Pendente.`}
      included={[
        'Transfer porta a porta Firenze → Pisa',
        'Consegna in prossimità di Piazza dei Miracoli',
        'Prezzo fisso — nessun tassametro',
        'Opzione gita giornaliera (autista in attesa)',
        'Chauffeur NCC professionale',
        'Acqua minerale in omaggio',
        'Trasferimento di ritorno prenotabile contestualmente',
        'Collegamento con l\'Aeroporto di Pisa disponibile',
      ]}
      faqs={[
        {
          q: 'Posso prenotare una gita giornaliera Firenze–Pisa e ritorno?',
          a: 'Sì. Il driver vi porta a Pisa, aspetta mentre visitate (in genere 2–4 ore), e vi riporta a Firenze. Indicate l\'opzione "gita giornaliera" al momento della prenotazione — il prezzo è diverso dal solo andata.',
        },
        {
          q: 'Potete consegnarmi all\'Aeroporto di Pisa invece che in città?',
          a: 'Sì. L\'aeroporto Galileo Galilei (PSA) è vicinissimo alla Torre Pendente. Possiamo combinare una sosta in Piazza dei Miracoli con la consegna in aeroporto. Indicate questa opzione nella prenotazione.',
        },
        {
          q: 'È possibile fermarsi a Lucca durante il percorso?',
          a: 'Sì. Lucca è lungo il percorso e può essere inclusa come sosta aggiuntiva. Si aggiunge circa 1 ora alla durata totale. Indicate le vostre preferenze al momento della prenotazione per il preventivo.',
        },
        {
          q: 'Il percorso è panoramico?',
          a: 'Il percorso autostradale è veloce ed efficiente. Per un\'esperienza più panoramica attraverso la campagna toscana, potete richiedere il percorso alternativo via Empoli — più lungo ma molto più suggestivo.',
        },
      ]}
    />
  )
}
