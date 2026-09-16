import { FaqItem } from "@/lib/types";

/**
 * Curated subset shown on the homepage — kept short by design. The full,
 * categorized library lives in faqCategories below and is used on the
 * dedicated /faq page.
 */
export const generalFaqs: FaqItem[] = [
  {
    question: "How much does a private chauffeur in Italy cost?",
    answer:
      "Pricing depends on the route, journey duration, vehicle type and any waiting time required. We provide a fixed, transparent quote before you book, so there are no surprises on the day — request a quote for pricing specific to your route.",
  },
  {
    question: "How do I book a chauffeur in Italy?",
    answer:
      "You can request a quote through our booking form with your pickup location, destination, date and passenger details. We'll confirm availability and pricing, and your booking is secured once confirmed.",
  },
  {
    question: "Do you provide airport transfers in Italy?",
    answer:
      "Yes. We provide private meet & greet airport transfers at major Italian airports, including [Rome](/airport-transfers/rome-fiumicino), [Milan](/airport-transfers/milan-malpensa), [Venice](/airport-transfers/venice-marco-polo), [Florence](/airport-transfers/florence), [Naples](/airport-transfers/naples), [Bologna](/airport-transfers/bologna), [Pisa](/airport-transfers/pisa), [Palermo](/airport-transfers/palermo), [Catania](/airport-transfers/catania) and [Bergamo](/airport-transfers/bergamo), with flight monitoring included.",
  },
  {
    question: "Can I book a private driver for multiple days?",
    answer:
      "Yes. We arrange multi-day chauffeur bookings for touring itineraries, business trips and extended stays, with a dedicated driver and vehicle for the duration.",
  },
  {
    question: "Can I travel between Italian cities with a private chauffeur?",
    answer:
      "Yes. We offer direct, door-to-door [city-to-city transfers](/city-to-city-transfers) between major Italian destinations, as well as custom long-distance routes on request.",
  },
  {
    question: "Do chauffeurs speak English?",
    answer:
      "Yes, our chauffeurs are English-speaking and experienced in assisting international travellers with local guidance where useful.",
  },
  {
    question: "Can I book a chauffeur for a private Italy tour?",
    answer:
      "Yes. We arrange private, flexible touring itineraries across Italy's regions, including [Tuscany](/destinations/tuscany), the [Amalfi Coast](/destinations/amalfi-coast) and [Lake Como](/destinations/lake-como), paced around your own interests rather than a fixed group schedule.",
  },
  {
    question: "Do you provide cruise port transfers?",
    answer:
      "Yes. We provide private transfers to and from [major Italian cruise ports](/cruise-port-transfers), including Civitavecchia, [Naples](/destinations/naples), Livorno, [Genoa](/destinations/genoa), [Venice](/destinations/venice), [Palermo](/destinations/sicily), [Bari](/destinations/bari), [Catania](/destinations/sicily) and La Spezia.",
  },
  {
    question: "Can I request a child seat?",
    answer:
      "Child seats can be requested when booking. Please specify your child's age in the special requirements field so we can confirm availability and arrange an appropriate seat.",
  },
  {
    question: "What happens if my flight is delayed?",
    answer:
      "We monitor your flight in real time, so your chauffeur adjusts pickup timing automatically for delays or early arrivals — you don't need to notify us of a schedule change yourself.",
  },
  {
    question: "Can I book a private transfer from Italy to another country?",
    answer:
      "Yes. We arrange [international border crossing transfers](/international-border-crossing-transfers) between Italy and Switzerland, France, Austria and Slovenia, with a fixed quote before you travel.",
  },
];

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

/**
 * Full FAQ library for the dedicated /faq page, grouped by topic. Where a
 * policy detail isn't finalized yet (payment methods, exact refund windows,
 * accessibility fleet coverage, etc.), the answer describes the request
 * process honestly rather than asserting an unconfirmed capability.
 */
export const faqCategories: FaqCategory[] = [
  {
    title: "Booking & Pricing",
    items: [
      {
        question: "How much does a private chauffeur in Italy cost?",
        answer:
          "Pricing depends on the route, journey duration, vehicle type, passenger count and any waiting time required. We provide a fixed, transparent quote before you book, so there are no surprises on the day.",
      },
      {
        question: "How do I book a chauffeur in Italy?",
        answer:
          "Request a quote through our booking form with your pickup location, destination, date, time and passenger details. We'll confirm availability and pricing by email, and your booking is secured once you confirm.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "Booking ahead gives you more vehicle choice, particularly during busy travel periods. That said, we also handle short-notice requests where availability allows — get in touch and we'll let you know what we can arrange.",
      },
      {
        question: "Can I change my booking after it's confirmed?",
        answer:
          "Yes, reasonable changes to date, time or pickup details are usually possible — contact us as early as you can so we can confirm the change against driver and vehicle availability.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "[To be confirmed by the business — payment methods and timing will be listed here once finalized.] Ask your quote contact for current payment options when confirming a booking.",
      },
      {
        question: "What is your cancellation and refund policy?",
        answer:
          "Cancellation windows and refund eligibility are set out on our Refund Policy page. If anything there isn't clear for your booking, ask before you confirm and we'll clarify.",
      },
    ],
  },
  {
    title: "Airport Transfers & Flights",
    items: [
      {
        question: "Do you provide airport transfers in Italy?",
        answer:
          "Yes. We provide private meet & greet airport transfers at major Italian airports, including [Rome](/airport-transfers/rome-fiumicino), [Milan](/airport-transfers/milan-malpensa), [Venice](/airport-transfers/venice-marco-polo), [Florence](/airport-transfers/florence), [Naples](/airport-transfers/naples), [Bologna](/airport-transfers/bologna), [Pisa](/airport-transfers/pisa), [Palermo](/airport-transfers/palermo), [Catania](/airport-transfers/catania) and [Bergamo](/airport-transfers/bergamo), with flight monitoring included.",
      },
      {
        question: "What happens if my flight is delayed?",
        answer:
          "We monitor your flight in real time, so your chauffeur adjusts pickup timing automatically for delays or early arrivals — you don't need to notify us of a schedule change yourself.",
      },
      {
        question: "What does \"meet and greet\" actually mean?",
        answer:
          "Your chauffeur waits inside the arrivals area holding a sign with your name, helps with luggage, and walks you to the vehicle — rather than a pickup point outside the terminal.",
      },
      {
        question: "What if my flight lands very late at night or very early in the morning?",
        answer:
          "We cover airport pickups at any hour — let us know your exact flight time when booking so we can confirm a chauffeur for that slot.",
      },
      {
        question: "How much waiting time is included if my flight is delayed?",
        answer:
          "[To be confirmed by the business — the specific complimentary waiting period and any charges beyond it will be listed here.] Your quote confirmation will state what applies to your booking.",
      },
    ],
  },
  {
    title: "Vehicles, Luggage & Passengers",
    items: [
      {
        question: "How many passengers and how much luggage can each vehicle take?",
        answer:
          "This depends on the vehicle category — our [Fleet page](/fleet) lists passenger and luggage capacity for each option, from executive sedans to larger vans for groups.",
      },
      {
        question: "Can I request a specific vehicle type?",
        answer:
          "Yes, mention your preferred category when requesting a quote and we'll confirm availability. We don't guarantee an exact make or model, only the category booked.",
      },
      {
        question: "What if my group needs more than one vehicle?",
        answer:
          "Let us know your total passenger and luggage count when requesting a quote — we can arrange multiple vehicles travelling together for larger groups.",
      },
      {
        question: "Can I request a child seat?",
        answer:
          "Child seats can be requested when booking. Please specify your child's age in the special requirements field so we can confirm availability and arrange an appropriate seat.",
      },
      {
        question: "Do you have wheelchair-accessible vehicles?",
        answer:
          "[To be confirmed by the business.] If you need wheelchair accessibility or have other mobility requirements, mention it when requesting a quote and we'll confirm what we can arrange.",
      },
      {
        question: "Can I travel with a pet?",
        answer:
          "[To be confirmed by the business.] Let us know in advance if you're travelling with a pet so we can confirm whether it can be accommodated for your specific vehicle and route.",
      },
    ],
  },
  {
    title: "City-to-City, Tours & Corporate Travel",
    items: [
      {
        question: "Can I travel between Italian cities with a private chauffeur?",
        answer:
          "Yes. We offer direct, door-to-door [city-to-city transfers](/city-to-city-transfers) between major Italian destinations, as well as custom long-distance routes on request.",
      },
      {
        question: "Can I book a private driver for multiple days?",
        answer:
          "Yes. We arrange multi-day chauffeur bookings for touring itineraries, business trips and extended stays, with a dedicated driver and vehicle for the duration.",
      },
      {
        question: "Can I book a chauffeur for a private Italy tour?",
        answer:
          "Yes. We arrange private, flexible touring itineraries across Italy's regions, including [Tuscany](/destinations/tuscany), the [Amalfi Coast](/destinations/amalfi-coast) and [Lake Como](/destinations/lake-como), paced around your own interests rather than a fixed group schedule.",
      },
      {
        question: "Do you provide chauffeurs for corporate or business travel?",
        answer:
          "Yes — see our [Corporate Chauffeur Service](/corporate-chauffeur) page for details on business travel, multi-stop itineraries and account arrangements for companies.",
      },
      {
        question: "Do you arrange transportation for weddings and events?",
        answer:
          "Yes — our [Event Transportation](/event-transportation) service covers coordinated guest transport for weddings and celebrations. Mention your event details when requesting a quote.",
      },
      {
        question: "Do you provide cruise port transfers?",
        answer:
          "Yes. We provide private transfers to and from [major Italian cruise ports](/cruise-port-transfers), including Civitavecchia, [Naples](/destinations/naples), Livorno, [Genoa](/destinations/genoa), [Venice](/destinations/venice), [Palermo](/destinations/sicily), [Bari](/destinations/bari), [Catania](/destinations/sicily) and La Spezia.",
      },
      {
        question: "Can I book a night or very early morning transfer?",
        answer:
          "Yes, chauffeur availability isn't limited to daytime hours — let us know your exact time when requesting a quote.",
      },
    ],
  },
  {
    title: "Chauffeurs & Language",
    items: [
      {
        question: "Do chauffeurs speak English?",
        answer:
          "Yes, our chauffeurs are English-speaking and experienced in assisting international travellers with local guidance where useful.",
      },
      {
        question: "Do you have chauffeurs who speak other languages?",
        answer:
          "[To be confirmed by the business.] If you'd prefer a chauffeur who speaks a specific language, mention it when requesting a quote and we'll confirm availability.",
      },
      {
        question: "Will I have the vehicle to myself, or is it shared with other passengers?",
        answer:
          "Every booking is private — your vehicle and chauffeur are dedicated to your party for the duration of the journey, not shared with other passengers.",
      },
    ],
  },
  {
    title: "International & Cross-Border Travel",
    items: [
      {
        question: "Can I book a private chauffeur from Italy to Switzerland, France, Austria or Slovenia?",
        answer:
          "Yes. See our [international border crossing transfers](/international-border-crossing-transfers) page for the countries and routes we cover, including Milan to Lugano, Milan to Nice, Venice to Innsbruck and Venice to Ljubljana.",
      },
      {
        question: "Do I need my passport for a cross-border transfer?",
        answer:
          "Travel documentation requirements depend on your nationality and destination. Passengers should carry all required travel documents and verify current requirements with the relevant official authorities before travelling.",
      },
      {
        question: "Will there be border checks on an international transfer?",
        answer:
          "Border authorities control their own entry and exit procedures. Our chauffeur provides the transportation, but we cannot guarantee the absence of checks or delays at the border.",
      },
    ],
  },
  {
    title: "During & After Your Trip",
    items: [
      {
        question: "How do I reach you if I need help during my trip?",
        answer:
          "Your booking confirmation includes contact details for your journey. For anything before that stage, email us and we'll respond as quickly as we can.",
      },
      {
        question: "What if I need to change my pickup time or location on the day?",
        answer:
          "Contact us as soon as you know — reasonable on-the-day changes can usually be accommodated depending on driver and vehicle availability, though very late changes may not always be possible.",
      },
    ],
  },
];
