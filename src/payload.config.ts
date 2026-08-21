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
