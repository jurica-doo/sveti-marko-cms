/**
 * The CMS origin is not a website — it is the admin panel and the REST/GraphQL
 * API behind the public site. Nothing here should ever appear in search
 * results: the API returns the same parish content as JSON, which would
 * compete with the real pages, and the admin is a login screen.
 *
 * The public site serves its own `robots.txt` and sitemaps from its own
 * origin; this one disallows everything.
 */
export function GET() {
  const body = `User-agent: *
Disallow: /
`

  return new Response(body, {
    status: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
