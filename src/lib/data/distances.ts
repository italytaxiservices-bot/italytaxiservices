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

  // ── MORE ROME ROUTES ───────────────────────────────────────
  {
    slug: 'rome-to-sorrento-distance',
    from: 'Rome', to: 'Sorrento',
    distanceKm: 260, driveTime: '3–3.5 hrs', trainTime: '3h 30min', trainNote: 'Train Rome → Naples + Circumvesuviana to Sorrento — 2 connections required',
    priceFrom: 320, transferSlug: undefined,
    highlights: ['Via A1 then A3 south', 'Direct to any Sorrento hotel', 'No train connections', 'Continue to Amalfi Coast if needed'],
    about: 'Rome to Sorrento is approximately 260 km by road, taking 3–3.5 hours by private transfer via the A1 and A3 motorways. By public transport you need a high-speed train from Roma Termini to Napoli Centrale, then the slow Circumvesuviana to Sorrento — adding up to 3.5 hours with connections. A private transfer goes door-to-door with no changes.',
    faqs: [
      { q: 'How far is Rome to Sorrento?', a: 'Rome to Sorrento is approximately 260 km by road, around 3–3.5 hours by private transfer.' },
      { q: 'How do I get from Rome to Sorrento?', a: 'A private transfer from Rome to Sorrento takes 3–3.5 hours door-to-door. By train you need Rome to Naples then the Circumvesuviana, totalling about 3.5 hours with connections and luggage.' },
    ],
    relatedSlugs: ['rome-to-naples-distance', 'rome-to-amalfi-coast-distance', 'naples-to-sorrento-distance'],
  },
  {
    slug: 'rome-to-pompeii-distance',
    from: 'Rome', to: 'Pompeii',
    distanceKm: 240, driveTime: '2.5–3 hrs', trainTime: '2h 30min', trainNote: 'Rome → Naples Frecciarossa + Circumvesuviana to Pompei Scavi',
    priceFrom: 300, transferSlug: undefined,
    highlights: ['Via A1 then A3', 'Drop-off at Pompeii Scavi entrance', 'Day trip with waiting available', 'Fixed price'],
    about: 'Rome to Pompeii is approximately 240 km by road, taking 2.5–3 hours by private transfer. The site entrance (Pompeii Scavi) is conveniently located near the Circumvesuviana train station, but a private transfer drops you directly at the gate from Rome — perfect for day trips, especially when combined with Herculaneum or Vesuvius.',
    faqs: [
      { q: 'How far is Rome from Pompeii?', a: 'Rome to Pompeii is approximately 240 km by road, around 2.5–3 hours by private transfer.' },
      { q: 'Can I do a day trip from Rome to Pompeii?', a: 'Yes. A private transfer day trip from Rome to Pompeii takes about 2.5–3 hours each way. Your driver can wait while you explore the site and return you to Rome in the evening.' },
    ],
    relatedSlugs: ['rome-to-naples-distance', 'naples-to-pompeii-distance', 'rome-to-amalfi-coast-distance'],
  },
  {
    slug: 'rome-to-civitavecchia-distance',
    from: 'Rome', to: 'Civitavecchia Cruise Port',
    distanceKm: 80, driveTime: '60–80 min', trainTime: '45 min', trainNote: 'Regional train Roma Termini to Civitavecchia',
    priceFrom: 95, transferSlug: 'fiumicino-to-civitavecchia',
    highlights: ['Via A12 motorway', 'Direct to cruise terminal berth', 'Early morning service available', 'Large vehicles for luggage'],
    about: 'Rome city centre to Civitavecchia cruise port is approximately 80 km by road via the A12 motorway, taking 60–80 minutes by private transfer. The train takes about 45 minutes from Roma Termini to Civitavecchia station — but you still need a bus or taxi from the station to the cruise terminal. A private transfer goes directly from your Rome hotel to the correct terminal berth.',
    faqs: [
      { q: 'How far is Rome from Civitavecchia?', a: 'Rome city centre to Civitavecchia cruise port is approximately 80 km by road.' },
      { q: 'How long does it take from Rome to Civitavecchia?', a: 'By private transfer, Rome to Civitavecchia takes 60–80 minutes depending on traffic and your pickup point in Rome.' },
      { q: 'How do I get from Rome to Civitavecchia cruise port?', a: 'A private transfer is the easiest option — door-to-door from your hotel to the terminal berth. The train goes to Civitavecchia station, which is about 1.5 km from the port.' },
    ],
    relatedSlugs: ['rome-to-naples-distance', 'fiumicino-to-rome-distance', 'rome-to-florence-distance'],
  },
  {
    slug: 'rome-to-bologna-distance',
    from: 'Rome', to: 'Bologna',
    distanceKm: 380, driveTime: '3.5–4 hrs', trainTime: '2h 10min', trainNote: 'Frecciarossa Roma Termini to Bologna Centrale',
    priceFrom: 420, transferSlug: undefined,
    highlights: ['Via A1 motorway north', 'Door-to-door comfort', 'Stop in Arezzo or Florence on request', 'Fixed price'],
    about: 'Rome to Bologna is approximately 380 km by road via the A1 motorway, taking 3.5–4 hours by private transfer. The Frecciarossa covers it in 2 hours 10 minutes. A private transfer suits travellers with heavy luggage, families, or those needing to stop en route in Arezzo, Orvieto, or Florence.',
    faqs: [
      { q: 'How far is Rome to Bologna?', a: 'Rome to Bologna is approximately 380 km by road via the A1 motorway.' },
      { q: 'How long does the drive from Rome to Bologna take?', a: 'The drive from Rome to Bologna takes 3.5–4 hours by private transfer.' },
    ],
    relatedSlugs: ['rome-to-florence-distance', 'milan-to-florence-distance', 'bologna-to-florence-distance'],
  },
  {
    slug: 'rome-to-orvieto-distance',
    from: 'Rome', to: 'Orvieto',
    distanceKm: 120, driveTime: '75–90 min', trainTime: '60 min', trainNote: 'Regional train Roma Termini to Orvieto — then funicular to town',
    priceFrom: 150, transferSlug: undefined,
    highlights: ['Via A1 motorway north', 'Drop-off in Orvieto historic centre', 'Day trip from Rome', 'Fixed price'],
    about: 'Rome to Orvieto is approximately 120 km by road via the A1 motorway, taking 75–90 minutes by private transfer. The train takes about 60 minutes to Orvieto station — then you need the funicular up the cliff to the historic town. A private transfer delivers you directly into the hilltop town centre.',
    faqs: [
      { q: 'How far is Rome to Orvieto?', a: 'Rome to Orvieto is approximately 120 km by road, around 75–90 minutes by private transfer.' },
      { q: 'Is Orvieto worth a day trip from Rome?', a: 'Yes — Orvieto is one of Umbria\'s most beautiful hilltop towns, famous for its Gothic cathedral and white wine. A private transfer day trip from Rome takes about 75 minutes each way.' },
    ],
    relatedSlugs: ['rome-to-florence-distance', 'rome-to-bologna-distance', 'rome-to-naples-distance'],
  },

  // ── MORE MILAN ROUTES ──────────────────────────────────────
  {
    slug: 'milan-to-genoa-distance',
    from: 'Milan', to: 'Genoa',
    distanceKm: 145, driveTime: '90–110 min', trainTime: '90 min', trainNote: 'Regional or intercity train — no high-speed direct service',
    priceFrom: 180, transferSlug: undefined,
    highlights: ['Via A7 motorway south', 'Door-to-door to Genoa port or city', 'Cruise port connections available', 'Fixed price'],
    about: 'Milan to Genoa is approximately 145 km by road via the A7 motorway, taking 90–110 minutes. The train also takes about 90 minutes to Genova Piazza Principe. The private transfer advantage is door-to-door — especially useful for cruise passengers needing to reach Genoa\'s Stazione Marittima cruise terminal with luggage.',
    faqs: [
      { q: 'How far is Milan to Genoa?', a: 'Milan to Genoa is approximately 145 km by road via the A7 motorway.' },
      { q: 'How long does the drive from Milan to Genoa take?', a: 'The drive from Milan to Genoa takes 90–110 minutes by private transfer.' },
    ],
    relatedSlugs: ['milan-to-venice-distance', 'milan-to-turin-distance', 'milan-to-florence-distance'],
  },
  {
    slug: 'milan-to-bergamo-distance',
    from: 'Milan', to: 'Bergamo',
    distanceKm: 55, driveTime: '40–55 min', trainTime: '55 min', trainNote: 'Regional train Milano Centrale to Bergamo',
    priceFrom: 90, transferSlug: 'malpensa-to-bergamo',
    highlights: ['Via A4 motorway east', 'Città Alta historic centre served', 'Airport transfer available', 'Fixed price'],
    about: 'Milan to Bergamo is approximately 55 km by road via the A4 motorway, taking 40–55 minutes. The train takes about 55 minutes. Bergamo\'s famous Città Alta (upper town) is a 15-minute taxi or funicular ride from the station — a private transfer can take you directly to the gate of the old city.',
    faqs: [
      { q: 'How far is Milan to Bergamo?', a: 'Milan to Bergamo is approximately 55 km by road.' },
      { q: 'How long does it take from Milan to Bergamo?', a: 'By private transfer, Milan to Bergamo takes 40–55 minutes.' },
      { q: 'How do I get from Milan to Bergamo Città Alta?', a: 'A private transfer can take you directly to the gates of the Città Alta, avoiding the train + bus/funicular combination from the lower town station.' },
    ],
    relatedSlugs: ['malpensa-to-milan-distance', 'milan-lake-como-distance', 'milan-to-venice-distance'],
  },
  {
    slug: 'milan-to-verona-distance',
    from: 'Milan', to: 'Verona',
    distanceKm: 160, driveTime: '90–110 min', trainTime: '55 min', trainNote: 'Frecciarossa Milano Centrale to Verona Porta Nuova',
    priceFrom: 200, transferSlug: undefined,
    highlights: ['Via A4 motorway east', 'City centre drop-off', 'Arena di Verona events served', 'Fixed price'],
    about: 'Milan to Verona is approximately 160 km via the A4 motorway, taking 90–110 minutes. The Frecciarossa takes 55 minutes. The private transfer suits event travellers (Arena di Verona opera), business trips, or those connecting from Malpensa Airport to Verona without going into Milan first.',
    faqs: [
      { q: 'How far is Milan to Verona?', a: 'Milan to Verona is approximately 160 km by road.' },
      { q: 'How long does the Milan to Verona drive take?', a: 'The drive from Milan to Verona takes 90–110 minutes by private transfer.' },
    ],
    relatedSlugs: ['milan-to-venice-distance', 'venice-to-verona-distance', 'milan-to-florence-distance'],
  },
  {
    slug: 'milan-to-lugano-distance',
    from: 'Milan', to: 'Lugano (Switzerland)',
    distanceKm: 75, driveTime: '60–75 min', trainTime: '60 min', trainNote: 'Regional train Milano Centrale to Lugano via Chiasso border',
    priceFrom: 120, transferSlug: undefined,
    highlights: ['Via A9 motorway and Chiasso border', 'Border crossing included', 'All Lugano addresses served', 'Fixed price no meter'],
    about: 'Milan to Lugano is approximately 75 km via the A9 motorway and the Chiasso/Ponte Chiasso border crossing into Switzerland. The drive takes 60–75 minutes. The train also takes about 60 minutes. A private transfer is particularly convenient for passengers with luggage or those arriving at Malpensa and wanting to reach Lugano directly.',
    faqs: [
      { q: 'How far is Milan to Lugano?', a: 'Milan to Lugano is approximately 75 km by road via the A9 and Chiasso border crossing.' },
      { q: 'How long does it take from Milan to Lugano?', a: 'The drive takes 60–75 minutes. Border formalities at Chiasso add minimal time for EU/Schengen passport holders.' },
      { q: 'Do I need a visa or special documents to cross from Italy to Switzerland?', a: 'Switzerland is not in the EU but is in the Schengen Area. EU/EEA passport holders cross freely. Non-EEA travellers should carry their passport. Your NCC driver handles the crossing routinely.' },
    ],
    relatedSlugs: ['milan-lake-como-distance', 'malpensa-to-lake-como-distance', 'milan-to-genoa-distance'],
  },
  {
    slug: 'milan-to-bologna-distance',
    from: 'Milan', to: 'Bologna',
    distanceKm: 210, driveTime: '2–2.5 hrs', trainTime: '67 min', trainNote: 'Frecciarossa Milano Centrale to Bologna Centrale',
    priceFrom: 250, transferSlug: undefined,
    highlights: ['Via A1 motorway south', 'Door-to-door to any Bologna address', 'Motor Valley tours nearby', 'Fixed price'],
    about: 'Milan to Bologna is approximately 210 km by road via the A1 motorway, taking 2–2.5 hours. The Frecciarossa covers it in just 67 minutes — making the train the faster choice for the intercity leg. The private transfer suits those connecting from Malpensa Airport, carrying heavy luggage, or wanting to stop at Parma or Modena en route.',
    faqs: [
      { q: 'How far is Milan to Bologna?', a: 'Milan to Bologna is approximately 210 km by road.' },
      { q: 'How long does the Milan to Bologna drive take?', a: 'The drive from Milan to Bologna takes 2–2.5 hours via the A1 motorway.' },
    ],
    relatedSlugs: ['bologna-to-florence-distance', 'rome-to-bologna-distance', 'milan-to-florence-distance'],
  },

  // ── MORE FLORENCE ROUTES ───────────────────────────────────
  {
    slug: 'florence-to-venice-distance',
    from: 'Florence', to: 'Venice',
    distanceKm: 260, driveTime: '2.5–3 hrs', trainTime: '2h 5min', trainNote: 'Frecciarossa Firenze SMN to Venezia Santa Lucia',
    priceFrom: 310, transferSlug: undefined,
    highlights: ['Via A1 then A13 motorway', 'Option to stop in Bologna or Ferrara', 'Door-to-door service', 'Fixed price'],
    about: 'Florence to Venice is approximately 260 km by road via the A1 and A13 motorways, taking 2.5–3 hours. The Frecciarossa covers it in 2 hours 5 minutes. A private transfer goes from your Florence hotel directly to Piazzale Roma or Mestre — no station transfers, no luggage on crowded trains.',
    faqs: [
      { q: 'How far is Florence to Venice?', a: 'Florence to Venice is approximately 260 km by road.' },
      { q: 'How long does the Florence to Venice drive take?', a: 'The drive from Florence to Venice takes 2.5–3 hours by private transfer.' },
    ],
    relatedSlugs: ['venice-to-florence-distance', 'rome-to-florence-distance', 'milan-to-venice-distance'],
  },
  {
    slug: 'florence-to-naples-distance',
    from: 'Florence', to: 'Naples',
    distanceKm: 480, driveTime: '4.5–5 hrs', trainTime: '2h 55min', trainNote: 'Frecciarossa Firenze SMN to Napoli Centrale',
    priceFrom: 520, transferSlug: undefined,
    highlights: ['Via A1 south through Lazio', 'Direct to Naples or continue to Amalfi Coast', 'Long-distance comfort vehicle', 'Fixed price'],
    about: 'Florence to Naples is approximately 480 km by road via the A1 motorway south, taking 4.5–5 hours. The Frecciarossa takes 2 hours 55 minutes. For most travellers the train is faster, but a private transfer suits families, groups, or those wanting to stop in Rome or continue directly from Florence to the Amalfi Coast in a single journey.',
    faqs: [
      { q: 'How far is Florence to Naples?', a: 'Florence to Naples is approximately 480 km by road via the A1 motorway.' },
      { q: 'How long does the drive from Florence to Naples take?', a: 'The drive from Florence to Naples takes 4.5–5 hours by private transfer.' },
    ],
    relatedSlugs: ['rome-to-naples-distance', 'florence-to-venice-distance', 'naples-to-amalfi-coast-distance'],
  },
  {
    slug: 'florence-to-bologna-distance',
    from: 'Florence', to: 'Bologna',
    distanceKm: 105, driveTime: '60–75 min', trainTime: '37 min', trainNote: 'Frecciarossa Firenze SMN to Bologna Centrale',
    priceFrom: 130, transferSlug: undefined,
    highlights: ['Via A1 through the Apennines', 'Scenic mountain tunnel route', 'Door-to-door service', 'Fixed price'],
    about: 'Florence to Bologna is approximately 105 km via the A1 through the Apennine mountains — a beautiful drive through tunnels and high green valleys. The transfer takes 60–75 minutes. The Frecciarossa does it in 37 minutes through the high-speed tunnel. Both options are reasonable; the private transfer is preferred for door-to-door convenience.',
    faqs: [
      { q: 'How far is Florence to Bologna?', a: 'Florence to Bologna is approximately 105 km by road via the A1 Apennine route.' },
      { q: 'How long does the Florence to Bologna drive take?', a: 'The drive from Florence to Bologna takes 60–75 minutes through the Apennine mountain route.' },
    ],
    relatedSlugs: ['bologna-to-florence-distance', 'milan-to-bologna-distance', 'rome-to-bologna-distance'],
  },
  {
    slug: 'florence-to-cinque-terre-distance',
    from: 'Florence', to: 'Cinque Terre',
    distanceKm: 200, driveTime: '2.5–3 hrs', trainTime: '2h 30min', trainNote: 'Train via La Spezia — frequent changes required',
    priceFrom: 250, transferSlug: undefined,
    highlights: ['Via A11 then A12 Ligurian coast road', 'Drop-off at La Spezia or village access point', 'Day trip option from Florence', 'Fixed price'],
    about: 'Florence to Cinque Terre is approximately 200 km by road via the A11 and A12 motorways along the Ligurian coast, taking 2.5–3 hours. The train involves changes and takes about 2.5 hours. The private transfer drops you at La Spezia station (for the village boats/trains) or directly to the nearest road-accessible point to each village.',
    faqs: [
      { q: 'How far is Florence from Cinque Terre?', a: 'Florence to Cinque Terre (La Spezia gateway) is approximately 200 km by road.' },
      { q: 'Can I do a day trip from Florence to Cinque Terre?', a: 'Yes, though the journey is 2.5–3 hours each way, making it a full day. A private transfer is the most comfortable option, especially for groups.' },
    ],
    relatedSlugs: ['milan-to-genoa-distance', 'florence-to-venice-distance', 'florence-to-pisa-distance'],
  },

  // ── MORE AIRPORT ROUTES ────────────────────────────────────
  {
    slug: 'naples-airport-to-positano-distance',
    from: 'Naples Airport', to: 'Positano',
    distanceKm: 60, driveTime: '75–90 min', trainTime: 'No direct service', trainNote: 'No train to Positano — requires bus via Sorrento (2+ hrs)',
    priceFrom: 120, transferSlug: 'naples-airport-transfer',
    highlights: ['Via A3 then SS163 coastal road', 'Direct to your Positano hotel', 'Experienced coastal drivers', 'Meet & greet at arrivals'],
    about: 'Naples Airport (Capodichino, NAP) to Positano is approximately 60 km, but the famous SS163 Amalfitana road means the journey takes 75–90 minutes. There is no train to Positano. The public bus option requires Circumvesuviana to Sorrento then the SITA coastal bus — easily 2+ hours. A private transfer is the only sensible option from the airport.',
    faqs: [
      { q: 'How far is Naples Airport from Positano?', a: 'Naples Airport to Positano is approximately 60 km by road, around 75–90 minutes by private transfer.' },
      { q: 'How do I get from Naples Airport to Positano?', a: 'A private transfer from Naples Airport to Positano takes 75–90 minutes and goes directly to your hotel. There is no direct public transport to Positano from the airport.' },
    ],
    relatedSlugs: ['naples-to-amalfi-coast-distance', 'rome-to-amalfi-coast-distance', 'naples-to-sorrento-distance'],
  },
  {
    slug: 'naples-airport-to-amalfi-distance',
    from: 'Naples Airport', to: 'Amalfi',
    distanceKm: 70, driveTime: '90–110 min', trainTime: 'No direct train', trainNote: 'Bus via Salerno — 2.5+ hrs total',
    priceFrom: 130, transferSlug: 'naples-airport-transfer',
    highlights: ['Via A3 then scenic SS163', 'Direct to Amalfi town centre', 'Experienced SS163 drivers', 'Meet & greet with flight tracking'],
    about: 'Naples Airport to Amalfi town is approximately 70 km, taking 90–110 minutes via the A3 motorway south and then the SS163 coastal road. There is no direct train. The SITA bus route involves Salerno and takes over 2.5 hours. A private transfer is by far the most practical option for anyone arriving into Naples with luggage heading to the Amalfi Coast.',
    faqs: [
      { q: 'How far is Naples Airport from Amalfi?', a: 'Naples Airport to Amalfi is approximately 70 km by road.' },
      { q: 'How long does it take from Naples Airport to Amalfi?', a: 'By private transfer, Naples Airport to Amalfi takes 90–110 minutes depending on coastal road traffic.' },
    ],
    relatedSlugs: ['naples-to-amalfi-coast-distance', 'naples-airport-to-positano-distance', 'rome-to-amalfi-coast-distance'],
  },
  {
    slug: 'catania-airport-to-taormina-distance',
    from: 'Catania Airport', to: 'Taormina',
    distanceKm: 55, driveTime: '50–65 min', trainTime: '35 min', trainNote: 'Train to Giardini-Naxos station — then taxi up the cliff to Taormina',
    priceFrom: 80, transferSlug: 'catania-airport-transfer',
    highlights: ['Via A18 motorway north', 'Direct to Taormina hilltop', 'No cliff-top taxi needed', 'Meet & greet with flight monitoring'],
    about: 'Catania Airport (CTA) to Taormina is approximately 55 km by road, taking 50–65 minutes. The train reaches Giardini-Naxos in 35 minutes but Taormina sits high on a cliff above the station — you then need a local taxi or bus up the hill. A private transfer delivers you directly to your Taormina hotel.',
    faqs: [
      { q: 'How far is Catania Airport from Taormina?', a: 'Catania Airport to Taormina is approximately 55 km by road.' },
      { q: 'How do I get from Catania Airport to Taormina?', a: 'A private transfer from Catania Airport to Taormina takes 50–65 minutes and delivers you directly to your hotel. The train goes to the base of the cliff and requires an extra taxi up to the town.' },
    ],
    relatedSlugs: ['palermo-airport-to-cefalu-distance', 'naples-to-sorrento-distance', 'naples-to-amalfi-coast-distance'],
  },
  {
    slug: 'palermo-airport-to-cefalu-distance',
    from: 'Palermo Airport', to: 'Cefalù',
    distanceKm: 80, driveTime: '55–70 min', trainTime: '55 min', trainNote: 'Regional train Palermo to Cefalù — infrequent service',
    priceFrom: 95, transferSlug: 'palermo-airport-transfer',
    highlights: ['Via A19 motorway east', 'Scenic coastal approach', 'Direct to hotel', 'Meet & greet with flight monitoring'],
    about: 'Palermo Airport (PMO, Falcone-Borsellino) to Cefalù is approximately 80 km by road, taking 55–70 minutes. The train from Palermo to Cefalù also takes about 55 minutes but runs infrequently and departs from Palermo Centrale, not the airport — requiring an airport bus first. A private transfer goes directly from arrivals to your Cefalù hotel.',
    faqs: [
      { q: 'How far is Palermo Airport from Cefalù?', a: 'Palermo Airport to Cefalù is approximately 80 km by road.' },
      { q: 'How do I get from Palermo Airport to Cefalù?', a: 'A private transfer from Palermo Airport to Cefalù takes 55–70 minutes door-to-door. The train from Palermo city to Cefalù is an option but requires getting from the airport to Palermo Centrale first.' },
    ],
    relatedSlugs: ['catania-airport-to-taormina-distance', 'naples-to-amalfi-coast-distance', 'naples-to-sorrento-distance'],
  },
  {
    slug: 'olbia-airport-to-porto-cervo-distance',
    from: 'Olbia Airport', to: 'Porto Cervo (Costa Smeralda)',
    distanceKm: 30, driveTime: '30–40 min', trainTime: 'No train service', trainNote: 'No rail connection to Costa Smeralda — private transfer or taxi only',
    priceFrom: 75, transferSlug: 'olbia-airport-transfer',
    highlights: ['Via SS125 north', 'Direct to Porto Cervo, Porto Rotondo or any Costa Smeralda resort', 'No public transport alternative', 'Meet & greet included'],
    about: 'Olbia Airport (OLB) to Porto Cervo and the Costa Smeralda is approximately 30 km by road, taking 30–40 minutes. There is no train or public bus service to the Costa Smeralda — a private transfer or taxi is the only option. For guests arriving at one of the world\'s most exclusive resorts, a pre-booked private transfer ensures a seamless luxury arrival.',
    faqs: [
      { q: 'How far is Olbia Airport from Porto Cervo?', a: 'Olbia Airport to Porto Cervo is approximately 30 km, around 30–40 minutes by private transfer.' },
      { q: 'How do I get from Olbia Airport to Costa Smeralda?', a: 'A private transfer or taxi is the only option — there is no public transport to the Costa Smeralda. A pre-booked private transfer with meet & greet is the most reliable choice.' },
    ],
    relatedSlugs: ['naples-airport-to-positano-distance', 'catania-airport-to-taormina-distance', 'milan-lake-como-distance'],
  },
  {
    slug: 'marco-polo-to-florence-distance',
    from: 'Venice Marco Polo Airport', to: 'Florence',
    distanceKm: 255, driveTime: '2.5–3 hrs', trainTime: '2h 15min', trainNote: 'Train to Venezia Santa Lucia + Frecciarossa to Florence — 2 steps',
    priceFrom: 310, transferSlug: 'marco-polo-airport-transfer',
    highlights: ['Via A4 then A13 then A1', 'Direct airport to Florence hotel', 'No train connections', 'Fixed price with flight monitoring'],
    about: 'Venice Marco Polo Airport (VCE) to Florence is approximately 255 km by road, taking 2.5–3 hours by private transfer. By public transport you need a bus or water taxi to Venezia Santa Lucia, then the Frecciarossa to Florence — adding up to 2 hours 15 minutes minimum plus connections. A private transfer is the most direct option from the airport.',
    faqs: [
      { q: 'How do I get from Venice Airport to Florence?', a: 'A private transfer from Venice Marco Polo Airport to Florence takes 2.5–3 hours and goes directly — no train connections or luggage changes.' },
      { q: 'How far is Venice Airport from Florence?', a: 'Venice Marco Polo Airport to Florence is approximately 255 km by road.' },
    ],
    relatedSlugs: ['venice-to-florence-distance', 'florence-to-venice-distance', 'marco-polo-airport-to-verona-distance'],
  },
  {
    slug: 'marco-polo-airport-to-verona-distance',
    from: 'Venice Marco Polo Airport', to: 'Verona',
    distanceKm: 120, driveTime: '90–110 min', trainTime: '70 min', trainNote: 'Bus to Venezia Mestre then Frecciarossa to Verona Porta Nuova',
    priceFrom: 150, transferSlug: 'marco-polo-to-verona',
    highlights: ['Via A4 motorway west', 'Meet & greet with flight tracking', 'Direct to Verona Arena or hotel', 'Fixed price'],
    about: 'Venice Marco Polo Airport to Verona is approximately 120 km by road via the A4 motorway, taking 90–110 minutes. The train involves a bus from the airport to Venezia Mestre station, then the Frecciarossa to Verona — about 70 minutes total for the train leg but with connection complexity. A private transfer goes directly from arrivals.',
    faqs: [
      { q: 'How far is Venice Airport from Verona?', a: 'Venice Marco Polo Airport to Verona is approximately 120 km by road.' },
      { q: 'How do I get from Venice Airport to Verona?', a: 'A private transfer from Venice Airport to Verona takes 90–110 minutes door-to-door. Alternatively, take a bus to Venezia Mestre then the train to Verona — about 70 minutes for the rail leg with a connection.' },
    ],
    relatedSlugs: ['venice-to-verona-distance', 'milan-to-verona-distance', 'marco-polo-to-florence-distance'],
  },

  // ── VENICE EXTRA ───────────────────────────────────────────
  {
    slug: 'venice-to-bologna-distance',
    from: 'Venice', to: 'Bologna',
    distanceKm: 155, driveTime: '90–110 min', trainTime: '60 min', trainNote: 'Frecciarossa Venezia Santa Lucia to Bologna Centrale',
    priceFrom: 190, transferSlug: 'venice-to-bologna',
    highlights: ['Via A4 then A13 motorway', 'Door-to-door to any Bologna address', 'Stop in Ferrara option', 'Fixed price'],
    about: 'Venice to Bologna is approximately 155 km by road via the A4 and A13 motorways, taking 90–110 minutes. The Frecciarossa covers it in 60 minutes. A private transfer door-to-door suits those with significant luggage or wanting to stop in Ferrara along the way.',
    faqs: [
      { q: 'How far is Venice to Bologna?', a: 'Venice to Bologna is approximately 155 km by road.' },
      { q: 'How long does the Venice to Bologna drive take?', a: 'The drive from Venice to Bologna takes 90–110 minutes by private transfer.' },
    ],
    relatedSlugs: ['venice-to-florence-distance', 'bologna-to-florence-distance', 'milan-to-bologna-distance'],
  },
  {
    slug: 'venice-to-padua-distance',
    from: 'Venice', to: 'Padua',
    distanceKm: 40, driveTime: '35–45 min', trainTime: '25 min', trainNote: 'Regional train Venezia Mestre to Padova — very frequent',
    priceFrom: 75, transferSlug: undefined,
    highlights: ['Via A4 motorway', 'Direct to Padua university area or hotel', 'Day trip option from Venice', 'Fixed price'],
    about: 'Venice to Padua (Padova) is approximately 40 km by road, taking 35–45 minutes. The train from Venezia Mestre to Padova takes 25 minutes and runs very frequently — it\'s an excellent public transport option. A private transfer suits those arriving from a Venice hotel with luggage or needing to reach a specific Padua address directly.',
    faqs: [
      { q: 'How far is Venice to Padua?', a: 'Venice to Padua is approximately 40 km by road.' },
      { q: 'How long does the Venice to Padua drive take?', a: 'The drive from Venice to Padua takes 35–45 minutes by private transfer.' },
    ],
    relatedSlugs: ['venice-to-verona-distance', 'venice-to-bologna-distance', 'milan-to-venice-distance'],
  },

  // ── INTERNATIONAL ──────────────────────────────────────────
  {
    slug: 'rome-to-monaco-distance',
    from: 'Rome', to: 'Monaco',
    distanceKm: 740, driveTime: '7–7.5 hrs', trainTime: 'No direct train', trainNote: 'Requires Rome → Genoa → Nice → Monaco — 7+ hrs with changes',
    priceFrom: 780, transferSlug: undefined,
    highlights: ['Via A1 north then A10 Ligurian Riviera', 'Scenic Riviera coastal approach', 'Long-distance luxury vehicle', 'Door-to-door one-way'],
    about: 'Rome to Monaco is approximately 740 km by road, taking 7–7.5 hours via the A1, A7 through Genoa, and then the A10/A8 along the Ligurian and French Riviera. There is no direct train. This is a premium long-distance transfer, usually done with a business sedan or luxury van. The coastal route through Genoa, Savona, and the Italian Riviera is spectacular.',
    faqs: [
      { q: 'How far is Rome from Monaco?', a: 'Rome to Monaco is approximately 740 km by road via the A1 and Ligurian Riviera.' },
      { q: 'How do I travel from Rome to Monaco?', a: 'A private transfer from Rome to Monaco takes 7–7.5 hours. Alternatively, fly Rome to Nice and take a taxi (30 minutes). There is no convenient direct train.' },
    ],
    relatedSlugs: ['milan-to-genoa-distance', 'milan-to-lugano-distance', 'rome-to-milan-distance'],
  },
  {
    slug: 'venice-to-ljubljana-distance',
    from: 'Venice', to: 'Ljubljana (Slovenia)',
    distanceKm: 250, driveTime: '2.5–3 hrs', trainTime: 'No convenient direct service', trainNote: 'Limited cross-border rail — private transfer strongly recommended',
    priceFrom: 280, transferSlug: undefined,
    highlights: ['Via A4 east to Trieste then border crossing', 'Border crossing included', 'Door-to-door Venice to Ljubljana', 'Fixed price no meter'],
    about: 'Venice to Ljubljana (Slovenia\'s capital) is approximately 250 km by road via the A4 motorway east to Trieste and then the Fernetti/Fernetiči border crossing into Slovenia. The drive takes 2.5–3 hours. There is no convenient direct train service. A private transfer is the most practical option — your driver handles the border crossing routinely.',
    faqs: [
      { q: 'How far is Venice to Ljubljana?', a: 'Venice to Ljubljana is approximately 250 km by road via the A4 and Trieste border.' },
      { q: 'How do I get from Venice to Ljubljana?', a: 'A private transfer from Venice to Ljubljana takes 2.5–3 hours including the Fernetti border crossing. There is no convenient direct public transport.' },
    ],
    relatedSlugs: ['venice-to-verona-distance', 'venice-to-bologna-distance', 'milan-to-lugano-distance'],
  },
  {
    slug: 'milan-to-zurich-distance',
    from: 'Milan', to: 'Zurich (Switzerland)',
    distanceKm: 290, driveTime: '3.5–4 hrs', trainTime: '3h 30min', trainNote: 'EC train Milano Centrale to Zürich HB via Lugano and Gotthard',
    priceFrom: 380, transferSlug: undefined,
    highlights: ['Via A9 and Swiss Gotthard or Chiasso route', 'Border crossing included', 'Scenic Swiss Alpine approach', 'Door-to-door Milan to Zurich'],
    about: 'Milan to Zurich is approximately 290 km by road via the A9 motorway and the Chiasso/Gotthard route through Switzerland, taking 3.5–4 hours. The EC train also takes about 3 hours 30 minutes via Lugano and the Gotthard Base Tunnel. The private transfer suits those needing door-to-door service or travelling from Malpensa Airport to Zurich directly.',
    faqs: [
      { q: 'How far is Milan to Zurich?', a: 'Milan to Zurich is approximately 290 km by road via the A9 and Swiss Gotthard route.' },
      { q: 'How long does it take from Milan to Zurich?', a: 'By private transfer, Milan to Zurich takes 3.5–4 hours including the border crossing at Chiasso.' },
    ],
    relatedSlugs: ['milan-to-lugano-distance', 'milan-lake-como-distance', 'milan-to-genoa-distance'],
  },
  {
    slug: 'turin-to-geneva-distance',
    from: 'Turin', to: 'Geneva (Switzerland)',
    distanceKm: 250, driveTime: '3–3.5 hrs', trainTime: 'No convenient direct service', trainNote: 'No direct train — requires bus or connection via France',
    priceFrom: 340, transferSlug: undefined,
    highlights: ['Via A32 Frejus Tunnel or scenic Mont Cenis', 'Cross-border transfer included', 'Geneva city or airport drop-off', 'Fixed price'],
    about: 'Turin to Geneva is approximately 250 km by road, taking 3–3.5 hours via the A32 motorway and Frejus Tunnel through the Alps. There is no convenient direct train. This is a popular route for business travellers and skiers between northern Italy and Switzerland.',
    faqs: [
      { q: 'How far is Turin from Geneva?', a: 'Turin to Geneva is approximately 250 km by road via the A32 and Frejus Tunnel.' },
      { q: 'How do I get from Turin to Geneva?', a: 'A private transfer from Turin to Geneva takes 3–3.5 hours through the Frejus Tunnel. There is no convenient direct train.' },
    ],
    relatedSlugs: ['milan-to-lugano-distance', 'milan-to-zurich-distance', 'milan-to-turin-distance'],
  },

  // ── BARI & SOUTHERN ───────────────────────────────────────
  {
    slug: 'bari-to-naples-distance',
    from: 'Bari', to: 'Naples',
    distanceKm: 265, driveTime: '2.5–3 hrs', trainTime: '3h 30min', trainNote: 'Intercity train Bari to Napoli — slow regional service',
    priceFrom: 300, transferSlug: undefined,
    highlights: ['Via A16 motorway Adriatic to Tyrrhenian', 'Scenic Apennine crossing', 'Faster than the train', 'Fixed price door-to-door'],
    about: 'Bari to Naples is approximately 265 km by road via the A16 Autostrada dei Due Mari (Highway of the Two Seas), crossing the Apennine mountains from the Adriatic to the Tyrrhenian coast. The drive takes 2.5–3 hours. The intercity train is slow (3.5 hours) and infrequent. A private transfer is faster and goes door-to-door.',
    faqs: [
      { q: 'How far is Bari from Naples?', a: 'Bari to Naples is approximately 265 km by road via the A16 motorway.' },
      { q: 'How long does the Bari to Naples drive take?', a: 'The drive from Bari to Naples takes 2.5–3 hours via the A16 Autostrada dei Due Mari.' },
    ],
    relatedSlugs: ['naples-to-amalfi-coast-distance', 'rome-to-naples-distance', 'naples-to-pompeii-distance'],
  },
  {
    slug: 'bari-to-rome-distance',
    from: 'Bari', to: 'Rome',
    distanceKm: 450, driveTime: '4–4.5 hrs', trainTime: '3h 30min', trainNote: 'Frecciarossa or Intercity — Bari Centrale to Roma Termini',
    priceFrom: 490, transferSlug: undefined,
    highlights: ['Via A14 north then A1', 'Or via A16 through Naples', 'Long-distance comfort vehicle', 'Fixed price door-to-door'],
    about: 'Bari to Rome is approximately 450 km by road, taking 4–4.5 hours by private transfer. The fastest route is via the A14 north to the A1 through the Apennines. The Frecciarossa takes about 3.5 hours station to station. A private transfer suits groups with luggage or those needing true door-to-door service.',
    faqs: [
      { q: 'How far is Bari from Rome?', a: 'Bari to Rome is approximately 450 km by road.' },
      { q: 'How long does the Bari to Rome drive take?', a: 'The drive from Bari to Rome takes 4–4.5 hours by private transfer.' },
    ],
    relatedSlugs: ['bari-to-naples-distance', 'rome-to-naples-distance', 'rome-to-florence-distance'],
  },
]

export function getDistanceRouteBySlug(slug: string): DistanceRoute | undefined {
  return distanceRoutes.find((r) => r.slug === slug)
}
