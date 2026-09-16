export interface BorderRoute {
  id: string
  slug: string
  fromName: string
  fromCity: string
  toName: string
  toCountry: string
  toCountryCode: string
  flag: string
  estimatedTime: string
  distance: string
  priceFrom: number
  crossingPoint: string
  description: string
  highlights: string[]
}

export const borderRoutes: BorderRoute[] = [
  // ── SWITZERLAND ────────────────────────────────
  {
    id: 'milan-lugano',
    slug: 'milan-to-lugano',
    fromName: 'Milan', fromCity: 'Milan',
    toName: 'Lugano', toCountry: 'Switzerland', toCountryCode: 'CH', flag: '🇨🇭',
    estimatedTime: '60–75 min', distance: '75 km', priceFrom: 120,
    crossingPoint: 'Chiasso / Ponte Chiasso border',
    description: 'Private door-to-door transfer from Milan to Lugano, Switzerland. Cross the Italian-Swiss border at Chiasso with a professional NCC chauffeur — no queues, no public transport, no luggage stress.',
    highlights: ['Fixed price — no meter', 'Door to door, hotel to hotel', 'Border crossing included', 'English-speaking driver', 'Meet & greet available', 'Valid for all Lugano addresses'],
  },
  {
    id: 'malpensa-lugano',
    slug: 'malpensa-to-lugano',
    fromName: 'Malpensa Airport', fromCity: 'Milan',
    toName: 'Lugano', toCountry: 'Switzerland', toCountryCode: 'CH', flag: '🇨🇭',
    estimatedTime: '60–80 min', distance: '70 km', priceFrom: 130,
    crossingPoint: 'Chiasso / Ponte Chiasso border',
    description: 'Direct private transfer from Milan Malpensa Airport (MXP) to Lugano, Switzerland. Flight monitoring and meet & greet included — your driver is waiting when you land.',
    highlights: ['Meet & greet at MXP arrivals', 'Flight monitoring included', 'Fixed price to any Lugano address', 'Border crossing included', 'No train connections needed', 'Luggage assistance'],
  },
  {
    id: 'milan-zurich',
    slug: 'milan-to-zurich',
    fromName: 'Milan', fromCity: 'Milan',
    toName: 'Zurich', toCountry: 'Switzerland', toCountryCode: 'CH', flag: '🇨🇭',
    estimatedTime: '3.5–4 hrs', distance: '290 km', priceFrom: 380,
    crossingPoint: 'Chiasso / Gotthard or Bellinzona',
    description: 'Premium private transfer from Milan to Zurich, Switzerland. Cross the Italian-Swiss border and travel through the stunning Ticino region and Swiss Alps to Zurich city centre.',
    highlights: ['Scenic route through Swiss Alps', 'Fixed price door to door', 'Business sedan or van available', 'Stop in Lugano or Bellinzona on request', 'Professional chauffeur', 'Border crossing included'],
  },
  {
    id: 'milan-geneva',
    slug: 'milan-to-geneva',
    fromName: 'Milan', fromCity: 'Milan',
    toName: 'Geneva', toCountry: 'Switzerland', toCountryCode: 'CH', flag: '🇨🇭',
    estimatedTime: '4–4.5 hrs', distance: '320 km', priceFrom: 420,
    crossingPoint: 'Ponte Tresa or Chiasso',
    description: 'Private transfer from Milan to Geneva — crossing the Alps through northern Italy and into the French-speaking cantons of Switzerland. Ideal for business travellers and Geneva Airport connections.',
    highlights: ['Door to door, Milan to Geneva', 'Business or first class vehicle', 'Fixed price agreed upfront', 'Scenic Alpine route', 'Geneva Airport or city drop-off', 'Available 24/7'],
  },
  {
    id: 'como-lugano',
    slug: 'como-to-lugano',
    fromName: 'Lake Como', fromCity: 'Como',
    toName: 'Lugano', toCountry: 'Switzerland', toCountryCode: 'CH', flag: '🇨🇭',
    estimatedTime: '30–45 min', distance: '35 km', priceFrom: 90,
    crossingPoint: 'Chiasso border crossing',
    description: 'Short private transfer from Lake Como (Como, Bellagio, Varenna) to Lugano, Switzerland. Cross the Swiss border in under an hour — perfect for day trips, shopping, or onward travel.',
    highlights: ['Shortest Italy-Switzerland crossing', 'Pickup from any Como lakeshore hotel', 'Day trip option available', 'Return transfer bookable', 'Fixed price', 'No public transport hassle'],
  },
  {
    id: 'malpensa-zurich',
    slug: 'malpensa-to-zurich',
    fromName: 'Malpensa Airport', fromCity: 'Milan',
    toName: 'Zurich', toCountry: 'Switzerland', toCountryCode: 'CH', flag: '🇨🇭',
    estimatedTime: '3–3.5 hrs', distance: '250 km', priceFrom: 350,
    crossingPoint: 'Chiasso / Gotthard route',
    description: 'Direct airport-to-city transfer from Milan Malpensa Airport (MXP) to Zurich, Switzerland. Flight monitoring included — your driver waits regardless of delays.',
    highlights: ['Flight monitoring at MXP', 'Meet & greet at arrivals', 'Fixed price to Zurich city or airport', 'Border crossing included', 'No train connection needed', 'Professional NCC driver'],
  },

  // ── FRANCE ─────────────────────────────────────
  {
    id: 'ventimiglia-nice',
    slug: 'ventimiglia-to-nice',
    fromName: 'Ventimiglia / Italian Riviera', fromCity: 'Ventimiglia',
    toName: 'Nice', toCountry: 'France', toCountryCode: 'FR', flag: '🇫🇷',
    estimatedTime: '30–45 min', distance: '40 km', priceFrom: 100,
    crossingPoint: 'Ventimiglia / Menton border',
    description: 'Private transfer from Ventimiglia or the Italian Riviera to Nice, France — crossing the France-Italy border at Menton. Perfect for connecting to Nice Airport or the French Riviera.',
    highlights: ['Coastal Riviera route', 'Cross border at Menton', 'Nice Airport or city drop-off', 'Fixed price', 'Pickup from any Italian Riviera hotel', 'Return transfers available'],
  },
  {
    id: 'italy-monaco',
    slug: 'italy-to-monaco',
    fromName: 'Italy (Milan / Genoa / Riviera)', fromCity: 'Various',
    toName: 'Monaco', toCountry: 'Monaco', toCountryCode: 'MC', flag: '🇲🇨',
    estimatedTime: '2.5–4 hrs', distance: '180–300 km', priceFrom: 280,
    crossingPoint: 'Ventimiglia / Menton border',
    description: 'Private luxury transfer from Milan, Genoa, or the Italian Riviera to the Principality of Monaco. Travel to the Casino, Monte-Carlo, or your Monaco hotel in style.',
    highlights: ['Door to door to Monaco', 'Luxury vehicle options', 'Scenic Riviera coastal drive', 'Fixed price from any Italian city', 'Professional English-speaking driver', 'Available for events and Grand Prix'],
  },
  {
    id: 'turin-lyon',
    slug: 'turin-to-lyon',
    fromName: 'Turin', fromCity: 'Turin',
    toName: 'Lyon', toCountry: 'France', toCountryCode: 'FR', flag: '🇫🇷',
    estimatedTime: '3.5–4 hrs', distance: '310 km', priceFrom: 380,
    crossingPoint: 'Frejus Tunnel or Mont Cenis Pass',
    description: 'Private transfer from Turin, Italy to Lyon, France — through the Alps via the Frejus Tunnel or the scenic Mont Cenis mountain pass. Connecting northern Italy to France\'s gastronomic capital.',
    highlights: ['Choice of Frejus Tunnel or Mont Cenis route', 'Scenic Alpine crossing', 'Fixed price Turin to Lyon', 'Business or premium van available', 'Stop en route on request', 'Return transfers available'],
  },
  {
    id: 'turin-geneva',
    slug: 'turin-to-geneva',
    fromName: 'Turin', fromCity: 'Turin',
    toName: 'Geneva', toCountry: 'Switzerland', toCountryCode: 'CH', flag: '🇨🇭',
    estimatedTime: '3–3.5 hrs', distance: '250 km', priceFrom: 340,
    crossingPoint: 'Mont Blanc Tunnel area or Grand-Saint-Bernard',
    description: 'Private transfer from Turin to Geneva, Switzerland — crossing the Western Alps. Popular with business travellers, skiers travelling between Turin Airport and Swiss resorts, and Geneva-Turin connections.',
    highlights: ['Scenic Western Alpine route', 'Fixed price Turin to Geneva', 'Geneva Airport or city centre drop-off', 'Ski luggage accommodated in V-Class', 'Professional driver', 'Available year-round'],
  },
  {
    id: 'milan-nice',
    slug: 'milan-to-nice',
    fromName: 'Milan', fromCity: 'Milan',
    toName: 'Nice', toCountry: 'France', toCountryCode: 'FR', flag: '🇫🇷',
    estimatedTime: '3.5–4 hrs', distance: '300 km', priceFrom: 380,
    crossingPoint: 'Ventimiglia / Menton border',
    description: 'Private door-to-door transfer from Milan to Nice, France. Travel along the Italian Riviera through Genoa, the Ligurian coast, and across the French border to the Côte d\'Azur.',
    highlights: ['Scenic Ligurian Riviera route', 'Door to door Milan to Nice', 'Nice Airport drop-off available', 'Fixed price, no meter', 'Experienced cross-border drivers', 'Return transfers bookable'],
  },

  // ── AUSTRIA ────────────────────────────────────
  {
    id: 'bolzano-innsbruck',
    slug: 'bolzano-to-innsbruck',
    fromName: 'Bolzano / South Tyrol', fromCity: 'Bolzano',
    toName: 'Innsbruck', toCountry: 'Austria', toCountryCode: 'AT', flag: '🇦🇹',
    estimatedTime: '1–1.5 hrs', distance: '100 km', priceFrom: 130,
    crossingPoint: 'Brenner Pass (Brennero)',
    description: 'Private transfer from Bolzano (South Tyrol) to Innsbruck, Austria — crossing Europe\'s most important Alpine transit route, the Brenner Pass. Quick, comfortable, and door to door.',
    highlights: ['Shortest Italy-Austria crossing', 'Brenner Pass scenic route', 'Fixed price', 'Innsbruck Airport or city drop-off', 'Year-round including winter', 'Ski equipment accommodated'],
  },
  {
    id: 'verona-innsbruck',
    slug: 'verona-to-innsbruck',
    fromName: 'Verona', fromCity: 'Verona',
    toName: 'Innsbruck', toCountry: 'Austria', toCountryCode: 'AT', flag: '🇦🇹',
    estimatedTime: '2–2.5 hrs', distance: '180 km', priceFrom: 220,
    crossingPoint: 'Brenner Pass (Brennero)',
    description: 'Private transfer from Verona, Italy to Innsbruck, Austria. Travel north through the Adige valley, through South Tyrol and over the Brenner Pass — one of the most scenic drives in the Alps.',
    highlights: ['Stunning Adige valley and Alpine scenery', 'Fixed price Verona to Innsbruck', 'Brenner Pass crossing', 'Innsbruck Airport connection available', 'Ski and snowboard equipment welcome', 'Professional bilingual driver'],
  },
  {
    id: 'venice-vienna',
    slug: 'venice-to-vienna',
    fromName: 'Venice', fromCity: 'Venice',
    toName: 'Vienna', toCountry: 'Austria', toCountryCode: 'AT', flag: '🇦🇹',
    estimatedTime: '4.5–5 hrs', distance: '550 km', priceFrom: 580,
    crossingPoint: 'Tarvisio or Brenner Pass',
    description: 'Long-distance private transfer from Venice to Vienna — two of Europe\'s most beautiful imperial cities connected by a premium private chauffeur. Travel through the Dolomites and Austrian countryside in comfort.',
    highlights: ['Premium sedan or V-Class for comfort', 'Direct Venice to Vienna, door to door', 'Route through Dolomites available', 'Refreshment stop on request', 'Fixed price', 'Professional NCC driver for Italian leg'],
  },

  // ── SLOVENIA ───────────────────────────────────
  {
    id: 'trieste-ljubljana',
    slug: 'trieste-to-ljubljana',
    fromName: 'Trieste', fromCity: 'Trieste',
    toName: 'Ljubljana', toCountry: 'Slovenia', toCountryCode: 'SI', flag: '🇸🇮',
    estimatedTime: '1–1.5 hrs', distance: '100 km', priceFrom: 130,
    crossingPoint: 'Fernetti / Fernetiči border crossing',
    description: 'Private transfer from Trieste to Ljubljana, Slovenia\'s compact and beautiful capital. One of Italy\'s quickest cross-border routes — through the Karst plateau to the Slovenian capital.',
    highlights: ['Quick 1-hour border crossing', 'Fixed price Trieste to Ljubljana', 'Ljubljana city centre or airport', 'Scenic Karst route', 'Professional driver', 'Return transfers available'],
  },
  {
    id: 'venice-ljubljana',
    slug: 'venice-to-ljubljana',
    fromName: 'Venice', fromCity: 'Venice',
    toName: 'Ljubljana', toCountry: 'Slovenia', toCountryCode: 'SI', flag: '🇸🇮',
    estimatedTime: '2.5–3 hrs', distance: '250 km', priceFrom: 280,
    crossingPoint: 'Trieste / Fernetti border crossing',
    description: 'Private transfer from Venice to Ljubljana, Slovenia. Travel east through the Friuli-Venezia Giulia region, via Trieste, and across the border into Slovenia\'s vibrant capital.',
    highlights: ['Door to door Venice to Ljubljana', 'Via Trieste scenic route', 'Fixed price, no meter', 'Day trip option with return transfer', 'Professional NCC driver', 'English-speaking chauffeur'],
  },
]

export const bordersByCountry = {
  Switzerland: borderRoutes.filter(b => b.toCountryCode === 'CH'),
  France: borderRoutes.filter(b => b.toCountryCode === 'FR' || b.toCountryCode === 'MC'),
  Austria: borderRoutes.filter(b => b.toCountryCode === 'AT'),
  Slovenia: borderRoutes.filter(b => b.toCountryCode === 'SI'),
}
