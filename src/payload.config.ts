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
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    schemaName: 'payload',
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      max: Number(process.env.DATABASE_POOL_MAX ?? 10),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 30_000,
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
