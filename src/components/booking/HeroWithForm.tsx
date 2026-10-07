import type { ReactNode } from 'react'
import QuoteForm from '@/components/home/QuoteForm'

/**
 * Hero layout with the booking form beside the copy, like the homepage:
 * copy on the left, QuoteForm on the right (stacked below on mobile).
 * Put it inside a hero's max-width container in place of the copy block.
 */
export default function HeroWithForm({
  children,
  defaultPickup,
  defaultDropoff,
}: {
  children: ReactNode
  defaultPickup?: string
  defaultDropoff?: string
}) {
  return (
    <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-12 items-start">
      <div className="min-w-0">{children}</div>
      <div className="w-full max-w-[480px] mx-auto lg:max-w-none lg:mx-0">
        <QuoteForm defaultPickup={defaultPickup} defaultDropoff={defaultDropoff} />
      </div>
    </div>
  )
}
