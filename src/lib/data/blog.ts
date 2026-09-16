export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  publishDate: string
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  // Airport Guides
  {
    slug: 'rome-fiumicino-airport-guide',
    title: 'Rome Fiumicino Airport: Complete Arrivals Guide for First-Time Visitors',
    excerpt: 'Everything you need to know about arriving at Rome Fiumicino Airport — customs, baggage, ground transport, and getting to your hotel.',
    category: 'Airport Guides',
    readTime: '6 min read',
    publishDate: '2026-08-01',
    featured: true,
  },
  {
    slug: 'milan-malpensa-arrivals-guide',
    title: 'Milan Malpensa Airport: What to Expect on Arrival',
    excerpt: 'A complete guide to arriving at Milan Malpensa — from landing to leaving the airport. Terminals, transfers, and tips for a smooth arrival.',
    category: 'Airport Guides',
    readTime: '5 min read',
    publishDate: '2026-07-20',
  },
  {
    slug: 'venice-marco-polo-airport-guide',
    title: 'Venice Marco Polo Airport: How to Get to Venice',
    excerpt: 'Land at Marco Polo and need to get to Venice? Here\'s every option — private transfer, water taxi, bus, and Alilaguna boat.',
    category: 'Airport Guides',
    readTime: '5 min read',
    publishDate: '2026-07-10',
  },
  {
    slug: 'can-you-sleep-at-fiumicino',
    title: 'Can You Sleep Overnight at Rome Fiumicino Airport?',
    excerpt: 'Early departure or late arrival? Here\'s the honest truth about sleeping overnight at FCO — what stays open, where to rest, and what to avoid.',
    category: 'Airport Guides',
    readTime: '4 min read',
    publishDate: '2026-06-15',
  },
  // Travel Guides
  {
    slug: 'best-time-to-visit-italy',
    title: 'Best Time to Visit Italy: A Season-by-Season Guide',
    excerpt: 'Spring crowds, summer heat, autumn colours, winter deals — when should you actually go? An honest breakdown by season and destination.',
    category: 'Travel Guides',
    readTime: '7 min read',
    publishDate: '2026-08-10',
    featured: true,
  },
  {
    slug: '3-days-in-rome-itinerary',
    title: 'The Perfect 3 Days in Rome: A Complete Itinerary',
    excerpt: 'How to see the best of Rome in 72 hours — including the Vatican, Colosseum, Trastevere, and the hidden gems most tourists miss.',
    category: 'Travel Guides',
    readTime: '8 min read',
    publishDate: '2026-07-25',
  },
  {
    slug: 'is-italy-expensive',
    title: 'Is Italy Expensive to Visit? What to Actually Expect in 2026',
    excerpt: 'Honest prices for food, hotels, transport, and attractions. Italy doesn\'t have to be expensive — if you know where to look.',
    category: 'Travel Guides',
    readTime: '6 min read',
    publishDate: '2026-07-05',
  },
  {
    slug: 'common-tourist-mistakes-italy',
    title: 'Common Mistakes Tourists Make in Italy (And How to Avoid Them)',
    excerpt: 'From ZTL fines to tourist menu traps, overpriced taxis to dress code embarrassment — the mistakes that catch first-time Italy visitors out.',
    category: 'Travel Tips',
    readTime: '6 min read',
    publishDate: '2026-06-20',
  },
  // Destinations
  {
    slug: 'amalfi-coast-travel-guide',
    title: 'Amalfi Coast Travel Guide: Getting There, Getting Around, What to See',
    excerpt: 'The Amalfi Coast is stunning but tricky to navigate. Here\'s everything you need to know — from transport options to the best villages.',
    category: 'Destinations',
    readTime: '9 min read',
    publishDate: '2026-08-05',
    featured: true,
  },
  {
    slug: 'lake-como-travel-guide',
    title: 'Lake Como: A Complete Travel Guide for 2026',
    excerpt: 'Bellagio, Varenna, Como town, and the grand villas. How to reach Lake Como from Milan, what to see, and where to stay.',
    category: 'Destinations',
    readTime: '7 min read',
    publishDate: '2026-07-15',
  },
  {
    slug: 'positano-travel-guide',
    title: 'Positano Travel Guide: Everything You Need to Know',
    excerpt: 'How to get to Positano, where to stay, what to eat, and when to visit the most photographed village in Italy.',
    category: 'Destinations',
    readTime: '6 min read',
    publishDate: '2026-07-01',
  },
  // Transport Guides
  {
    slug: 'best-ways-to-travel-between-cities-italy',
    title: 'Best Ways to Travel Between Italian Cities in 2026',
    excerpt: 'Train vs private transfer vs renting a car — the honest comparison for every major route in Italy.',
    category: 'Transport Guides',
    readTime: '7 min read',
    publishDate: '2026-06-10',
  },
  {
    slug: 'private-transfer-vs-taxi-italy',
    title: 'Private Transfer vs Taxi in Italy: Which is Better?',
    excerpt: 'NCC private chauffeurs vs taxis vs ride apps — costs, reliability, and when each option makes sense.',
    category: 'Transport Guides',
    readTime: '5 min read',
    publishDate: '2026-05-25',
  },
  // Local Tips
  {
    slug: 'how-to-avoid-pickpockets-italy',
    title: 'How to Avoid Pickpockets in Italy',
    excerpt: 'Rome, Florence, and Naples are among Europe\'s most pickpocket-heavy cities. How to protect yourself without being paranoid.',
    category: 'Local Travel Tips',
    readTime: '5 min read',
    publishDate: '2026-06-01',
  },
  {
    slug: 'venice-entry-fee-2026',
    title: 'Venice Entry Fee 2026: Everything Tourists Need to Know',
    excerpt: 'Venice now charges a day-tripper entry fee. Here\'s who pays, how much, when it applies, and how to book in advance.',
    category: 'Local Travel Tips',
    readTime: '4 min read',
    publishDate: '2026-05-15',
  },
  {
    slug: 'italy-tourist-tax-2026',
    title: 'Italy Tourist Tax 2026: City-by-City Breakdown',
    excerpt: 'Rome, Florence, Venice, Milan — every major Italian city charges a tourist tax. Here are the current rates and how to pay.',
    category: 'Local Travel Tips',
    readTime: '5 min read',
    publishDate: '2026-05-01',
  },
]

export const blogCategories = [
  'All',
  'Airport Guides',
  'Travel Guides',
  'Destinations',
  'Transport Guides',
  'Travel Tips',
  'Local Travel Tips',
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === 'All') return blogPosts
  return blogPosts.filter((p) => p.category === category)
}

export const blogContent: Record<string, { intro: string; sections: { heading: string; body: string }[] }> = {
  'best-time-to-visit-italy': {
    intro: 'Italy is a year-round destination, but the experience varies dramatically by season. The same street in Rome feels entirely different in April versus August. Here\'s the honest breakdown — crowd levels, prices, weather, and what you\'ll actually find at the most popular destinations in each season.',
    sections: [
      {
        heading: 'Spring (April – June): The Sweet Spot',
        body: 'April and May are widely considered the best months to visit Italy. Temperatures are mild (16–22°C), the countryside is green and flowering, and the tourist crowds haven\'t yet peaked. Easter is busy everywhere — particularly Rome, Florence, and the Amalfi Coast — but the weeks on either side are excellent.\n\nJune starts well but the last two weeks see a significant rise in temperatures and tourist numbers, especially in Rome and Florence. The Amalfi Coast begins filling up from mid-June.',
      },
      {
        heading: 'Summer (July – August): Hot, Busy, Expensive',
        body: 'July and August are peak season everywhere. Temperatures in Rome, Florence, and Naples regularly exceed 35°C. Coastal destinations like the Amalfi Coast, Cinque Terre, and Sicily are at their busiest and most expensive.\n\nThat said, summer has its appeal: long days, lively atmospheres, beach weather, and outdoor events. If you\'re visiting the Italian Lakes or the Dolomites, summer is the right time — temperatures are cooler and the scenery is stunning.',
      },
      {
        heading: 'Autumn (September – October): Underrated',
        body: 'September is arguably the best month to visit. Temperatures drop to a comfortable 22–26°C, crowds thin out significantly after late August, and prices fall. Tuscany in autumn — harvest season, golden light, cycling through vineyards — is among the most beautiful experiences Italy offers.\n\nOctober remains excellent for cities and the Amalfi Coast, but the weather can become unpredictable. November is shoulder season — some coastal businesses close for winter, but cities like Rome and Florence are genuinely pleasant.',
      },
      {
        heading: 'Winter (December – February): Off-Season Opportunities',
        body: 'Winter is the quietest time in Italy. Rome, Florence, Venice, and Milan are far less crowded and hotel prices drop significantly. Christmas in Rome is atmospheric, and December in Milan is magical with festive decorations.\n\nThe ski resorts of the Dolomites, the Alps, and the Aosta Valley are at their best in January and February. The Amalfi Coast and Sicily are quieter but many beach restaurants close. Venice in winter — misty, quiet, achingly beautiful — is many travellers\' favourite time to visit.',
      },
    ],
  },
  'amalfi-coast-travel-guide': {
    intro: 'The Amalfi Coast is 50 kilometres of the most dramatic coastline in Europe. Cliffside villages painted in pastels, turquoise water hundreds of metres below, and a coastal road — the SS163 — that has no right to be as narrow as it is. Getting there and getting around requires some planning. Here\'s everything you need.',
    sections: [
      {
        heading: 'How to Get to the Amalfi Coast',
        body: 'The nearest major airports are Naples (NAP) and Rome Fiumicino (FCO). From Naples airport, a private transfer to the Amalfi Coast takes around 1.5–2 hours depending on your destination village. From Rome, it\'s approximately 3–3.5 hours.\n\nBy train, the nearest stations are Salerno and Vietri sul Mare (for the eastern end) or Sorrento (for the western approach via the Sorrentine Peninsula). From Sorrento, the SITA bus service runs along the SS163.\n\nA private chauffeur transfer is the most practical option for families, couples, and anyone with luggage. The SS163 is not suitable for self-driving if you haven\'t experienced it — it is genuinely one of the most challenging roads in Italy.',
      },
      {
        heading: 'The Main Villages',
        body: 'Positano is the most photographed and most expensive. Its vertical layout — houses stacked above each other down the cliffside — means a lot of stairs. It\'s spectacular but not wheelchair-friendly and not great if you dislike hills.\n\nAmalfi town is the main hub — ferry connections, a cathedral, and a central piazza. It\'s more accessible and has the most services. Ravello is perched 350 metres above the coast — quieter, more refined, and home to the famous Villa Rufolo and Villa Cimbrone.\n\nFurther east, Minori and Maiori are where Italian families holiday — less touristy, genuine local restaurants, and much better value.',
      },
      {
        heading: 'Getting Around the Coast',
        body: 'The SITA bus service connects all villages along the SS163 and is cheap but extremely crowded in summer. Ferries run between all the main villages and are a pleasant way to move between Positano, Amalfi, and Salerno.\n\nRenting a car is possible but not recommended for nervous drivers. The SS163 is genuinely narrow, with buses, scooters, and tour coaches sharing the same road. Parking is extremely limited. A private driver who knows the road is a far more relaxing option.',
      },
    ],
  },
}
