export interface DistanceRoute {
  slug: string
  from: string
  to: string
  distanceKm: number
  driveTime: string
  trainTime: string
  trainNote: string
  priceFrom: number
  transferSlug?: string       // link to existing transfer page if exists
  highlights: string[]
  about: string
  faqs: { q: string; a: string }[]
  relatedSlugs: string[]
}

export const distanceRoutes: DistanceRoute[] = [
  // ── ROME ROUTES ────────────────────────────────────────────
  {
    slug: 'rome-to-florence-distance',
    from: 'Rome', to: 'Florence',
    distanceKm: 280, driveTime: '3–3.5 hrs', trainTime: '1h 30min', trainNote: 'High-speed Frecciarossa — but from station to station only',
    priceFrom: 350, transferSlug: 'rome-to-florence',
    highlights: ['Via A1 motorway (Autostrada del Sole)', 'Option to stop in Orvieto or Arezzo', 'Door-to-door — no station transfer needed', 'Fixed price, no meter'],
    about: 'Rome to Florence is 280 km by road via the A1 motorway (Autostrada del Sole), Italy\'s main north-south motorway. By private transfer the journey takes 3–3.5 hours depending on traffic. The train (Frecciarossa) takes 1 hour 30 minutes but runs station-to-station — you still need transport from Roma Termini and again from Firenze Santa Maria Novella to your hotel. A private transfer is door-to-door from any Rome address to any Florence address with no connections, no luggage on trains, and a fixed agreed price.',
    faqs: [
      { q: 'How far is Rome to Florence by road?', a: 'Rome to Florence is approximately 280 km by road via the A1 motorway.' },
      { q: 'How long does the Rome to Florence drive take?', a: 'The drive from Rome to Florence takes 3–3.5 hours in normal traffic conditions via the A1.' },
      { q: 'Is it better to take the train or a private transfer from Rome to Florence?', a: 'The Frecciarossa is faster (1h 30min) but goes station to station. A private transfer takes longer but is door-to-door — no transfers at either end, no luggage restrictions, and a fixed price for the whole journey.' },
      { q: 'Can I stop on the way from Rome to Florence?', a: 'Yes. With a private transfer you can stop en route — Orvieto, Arezzo, or Chianti vineyards are popular stops. Just mention this when booking.' },
    ],
    relatedSlugs: ['rome-to-naples-distance', 'rome-to-venice-distance', 'florence-to-pisa-distance'],
  },
  {
    slug: 'rome-to-naples-distance',
    from: 'Rome', to: 'Naples',
    distanceKm: 225, driveTime: '2–2.5 hrs', trainTime: '1h 10min', trainNote: 'High-speed from Termini to Napoli Centrale',
    priceFrom: 260, transferSlug: 'rome-to-naples',
    highlights: ['Via A1 motorway south', 'Door-to-door — no Termini transfer', 'Continue to Pompeii or Amalfi Coast', 'Fixed price'],
    about: 'Rome to Naples is 225 km by road via the A1 motorway, passing through Lazio and into Campania. The drive takes 2–2.5 hours. The Frecciarossa takes about 1 hour 10 minutes but runs from Roma Termini to Napoli Centrale — and if your final destination is Pompeii, Sorrento, or the Amalfi Coast, you still need onward transport from Naples. A private transfer from Rome can take you directly to Naples, Pompeii, Sorrento, or Positano in a single journey.',
    faqs: [
      { q: 'How far is Rome to Naples by road?', a: 'Rome to Naples is approximately 225 km by road via the A1 motorway.' },
      { q: 'How long does the Rome to Naples drive take?', a: 'The drive from Rome to Naples takes 2–2.5 hours in normal traffic via the A1.' },
      { q: 'Can I go from Rome directly to the Amalfi Coast?', a: 'Yes. A private transfer from Rome can take you directly to Positano, Amalfi, or Ravello without stopping in Naples — approximately 3.5–4 hours total.' },
    ],
    relatedSlugs: ['rome-to-florence-distance', 'naples-to-amalfi-coast-distance', 'rome-to-amalfi-coast-distance'],
  },
  {
    slug: 'rome-to-amalfi-coast-distance',
    from: 'Rome', to: 'Amalfi Coast',
    distanceKm: 280, driveTime: '3.5–4 hrs', trainTime: 'No direct train', trainNote: 'Requires Rome → Naples train + local bus or taxi (3+ hrs total)',
    priceFrom: 380, transferSlug: 'rome-to-amalfi-coast',
    highlights: ['Via A1 then A3 motorway south', 'Direct to Positano, Amalfi, Ravello', 'No train connections needed', 'Experienced coastal road drivers'],
    about: 'Rome to the Amalfi Coast is approximately 280 km by road. The journey involves the A1 motorway south to Naples, then the A3 towards Salerno, and finally the SS163 Amalfitana coastal road — one of the most dramatic driving roads in the world. The total transfer takes 3.5–4 hours to Positano or Amalfi. There is no direct train — you would need Rome to Naples by rail, then a local train to Salerno or Vietri sul Mare, then a coastal bus. A private transfer is by far the most practical option.',
    faqs: [
      { q: 'How far is Rome to the Amalfi Coast?', a: 'Rome to Positano is approximately 280 km by road, taking around 3.5–4 hours by private transfer.' },
      { q: 'Is there a direct train from Rome to the Amalfi Coast?', a: 'No. There is no direct train to the Amalfi Coast. You would need Rome to Naples, then local transport. A private transfer is door-to-door and far more convenient.' },
      { q: 'How long is the drive from Rome to Positano?', a: 'Rome to Positano takes approximately 3.5–4 hours by private transfer via the A1 and A3 motorways, then the coastal SS163 road.' },
    ],
    relatedSlugs: ['rome-to-naples-distance', 'naples-to-amalfi-coast-distance', 'rome-to-florence-distance'],
  },
  {
    slug: 'rome-to-venice-distance',
    from: 'Rome', to: 'Venice',
    distanceKm: 530, driveTime: '5–5.5 hrs', trainTime: '3h 45min', trainNote: 'Frecciarossa Roma Termini to Venezia Santa Lucia',
    priceFrom: 580, transferSlug: undefined,
    highlights: ['Via A1 then A13 or A4 motorway', 'Long distance comfort vehicle recommended', 'Stop in Bologna or Ferrara on request', 'Door-to-door with no connections'],
    about: 'Rome to Venice is approximately 530 km by road — one of Italy\'s longest intercity routes. By private transfer the journey takes 5–5.5 hours via the A1 and A13 (or A4) motorways. The Frecciarossa takes 3h 45min station to station, but you still need transport to Roma Termini and from Venezia Santa Lucia (Piazzale Roma) to your hotel, plus all the luggage complexity. Many travellers prefer a private transfer for this route, especially with families or groups.',
    faqs: [
      { q: 'How far is Rome to Venice by road?', a: 'Rome to Venice is approximately 530 km by road via the A1 and A13 motorways.' },
      { q: 'How long does the Rome to Venice drive take?', a: 'The drive from Rome to Venice takes 5–5.5 hours. A stop in Bologna or Ferrara is possible.' },
      { q: 'Is the train better than a private transfer from Rome to Venice?', a: 'The Frecciarossa is faster (3h 45min) for the train leg, but requires transfers at both ends. For groups or families with luggage, a private transfer offers more convenience.' },
    ],
    relatedSlugs: ['rome-to-florence-distance', 'milan-to-venice-distance', 'venice-to-verona-distance'],
  },
  {
    slug: 'rome-to-milan-distance',
    from: 'Rome', to: 'Milan',
    distanceKm: 580, driveTime: '5.5–6 hrs', trainTime: '2h 55min', trainNote: 'Frecciarossa Roma Termini to Milano Centrale',
    priceFrom: 620, transferSlug: undefined,
    highlights: ['Via A1 motorway full length', 'Ideal for families with lots of luggage', 'Stop en route on request', 'Fixed price door-to-door'],
    about: 'Rome to Milan is approximately 580 km — the full length of the A1 Autostrada del Sole. By private transfer the journey takes 5.5–6 hours. The Frecciarossa covers it in 2 hours 55 minutes, making the train far faster for the intercity leg. However, a private transfer makes sense for groups with large amounts of luggage, families with young children, or travellers who need door-to-door service without navigating busy stations.',
    faqs: [
      { q: 'How far is Rome to Milan?', a: 'Rome to Milan is approximately 580 km by road via the A1 motorway.' },
      { q: 'How long does the drive from Rome to Milan take?', a: 'The drive from Rome to Milan takes approximately 5.5–6 hours by private transfer.' },
      { q: 'Should I take the train or private transfer from Rome to Milan?', a: 'For most travellers, the high-speed train is faster and more practical. A private transfer suits groups with lots of luggage, families, or those who need true door-to-door service.' },
    ],
    relatedSlugs: ['rome-to-florence-distance', 'milan-to-venice-distance', 'milan-to-florence-distance'],
  },

  // ── MILAN ROUTES ───────────────────────────────────────────
  {
    slug: 'milan-to-venice-distance',
    from: 'Milan', to: 'Venice',
    distanceKm: 270, driveTime: '2.5–3 hrs', trainTime: '2h 30min', trainNote: 'Regional train — high-speed not direct',
    priceFrom: 280, transferSlug: 'milan-to-venice',
    highlights: ['Via A4 motorway (Serenissima)', 'Option to stop at Lake Garda', 'Door-to-door from any Milan address', 'Fixed price'],
    about: 'Milan to Venice is 270 km via the A4 motorway (known as the Serenissima). By private transfer the journey takes 2.5–3 hours. The train takes a similar 2 hours 30 minutes but requires travel to Milano Centrale and then from Venezia Santa Lucia to your hotel via water taxi or water bus. A private transfer takes you directly from any Milan address to Piazzale Roma or the mainland Mestre hotel, with no connections and no luggage stress.',
    faqs: [
      { q: 'How far is Milan to Venice by road?', a: 'Milan to Venice is approximately 270 km by road via the A4 motorway.' },
      { q: 'How long is the drive from Milan to Venice?', a: 'The drive from Milan to Venice takes 2.5–3 hours by private transfer.' },
      { q: 'Can I stop at Lake Garda on the way from Milan to Venice?', a: 'Yes — Lake Garda is perfectly placed on the Milan–Venice route. A stop in Sirmione or Desenzano del Garda is possible. Just mention it when booking.' },
    ],
    relatedSlugs: ['rome-to-venice-distance', 'milan-to-florence-distance', 'venice-to-verona-distance'],
  },
  {
    slug: 'milan-to-florence-distance',
    from: 'Milan', to: 'Florence',
    distanceKm: 295, driveTime: '3–3.5 hrs', trainTime: '1h 45min', trainNote: 'Frecciarossa Milano Centrale to Firenze SMN',
    priceFrom: 340, transferSlug: undefined,
    highlights: ['Via A1 motorway south', 'Option to stop in Bologna', 'Door-to-door service', 'Fixed price'],
    about: 'Milan to Florence is approximately 295 km via the A1 motorway, taking 3–3.5 hours by private transfer. The Frecciarossa takes 1 hour 45 minutes. The private transfer suits travellers who want door-to-door comfort without navigating busy stations, especially those heading from Milan city or Malpensa Airport directly to a Florence hotel or Tuscany villa.',
    faqs: [
      { q: 'How far is Milan to Florence?', a: 'Milan to Florence is approximately 295 km by road via the A1 motorway.' },
      { q: 'How long is the drive from Milan to Florence?', a: 'The drive from Milan to Florence takes 3–3.5 hours by private transfer.' },
    ],
    relatedSlugs: ['milan-to-venice-distance', 'rome-to-florence-distance', 'milan-lake-como-distance'],
  },
  {
    slug: 'milan-lake-como-distance',
    from: 'Milan', to: 'Lake Como',
    distanceKm: 50, driveTime: '40–60 min', trainTime: '35 min', trainNote: 'Train to Como San Giovanni — limited lakeside access',
    priceFrom: 110, transferSlug: 'malpensa-to-lake-como',
    highlights: ['Via A9 motorway', 'All lakeside towns served (Bellagio, Varenna)', 'No ferry connections needed', 'Fixed price'],
    about: 'Milan to Lake Como (Como town) is approximately 50 km by road via the A9 motorway, taking 40–60 minutes by private transfer. The train reaches Como San Giovanni in 35 minutes but leaves you in Como town — to reach Bellagio, Varenna, or Menaggio you still need a ferry, adding significant time and luggage complications. A private transfer can take you directly to any lakeside town, hotel, or villa in one go.',
    faqs: [
      { q: 'How far is Milan to Lake Como?', a: 'Milan to Como town is approximately 50 km by road. To Bellagio it is around 75 km via the lake road.' },
      { q: 'How long does the drive from Milan to Lake Como take?', a: 'Milan to Como takes 40–60 minutes. Milan to Bellagio or Varenna takes approximately 80–90 minutes by private transfer.' },
      { q: 'How do I get from Milan to Bellagio, Lake Como?', a: 'The most direct way is a private transfer from Milan to Bellagio, which takes approximately 80–90 minutes. The train reaches Como town and still requires a 45-minute ferry to Bellagio.' },
    ],
    relatedSlugs: ['milan-to-venice-distance', 'malpensa-to-milan-distance', 'milan-to-florence-distance'],
  },
  {
    slug: 'malpensa-to-milan-distance',
    from: 'Malpensa Airport', to: 'Milan',
    distanceKm: 50, driveTime: '45–60 min', trainTime: '30 min', trainNote: 'Malpensa Express to Milano Centrale or Cadorna',
    priceFrom: 85, transferSlug: 'malpensa-to-milan',
    highlights: ['Via A8 motorway', 'All Milan hotels and districts served', 'Meet & greet at arrivals', 'Fixed price with flight monitoring'],
    about: 'Milan Malpensa Airport (MXP) to Milan city centre is approximately 50 km via the A8 motorway, taking 45–60 minutes by private transfer. The Malpensa Express train takes 30 minutes to Milano Centrale or 40 minutes to Cadorna, but runs station-to-station — you still need a taxi or metro to your hotel. A private transfer takes you from arrivals directly to your hotel or address in one step, with meet & greet and flight monitoring included.',
    faqs: [
      { q: 'How far is Malpensa Airport from Milan city centre?', a: 'Malpensa Airport is approximately 50 km from Milan city centre via the A8 motorway.' },
      { q: 'How long does it take to get from Malpensa to Milan?', a: 'By private transfer, Malpensa to Milan takes 45–60 minutes depending on traffic and your exact destination in the city.' },
      { q: 'Is the Malpensa Express train or private transfer better?', a: 'The Malpensa Express is cheaper and takes 30 minutes to the station. A private transfer is door-to-door — no metro or taxi at the other end, and your driver waits for you regardless of flight delays.' },
    ],
    relatedSlugs: ['milan-lake-como-distance', 'malpensa-to-lake-como-distance', 'milan-to-venice-distance'],
  },
  {
    slug: 'malpensa-to-lake-como-distance',
    from: 'Malpensa Airport', to: 'Lake Como',
    distanceKm: 75, driveTime: '60–80 min', trainTime: 'No direct train', trainNote: 'Requires Malpensa Express + change at Milano Cadorna + train to Como',
    priceFrom: 130, transferSlug: 'malpensa-to-lake-como',
    highlights: ['Via A8 then A9 motorway', 'Bellagio, Varenna, Menaggio served', 'No ferry needed', 'Meet & greet with flight tracking'],
    about: 'Malpensa Airport to Lake Como is approximately 75 km via the A8 and A9 motorways, taking 60–80 minutes by private transfer. There is no direct train — you would need the Malpensa Express to Milano Cadorna, then a regional train to Como San Giovanni, and then a ferry to your lakeside destination. Total journey could be 2.5+ hours with luggage. A private transfer is by far the fastest and most practical option.',
    faqs: [
      { q: 'How far is Malpensa Airport from Lake Como?', a: 'Malpensa Airport to Como town is approximately 75 km. To Bellagio it is around 90 km.' },
      { q: 'How do I get from Malpensa Airport to Bellagio?', a: 'The fastest way is a private transfer, taking 75–90 minutes door-to-door. The public transport alternative involves at least 3 connections and takes 2.5+ hours.' },
    ],
    relatedSlugs: ['malpensa-to-milan-distance', 'milan-lake-como-distance', 'milan-to-venice-distance'],
  },

  // ── FLORENCE ROUTES ────────────────────────────────────────
  {
    slug: 'florence-to-pisa-distance',
    from: 'Florence', to: 'Pisa',
    distanceKm: 80, driveTime: '60–75 min', trainTime: '50 min', trainNote: 'Regional train Firenze SMN to Pisa Centrale',
    priceFrom: 95, transferSlug: 'florence-to-pisa',
    highlights: ['Via FI-PI-LI highway', 'Drop-off at Piazza dei Miracoli entrance', 'Day trip or one-way', 'Fixed price'],
    about: 'Florence to Pisa is approximately 80 km by road via the FI-PI-LI superstrada, taking 60–75 minutes. The train takes 50 minutes to Pisa Centrale — then you still need a taxi or bus to the Leaning Tower (Campo dei Miracoli), which is 2 km from the station. A private transfer can drop you directly at the Piazza dei Miracoli entrance.',
    faqs: [
      { q: 'How far is Florence to Pisa?', a: 'Florence to Pisa is approximately 80 km by road.' },
      { q: 'How long is the drive from Florence to Pisa?', a: 'The drive from Florence to Pisa takes 60–75 minutes by private transfer.' },
      { q: 'Can I do a day trip from Florence to Pisa?', a: 'Yes. A private transfer day trip from Florence to Pisa is very popular. Your driver can wait in Pisa while you visit the Leaning Tower, then return you to Florence.' },
    ],
    relatedSlugs: ['florence-to-siena-distance', 'milan-to-florence-distance', 'rome-to-florence-distance'],
  },
  {
    slug: 'florence-to-siena-distance',
    from: 'Florence', to: 'Siena',
    distanceKm: 75, driveTime: '70–80 min', trainTime: '1h 30min', trainNote: 'No direct high-speed — regional train via Empoli',
    priceFrom: 105, transferSlug: 'florence-to-siena',
    highlights: ['Scenic Chiantigiana route through Chianti', 'Or faster superstrada option', 'Day trip available', 'Fixed price'],
    about: 'Florence to Siena is approximately 75 km by road. Via the faster superstrada it takes 70–80 minutes. Via the scenic Via Chiantigiana through the Chianti wine country it takes around 90 minutes but passes through some of Tuscany\'s most beautiful landscapes. The train is slow (1h 30min via Empoli with no direct service). A private transfer is the most comfortable and fastest option, with the added benefit of choosing your route through the Chianti hills.',
    faqs: [
      { q: 'How far is Florence to Siena?', a: 'Florence to Siena is approximately 75 km by road.' },
      { q: 'How long does the Florence to Siena drive take?', a: 'Via the superstrada the drive takes 70–80 minutes. Via the scenic Chiantigiana route through Chianti it takes around 90 minutes.' },
      { q: 'Is there a direct train from Florence to Siena?', a: 'There is no direct high-speed train. The regional train takes 1h 30min via Empoli. A private transfer is much more practical.' },
    ],
    relatedSlugs: ['florence-to-pisa-distance', 'rome-to-florence-distance', 'milan-to-florence-distance'],
  },

  // ── NAPLES ROUTES ──────────────────────────────────────────
  {
    slug: 'naples-to-amalfi-coast-distance',
    from: 'Naples', to: 'Amalfi Coast',
    distanceKm: 65, driveTime: '1.5–2 hrs', trainTime: 'No direct train', trainNote: 'Bus from Naples to Amalfi via Salerno — 2.5+ hrs',
    priceFrom: 130, transferSlug: undefined,
    highlights: ['Via SS163 coastal road', 'Direct to Positano, Amalfi, Ravello', 'Experienced coastal drivers', 'Fixed price'],
    about: 'Naples to the Amalfi Coast (Positano or Amalfi) is approximately 65 km by road, but the journey takes 1.5–2 hours due to the famous SS163 coastal road — a narrow, winding mountain road with stunning views but slow progress. There is no direct train to the Amalfi Coast. The SITA bus service takes over 2.5 hours and is extremely crowded in summer. A private transfer is the most practical, comfortable, and reliable option.',
    faqs: [
      { q: 'How far is Naples from the Amalfi Coast?', a: 'Naples to Positano is approximately 55 km; Naples to Amalfi town is approximately 65 km by road.' },
      { q: 'How long does it take to drive from Naples to the Amalfi Coast?', a: 'The drive takes 1.5–2 hours depending on traffic and your specific destination on the coast.' },
      { q: 'How do I get from Naples to Positano?', a: 'A private transfer is the easiest option — approximately 1.5 hours door-to-door. Alternatively, a ferry from Naples (Molo Beverello) to Positano takes about 1 hour in summer.' },
    ],
    relatedSlugs: ['rome-to-amalfi-coast-distance', 'naples-to-pompeii-distance', 'naples-to-sorrento-distance'],
  },
  {
    slug: 'naples-to-pompeii-distance',
    from: 'Naples', to: 'Pompeii',
    distanceKm: 25, driveTime: '30–40 min', trainTime: '35 min', trainNote: 'Circumvesuviana train to Pompei Scavi',
    priceFrom: 65, transferSlug: undefined,
    highlights: ['Via A3 motorway', 'Drop-off at Pompeii Scavi entrance', 'Return transfer available', 'Fixed price'],
    about: 'Naples to Pompeii is approximately 25 km by road, taking 30–40 minutes by private transfer via the A3 motorway. The Circumvesuviana train takes 35 minutes to Pompei Scavi station, which is very close to the site entrance. For individual travellers the train is a good option; for families with children or luggage, or those combining Pompeii with Herculaneum and Vesuvius in a single day, a private transfer offers much more flexibility.',
    faqs: [
      { q: 'How far is Naples from Pompeii?', a: 'Naples to Pompeii is approximately 25 km by road, around 30–40 minutes by private transfer.' },
      { q: 'Is the train or private transfer better from Naples to Pompeii?', a: 'The Circumvesuviana train is cheap and takes 35 minutes. A private transfer (from €65) is more comfortable and can combine Pompeii with Herculaneum or Vesuvius in one day.' },
    ],
    relatedSlugs: ['naples-to-amalfi-coast-distance', 'naples-to-sorrento-distance', 'rome-to-naples-distance'],
  },
  {
    slug: 'naples-to-sorrento-distance',
    from: 'Naples', to: 'Sorrento',
    distanceKm: 55, driveTime: '60–75 min', trainTime: '65 min', trainNote: 'Circumvesuviana train Naples to Sorrento',
    priceFrom: 90, transferSlug: undefined,
    highlights: ['Via A3 then Sorrentine Peninsula', 'Door-to-door to any Sorrento hotel', 'Continue to Positano or Amalfi', 'Fixed price'],
    about: 'Naples to Sorrento is approximately 55 km by road, taking 60–75 minutes by private transfer. The Circumvesuviana train takes about 65 minutes to Sorrento train station. The private transfer advantage is door-to-door — no taxi from the station and your driver can continue with you from Sorrento to Positano or the Amalfi Coast if needed.',
    faqs: [
      { q: 'How far is Naples to Sorrento?', a: 'Naples to Sorrento is approximately 55 km by road, around 60–75 minutes by private transfer.' },
      { q: 'How do I get from Naples Airport to Sorrento?', a: 'A private transfer from Naples Airport (NAP) to Sorrento takes approximately 60–75 minutes and goes directly to your hotel, avoiding the need for a taxi and the Circumvesuviana train.' },
    ],
    relatedSlugs: ['naples-to-amalfi-coast-distance', 'naples-to-pompeii-distance', 'rome-to-naples-distance'],
  },

  // ── VENICE ROUTES ──────────────────────────────────────────
  {
    slug: 'venice-to-verona-distance',
    from: 'Venice', to: 'Verona',
    distanceKm: 115, driveTime: '90–110 min', trainTime: '65 min', trainNote: 'Frecciarossa or regional to Verona Porta Nuova',
    priceFrom: 150, transferSlug: 'marco-polo-to-verona',
    highlights: ['Via A4 motorway west', 'Direct to Verona Arena or hotel', 'Day trip option from Venice', 'Fixed price'],
    about: 'Venice to Verona is approximately 115 km by road via the A4 motorway, taking 90–110 minutes by private transfer. The train takes 65 minutes but departs from Venezia Santa Lucia — requiring a transfer from your hotel to the station first. A private transfer from your Venice hotel or Piazzale Roma takes you directly to Verona city centre.',
    faqs: [
      { q: 'How far is Venice to Verona?', a: 'Venice to Verona is approximately 115 km by road.' },
      { q: 'How long is the drive from Venice to Verona?', a: 'The drive from Venice to Verona takes 90–110 minutes by private transfer.' },
    ],
    relatedSlugs: ['milan-to-venice-distance', 'venice-to-florence-distance', 'rome-to-venice-distance'],
  },
  {
    slug: 'venice-to-florence-distance',
    from: 'Venice', to: 'Florence',
    distanceKm: 260, driveTime: '2.5–3 hrs', trainTime: '2 hrs', trainNote: 'Frecciarossa Venezia Santa Lucia to Firenze SMN',
    priceFrom: 320, transferSlug: undefined,
    highlights: ['Via A4 then A13 or A1 motorway', 'Option to stop in Bologna or Ferrara', 'Door-to-door service', 'Fixed price'],
    about: 'Venice to Florence is approximately 260 km by road via the A4 and A13 motorways (or A4 to Bologna then A1), taking 2.5–3 hours by private transfer. The Frecciarossa takes 2 hours but is station-to-station. A private transfer is door-to-door from your Venice hotel to your Florence hotel with the option to stop in Bologna or Ferrara along the way.',
    faqs: [
      { q: 'How far is Venice to Florence?', a: 'Venice to Florence is approximately 260 km by road.' },
      { q: 'How long does the Venice to Florence drive take?', a: 'The drive from Venice to Florence takes 2.5–3 hours by private transfer via the A4 and A13 motorways.' },
    ],
    relatedSlugs: ['milan-to-venice-distance', 'rome-to-florence-distance', 'venice-to-verona-distance'],
  },

  // ── FIUMICINO ROUTES ───────────────────────────────────────
  {
    slug: 'fiumicino-to-rome-distance',
    from: 'Rome Fiumicino Airport', to: 'Rome City Centre',
    distanceKm: 35, driveTime: '40–60 min', trainTime: '32 min', trainNote: 'Leonardo Express to Roma Termini',
    priceFrom: 65, transferSlug: 'fiumicino-to-rome',
    highlights: ['Via A91 motorway', 'All Rome areas covered — hotel, Vatican, Trastevere', 'Meet & greet with flight monitoring', 'Fixed price'],
    about: 'Rome Fiumicino Airport (FCO) to Rome city centre is approximately 35 km by road via the A91 motorway, taking 40–60 minutes depending on traffic. The Leonardo Express takes 32 minutes to Roma Termini — but you then need a taxi, metro, or bus to your hotel. A private transfer goes from arrivals directly to your hotel, Vatican, or any Rome address with no connections.',
    faqs: [
      { q: 'How far is Fiumicino Airport from Rome?', a: 'Fiumicino Airport is approximately 35 km from Rome city centre.' },
      { q: 'How long does it take from Fiumicino to Rome?', a: 'By private transfer, Fiumicino to Rome takes 40–60 minutes depending on traffic and your exact Rome address.' },
      { q: 'Is the train or private transfer better from Fiumicino to Rome?', a: 'The Leonardo Express is faster to Roma Termini (32 min) and cheaper. A private transfer is door-to-door from arrivals to your hotel — ideal if you have luggage or are not near Termini.' },
    ],
    relatedSlugs: ['rome-to-florence-distance', 'rome-to-naples-distance', 'rome-to-amalfi-coast-distance'],
  },

  // ── BOLOGNA ROUTES ─────────────────────────────────────────
  {
    slug: 'bologna-to-florence-distance',
    from: 'Bologna', to: 'Florence',
    distanceKm: 105, driveTime: '60–75 min', trainTime: '37 min', trainNote: 'Frecciarossa Bologna Centrale to Firenze SMN',
    priceFrom: 130, transferSlug: undefined,
    highlights: ['Via A1 motorway through the Apennines', 'Scenic mountain route', 'Day trip option', 'Fixed price door-to-door'],
    about: 'Bologna to Florence is approximately 105 km by road via the A1 motorway through the Apennine mountains — a dramatic and scenic drive. By private transfer the journey takes 60–75 minutes. The Frecciarossa covers it in just 37 minutes. The mountain road is impressive if you\'re not in a rush, but for speed the train wins on this route.',
    faqs: [
      { q: 'How far is Bologna to Florence?', a: 'Bologna to Florence is approximately 105 km by road via the A1 through the Apennines.' },
      { q: 'How long does the Bologna to Florence drive take?', a: 'The drive from Bologna to Florence takes 60–75 minutes through the Apennine mountain route.' },
    ],
    relatedSlugs: ['rome-to-florence-distance', 'milan-to-florence-distance', 'venice-to-florence-distance'],
  },
  {
    slug: 'milan-to-turin-distance',
    from: 'Milan', to: 'Turin',
    distanceKm: 140, driveTime: '90–110 min', trainTime: '52 min', trainNote: 'Frecciarossa Milano Centrale to Torino Porta Susa',
    priceFrom: 175, transferSlug: undefined,
    highlights: ['Via A4 motorway west', 'Door-to-door to any Turin address', 'Corporate and event travel', 'Fixed price'],
    about: 'Milan to Turin is approximately 140 km by road via the A4 motorway, taking 90–110 minutes by private transfer. The Frecciarossa takes 52 minutes station-to-station. A private transfer suits corporate travellers, those with significant luggage, or anyone needing true door-to-door service to a Turin business address or hotel.',
    faqs: [
      { q: 'How far is Milan to Turin?', a: 'Milan to Turin is approximately 140 km by road via the A4 motorway.' },
      { q: 'How long does the Milan to Turin drive take?', a: 'The drive from Milan to Turin takes 90–110 minutes by private transfer.' },
    ],
    relatedSlugs: ['milan-to-venice-distance', 'milan-to-florence-distance', 'milan-lake-como-distance'],
  },
]

export function getDistanceRouteBySlug(slug: string): DistanceRoute | undefined {
  return distanceRoutes.find((r) => r.slug === slug)
}
