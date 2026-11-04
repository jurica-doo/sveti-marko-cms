/**
 * Seeds the parish site for Župa sv. Marka Evanđelista (Neslanovac, Split) in
 * all four locales — hr, en, it, pl.
 *
 * The copy lives in `data/i18n/`: verified facts plus clearly marked
 * placeholders (see the header comments there). This script only uploads the
 * photos and writes that copy, locale by locale.
 *
 * Run with: `pnpm seed` (or `npm run seed`). Safe to re-run — globals are
 * overwritten, images are matched on filename, categories on their Croatian
 * title, links on URL and news on slug.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'
import {
  aboutPage,
  activities,
  contactPage,
  homePage,
  LOCALES,
  newsPage,
  privacyPage,
  schedule,
  schedulePage,
  settings,
  type ImageIds,
  type Locale,
} from './data/i18n/globals'
import {
  categories,
  imageCaption,
  images,
  links,
  news,
  newsContent,
  type CategoryKey,
} from './data/i18n/collections'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const imagesDir = path.resolve(dirname, 'data/images')

type Doc = Record<string, unknown>

/**
 * Payload replaces (not merges) an array field's rows on every write. Each
 * locale is written in its own call, so without a shared `id` on every row the
 * second locale's write would look like a brand new array and delete the rows
 * — and the translations — the first one saved. Giving the same position-based
 * id to a row in every locale turns each later write into an update.
 */
type ArraySpec = { field: string; children?: ArraySpec[] }

const assignStableIds = (
  byLocale: Record<Locale, Doc>,
  root: (doc: Doc) => Doc | undefined,
  specs: ArraySpec[],
) => {
  const walk = (nodes: (Doc | undefined)[], levels: ArraySpec[], prefix: string) => {
    for (const spec of levels) {
      const arrays = nodes.map((n) => n?.[spec.field]).map((a) => (Array.isArray(a) ? (a as Doc[]) : []))
      const maxLen = Math.max(0, ...arrays.map((a) => a.length))
      for (let i = 0; i < maxLen; i++) {
        const id = `${prefix}${spec.field}-${i}`
        const rows = arrays.map((a) => a[i]).filter(Boolean)
        for (const row of rows) row.id = id
        if (spec.children) walk(rows, spec.children, `${id}-`)
      }
    }
  }
  walk(LOCALES.map((locale) => root(byLocale[locale])), specs, '')
  return byLocale
}

const seed = async () => {
  const payload = await getPayload({ config })

  /* -------------------------------------------------------------- images */

  const imageIds = {} as ImageIds
  for (const [key, image] of Object.entries(images) as [keyof ImageIds, (typeof images)[keyof ImageIds]][]) {
    const existing = await payload.find({
      collection: 'media-images',
      where: { filename: { equals: image.file } },
      limit: 1,
    })
    const hr = { alt: image.alt.hr, caption: imageCaption(image, 'hr') }
    const doc = existing.docs.length
      ? await payload.update({ collection: 'media-images', id: existing.docs[0].id, locale: 'hr', data: hr })
      : await payload.create({
          collection: 'media-images',
          locale: 'hr',
          data: hr,
          filePath: path.join(imagesDir, image.file),
        })
    imageIds[key] = doc.id
    for (const locale of LOCALES.filter((l) => l !== 'hr')) {
      await payload.update({
        collection: 'media-images',
        id: doc.id,
        locale,
        data: { alt: image.alt[locale], caption: imageCaption(image, locale) },
      })
    }
  }
  payload.logger.info('Slike: gotovo')

  /* ------------------------------------------------------------- globals */

  const globals = {
    settings: assignStableIds(settings, (d) => d, [
      { field: 'navigation' },
      { field: 'footerColumns', children: [{ field: 'links' }] },
    ]),
    schedule: assignStableIds(
      Object.fromEntries(
        LOCALES.map((locale) => [locale, { ...schedule[locale], activities: activities[locale] }]),
      ) as unknown as Record<Locale, Doc>,
      (d) => d,
      [
        { field: 'masses' },
        { field: 'confessions' },
        { field: 'devotions' },
        { field: 'specialSchedule', children: [{ field: 'entries' }] },
        { field: 'activities' },
        { field: 'officeHours' },
        { field: 'officeNotes' },
      ],
    ),
    'home-page': assignStableIds(homePage(imageIds), (d) => d.officeSection as Doc, [{ field: 'cards' }]),
    'schedule-page': schedulePage(imageIds),
    'news-page': newsPage,
    'about-page': aboutPage(imageIds),
    'contact-page': contactPage(imageIds),
    'privacy-page': privacyPage,
  } as const

  for (const locale of LOCALES) {
    for (const [slug, byLocale] of Object.entries(globals)) {
      await payload.updateGlobal({
        slug: slug as keyof typeof globals,
        locale,
        data: byLocale[locale] as never,
      })
    }
  }
  payload.logger.info('Globali: gotovo')

  /* --------------------------------------------------------- collections */

  const categoryIds = {} as Record<CategoryKey, number>
  for (const [key, byLocale] of Object.entries(categories) as [CategoryKey, (typeof categories)[CategoryKey]][]) {
    const existing = await payload.find({
      collection: 'news-categories',
      where: { title: { equals: byLocale.hr.title } },
      locale: 'hr',
      limit: 1,
    })
    const doc = existing.docs.length
      ? await payload.update({ collection: 'news-categories', id: existing.docs[0].id, locale: 'hr', data: byLocale.hr })
      : await payload.create({ collection: 'news-categories', locale: 'hr', data: byLocale.hr })
    categoryIds[key] = doc.id
    for (const locale of LOCALES.filter((l) => l !== 'hr')) {
      await payload.update({ collection: 'news-categories', id: doc.id, locale, data: byLocale[locale] })
    }
  }

  for (const link of links) {
    const data = { url: link.url, group: link.group, order: link.order, featuredOnHome: true, ...link.text.hr }
    const existing = await payload.find({ collection: 'useful-links', where: { url: { equals: link.url } }, limit: 1 })
    const doc = existing.docs.length
      ? await payload.update({ collection: 'useful-links', id: existing.docs[0].id, locale: 'hr', data })
      : await payload.create({ collection: 'useful-links', locale: 'hr', data })
    for (const locale of LOCALES.filter((l) => l !== 'hr')) {
      await payload.update({ collection: 'useful-links', id: doc.id, locale, data: link.text[locale] })
    }
  }
  payload.logger.info('Kategorije i poveznice: gotovo')

  for (const item of news) {
    const data = {
      slug: item.slug,
      publishedAt: item.publishedAt,
      category: categoryIds[item.category],
      featured: item.featured,
      coverImage: imageIds[item.cover],
      gallery: item.gallery.map((key) => ({ image: imageIds[key] })),
      author: 'Župni ured',
      _status: 'published' as const,
      ...newsContent(item.text.hr),
    }
    const existing = await payload.find({ collection: 'news', where: { slug: { equals: item.slug } }, limit: 1 })
    const doc = existing.docs.length
      ? await payload.update({ collection: 'news', id: existing.docs[0].id, locale: 'hr', data, draft: false })
      : await payload.create({ collection: 'news', locale: 'hr', data: data as never, draft: false })
    for (const locale of LOCALES.filter((l) => l !== 'hr')) {
      await payload.update({
        collection: 'news',
        id: doc.id,
        locale,
        data: newsContent(item.text[locale]) as never,
        // Translating a published article shouldn't leave a new draft on top of it.
        draft: false,
      })
    }
  }
  payload.logger.info('Vijesti: gotovo')

  payload.logger.info('Seed završen: slike, globali, kategorije, poveznice i vijesti na hr/en/it/pl.')
  process.exit(0)
}

await seed()
