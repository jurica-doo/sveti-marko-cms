/**
 * Rewrites every "uredovno vrijeme" phrasing already stored in the database to
 * "radno vrijeme".
 *
 * The code and the seed file no longer contain the word, but the seed only runs
 * against an empty database — the strings the live site renders came from the
 * CMS and keep their old wording until something rewrites them. This walks
 * every global and every collection document, including Lexical rich text
 * (which stores its copy in plain `text` keys), and patches the strings in
 * place. Nothing else about a document is touched.
 *
 * Dry run (prints what it would change, writes nothing):
 *   pnpm payload run src/scripts/rename-uredovno.ts
 *
 * Apply:
 *   APPLY=1 pnpm payload run src/scripts/rename-uredovno.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Ordered so the longer, case-specific forms match before the bare ones.
 * Croatian inflects the adjective, so each case gets its own pair rather than a
 * single loose `uredovn\w*` rule that would produce ungrammatical results.
 */
const REPLACEMENTS: [RegExp, string][] = [
  [/Uredovnog vremena/g, 'Radnog vremena'],
  [/uredovnog vremena/g, 'radnog vremena'],
  [/Uredovnom vremenu/g, 'Radnom vremenu'],
  [/uredovnom vremenu/g, 'radnom vremenu'],
  [/Uredovno vrijeme/g, 'Radno vrijeme'],
  [/uredovno vrijeme/g, 'radno vrijeme'],
]

const SKIP_KEYS = new Set([
  'id',
  'createdAt',
  'updatedAt',
  'globalType',
  '_status',
  'sizes',
  'filename',
  'mimeType',
  'url',
  'thumbnailURL',
])

const rewrite = (input: string): string =>
  REPLACEMENTS.reduce((text, [from, to]) => text.replace(from, to), input)

type Changed = { path: string; before: string; after: string }

/** Deep-copies `value`, rewriting strings and recording every hit. */
function walk(value: unknown, path: string, hits: Changed[]): unknown {
  if (typeof value === 'string') {
    const next = rewrite(value)
    if (next !== value) hits.push({ path, before: value, after: next })
    return next
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => walk(item, `${path}[${index}]`, hits))
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        walk(item, path ? `${path}.${key}` : key, hits),
      ]),
    )
  }

  return value
}

/**
 * Builds a patch of only the top-level keys whose subtree changed, so an update
 * never rewrites fields it has no business touching.
 */
function patchFor(doc: Record<string, unknown>, label: string, hits: Changed[]) {
  const patch: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(doc)) {
    if (SKIP_KEYS.has(key)) continue

    const keyHits: Changed[] = []
    const next = walk(value, `${label}.${key}`, keyHits)

    if (keyHits.length) {
      patch[key] = next
      hits.push(...keyHits)
    }
  }

  return patch
}

const apply = process.env.APPLY === '1'

const payload = await getPayload({ config })
const hits: Changed[] = []
let documents = 0

for (const global of payload.config.globals) {
  const doc = (await payload.findGlobal({
    slug: global.slug,
    depth: 0,
  })) as unknown as Record<string, unknown>

  const before = hits.length
  const patch = patchFor(doc, `global:${global.slug}`, hits)
  if (hits.length === before) continue

  documents += 1
  if (apply) {
    await payload.updateGlobal({ slug: global.slug, data: patch, depth: 0 })
  }
}

for (const collection of payload.config.collections) {
  // Auth and Payload's own bookkeeping tables hold no parish copy.
  if (collection.slug === 'users' || collection.slug.startsWith('payload-')) {
    continue
  }

  const { docs } = await payload.find({
    collection: collection.slug,
    depth: 0,
    limit: 0,
    pagination: false,
  })

  for (const doc of docs as unknown as Record<string, unknown>[]) {
    const before = hits.length
    const patch = patchFor(doc, `${collection.slug}:${doc.id}`, hits)
    if (hits.length === before) continue

    documents += 1
    if (apply) {
      await payload.update({
        collection: collection.slug,
        id: doc.id as string | number,
        data: patch,
        depth: 0,
      })
    }
  }
}

for (const hit of hits) {
  console.log(`${hit.path}\n  - ${hit.before}\n  + ${hit.after}\n`)
}

console.log(
  `${hits.length} string(s) across ${documents} document(s) — ` +
    (apply ? 'written.' : 'dry run, nothing written. Re-run with APPLY=1.'),
)

process.exit(0)
