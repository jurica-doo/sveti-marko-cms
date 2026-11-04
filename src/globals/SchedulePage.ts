import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '../access'

/**
 * The words around the Raspored page. The times themselves are not here —
 * they live in the `schedule` global, which the home page and the contact page
 * read too, so the office never types a mass time in two places.
 */
export const SchedulePage: GlobalConfig = {
  slug: 'schedule-page',
  label: 'Raspored (stranica)',
  admin: {
    group: 'Stranice',
    description:
      'Tekstovi na stranici Raspored. Same termine uređujete u globalu „Raspored (mise, aktivnosti, ured)”.',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Nadnaslov', localized: true },
    { name: 'title', type: 'text', required: true, label: 'Naslov', localized: true },
    { name: 'intro', type: 'textarea', label: 'Uvodni tekst', localized: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media-images', label: 'Slika zaglavlja' },
    {
      name: 'liturgy',
      type: 'group',
      label: 'Odjeljak: liturgija',
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Nadnaslov', localized: true },
        { name: 'title', type: 'text', label: 'Naslov', localized: true },
        { name: 'intro', type: 'textarea', label: 'Uvodni tekst', localized: true },
      ],
    },
    {
      name: 'groups',
      type: 'group',
      label: 'Odjeljci aktivnosti',
      admin: {
        description: 'Naslov i kratki uvod za svaku skupinu aktivnosti.',
      },
      fields: (['vjeronauk', 'zborovi', 'zajednice'] as const).map((key) => ({
        name: key,
        type: 'group' as const,
        label: { vjeronauk: 'Vjeronauk', zborovi: 'Zborovi i glazba', zajednice: 'Župne zajednice' }[key],
        fields: [
          { name: 'title', type: 'text' as const, label: 'Naslov', localized: true },
          { name: 'intro', type: 'textarea' as const, label: 'Uvodni tekst', localized: true },
        ],
      })),
    },
    { name: 'metaTitle', type: 'text', label: 'SEO naslov', localized: true },
    { name: 'metaDescription', type: 'textarea', label: 'SEO opis', localized: true },
  ],
}
