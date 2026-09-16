import { FleetCategory } from "@/lib/types";

export const fleet: FleetCategory[] = [
  {
    slug: "executive-sedan",
    name: "Executive Sedan",
    metaTitle: "Executive Sedan Chauffeur Service",
    metaDescription:
      "Book an Executive Sedan with a professional chauffeur in Italy — ideal for airport transfers, business travel and city transportation for up to 3 passengers.",
    passengers: "Up to 3 passengers",
    luggage: "Up to 2 suitcases",
    description:
      "A comfortable, professional sedan suited to airport transfers, business travel and city transportation for individuals or small groups.",
    amenities: ["Air conditioning", "Bottled water", "Professional chauffeur", "Phone charging"],
    idealFor: "Airport transfers, business meetings and city travel",
    image: "/images/fleet/executive-sedan.webp",
    whoFor: [
      "Solo travellers or a pair who want a discreet, professional ride",
      "Business travellers carrying a standard carry-on or single checked bag",
      "Airport arrivals where a punctual, name-board pickup matters",
      "Short city journeys between meetings, hotels or the station",
    ],
    capacityNote:
      "Executive Sedan seats up to 3 passengers with up to 2 suitcases — a comfortable fit for a solo traveller, a couple, or two colleagues travelling with standard luggage. If your group is larger, or you're carrying more than that, the [Luxury SUV](/fleet/luxury-suv) or [Executive Van](/fleet/executive-van) will fit more comfortably.",
    comparisons: [
      {
        withSlug: "luxury-sedan",
        note: "Choose Executive Sedan when the priority is a comfortable, professional ride at a practical price point. Choose [Luxury Sedan](/fleet/luxury-sedan) instead when presentation matters as much as the journey — special occasions, VIP arrivals, or clients who expect a more premium interior.",
      },
    ],
    faqs: [
      {
        question: "Who is the Executive Sedan best suited for?",
        answer:
          "Solo travellers, couples and business travellers who need a comfortable, professional ride without the extra space of an SUV or van — most commonly for [airport transfers](/airport-transfers), city travel and short business trips.",
      },
      {
        question: "How many passengers can it accommodate?",
        answer: "Up to 3 passengers with standard carry-on or checked luggage.",
      },
      {
        question: "How much luggage can it carry?",
        answer:
          "Up to 2 suitcases comfortably. If you're travelling with more luggage than that, the Luxury SUV or Executive Van will be a better fit.",
      },
      {
        question: "Is it suitable for airport transfers?",
        answer:
          "Yes. It's one of our most requested categories for [airport transfers](/airport-transfers), with flight monitoring and a meet & greet included.",
      },
      {
        question: "Is it suitable for business travel?",
        answer:
          "Yes — it's built around exactly that: punctual pickups, a quiet ride for calls or preparation, and a professional chauffeur. For repeat business travel, see our [hourly chauffeur](/hourly-chauffeur) option, useful for a day of meetings across a city like [Milan](/destinations/milan).",
      },
      {
        question: "Can I request a specific vehicle model?",
        answer:
          "No. This category describes passenger capacity, luggage capacity and general presentation standard — the specific model is confirmed based on availability at the time of booking.",
      },
    ],
  },
  {
    slug: "luxury-sedan",
    name: "Luxury Sedan",
    metaTitle: "Luxury Sedan Chauffeur Service",
    metaDescription:
      "Book a Luxury Sedan with a professional chauffeur in Italy — premium comfort and presentation for executive travel, special occasions and VIP transfers.",
    passengers: "Up to 3 passengers",
    luggage: "Up to 2 suitcases",
    description:
      "A premium sedan with additional comfort and presentation, well suited to executive travel, special occasions and clients who expect an elevated experience.",
    amenities: ["Premium interior", "Air conditioning", "Bottled water", "Professional chauffeur"],
    idealFor: "Executive travel, special occasions and VIP transfers",
    image: "/images/fleet/luxury-sedan.webp",
    whoFor: [
      "Travellers who want a more premium interior and presentation than a standard sedan",
      "VIP or first-class arrivals where the transfer itself is part of the experience",
      "Couples celebrating an anniversary or special occasion",
      "Executives meeting clients directly from the airport or hotel",
    ],
    capacityNote:
      "Luxury Sedan carries the same 1–3 passengers and up to 2 suitcases as Executive Sedan — the difference isn't capacity, it's presentation. If your group needs more seats or luggage space than that, look at the [Luxury SUV](/fleet/luxury-suv) instead.",
    comparisons: [
      {
        withSlug: "executive-sedan",
        note: "Both categories carry the same 1–3 passengers. Choose Luxury Sedan when a more premium interior and presentation matter — for VIP arrivals, anniversaries or client-facing travel — and [Executive Sedan](/fleet/executive-sedan) when a comfortable, practical ride is the priority.",
      },
    ],
    faqs: [
      {
        question: "What makes the Luxury Sedan different from the Executive Sedan?",
        answer:
          "Passenger and luggage capacity are identical. The difference is presentation — a more premium interior finish for clients or occasions where that extra polish matters.",
      },
      {
        question: "Is it suitable for VIP travel?",
        answer:
          "Yes, it's our recommended category for VIP arrivals and clients who expect an elevated experience from the moment they're met at [airport transfers](/airport-transfers) or their hotel.",
      },
      {
        question: "Is it suitable for airport transfers?",
        answer: "Yes — with the same flight monitoring and meet & greet as our other categories, plus the premium interior.",
      },
      {
        question: "Who should choose the Luxury Sedan?",
        answer:
          "Travellers who want the practicality of a sedan — 1–3 passengers, up to 2 suitcases — but with a more premium look and feel, such as for a special occasion or a journey to somewhere like [Lake Como](/destinations/lake-como).",
      },
      {
        question: "Can I request a specific vehicle model?",
        answer:
          "No. This category describes passenger capacity, luggage capacity and general presentation standard — the specific model is confirmed based on availability at the time of booking.",
      },
    ],
  },
  {
    slug: "luxury-suv",
    name: "Luxury SUV",
    metaTitle: "Luxury SUV Chauffeur Service",
    metaDescription:
      "Book a Luxury SUV with a professional chauffeur in Italy — extra space and comfort for families, small groups and travellers with additional luggage.",
    passengers: "Up to 5 passengers",
    luggage: "Up to 4 suitcases",
    description:
      "Extra space and a higher ride height make this a popular choice for families, small groups and travellers with additional luggage.",
    amenities: ["Extra luggage capacity", "Air conditioning", "Bottled water", "Professional chauffeur"],
    idealFor: "Families, small groups and additional luggage",
    image: "/images/fleet/luxury-suv.webp",
    whoFor: [
      "Families of up to 5 travelling together",
      "Small groups who don't want to split across two sedans",
      "Travellers with more luggage than a sedan comfortably fits",
      "Longer journeys where extra legroom and ride comfort matter",
    ],
    capacityNote:
      "Luxury SUV seats up to 5 passengers with up to 4 suitcases — the step up once your group or luggage outgrows a sedan. A family of four landing with a full set of suitcases, for example, typically fits this category better than [Executive Sedan](/fleet/executive-sedan) or [Luxury Sedan](/fleet/luxury-sedan). If your group is larger still — up to 7 — see the [Executive Van](/fleet/executive-van).",
    comparisons: [
      {
        withSlug: "executive-sedan",
        note: "Step up from a sedan to Luxury SUV once you're travelling as more than 3 people, or carrying more than 2 suitcases between you — both [Executive Sedan](/fleet/executive-sedan) and [Luxury Sedan](/fleet/luxury-sedan) are built for smaller capacity.",
      },
      {
        withSlug: "executive-van",
        note: "If your group is 5 or fewer with moderate luggage, Luxury SUV is usually the more comfortable, efficient choice. For 6–7 passengers, or a larger corporate group, see the [Executive Van](/fleet/executive-van).",
      },
    ],
    faqs: [
      {
        question: "When should I choose an SUV instead of a sedan?",
        answer:
          "Once your group is more than 3 people, or you're carrying more than 2 suitcases between you — a common case for families or short leisure trips with extra bags.",
      },
      {
        question: "Is the SUV suitable for families?",
        answer:
          "Yes, it's one of our most requested categories for family travel, including [airport transfers](/airport-transfers) for families arriving with a full set of luggage, for example heading onward to the [Amalfi Coast](/destinations/amalfi-coast) from Naples.",
      },
      {
        question: "How much luggage can it accommodate?",
        answer: "Up to 4 suitcases, alongside up to 5 passengers.",
      },
      {
        question: "Is it suitable for longer journeys?",
        answer:
          "Yes — the extra legroom and ride comfort make it a good fit for [city-to-city transfers](/city-to-city-transfers) and full-day [private tours](/italy-private-tours), not just short transfers.",
      },
    ],
  },
  {
    slug: "executive-van",
    name: "Executive Van",
    metaTitle: "Executive Van Chauffeur Service",
    metaDescription:
      "Book an Executive Van with a professional chauffeur in Italy — spacious group transportation for family travel and small corporate delegations.",
    passengers: "Up to 7 passengers",
    luggage: "Up to 6 suitcases",
    description:
      "A spacious, comfortable van for group transfers, family travel and small corporate delegations that need to travel together.",
    amenities: ["Group seating", "Extra luggage space", "Air conditioning", "Professional chauffeur"],
    idealFor: "Groups, families and corporate delegations",
    image: "/images/fleet/executive-van.webp",
    whoFor: [
      "Groups and families of up to 7 travelling together",
      "Corporate delegations that need to move as one unit",
      "Larger families with a correspondingly larger amount of luggage",
      "Groups who want one vehicle rather than splitting across two cars",
    ],
    capacityNote:
      "Executive Van seats up to 7 passengers with up to 6 suitcases — built for groups that no longer fit a [Luxury SUV](/fleet/luxury-suv). It's a practical, no-frills choice: full group seating and luggage space without the premium interior finish of the [Luxury Van](/fleet/luxury-van).",
    comparisons: [
      {
        withSlug: "luxury-suv",
        note: "If your group is 5 or fewer, the [Luxury SUV](/fleet/luxury-suv) is usually a more efficient choice. Executive Van becomes the better fit at 6–7 passengers, or when your combined luggage exceeds what an SUV can carry.",
      },
      {
        withSlug: "luxury-van",
        note: "Executive Van and [Luxury Van](/fleet/luxury-van) carry the same 7 passengers and 6 suitcases. Choose Executive Van for practical, straightforward group transportation, and Luxury Van when a more premium interior is worth it — for an executive group or event.",
      },
    ],
    faqs: [
      {
        question: "When should I choose a van instead of an SUV?",
        answer:
          "Once your group reaches 6–7 people, or your combined luggage is more than a [Luxury SUV](/fleet/luxury-suv) can carry — common for larger families or full corporate delegations.",
      },
      {
        question: "How many passengers can it accommodate?",
        answer: "Up to 7 passengers with up to 6 suitcases.",
      },
      {
        question: "Is it suitable for corporate groups?",
        answer:
          "Yes — it's a regular choice for [corporate transportation](/corporate-chauffeur), moving a delegation between the airport, meetings and hotels as a single group, including trips built around business hubs like [Turin](/destinations/turin).",
      },
      {
        question: "How much luggage can it carry?",
        answer: "Up to 6 suitcases alongside 7 passengers, making it suitable for longer group trips as well as transfers.",
      },
    ],
  },
  {
    slug: "luxury-van",
    name: "Luxury Van",
    metaTitle: "Luxury Van Chauffeur Service",
    metaDescription:
      "Book a Luxury Van with a professional chauffeur in Italy — premium group transportation for executive groups, events and special occasions.",
    passengers: "Up to 7 passengers",
    luggage: "Up to 6 suitcases",
    description:
      "A premium group vehicle combining generous space with an elevated interior finish, suited to executive groups and special event transportation.",
    amenities: ["Premium interior", "Group seating", "Extra luggage space", "Professional chauffeur"],
    idealFor: "Executive groups, events and premium group travel",
    image: "/images/fleet/luxury-van.webp",
    whoFor: [
      "Executive groups who want the same presentation standard as a Luxury Sedan, at group scale",
      "Wedding parties and event guests who need to travel together",
      "Groups touring together who'd still like a premium interior",
      "Corporate groups attending client-facing events",
    ],
    capacityNote:
      "Luxury Van carries the same 7 passengers and 6 suitcases as [Executive Van](/fleet/executive-van) — the difference is interior finish and presentation, in the same way Luxury Sedan compares to Executive Sedan.",
    comparisons: [
      {
        withSlug: "executive-van",
        note: "Choose Luxury Van over [Executive Van](/fleet/executive-van) when the group's presentation matters — an executive delegation, a wedding party, or event guests — rather than a purely practical group transfer.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between the Executive Van and Luxury Van?",
        answer:
          "Passenger and luggage capacity are the same — up to 7 passengers and 6 suitcases. Luxury Van adds a more premium interior finish for groups where presentation matters.",
      },
      {
        question: "Is the Luxury Van suitable for VIP groups?",
        answer:
          "Yes — it's our recommended category for executive groups and VIP parties travelling together, including [corporate transportation](/corporate-chauffeur) for client-facing delegations.",
      },
      {
        question: "Is it suitable for events?",
        answer:
          "Yes. It's a common choice for [event transportation](/event-transportation) — moving a wedding party or group of guests together rather than splitting across several cars.",
      },
      {
        question: "Is it suitable for private tours?",
        answer:
          "Yes — for groups who want to explore together, for example a [private tour](/italy-private-tours) through [Tuscany](/destinations/tuscany)'s wine region, with the comfort of a premium interior for the full day.",
      },
    ],
  },
];

export function getFleetBySlug(slug: string) {
  return fleet.find((f) => f.slug === slug);
}
