import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const revalidate = 3600

interface OgData {
  url: string
  finalUrl: string
  title: string
  description: string
  image: string
  siteName: string
  favicon: string
}

function pickMeta(html: string, names: string[]): string {
  for (const name of names) {
    const re = new RegExp(
      `<meta[^>]+(?:property|name)\\s*=\\s*["']${name}["'][^>]*?content\\s*=\\s*["']([^"']+)["']`,
      'i',
    )
    const m = html.match(re)
    if (m?.[1]) return decodeEntities(m[1].trim())
    const reAlt = new RegExp(
      `<meta[^>]+content\\s*=\\s*["']([^"']+)["'][^>]*?(?:property|name)\\s*=\\s*["']${name}["']`,
      'i',
    )
    const m2 = html.match(reAlt)
    if (m2?.[1]) return decodeEntities(m2[1].trim())
  }
  return ''
}

function pickTitle(html: string): string {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  return m?.[1] ? decodeEntities(m[1].trim()) : ''
}

function pickFavicon(html: string, origin: string): string {
  const re = /<link[^>]+rel\s*=\s*["'](?:shortcut icon|icon|apple-touch-icon)["'][^>]*?href\s*=\s*["']([^"']+)["']/i
  const m = html.match(re)
  if (m?.[1]) return absolutize(m[1], origin)
  return new URL('/favicon.ico', origin).toString()
}

function absolutize(href: string, origin: string): string {
  try { return new URL(href, origin).toString() } catch { return href }
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get('url') || ''
  if (!urlParam) return NextResponse.json({ error: 'missing url' }, { status: 400 })

  let target: URL
  try {
    target = new URL(urlParam.startsWith('http') ? urlParam : `https://${urlParam}`)
  } catch {
    return NextResponse.json({ error: 'invalid url' }, { status: 400 })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 7000)

  try {
    const res = await fetch(target.toString(), {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; PortalPreviewBot/1.0; +https://hamzamanzoor.online)',
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
      redirect: 'follow',
      next: { revalidate: 3600 },
    })
    clearTimeout(timeout)

    if (!res.ok) {
      return NextResponse.json(
        { error: `upstream ${res.status}` },
        { status: 502 },
      )
    }

    const finalUrl = res.url || target.toString()
    const origin = new URL(finalUrl).origin

    const html = (await res.text()).slice(0, 200_000)

    const data: OgData = {
      url: target.toString(),
      finalUrl,
      title:
        pickMeta(html, ['og:title', 'twitter:title']) || pickTitle(html) || target.hostname,
      description:
        pickMeta(html, ['og:description', 'twitter:description', 'description']) || '',
      image: absolutize(
        pickMeta(html, ['og:image', 'og:image:url', 'twitter:image', 'twitter:image:src']),
        origin,
      ),
      siteName: pickMeta(html, ['og:site_name', 'application-name']) || new URL(finalUrl).hostname,
      favicon: pickFavicon(html, origin),
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (err: any) {
    clearTimeout(timeout)
    return NextResponse.json(
      { error: err?.name === 'AbortError' ? 'timeout' : 'fetch failed' },
      { status: 504 },
    )
  }
}
