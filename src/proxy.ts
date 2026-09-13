import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { NodeHtmlMarkdown } from 'node-html-markdown'
import { updateSession } from '@/lib/supabase/proxy'

const PASSTHROUGH_HEADER = 'x-markdown-source-fetch'

export default async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return updateSession(request)
  }

  const accept = request.headers.get('accept') ?? ''
  const wantsMarkdown = accept.includes('text/markdown')
  const isPassthrough = request.headers.has(PASSTHROUGH_HEADER)

  if (!wantsMarkdown || isPassthrough) {
    return NextResponse.next()
  }

  try {
    const htmlRequestHeaders = new Headers(request.headers)
    htmlRequestHeaders.set('accept', 'text/html')
    htmlRequestHeaders.set(PASSTHROUGH_HEADER, '1')

    const htmlResponse = await fetch(request.nextUrl, { headers: htmlRequestHeaders })
    const html = await htmlResponse.text()

    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)
    const contentHtml = (mainMatch ? mainMatch[1] : html)
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')

    const body = NodeHtmlMarkdown.translate(contentHtml)
    const markdown = titleMatch ? `# ${titleMatch[1]}\n\n${body}` : body

    return new NextResponse(markdown, {
      status: htmlResponse.status,
      headers: { 'content-type': 'text/markdown; charset=utf-8' },
    })
  } catch {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
