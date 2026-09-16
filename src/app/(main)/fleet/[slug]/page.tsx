import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fleet, getFleetBySlug } from '@/lib/data/fleet'
import ContentPageTemplate from '@/components/templates/ContentPageTemplate'
import { JsonLd, breadcrumbSchema, serviceSchema } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/siteConfig'

export function generateStaticParams() {
  return fleet.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = getFleetBySlug(slug)
  if (!category) return {}
  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: { canonical: `/fleet/${category.slug}` },
  }
}

export default async function FleetDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getFleetBySlug(slug)
  if (!category) notFound()

  const intro = [category.description, ...(category.capacityNote ? [category.capacityNote] : [])]

  const comparisonItems = (category.comparisons ?? []).map((c) => c.note)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Fleet', href: '/fleet' },
    { label: category.name },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: siteConfig.domain },
          { name: 'Fleet', url: `${siteConfig.domain}/fleet` },
          { name: category.name, url: `${siteConfig.domain}/fleet/${category.slug}` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: `${category.name} Chauffeur Service`,
          description: category.metaDescription,
        })}
      />
      <ContentPageTemplate
        breadcrumbs={breadcrumbs}
        badge="NCC Licensed Fleet"
        title={category.name}
        description={category.description}
        stats={[
          { label: 'Passengers', value: category.passengers },
          { label: 'Luggage', value: category.luggage },
        ]}
        intro={intro}
        sections={[
          { title: 'Included', items: category.amenities },
          ...(category.whoFor ? [{ title: 'Who It’s For', items: category.whoFor }] : []),
          ...(comparisonItems.length ? [{ title: 'Comparing Categories', items: comparisonItems }] : []),
        ]}
        faqTitle={`${category.name} — FAQs`}
        faqs={category.faqs}
        ctaTitle={`Request the ${category.name}`}
        ctaDescription={`Ideal for ${category.idealFor.toLowerCase()}. Fixed prices, professional NCC chauffeurs, across Italy.`}
      />
    </>
  )
}
