export interface Destination {
  slug: string;
  name: string;
  region: string;
  heading: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  intro: string[];
  highlights: string[];
  popularPickups: string[];
  nearestAirports: string[]; // airport slugs
  relatedRoutes: string[]; // route slugs
  relatedDestinations: string[]; // destination slugs
  image: string;
  /** Short contextual note linking to international-border-crossing-transfers,
   * shown only on destinations with a genuine cross-border use case (see
   * lib/data/routes.ts for which cities have dedicated international routes). */
  internationalNote?: string;
}

export interface AirportTerminal {
  name: string;
  function?: string;
}

export interface Airport {
  slug: string;
  name: string;
  code: string; // IATA
  city: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  intro: string[];
  distanceInfo: string;
  nearestDestinations: string[]; // destination slugs
  image: string;
  // Verified reference data for the AirportInformation component — every
  // field is optional and rendered only when present, since this data must
  // never be guessed (see lib/data/airports.ts header comment for sourcing).
  officialName?: string;
  icao?: string;
  region?: string;
  airportType?: string;
  officialWebsite?: string;
  /** Omit entirely (leave both undefined) if terminal info isn't verified. */
  singleTerminal?: boolean;
  terminals?: AirportTerminal[];
}

export interface RouteInfo {
  slug: string;
  from: string;
  to: string;
  fromSlug: string; // destination slug if exists
  toSlug: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  intro: string[];
  distanceApprox: string;
  durationApprox: string;
  highlights: string[];
  relatedDestinations: string[];
  image: string;
  /** Present only for routes crossing one of Italy's international land
   * borders — drives the extra border-crossing content in RoutePageTemplate
   * and grouping on the international-border-crossing-transfers hub page. */
  international?: {
    /** Which country card on the hub page this route is grouped under. */
    hubGroup: "switzerland" | "france" | "austria" | "slovenia";
    /** Display name of the actual destination country/state — kept distinct
     * from hubGroup so e.g. a Monaco-bound route can still sit on the
     * France hub card while correctly naming Monaco as its own country. */
    country: string;
    /** General, factual description of the border crossing/pass used —
     * never a guaranteed crossing time or a claim about checks/delays. */
    borderNote: string;
    pickupPoints: string[];
    destinationPoints: string[];
    /** Fallback summary text used when fromSlug/toSlug has no dedicated
     * destination page to link to (e.g. Sanremo, Bolzano, Trieste, or any
     * foreign city). */
    fromSummary?: string;
    toSummary?: string;
  };
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  intro: string[];
  benefits: string[];
  whoFor: string[];
  included: string[];
  icon: string;
  faqs: FaqItem[];
}

export interface Tour {
  slug: string;
  name: string;
  region: string;
  description: string;
  highlights: string[];
  destinationSlug: string;
}

export interface FleetCategory {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  passengers: string;
  luggage: string;
  description: string;
  amenities: string[];
  idealFor: string;
  image: string;
  // English-only topical depth (who it's for, capacity guidance, vehicle
  // comparisons, dedicated FAQs) — optional so the IT translations, which
  // don't define these yet, fall back to the existing generic rendering.
  whoFor?: string[];
  capacityNote?: string;
  comparisons?: { withSlug: string; note: string }[];
  faqs?: FaqItem[];
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  placeholder: true;
}

export interface FaqItem {
  question: string;
  answer: string;
}
