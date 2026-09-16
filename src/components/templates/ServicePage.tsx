import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/lib/data/services'
import ContentPageTemplate from './ContentPageTemplate'
import { JsonLd, breadcrumbSchema, serviceSchema, faqSchema } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/siteConfig'

/** Shared body for the small set of genuinely new, top-level service pages (see src/lib/data/services.ts). */
export function ServicePageBody({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: service.name }]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: siteConfig.domain },
          { name: service.name, url: `${siteConfig.domain}/${service.slug}` },
        ])}
      />
      <JsonLd data={serviceSchema({ name: service.name, description: service.metaDescription })} />
      {service.faqs.length > 0 && <JsonLd data={faqSchema(service.faqs)} />}
      <ContentPageTemplate
        breadcrumbs={breadcrumbs}
        badge="Italy Taxi Services"
        title={service.heroHeading}
        description={service.shortDescription}
        intro={service.intro}
        sections={[
          { title: 'Benefits', items: service.benefits },
          { title: 'Who It’s For', items: service.whoFor },
          { title: 'What’s Included', items: service.included },
        ]}
        faqTitle={`${service.name} — FAQs`}
        faqs={service.faqs}
        ctaTitle={`Request ${service.name}`}
        ctaDescription={service.shortDescription}
      />
    </>
  )
}

export function getServiceMetadata(slug: string): Metadata {
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/${service.slug}` },
  }
}
