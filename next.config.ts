import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

// Hosts allowed to reach `next dev` over the LAN (admin panel on a phone).
// Override with `DEV_ORIGINS=192.168.1.50,10.0.0.7`.
const devOrigins = (process.env.DEV_ORIGINS || '192.168.1.145')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const nextConfig: NextConfig = {
  /*
   * Belt and braces alongside `src/app/robots.txt/route.ts`: a header travels
   * with every response, including the JSON API and every uploaded file, so
   * the CMS cannot be indexed even if a URL is discovered without robots.txt
   * being fetched first.
   *
   * Each directive earns its place:
   *   `noindex`      — never a search result.
   *   `nofollow`     — do not queue anything linked from here for crawling.
   *   `noimageindex` — the uploads this app serves are not indexable on their
   *                    own either, which `noindex` alone does not cover.
   *   `noarchive`    — no cached copy of an admin screen kept or served.
   *   `nosnippet`    — nothing from here quoted in a result, cached or not.
   *
   * Deliberately unprefixed, so it binds every crawler rather than Googlebot
   * alone.
   */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noimageindex, noarchive, nosnippet',
          },
        ],
      },
    ]
  },

  allowedDevOrigins: devOrigins,
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
