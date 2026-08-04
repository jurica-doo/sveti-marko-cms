import type { Field } from 'payload'

const COMBINING_MARKS = /[̀-ͯ]/g

/** Croatian-aware slugify: đ/Đ have no NFD decomposition, so they are mapped by hand. */
export const slugify = (value: string): string =>
  value
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * Slug field that fills itself from `from` when left empty, so editors never
 * have to hand-write URLs. Typing a slug manually still wins.
 */
export const slugField = (from = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'URL segment. Ostavi prazno da se generira iz naslova.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.trim()) return slugify(value)
        const source = data?.[from]
        return typeof source === 'string' && source.trim() ? slugify(source) : value
      },
    ],
  },
})
