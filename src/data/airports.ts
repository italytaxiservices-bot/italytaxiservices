import type { Airport } from '@/types'

export const airports: Airport[] = [
  // ── NORTH ─────────────────────────────────────────────
  {
    code: 'MXP', name: 'Milan Malpensa Airport', slug: 'malpensa',
    citySlug: 'milan', cityName: 'Milan', region: 'Lombardy',
    description: 'Milan Malpensa (MXP) is the largest airport in northern Italy, serving Milan, Lake Como, and the wider Lombardy region. Terminal 1 handles most international flights; Terminal 2 is used primarily by low-cost carriers.',
    metaTitle: 'Malpensa Airport Transfer | Private Chauffeur MXP | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Malpensa Airport (MXP). Meet & greet, flight monitoring. Milan, Lake Como, Bellagio. Fixed prices. Book today.',
  },
  {
    code: 'LIN', name: 'Milan Linate Airport', slug: 'linate',
    citySlug: 'milan', cityName: 'Milan', region: 'Lombardy',
    description: 'Milan Linate (LIN) is the city airport of Milan, just 7km from the centre. Ideal for business travellers needing fast connections to the city.',
    metaTitle: 'Linate Airport Transfer | Private Chauffeur LIN | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Linate Airport (LIN). Close to Milan city centre. Meet & greet included. Fixed price NCC transfers. Book today.',
  },
  {
    code: 'BGY', name: 'Milan Bergamo Airport', slug: 'bergamo',
    citySlug: 'milan', cityName: 'Milan / Bergamo', region: 'Lombardy',
    description: 'Bergamo Orio al Serio (BGY) is a major low-cost hub serving the Milan area, 45km from Milan city centre. Used by Ryanair and other low-cost carriers.',
    metaTitle: 'Bergamo Airport Transfer | Private Chauffeur BGY | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Bergamo Orio al Serio Airport (BGY). Milan, Lake Como, and more. Fixed price NCC service. Book today.',
  },
  {
    code: 'TRN', name: 'Turin Caselle Airport', slug: 'turin',
    citySlug: 'turin', cityName: 'Turin', region: 'Piedmont',
    description: 'Turin Caselle International Airport (TRN) serves the Piedmont capital, located 15km north of Turin city centre. Gateway to the Alps, Lake Maggiore, and the Langhe wine region.',
    metaTitle: 'Turin Airport Transfer | Private Chauffeur TRN | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Turin Caselle Airport (TRN). Turin city, Valle d\'Aosta, Lake Maggiore. Fixed prices, meet & greet. Book today.',
  },
  {
    code: 'GOA', name: 'Genoa Cristoforo Colombo Airport', slug: 'genoa',
    citySlug: 'genoa', cityName: 'Genoa', region: 'Liguria',
    description: 'Genoa Cristoforo Colombo Airport (GOA) sits on a unique sea-platform just 6km from Genoa city centre. Gateway to the Italian Riviera, Cinque Terre, and Portofino.',
    metaTitle: 'Genoa Airport Transfer | Private Chauffeur GOA | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Genoa Airport (GOA). Genoa, Cinque Terre, Portofino, Italian Riviera. Fixed prices, meet & greet. Book today.',
  },
  {
    code: 'TSF', name: 'Treviso Antonio Canova Airport', slug: 'treviso',
    citySlug: 'venice', cityName: 'Treviso / Venice', region: 'Veneto',
    description: 'Treviso Airport (TSF) is a secondary airport near Venice, primarily used by Ryanair. Located 30km from Venice and 4km from Treviso city centre.',
    metaTitle: 'Treviso Airport Transfer | Private Chauffeur TSF | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Treviso Airport (TSF). Venice, Padova, Verona, Treviso city. Fixed prices, meet & greet. Book today.',
  },
  {
    code: 'VRN', name: 'Verona Villafranca Airport', slug: 'verona',
    citySlug: 'verona', cityName: 'Verona', region: 'Veneto',
    description: 'Verona Villafranca Airport (VRN) serves the Veneto region, 12km from Verona city. Gateway to Lake Garda, Venice, and the Dolomites.',
    metaTitle: 'Verona Airport Transfer | Private Chauffeur VRN | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Verona Airport (VRN). Verona city, Lake Garda, Venice, Dolomites. Fixed prices, meet & greet. Book today.',
  },
  {
    code: 'VCE', name: 'Venice Marco Polo Airport', slug: 'marco-polo',
    citySlug: 'venice', cityName: 'Venice', region: 'Veneto',
    description: "Venice Marco Polo (VCE) is the main international airport serving Venice and the Veneto region, located on the mainland 13km from Venice's historic centre.",
    metaTitle: 'Venice Marco Polo Airport Transfer | Private Chauffeur VCE | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Venice Marco Polo Airport (VCE). Venice, Mestre, cruise port. Meet & greet included. Fixed price NCC service. Book today.',
  },
  {
    code: 'BLQ', name: 'Bologna Marconi Airport', slug: 'bologna',
    citySlug: 'bologna', cityName: 'Bologna', region: 'Emilia-Romagna',
    description: 'Bologna Guglielmo Marconi Airport (BLQ) is the main airport of Emilia-Romagna, 6km north of Bologna city centre. Gateway to Florence, Rimini, and the Po Valley.',
    metaTitle: 'Bologna Airport Transfer | Private Chauffeur BLQ | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Bologna Marconi Airport (BLQ). Bologna, Florence, Rimini. Fixed prices, meet & greet. Book today.',
  },
  // ── CENTRAL ──────────────────────────────────────────
  {
    code: 'FCO', name: 'Rome Fiumicino Airport', slug: 'fiumicino',
    citySlug: 'rome', cityName: 'Rome', region: 'Lazio',
    description: "Rome Fiumicino (FCO) — Leonardo da Vinci International Airport — is Italy's largest and busiest airport, located 32km from Rome city centre.",
    metaTitle: 'Fiumicino Airport Transfer | Private Chauffeur FCO | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Rome Fiumicino Airport (FCO). Rome, Vatican, Civitavecchia, Amalfi. Meet & greet included. Book today.',
  },
  {
    code: 'CIA', name: 'Rome Ciampino Airport', slug: 'ciampino',
    citySlug: 'rome', cityName: 'Rome', region: 'Lazio',
    description: 'Rome Ciampino (CIA) is a busy secondary airport serving Rome, primarily used by low-cost airlines. Located 15km south of Rome centre.',
    metaTitle: 'Ciampino Airport Transfer | Private Chauffeur CIA | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Rome Ciampino Airport (CIA). Rome city and beyond. Meet & greet, fixed price NCC service. Book today.',
  },
  {
    code: 'FLR', name: 'Florence Peretola Airport', slug: 'florence',
    citySlug: 'florence', cityName: 'Florence', region: 'Tuscany',
    description: 'Florence Peretola (FLR) is the city airport of Florence, serving Tuscany. Located 5km from the historic centre.',
    metaTitle: 'Florence Airport Transfer | Private Chauffeur FLR | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Florence Airport (FLR). Florence city, Tuscany, Siena, Pisa. Meet & greet included. Fixed price NCC service. Book today.',
  },
  {
    code: 'PSA', name: 'Pisa Galileo Galilei Airport', slug: 'pisa',
    citySlug: 'florence', cityName: 'Pisa / Florence', region: 'Tuscany',
    description: 'Pisa Galileo Galilei (PSA) is the main airport of western Tuscany, serving Florence, Pisa, Lucca, and the wider region.',
    metaTitle: 'Pisa Airport Transfer | Private Chauffeur PSA | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Pisa Airport (PSA). Florence, Pisa, Tuscany, Cinque Terre. Fixed price NCC service. Book today.',
  },
  // ── SOUTH ────────────────────────────────────────────
  {
    code: 'NAP', name: 'Naples Capodichino Airport', slug: 'naples',
    citySlug: 'naples', cityName: 'Naples', region: 'Campania',
    description: 'Naples International Airport (NAP) is the main airport of southern Italy, 7km from Naples city centre. Gateway to Pompeii, the Amalfi Coast, Sorrento, and Capri.',
    metaTitle: 'Naples Airport Transfer | Private Chauffeur NAP | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Naples Airport (NAP). Naples, Pompeii, Amalfi Coast, Sorrento, Capri. Fixed prices, meet & greet. Book today.',
  },
  {
    code: 'BRI', name: 'Bari Karol Wojtyla Airport', slug: 'bari',
    citySlug: 'bari', cityName: 'Bari', region: 'Puglia',
    description: 'Bari Karol Wojtyla Airport (BRI) serves Puglia and southern Italy, 9km from Bari city centre. Gateway to Alberobello, Matera, Lecce, and the Adriatic coast.',
    metaTitle: 'Bari Airport Transfer | Private Chauffeur BRI | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Bari Airport (BRI). Bari, Alberobello, Matera, Lecce. Fixed prices, meet & greet. Book today.',
  },
  {
    code: 'CTA', name: 'Catania Fontanarossa Airport', slug: 'catania',
    citySlug: 'catania', cityName: 'Catania', region: 'Sicily',
    description: 'Catania Fontanarossa Airport (CTA) is the busiest airport in Sicily, 7km from Catania city. Gateway to Mount Etna, Taormina, Syracuse, and the Sicilian coast.',
    metaTitle: 'Catania Airport Transfer | Private Chauffeur CTA | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Catania Airport (CTA). Catania, Taormina, Etna, Syracuse. Fixed prices, meet & greet. Book today.',
  },
  {
    code: 'PMO', name: 'Palermo Falcone-Borsellino Airport', slug: 'palermo',
    citySlug: 'palermo', cityName: 'Palermo', region: 'Sicily',
    description: 'Palermo Falcone-Borsellino Airport (PMO) serves western Sicily, 35km from Palermo city centre. Gateway to Cefalù, Agrigento, and the Valley of the Temples.',
    metaTitle: 'Palermo Airport Transfer | Private Chauffeur PMO | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Palermo Airport (PMO). Palermo, Cefalù, Agrigento, Valley of the Temples. Fixed prices, meet & greet. Book today.',
  },
  // ── SARDINIA ─────────────────────────────────────────
  {
    code: 'OLB', name: 'Olbia Costa Smeralda Airport', slug: 'olbia',
    citySlug: 'olbia', cityName: 'Olbia', region: 'Sardinia',
    description: 'Olbia Costa Smeralda Airport (OLB) serves north-east Sardinia and the exclusive Costa Smeralda resort area. Gateway to Porto Cervo, Porto Rotondo, and La Maddalena.',
    metaTitle: 'Olbia Airport Transfer | Private Chauffeur OLB | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Olbia Costa Smeralda Airport (OLB). Costa Smeralda, Porto Cervo, Porto Rotondo. Fixed prices, meet & greet. Book today.',
  },
  {
    code: 'CAG', name: 'Cagliari Elmas Airport', slug: 'cagliari',
    citySlug: 'cagliari', cityName: 'Cagliari', region: 'Sardinia',
    description: 'Cagliari Elmas Airport (CAG) is the main airport of Sardinia, 7km from Cagliari city centre. Gateway to southern Sardinia, beaches, and the island\'s historic sites.',
    metaTitle: 'Cagliari Airport Transfer | Private Chauffeur CAG | Italy Taxi Services',
    metaDescription: 'Private chauffeur transfers from Cagliari Airport (CAG). Cagliari, Villasimius, Pula, Costa Rei. Fixed prices, meet & greet. Book today.',
  },
]

export const getAirportBySlug = (slug: string) => airports.find(a => a.slug === slug)
export const getAirportByCode = (code: string) => airports.find(a => a.code === code)
export const getAirportsByCity = (citySlug: string) => airports.filter(a => a.citySlug === citySlug)
