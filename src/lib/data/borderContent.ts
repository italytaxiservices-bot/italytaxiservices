import type { BorderRoute } from '@/data/borders'

/**
 * Generates unique long-form about text, border-crossing tips and FAQs for
 * each cross-border route from its data fields. Content is tailored by
 * destination country (Schengen status, motorway vignette rules, documents)
 * so every page is genuinely distinct rather than boilerplate.
 */

interface CountryInfo {
  schengen: boolean
  vignette: boolean
  note: string
  docNote: string
}

const COUNTRY: Record<string, CountryInfo> = {
  CH: {
    schengen: true,
    vignette: true,
    note: 'Switzerland sits outside the EU customs union but is part of the Schengen Area, so there are usually no routine passport controls — though Swiss customs can carry out spot checks.',
    docNote: 'Carry a valid passport or EU/EEA national ID card. Swiss motorways require an annual vignette (motorway sticker); our vehicles already carry a valid one, so there is nothing for you to arrange or pay at the border.',
  },
  AT: {
    schengen: true,
    vignette: true,
    note: 'Austria is a member of both the EU and the Schengen Area, so the crossing is seamless with no routine border formalities.',
    docNote: 'Carry a valid passport or national ID card for occasional spot checks. Austrian motorways require a vignette, which our vehicles already carry — toll is included in your fixed price.',
  },
  FR: {
    schengen: true,
    vignette: false,
    note: 'France is a member of both the EU and the Schengen Area, so you cross without routine border controls.',
    docNote: 'Carry a valid passport or national ID card. French autoroute tolls are included in your fixed price — your driver handles the péage barriers.',
  },
  SI: {
    schengen: true,
    vignette: true,
    note: 'Slovenia is a member of both the EU and the Schengen Area, so the border crossing is quick and routine.',
    docNote: 'Carry a valid passport or national ID card. Slovenian motorways require a vignette, which our vehicles already carry.',
  },
  MC: {
    schengen: true,
    vignette: false,
    note: 'The Principality of Monaco is a sovereign city-state with an open border with France — there is no formal passport control on arrival.',
    docNote: 'Carry a valid passport or national ID card. All tolls on the French approach roads are included in your fixed price.',
  },
}

export interface BorderContent {
  about: string
  tips: string[]
  faqs: { q: string; a: string }[]
}

export function getBorderContent(route: BorderRoute): BorderContent {
  const c = COUNTRY[route.toCountryCode] ?? COUNTRY.FR
  const from = route.fromName
  const to = route.toName

  const about = [
    route.description,
    `The journey from ${from} to ${to} covers approximately ${route.distance} and takes around ${route.estimatedTime}, crossing from Italy into ${route.toCountry} at the ${route.crossingPoint}. Your NCC chauffeur manages the entire crossing as part of the fixed, pre-agreed price — there is nothing for you to organise at the frontier.`,
    `${c.note} ${c.docNote}`,
    `We operate this cross-border route with modern, air-conditioned Mercedes vehicles and experienced drivers who cover the Italy–${route.toCountry} frontier regularly. Whether you are travelling for business, connecting to an airport, or heading to a resort, the transfer is door to door with no changes, no public transport, and no language barrier.`,
  ].join('\n\n')

  const tips: string[] = [
    c.docNote,
    `Keep your travel documents within easy reach in case ${route.toCountry} customs carry out a spot check at the ${route.crossingPoint}.`,
    'Let us know your pickup address and any flight or train number when booking so we can plan timing and monitor delays.',
    'Border traffic can build up at peak holiday periods and on Sunday evenings — we factor this into the journey time for your route.',
    'Return and round-trip transfers are available; booking both directions together guarantees availability and a fixed price each way.',
  ]

  const faqs: { q: string; a: string }[] = [
    {
      q: `How long does the ${from} to ${to} transfer take?`,
      a: `The ${from} to ${to} private transfer takes approximately ${route.estimatedTime}, covering about ${route.distance} and crossing into ${route.toCountry} at the ${route.crossingPoint}. Times can vary with traffic and border conditions.`,
    },
    {
      q: `How much is a private transfer from ${from} to ${to}?`,
      a: `Our ${from} to ${to} cross-border transfer starts from €${route.priceFrom}. The price is fixed and agreed in writing before you travel — it includes the border crossing, all motorway tolls${c.vignette ? ' and vignettes' : ''}, and waiting time. No meter, no surprises.`,
    },
    {
      q: `What documents do I need to cross from Italy into ${route.toCountry}?`,
      a: c.docNote,
    },
    {
      q: 'Is the border crossing included in the price?',
      a: `Yes. The ${route.crossingPoint} crossing, all tolls${c.vignette ? ', motorway vignettes' : ''} and your driver's time are all included in the fixed price. Your chauffeur handles the crossing — you simply stay in the car.`,
    },
    {
      q: `Can you do the return journey, ${to} to ${from}?`,
      a: `Yes, we operate this route in both directions at the same fixed price. Book both legs together for guaranteed availability.`,
    },
  ]

  return { about, tips, faqs }
}
