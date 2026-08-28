import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { MediaImages } from './collections/MediaImages'
import { MediaVideos } from './collections/MediaVideos'
import { News } from './collections/News'
import { NewsCategories } from './collections/NewsCategories'
import { UsefulLinks } from './collections/UsefulLinks'

import { Settings } from './globals/Settings'
import { Schedule } from './globals/Schedule'
import { HomePage } from './globals/HomePage'
import { NewsPage } from './globals/NewsPage'
import { AboutPage } from './globals/AboutPage'
import { ContactPage } from './globals/ContactPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const parseOrigins = (value?: string): string[] =>
  value
    ?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean) ?? []

/**
 * The admin panel is served by this same app, so its own origin must be on the
 * CSRF allowlist — otherwise Payload ignores the auth cookie on every POST/PATCH
 * and the panel fails with "Unauthorized, you must be logged in".
 * `CORS_ORIGIN` / `CSRF_ORIGIN` add the web frontend and any LAN hosts.
 */
const selfOrigins = [
  process.env.PAYLOAD_PUBLIC_SERVER_URL,
  'http://localhost:3001',
].filter((origin): origin is string => Boolean(origin))

const corsOrigins = [...new Set([...parseOrigins(process.env.CORS_ORIGIN), ...selfOrigins])]
const csrfOrigins = [...new Set([...parseOrigins(process.env.CSRF_ORIGIN), ...selfOrigins])]

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },

    /**
     * Brand the panel as the parish's own tool rather than a stock Payload
     * install. `custom.scss` carries the palette and type; these three hooks
     * are the parts that have to be React.
     *
     * `providers` is where the two site faces are loaded: the generated
     * `(payload)/layout.tsx` is marked do-not-modify, so there is no element
     * there to hang a `next/font` class on, and a provider is the one
     * extension point Payload renders on every admin route — the login screen
     * included.
     *
     * Adding or moving any of these requires `npm run generate:importmap`;
     * the panel resolves them through `admin/importMap.js`, not at runtime.
     */
    components: {
      graphics: {
        Icon: '/components/admin/Icon#Icon',
        Logo: '/components/admin/Logo#Logo',
      },
      providers: ['/components/admin/Fonts#Fonts'],
    },

    meta: {
      description: 'Uređivanje sadržaja mrežne stranice Župe sv. Marka Evanđelista, Neslanovac.',
      icons: [{ type: 'image/png', rel: 'icon', url: '/icons/logo-mark.png' }],
      titleSuffix: '— Župa sv. Marka',

      /*
       * The admin panel is not a website and must never reach a search result.
       * `admin.meta` is spread straight into the Next `Metadata` of every
       * admin route (see `@payloadcms/next/utilities/meta`), so this is the
       * only hook that reaches the generated `(payload)/layout.tsx` — which is
       * marked do-not-modify.
       *
       * `noimageindex` matters here beyond the usual: with local storage the
       * panel serves every upload off this origin, and without it those files
       * are indexable on their own even when the page around them is not.
       */
      robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
          'max-snippet': 0,
          'max-image-preview': 'none',
        },
      },

      /*
       * Payload otherwise points every admin page's `og:image` at `/api/og`,
       * which renders a fresh image per request. That is a public, uncached,
       * parameterised endpoint on a system nobody should be sharing a link to
       * in the first place — `off` both drops the tag and makes the route
       * itself 404.
       */
      defaultOGImageType: 'off',
    },
  },

  collections: [
    Users,
    MediaImages,
    MediaVideos,
    News,
    NewsCategories,
    UsefulLinks,
  ],

  globals: [Settings, Schedule, HomePage, NewsPage, AboutPage, ContactPage],

  cors: corsOrigins,
  csrf: csrfOrigins,

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',

  /**
   * hr is primary (defaultLocale): it is what every document is written in
   * first, and what `fallback: true` serves for en/it/pl fields the office
   * has not translated yet — so the site never shows blank copy while a
   * translation is in progress, it just shows Croatian until it lands.
   */
  localization: {
    locales: [
      { code: 'hr', label: 'Hrvatski' },
      { code: 'en', label: 'English' },
      { code: 'it', label: 'Italiano' },
      { code: 'pl', label: 'Polski' },
    ],
    defaultLocale: 'hr',
    fallback: true,
  },

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  /**
   * Serverless: every lambda instance opens its own pool, so the ceiling that
   * matters is Supabase's, not ours. Point `DATABASE_URL` at the *transaction*
   * pooler (port 6543) — session mode (5432) pins one server connection per
   * client for its whole lifetime and runs out at `pool_size: 15`, which fails
   * `payload.init()` and 500s every route including the REST API.
   *
   * `max: 1` because an instance serves one request at a time; anything higher
   * is idle connections held against that shared ceiling. Timeouts are short so
   * a saturated pooler surfaces as a fast error rather than a 30s hang.
   */
  db: postgresAdapter({
    schemaName: 'payload',
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      max: Number(process.env.DATABASE_POOL_MAX ?? 10),
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
    },
  }),
  sharp,

  plugins: [
    s3Storage({
      collections: {
        'media-images': { prefix: 'images' },
        'media-videos': { prefix: 'videos' },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true,
      },
    }),
  ],
})
