/**
 * The CMS origin is not a website — it is the admin panel and the REST/GraphQL
 * API behind the public site. Nothing here should ever appear in search
 * results: the API returns the same parish content as JSON, which would
 * compete with the real pages, and the admin is a login screen.
 *
 * The public site serves its own `robots.txt` and sitemaps from its own
 * origin; this one disallows everything, and names no sitemap at all.
 *
 * The `AdsBot-*` groups are not redundant with the wildcard: Google's ad
 * crawlers are documented as ignoring `User-agent: *` and obeying only a group
 * that names them, so without these three they would keep fetching this origin
 * after every other bot had stopped.
 *
 * Note what robots.txt can and cannot do. It stops the crawl — which is the
 * point here, since a CMS has nothing worth spending crawl budget on — but a
 * URL that is never fetched is also a URL whose `noindex` is never read, so a
 * disallowed address discovered through an external link can still surface as
 * a bare, description-less result. The `X-Robots-Tag` in `next.config.ts` is
 * what closes that gap for any crawler that does fetch a page here, and
 * `admin.meta.robots` puts the same refusal in the HTML.
 */
export function GET() {
  const body = `User-agent: *
Disallow: /

User-agent: AdsBot-Google
Disallow: /

User-agent: AdsBot-Google-Mobile
Disallow: /

User-agent: AdsBot-Google-Mobile-Apps
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
