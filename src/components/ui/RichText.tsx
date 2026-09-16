import Link from 'next/link'
import { Fragment } from 'react'
import { resolveLink } from '@/lib/linkResolve'

/** Renders a string containing `[label](/href)` markdown-style links as real, resolved <Link>s. */
export function RichText({ text, className }: { text: string; className?: string }) {
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>)
    const [, label, href] = match
    nodes.push(
      <Link key={key++} href={resolveLink(href)} className="text-gold font-medium hover:underline">
        {label}
      </Link>
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>)

  return <span className={className}>{nodes}</span>
}
