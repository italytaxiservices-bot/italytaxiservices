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
  // Answers may contain `[label](/href)` source markup — schema.org wants
  // plain text, so the markdown link syntax is stripped for this field only.
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
