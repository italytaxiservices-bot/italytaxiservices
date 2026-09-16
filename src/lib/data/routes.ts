import { RouteInfo } from "@/lib/types";

function makeRoute(
  fromName: string,
  fromSlug: string,
  toName: string,
  toSlug: string,
  distance: string,
  duration: string,
  highlights: string[],
  intro: string[]
): RouteInfo {
  return {
    slug: `${fromSlug}-to-${toSlug}`,
    from: fromName,
    to: toName,
    fromSlug,
    toSlug,
    metaTitle: `Transfer ${fromName} to ${toName}`,
    metaDescription: `Book a private chauffeur transfer from ${fromName} to ${toName}. Direct, comfortable travel with a professional driver, door to door, no changes required.`,
    summary: `Private door-to-door chauffeur transfer between ${fromName} and ${toName}.`,
    intro,
    distanceApprox: distance,
    durationApprox: duration,
    highlights,
    relatedDestinations: [fromSlug, toSlug],
    image: `/images/routes/${fromSlug}-${toSlug}.jpg`,
  };
}

export const routes: RouteInfo[] = [
  makeRoute(
    "Rome",
    "rome",
    "Florence",
    "florence",
    "Approximately 280 km",
    "Around 3 hours",
    ["Direct motorway route with optional scenic stops", "Door-to-door service, no station changes", "Flexible departure times"],
    [
      "The drive from [Rome](/destinations/rome) to [Florence](/destinations/florence) is one of the most requested private transfers in Italy, connecting two of the country's most visited cities without the fixed schedule of a train.",
      "A private transfer is especially useful with luggage, an early flight connection, or when you'd like to break the journey with a stop in Orvieto or the [Tuscan countryside](/destinations/tuscany) along the way.",
    ]
  ),
  makeRoute(
    "Florence",
    "florence",
    "Rome",
    "rome",
    "Approximately 280 km",
    "Around 3 hours",
    ["Direct motorway route with optional scenic stops", "Ideal for onward flight or cruise connections", "Flexible departure times"],
    [
      "Travelling from [Florence](/destinations/florence) to [Rome](/destinations/rome) by private chauffeur is a comfortable alternative to the train, particularly when heading to [Fiumicino Airport](/airport-transfers/rome-fiumicino) or [Civitavecchia](/cruise-port-transfers) for a cruise departure.",
      "Your chauffeur times the journey around your flight or embarkation, building in a buffer for traffic rather than leaving you to manage a fixed train schedule.",
    ]
  ),
  makeRoute(
    "Florence",
    "florence",
    "Venice",
    "venice",
    "Approximately 260 km",
    "Around 3 hours",
    ["Direct route through northern [Tuscany](/destinations/tuscany) and the Veneto", "Comfortable alternative to train transfers with luggage", "Optional stop in [Bologna](/destinations/bologna)"],
    [
      "The transfer from [Florence](/destinations/florence) to [Venice](/destinations/venice) crosses some of Italy's most varied countryside, and a private chauffeur makes it easy to break the journey for a coffee stop or a detour through [Bologna](/destinations/bologna).",
      "This route is popular with travellers combining [Tuscany](/destinations/tuscany) and Venice on a single itinerary who prefer not to manage train changes with luggage.",
    ]
  ),
  makeRoute(
    "Venice",
    "venice",
    "Florence",
    "florence",
    "Approximately 260 km",
    "Around 3 hours",
    ["Direct route via the Veneto and northern [Tuscany](/destinations/tuscany)", "Comfortable for early departures", "Optional stop in [Bologna](/destinations/bologna)"],
    [
      "Heading south from [Venice](/destinations/venice) to [Florence](/destinations/florence), a private transfer avoids the need to first reach the mainland station before boarding a train, picking you up directly from your hotel instead.",
      "This is a popular choice for travellers continuing on to explore [Tuscany](/destinations/tuscany) after their time in Venice.",
    ]
  ),
  makeRoute(
    "Rome",
    "rome",
    "Naples",
    "naples",
    "Approximately 225 km",
    "Around 2.5 hours",
    ["Direct motorway connection", "Ideal continuation to Pompeii or the [Amalfi Coast](/destinations/amalfi-coast)", "Flexible luggage capacity"],
    [
      "The [Rome](/destinations/rome) to [Naples](/destinations/naples) transfer is a practical option for travellers heading south toward Pompeii, [Sorrento](/destinations/sorrento) or the [Amalfi Coast](/destinations/amalfi-coast), avoiding a station transfer in central Naples with luggage.",
      "We can also route this journey with a stop at Pompeii or Herculaneum along the way, turning the transfer into a private day of sightseeing. Families or groups travelling with extra luggage often choose a [Luxury SUV](/fleet/luxury-suv) for this route.",
    ]
  ),
  makeRoute(
    "Naples",
    "naples",
    "Rome",
    "rome",
    "Approximately 225 km",
    "Around 2.5 hours",
    ["Direct motorway connection", "Convenient for [Fiumicino](/airport-transfers/rome-fiumicino) flight connections", "Optional Pompeii stop"],
    [
      "Returning north from [Naples](/destinations/naples) to [Rome](/destinations/rome) by private chauffeur is a comfortable way to reach [Fiumicino Airport](/airport-transfers/rome-fiumicino) or central Rome without navigating Naples' train station with luggage.",
      "This route can also be arranged with a stop at Pompeii for travellers who want to see the site en route.",
    ]
  ),
  makeRoute(
    "Rome",
    "rome",
    "Sorrento",
    "sorrento",
    "Approximately 260 km",
    "Around 3 hours",
    ["Direct transfer avoiding multiple train changes", "Optional Pompeii stop en route", "Comfortable for families and groups"],
    [
      "[Sorrento](/destinations/sorrento) is not directly served by fast trains, which makes a private transfer from [Rome](/destinations/rome) a considerably more comfortable option than a multi-leg train and local connection.",
      "We regularly build in a stop at Pompeii for travellers who want to combine the transfer with a guided or self-guided visit to the ruins. For a family with luggage, a [Luxury SUV](/fleet/luxury-suv) offers more comfortable space than a standard sedan.",
    ]
  ),
  makeRoute(
    "Sorrento",
    "sorrento",
    "Rome",
    "rome",
    "Approximately 260 km",
    "Around 3 hours",
    ["Direct transfer to central Rome or [Fiumicino Airport](/airport-transfers/rome-fiumicino)", "Optional Pompeii stop en route", "Comfortable for families and groups"],
    [
      "Leaving [Sorrento](/destinations/sorrento) for [Rome](/destinations/rome), a private chauffeur removes the need to first reach [Naples](/destinations/naples) by local train before catching a connection north, picking you up directly from your hotel instead.",
      "This transfer is timed around your onward flight or hotel check-in, with an optional stop at Pompeii along the way.",
    ]
  ),
  makeRoute(
    "Rome",
    "rome",
    "Amalfi Coast",
    "amalfi-coast",
    "Approximately 280 km",
    "Around 3.5 hours",
    ["Experienced drivers on the coast's narrow roads", "Direct service to Positano, Amalfi or Ravello", "Optional Pompeii stop en route"],
    [
      "The drive from [Rome](/destinations/rome) to the [Amalfi Coast](/destinations/amalfi-coast) ends on some of Italy's narrowest and most scenic roads, where a driver with local experience makes a real difference to comfort and safety.",
      "We take you directly to your hotel in Positano, Amalfi or Ravello, with the option to stop at Pompeii along the way. For a family travelling with luggage, a [Luxury SUV](/fleet/luxury-suv) offers additional space; for larger groups, an [Executive Van](/fleet/executive-van) or [Luxury Van](/fleet/luxury-van) may be more suitable.",
    ]
  ),
  makeRoute(
    "Florence",
    "florence",
    "Pisa",
    "pisa",
    "Approximately 85 km",
    "Around 1 hour",
    ["Short, direct transfer ideal for flight connections", "Convenient for [Pisa Airport](/airport-transfers/pisa) departures", "Optional Leaning Tower stop"],
    [
      "The [Florence](/destinations/florence) to [Pisa](/destinations/pisa) transfer is most often booked around a flight at [Pisa Airport](/airport-transfers/pisa), and a private chauffeur ensures you arrive with a comfortable buffer rather than relying on train timetables.",
      "Many travellers also use this route to fit in a stop at the Leaning Tower and Piazza dei Miracoli en route to the airport.",
    ]
  ),
  makeRoute(
    "Pisa",
    "pisa",
    "Florence",
    "florence",
    "Approximately 85 km",
    "Around 1 hour",
    ["Short, direct transfer from the airport", "Ideal first leg of a [Tuscany](/destinations/tuscany) itinerary", "Luggage assistance included"],
    [
      "Arriving into [Pisa Airport](/airport-transfers/pisa) and heading to [Florence](/destinations/florence), a private transfer is a fast and simple way to begin a [Tuscany](/destinations/tuscany) itinerary without navigating train stations after a flight.",
      "Your chauffeur can also route via the Leaning Tower for a brief stop if your schedule allows.",
    ]
  ),
  makeRoute(
    "Milan",
    "milan",
    "Lake Como",
    "lake-como",
    "Approximately 50 km",
    "Around 1 hour",
    ["Direct transfer or full-day touring option", "Access to Bellagio, Como and Varenna", "Flexible return timing"],
    [
      "[Lake Como](/destinations/lake-como) is an easy private day trip from [Milan](/destinations/milan), and this route is available either as a simple point-to-point transfer or as a full-day touring itinerary around the lake's towns.",
      "We can build in stops at Bellagio, Varenna and Como town depending on how much time you'd like to spend at each. Small groups touring for the day often choose a [Luxury SUV](/fleet/luxury-suv) for the extra comfort.",
    ]
  ),
  makeRoute(
    "Milan",
    "milan",
    "Venice",
    "venice",
    "Approximately 270 km",
    "Around 3 hours",
    ["Direct motorway connection across northern Italy", "Comfortable alternative to train travel with luggage", "Optional stop in [Verona](/destinations/verona)"],
    [
      "The [Milan](/destinations/milan) to [Venice](/destinations/venice) transfer crosses Lombardy and the Veneto directly, and is a popular choice for travellers moving between Italy's business capital and its most iconic canal city.",
      "This journey can include a stop in [Verona](/destinations/verona) for travellers who want to see the city en route.",
    ]
  ),
  makeRoute(
    "Venice",
    "venice",
    "Milan",
    "milan",
    "Approximately 270 km",
    "Around 3 hours",
    ["Direct motorway connection", "Ideal for [Malpensa](/airport-transfers/milan-malpensa) or [Linate](/airport-transfers/milan-linate) flight connections", "Optional stop in [Verona](/destinations/verona)"],
    [
      "Heading west from [Venice](/destinations/venice) to [Milan](/destinations/milan), a private transfer is timed around your onward flight from [Malpensa](/airport-transfers/milan-malpensa) or [Linate](/airport-transfers/milan-linate), with the flexibility to stop in [Verona](/destinations/verona) along the way.",
      "This route is popular with business travellers moving between Italy's two major commercial hubs.",
    ]
  ),
  makeRoute(
    "Florence",
    "florence",
    "Siena",
    "siena",
    "Approximately 70 km",
    "Around 1 hour",
    ["Short transfer through the Chianti countryside", "Easily extended into a wine region day trip", "Flexible departure and return"],
    [
      "The drive from [Florence](/destinations/florence) to [Siena](/destinations/siena) passes directly through Chianti, and many travellers extend this short transfer into a half-day or full-day countryside itinerary with vineyard stops.",
      "This route works equally well as a simple point-to-point transfer for travellers with limited time. A group travelling together for the day may prefer a [Luxury SUV](/fleet/luxury-suv) or [Executive Van](/fleet/executive-van), depending on numbers.",
    ]
  ),
];

function makeInternationalRoute(opts: {
  fromName: string;
  fromSlug: string;
  toName: string;
  toSlug: string;
  distance: string;
  duration: string;
  hubGroup: "switzerland" | "france" | "austria" | "slovenia";
  country: string;
  borderNote: string;
  pickupPoints: string[];
  destinationPoints: string[];
  fromSummary?: string;
  toSummary?: string;
  intro: string[];
  highlights: string[];
  metaTitle: string;
  metaDescription: string;
}): RouteInfo {
  return {
    slug: `${opts.fromSlug}-to-${opts.toSlug}`,
    from: opts.fromName,
    to: opts.toName,
    fromSlug: opts.fromSlug,
    toSlug: opts.toSlug,
    metaTitle: opts.metaTitle,
    metaDescription: opts.metaDescription,
    summary: `Private chauffeur transfer between ${opts.fromName} and ${opts.toName}, crossing the border into ${opts.country}.`,
    intro: opts.intro,
    distanceApprox: opts.distance,
    durationApprox: opts.duration,
    highlights: opts.highlights,
    relatedDestinations: [opts.fromSlug, opts.toSlug],
    image: `/images/routes/${opts.fromSlug}-${opts.toSlug}.jpg`,
    international: {
      hubGroup: opts.hubGroup,
      country: opts.country,
      borderNote: opts.borderNote,
      pickupPoints: opts.pickupPoints,
      destinationPoints: opts.destinationPoints,
      fromSummary: opts.fromSummary,
      toSummary: opts.toSummary,
    },
  };
}

export const internationalRoutes: RouteInfo[] = [
  // --- Switzerland ---
  makeInternationalRoute({
    fromName: "Milan",
    fromSlug: "milan",
    toName: "Lugano",
    toSlug: "lugano",
    distance: "Approximately 80 km",
    duration: "Around 1 to 1.5 hours",
    hubGroup: "switzerland",
    country: "Switzerland",
    borderNote:
      "The route crosses into Switzerland at the Chiasso–Brogeda border crossing on the A9 motorway, north of Como — one of the busiest road crossings between the two countries.",
    pickupPoints: ["Milan Malpensa Airport", "Milan Linate Airport", "Milan city-centre hotels"],
    destinationPoints: ["Lugano city centre", "Lugano Airport (Agno)", "Lake Lugano hotels"],
    toSummary:
      "Lugano is Switzerland's Italian-speaking lakeside city in the canton of Ticino, known for its banking district, lakefront promenade and easy access to the surrounding Swiss Alps.",
    metaTitle: "Private Transfer from Milan to Lugano",
    metaDescription:
      "Book a private chauffeur transfer from Milan to Lugano, Switzerland. Door-to-door service crossing the Chiasso border, with a fixed quote before travel.",
    intro: [
      "Milan to Lugano is one of the most requested international transfers we arrange, crossing from Lombardy into Switzerland's Ticino canton in about the same time as a typical domestic city-to-city journey.",
      "A private chauffeur takes you directly from your Milan pickup point to your Lugano address, without a train change at the border or the need to arrange separate transportation on the Swiss side.",
    ],
    highlights: [
      "Short, direct crossing suited to a same-day business trip or a lake getaway",
      "No train change at the border — one vehicle, one driver, door to door",
      "Comfortable for travellers continuing on to [Lake Como](/destinations/lake-como) beforehand",
    ],
  }),
  makeInternationalRoute({
    fromName: "Lake Como",
    fromSlug: "lake-como",
    toName: "Lugano",
    toSlug: "lugano",
    distance: "Approximately 35 km",
    duration: "Around 45 minutes to 1 hour",
    hubGroup: "switzerland",
    country: "Switzerland",
    borderNote:
      "A short drive from the Como area to the Chiasso border crossing, then on into Lugano via the Swiss motorway network.",
    pickupPoints: ["Como town", "Cernobbio", "Lake Como hotels"],
    destinationPoints: ["Lugano city centre", "Lake Lugano hotels", "Lugano Airport (Agno)"],
    toSummary:
      "Lugano sits on its own lake just across the Swiss border, a natural extension for travellers already based around Lake Como who want to see both lake regions in one trip.",
    metaTitle: "Private Transfer from Lake Como to Lugano",
    metaDescription:
      "Private chauffeur transfer from Lake Como to Lugano, Switzerland. A short, comfortable border crossing with door-to-door service and a fixed quote.",
    intro: [
      "This is the shortest of our Switzerland routes — a brief, scenic drive from the Como area across the border into Lugano, often booked as a half-day add-on rather than a standalone journey.",
      "It suits travellers based at a Lake Como hotel who want to visit Lugano's lakefront and old town, or continue further into Switzerland afterwards, without managing the crossing themselves.",
    ],
    highlights: [
      "The shortest international crossing we offer — well suited to a half-day visit",
      "Easily combined with a [Lake Como touring day](/routes/milan-to-lake-como)",
      "Direct hotel-to-hotel service across the border",
    ],
  }),
  makeInternationalRoute({
    fromName: "Milan",
    fromSlug: "milan",
    toName: "Zurich",
    toSlug: "zurich",
    distance: "Approximately 210 km",
    duration: "Around 3 to 3.5 hours",
    hubGroup: "switzerland",
    country: "Switzerland",
    borderNote:
      "Crosses into Switzerland at Chiasso, then follows the Swiss A2 motorway north through the Gotthard road tunnel — a route that can see seasonal traffic around the tunnel, particularly on summer weekends.",
    pickupPoints: ["Milan Malpensa Airport", "Milan Linate Airport", "Milan city-centre hotels"],
    destinationPoints: ["Zurich city centre", "Zurich Airport", "Zurich hotels"],
    toSummary:
      "Zurich is Switzerland's largest city and financial centre, with a compact old town on the Limmat river and one of Europe's busiest airports.",
    metaTitle: "Private Transfer from Milan to Zurich",
    metaDescription:
      "Private chauffeur transfer from Milan to Zurich, Switzerland via the Gotthard route. Direct, door-to-door travel with a fixed quote before booking.",
    intro: [
      "Milan to Zurich is a longer alpine drive, popular with business travellers moving between Italy's financial centre and Switzerland's, as well as travellers who'd rather not change trains and manage luggage at the border themselves.",
      "The route runs north through Ticino and the Gotthard tunnel before descending into the Zurich area — a comfortable, private alternative to the train for the full journey.",
    ],
    highlights: [
      "Direct, private alternative to changing trains at the border",
      "Comfortable for business travellers with luggage or documents to manage en route",
      "Flexible departure time built around your meeting or flight schedule",
    ],
  }),
  makeInternationalRoute({
    fromName: "Milan",
    fromSlug: "milan",
    toName: "St. Moritz",
    toSlug: "st-moritz",
    distance: "Approximately 180 km",
    duration: "Around 3 to 3.5 hours",
    hubGroup: "switzerland",
    country: "Switzerland",
    borderNote:
      "Crosses into Switzerland at Chiasso before climbing into the Engadin valley via mountain pass roads — routing and timing can be affected by winter weather and seasonal closures.",
    pickupPoints: ["Milan Malpensa Airport", "Milan city-centre hotels"],
    destinationPoints: ["St. Moritz village", "St. Moritz hotels"],
    toSummary:
      "St. Moritz is an alpine resort town in the Engadin valley, well known for winter skiing and as a summer mountain retreat.",
    metaTitle: "Private Transfer from Milan to St. Moritz",
    metaDescription:
      "Private chauffeur transfer from Milan to St. Moritz, Switzerland. Comfortable mountain-route travel with luggage and ski gear, fixed quote before travel.",
    intro: [
      "Milan to St. Moritz is our longest and highest-altitude Switzerland route, climbing from the Lombardy plain into the Engadin valley on mountain roads rather than motorway for the final stretch.",
      "It's most often booked around the winter ski season or a summer mountain stay, with a private vehicle that comfortably handles ski bags or extra luggage that a train connection would make awkward.",
    ],
    highlights: [
      "Avoids multiple train and cable-car connections with ski equipment or luggage",
      "Suited to both winter ski-season travel and summer alpine stays",
      "Flexible timing around flight arrivals into Milan",
    ],
  }),

  // --- France (including the Principality of Monaco) ---
  makeInternationalRoute({
    fromName: "Milan",
    fromSlug: "milan",
    toName: "Nice",
    toSlug: "nice",
    distance: "Approximately 330 km",
    duration: "Around 4 to 4.5 hours",
    hubGroup: "france",
    country: "France",
    borderNote:
      "Follows the Ligurian coastal motorway through Genoa and Savona to Ventimiglia, crossing into France near Menton before continuing along the Côte d'Azur to Nice.",
    pickupPoints: ["Milan Malpensa Airport", "Milan Linate Airport", "Milan city-centre hotels"],
    destinationPoints: ["Nice city centre", "Nice Côte d'Azur Airport", "Promenade des Anglais hotels"],
    toSummary:
      "Nice is the main city of the French Riviera, with its own international airport and easy onward access to Cannes, Antibes and Monaco.",
    metaTitle: "Private Transfer from Milan to Nice",
    metaDescription:
      "Private chauffeur transfer from Milan to Nice, France along the Ligurian coast. Door-to-door service, crossing at Ventimiglia, fixed quote before travel.",
    intro: [
      "Milan to Nice is a full coastal crossing, tracing the Italian and French Rivieras from Lombardy's business capital to the heart of the Côte d'Azur.",
      "A private chauffeur removes the need to change trains at the border or coordinate a separate taxi on arrival — one vehicle covers the whole journey, with stops possible along the Ligurian coast if you'd like to break up the drive.",
    ],
    highlights: [
      "One private vehicle for the full coastal journey, no border train change",
      "Optional stops along the Ligurian coast en route",
      "Popular around film festival and Riviera season travel",
    ],
  }),
  makeInternationalRoute({
    fromName: "Turin",
    fromSlug: "turin",
    toName: "Nice",
    toSlug: "nice",
    distance: "Approximately 210 km",
    duration: "Around 3.5 hours",
    hubGroup: "france",
    country: "France",
    borderNote:
      "Typically routed via the Ligurian coastal motorway through Savona to the Ventimiglia border crossing into France, rather than the mountain pass roads further inland.",
    pickupPoints: ["Turin Airport", "Turin city-centre hotels"],
    destinationPoints: ["Nice city centre", "Nice Côte d'Azur Airport"],
    toSummary:
      "Nice is the main gateway city to the French Riviera, with direct beachfront access and an international airport of its own.",
    metaTitle: "Private Transfer from Turin to Nice",
    metaDescription:
      "Private chauffeur transfer from Turin to Nice, France. Comfortable coastal-route travel across the Ventimiglia border, with a fixed quote before booking.",
    intro: [
      "Turin to Nice connects Piedmont with the French Riviera, a route we arrange as a private, direct transfer rather than a coastal train with multiple changes.",
      "It's a popular option for business travellers and holidaymakers alike, with the flexibility to time departure around a flight or meeting rather than a fixed timetable.",
    ],
    highlights: [
      "Direct coastal-route alternative to a multi-change train journey",
      "Flexible timing around flights into or out of Nice",
      "Can be arranged with a stop in Liguria along the way",
    ],
  }),
  makeInternationalRoute({
    fromName: "Sanremo",
    fromSlug: "sanremo",
    toName: "Nice",
    toSlug: "nice",
    distance: "Approximately 60 km",
    duration: "Around 1 to 1.5 hours",
    hubGroup: "france",
    country: "France",
    borderNote:
      "A short drive along the coastal motorway to the Ventimiglia border crossing into France — a busy crossing that can experience queues at peak travel times.",
    pickupPoints: ["Sanremo hotels", "Sanremo city centre"],
    destinationPoints: ["Nice city centre", "Nice Côte d'Azur Airport"],
    fromSummary:
      "Sanremo is a resort town on the Italian Riviera in western Liguria, close to the French border and well known for its casino and flower industry.",
    toSummary:
      "Nice is the principal city of the French Riviera, a short hop across the border from the Italian Ligurian coast.",
    metaTitle: "Private Transfer from Sanremo to Nice",
    metaDescription:
      "Private chauffeur transfer from Sanremo to Nice, France. A short Riviera border crossing at Ventimiglia, door-to-door with a fixed quote.",
    intro: [
      "Sanremo to Nice is the shortest of our France routes, linking the Italian and French Rivieras in a single short drive across the Ventimiglia border.",
      "It's a natural choice for travellers combining both coastlines in one trip, or attending an event on either side of the border without wanting to self-drive across it.",
    ],
    highlights: [
      "The shortest Italy–France crossing we offer",
      "Ideal for combining the Italian and French Rivieras in one visit",
      "Direct hotel-to-hotel service, no self-driving across the border",
    ],
  }),
  makeInternationalRoute({
    fromName: "Turin",
    fromSlug: "turin",
    toName: "Monaco",
    toSlug: "monaco",
    distance: "Approximately 280 km",
    duration: "Around 3.5 to 4 hours",
    hubGroup: "france",
    country: "Monaco",
    borderNote:
      "Routed via the Ligurian coast and the Ventimiglia crossing into France, then along the Côte d'Azur to the Principality of Monaco. Monaco is an independent sovereign state and not part of France.",
    pickupPoints: ["Turin Airport", "Turin city-centre hotels"],
    destinationPoints: ["Monte Carlo", "Monaco hotels and harbour"],
    toSummary:
      "Monaco is an independent principality on the French Riviera, distinct from France, known for Monte Carlo, its harbour and the Monaco Grand Prix.",
    metaTitle: "Private Transfer from Turin to Monaco",
    metaDescription:
      "Private chauffeur transfer from Turin to the Principality of Monaco. Comfortable coastal travel crossing into France at Ventimiglia, fixed quote before travel.",
    intro: [
      "Turin to Monaco follows the same Ligurian coastal corridor as our France routes, continuing past Nice to the Principality of Monaco — an independent state, not part of France, though the drive passes through French territory to reach it.",
      "This route is popular around Monaco's event calendar, including the Grand Prix and Monte Carlo's social season, when a private, direct arrival is worth the extra planning.",
    ],
    highlights: [
      "Direct private transfer to Monte Carlo, no self-driving through three jurisdictions",
      "Popular for the Monaco Grand Prix and Monte Carlo events",
      "Comfortable presentation on arrival in a [Luxury Sedan](/fleet/luxury-sedan) or [Luxury SUV](/fleet/luxury-suv)",
    ],
  }),

  // --- Austria ---
  makeInternationalRoute({
    fromName: "Venice",
    fromSlug: "venice",
    toName: "Innsbruck",
    toSlug: "innsbruck",
    distance: "Approximately 300 km",
    duration: "Around 3.5 to 4 hours",
    hubGroup: "austria",
    country: "Austria",
    borderNote:
      "Follows the A22 Brenner motorway north through Trento and Bolzano, crossing into Austria at the Brenner Pass — one of the main Alpine crossings between Italy and Austria.",
    pickupPoints: ["Venice Marco Polo Airport", "Venice mainland (Mestre / Piazzale Roma)"],
    destinationPoints: ["Innsbruck city centre", "Innsbruck Airport"],
    toSummary:
      "Innsbruck is the capital of Austria's Tyrol region, set in an alpine valley and popular for both its historic centre and surrounding ski areas.",
    metaTitle: "Private Transfer from Venice to Innsbruck",
    metaDescription:
      "Private chauffeur transfer from Venice to Innsbruck, Austria over the Brenner Pass. Door-to-door service with a fixed quote before travel.",
    intro: [
      "Venice to Innsbruck follows the Brenner motorway over the Alps, one of the most direct and frequently used crossings between Italy and Austria.",
      "A private chauffeur makes this a comfortable single journey rather than a multi-leg train route via Verona and Bolzano, with the flexibility to time departure around your flight into Venice.",
    ],
    highlights: [
      "Direct Brenner Pass crossing, avoiding a multi-leg train connection",
      "Comfortable for winter travel to Tyrol's ski areas",
      "Flexible timing around Marco Polo Airport arrivals",
    ],
  }),
  makeInternationalRoute({
    fromName: "Venice",
    fromSlug: "venice",
    toName: "Salzburg",
    toSlug: "salzburg",
    distance: "Approximately 430 km",
    duration: "Around 5 to 5.5 hours",
    hubGroup: "austria",
    country: "Austria",
    borderNote:
      "Typically routed via Udine and Tarvisio, crossing into Austria near the Tarvisio/Thörl-Maglern border before continuing through Villach to Salzburg.",
    pickupPoints: ["Venice Marco Polo Airport", "Venice mainland hotels"],
    destinationPoints: ["Salzburg old town", "Salzburg Airport"],
    toSummary:
      "Salzburg is Mozart's birthplace and a major cultural centre in western Austria, close to the German border.",
    metaTitle: "Private Transfer from Venice to Salzburg",
    metaDescription:
      "Private chauffeur transfer from Venice to Salzburg, Austria. A long-distance border crossing via Tarvisio, arranged as a private journey with a fixed quote.",
    intro: [
      "Venice to Salzburg is our longest Austria route, a full-day private transfer for travellers combining a Venice stay with Austria's cultural centre, most often booked around the Salzburg Festival or a wider northern-Italy-to-Austria itinerary.",
      "Given the distance, we build in a comfortable pace and can discuss a stop along the way when you request your quote.",
    ],
    highlights: [
      "A single private vehicle for a genuinely long cross-border journey",
      "Popular around the Salzburg Festival and Austrian cultural travel",
      "Stops can be discussed and arranged when requesting your quote",
    ],
  }),
  makeInternationalRoute({
    fromName: "Bolzano",
    fromSlug: "bolzano",
    toName: "Innsbruck",
    toSlug: "innsbruck",
    distance: "Approximately 120 km",
    duration: "Around 1.5 to 2 hours",
    hubGroup: "austria",
    country: "Austria",
    borderNote:
      "The most direct of our Austria routes, following the A22 motorway over the Brenner Pass — a short, well-travelled Alpine crossing.",
    pickupPoints: ["Bolzano city centre", "Bolzano train station"],
    destinationPoints: ["Innsbruck city centre", "Innsbruck Airport"],
    fromSummary:
      "Bolzano is the capital of South Tyrol in the Italian Alps, a bilingual Italian–German city close to the Austrian border.",
    toSummary:
      "Innsbruck sits just across the Brenner Pass in Austria's Tyrol region, a short and direct alpine drive from South Tyrol.",
    metaTitle: "Private Transfer from Bolzano to Innsbruck",
    metaDescription:
      "Private chauffeur transfer from Bolzano to Innsbruck, Austria over the Brenner Pass. Short, direct border crossing with a fixed quote before travel.",
    intro: [
      "Bolzano to Innsbruck is the shortest and most direct of our Austria routes, a quick hop over the Brenner Pass between South Tyrol and the Tyrol region on the Austrian side.",
      "It's a natural choice for travellers moving between the two Tyrols, including winter ski-season transfers, without needing to self-drive across the border.",
    ],
    highlights: [
      "The shortest Italy–Austria crossing we offer",
      "Popular for winter ski-season travel between South Tyrol and Tyrol",
      "Direct, no self-driving over the Brenner Pass required",
    ],
  }),

  // --- Slovenia ---
  makeInternationalRoute({
    fromName: "Venice",
    fromSlug: "venice",
    toName: "Ljubljana",
    toSlug: "ljubljana",
    distance: "Approximately 245 km",
    duration: "Around 2.5 to 3 hours",
    hubGroup: "slovenia",
    country: "Slovenia",
    borderNote:
      "Routed via Trieste to the border crossing near Fernetti/Sežana, continuing on the Slovenian motorway network into Ljubljana.",
    pickupPoints: ["Venice Marco Polo Airport", "Venice mainland hotels"],
    destinationPoints: ["Ljubljana old town", "Ljubljana Jože Pučnik Airport"],
    toSummary:
      "Ljubljana is Slovenia's compact, walkable capital, a comfortable base for exploring the wider Julian Alps region.",
    metaTitle: "Private Transfer from Venice to Ljubljana",
    metaDescription:
      "Private chauffeur transfer from Venice to Ljubljana, Slovenia via Trieste. Direct, door-to-door service with a fixed quote before travel.",
    intro: [
      "Venice to Ljubljana crosses from northeastern Italy into Slovenia via Trieste, a route with limited convenient direct train options that makes a private transfer particularly practical.",
      "It's a popular pairing for travellers combining a Venice stay with Slovenia's capital, timed around your flight into Marco Polo Airport.",
    ],
    highlights: [
      "A practical alternative where direct train options are limited",
      "Comfortable for travellers pairing Venice with Slovenia's capital",
      "Flexible pickup timed around Marco Polo Airport arrivals",
    ],
  }),
  makeInternationalRoute({
    fromName: "Venice",
    fromSlug: "venice",
    toName: "Lake Bled",
    toSlug: "lake-bled",
    distance: "Approximately 300 km",
    duration: "Around 3 to 3.5 hours",
    hubGroup: "slovenia",
    country: "Slovenia",
    borderNote:
      "Follows the same Fernetti/Sežana border crossing near Trieste as our Venice–Ljubljana route, continuing north past Ljubljana toward the Julian Alps.",
    pickupPoints: ["Venice Marco Polo Airport", "Venice mainland hotels"],
    destinationPoints: ["Lake Bled village", "Lake Bled hotels"],
    toSummary:
      "Lake Bled is an alpine lake in Slovenia's Julian Alps, known for its island church and clifftop castle, a popular day-trip or short-stay destination.",
    metaTitle: "Private Transfer from Venice to Lake Bled",
    metaDescription:
      "Private chauffeur transfer from Venice to Lake Bled, Slovenia. A scenic border crossing via Trieste, door-to-door with a fixed quote before travel.",
    intro: [
      "Venice to Lake Bled is a longer scenic drive across the Slovenian border to one of the Julian Alps' best-known lakes, popular with travellers extending a northern Italy trip into Slovenia.",
      "A private chauffeur handles the full distance directly, with no need to change vehicles in Ljubljana before continuing on to Bled.",
    ],
    highlights: [
      "Direct service all the way to Lake Bled, no changeover in Ljubljana",
      "Popular for combining Venice with Slovenia's alpine-lake scenery",
      "Comfortable full-day private journey with flexible departure time",
    ],
  }),
  makeInternationalRoute({
    fromName: "Trieste",
    fromSlug: "trieste",
    toName: "Ljubljana",
    toSlug: "ljubljana",
    distance: "Approximately 100 km",
    duration: "Around 1.25 to 1.5 hours",
    hubGroup: "slovenia",
    country: "Slovenia",
    borderNote:
      "The shortest of our Slovenia routes, crossing near Fernetti/Sežana just outside Trieste before a short drive into Ljubljana.",
    pickupPoints: ["Trieste city centre", "Trieste Airport (Ronchi dei Legionari)"],
    destinationPoints: ["Ljubljana old town", "Ljubljana Jože Pučnik Airport"],
    fromSummary:
      "Trieste is a port city in northeastern Italy, close to the Slovenian border and with its own regional airport.",
    toSummary:
      "Ljubljana, Slovenia's capital, is a short and direct drive from Trieste across the nearby border.",
    metaTitle: "Private Transfer from Trieste to Ljubljana",
    metaDescription:
      "Private chauffeur transfer from Trieste to Ljubljana, Slovenia. A short, direct border crossing with door-to-door service and a fixed quote.",
    intro: [
      "Trieste to Ljubljana is the shortest of our Slovenia routes, a quick and direct crossing between two neighbouring capital-adjacent cities.",
      "It suits business travellers and short-notice trips alike, with a private vehicle ready to cross the border without the schedule constraints of limited direct train services.",
    ],
    highlights: [
      "The shortest Italy–Slovenia crossing we offer",
      "Practical for business travel and day-return itineraries",
      "Direct service without limited train timetables to work around",
    ],
  }),
];

routes.push(...internationalRoutes);

export function getRouteBySlug(slug: string) {
  return routes.find((r) => r.slug === slug);
}
