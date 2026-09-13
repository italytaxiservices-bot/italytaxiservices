export const siteConfig = {
  name: "Italy Taxi Services",
  tagline: "Private Chauffeurs, Italy-Wide",
  domain: "https://www.italytaxiservices.com",
  // The address staff actually monitor for booking requests.
  email: "info@italytaxiservices.com",
  trustpilotUrl: "https://www.trustpilot.com/review/italytaxiservices.com",
  // "#" means not live yet — components that render these must skip any
  // entry still set to "#" rather than link out to nowhere.
  socials: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
    pinterest: "#",
    youtube: "#",
    reddit: "#",
    quora: "#",
  },
  description:
    "Italy Taxi Services provides premium private chauffeur and NCC transfer services across Italy, including airport transfers, city-to-city transportation, hourly chauffeur hire, private tours and corporate travel.",
};

export type SiteConfig = typeof siteConfig;
