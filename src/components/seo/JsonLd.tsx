export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: plain(item.answer) },
    })),
  }
}

export function serviceSchema(opts: { name: string; description: string; areaServed?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    provider: { '@type': 'Organization', name: 'Italy Taxi Services' },
    description: opts.description,
    areaServed: { '@type': opts.areaServed ? 'AdministrativeArea' : 'Country', name: opts.areaServed ?? 'Italy' },
  }
}

/** LocalBusiness schema — appears in Google Knowledge Panel & SERP */
export function localBusinessSchema(opts?: { url?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Italy Taxi Services',
    description: 'Premium private NCC chauffeur and transfer service across Italy. Airport transfers, city-to-city, cruise ports, tours. Licensed, fixed prices, 24/7.',
    url: opts?.url ?? 'https://www.italytaxiservices.com',
    telephone: '+393148932631',
    email: 'info@italytaxiservices.com',
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    openingHours: 'Mo-Su 00:00-24:00',
    areaServed: { '@type': 'Country', name: 'Italy' },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IT',
    },
    sameAs: [
      'https://www.italytaxiservices.com',
    ],
  }
}

/** TaxiService schema — enables rich results for transport/taxi queries */
export function taxiServiceSchema(opts: {
  name: string
  description: string
  url: string
  areaServed?: string
  priceFrom?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: opts.name,
    description: opts.description,
    url: `https://www.italytaxiservices.com${opts.url}`,
    provider: {
      '@type': 'Organization',
      name: 'Italy Taxi Services',
      url: 'https://www.italytaxiservices.com',
    },
    areaServed: {
      '@type': 'Country',
      name: opts.areaServed ?? 'Italy',
    },
    ...(opts.priceFrom && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        price: opts.priceFrom,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          price: opts.priceFrom,
          description: 'Fixed price from — final price depends on route',
        },
      },
    }),
  }
}

/** WebSite schema with SearchAction — enables Google Sitelinks Searchbox */
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Italy Taxi Services',
    url: 'https://www.italytaxiservices.com',
    description: 'Private NCC chauffeur and transfer service across Italy.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.italytaxiservices.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/** Product/Service offer schema for route pages */
export function routeOfferSchema(opts: {
  name: string
  description: string
  url: string
  priceFrom: number
  origin: string
  destination: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    description: opts.description,
    url: `https://www.italytaxiservices.com${opts.url}`,
    brand: { '@type': 'Brand', name: 'Italy Taxi Services' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: opts.priceFrom,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'Italy Taxi Services' },
    },
  }
}
