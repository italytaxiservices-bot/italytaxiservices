export const siteConfig = {
  name: "Italy Limo Service",
  tagline: "Private Chauffeurs, Italy-Wide",
  domain: "https://italylimoservice.com",
  // The address staff actually monitor for booking requests (matches
  // MAIL_TO_BOOKING in .env.example) — kept as the one prominent, real
  // contact channel until a phone/WhatsApp number is confirmed.
  email: "booking@italylimoservice.com",
  trustpilotUrl: "https://www.trustpilot.com/review/italylimoservice.com",
  // "#" means not live yet — components that render these must skip any
  // entry still set to "#" rather than link out to nowhere.
  socials: {
    instagram: "#",
    facebook: "https://www.facebook.com/people/Italy-Limo-Service/61593989173619/",
    linkedin: "https://www.linkedin.com/company/italy-limo-service/",
    pinterest: "https://it.pinterest.com/italylimoservice/",
    youtube: "https://www.youtube.com/@Italylimoservice",
    reddit: "https://www.reddit.com/user/italylimoservice/",
    quora: "https://www.quora.com/profile/Italy-Limo-Service",
  },
  description:
    "Italy Limo Service provides premium private chauffeur services across Italy, including airport transfers, city-to-city transportation, hourly chauffeur hire, private tours and corporate travel.",
};

export type SiteConfig = typeof siteConfig;
