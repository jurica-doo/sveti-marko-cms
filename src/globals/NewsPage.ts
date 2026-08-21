import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '../access'

export const NewsPage: GlobalConfig = {
  slug: 'news-page',
  label: 'Vijesti (stranica)',
  admin: {
    group: 'Stranice',
    description: 'Tekstovi na popisu župnih vijesti.',
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
      name: 'perPage',
      type: 'number',
      label: 'Vijesti po stranici',
      defaultValue: 9,
      min: 3,
      max: 30,
    },
    { name: 'emptyMessage', type: 'text', label: 'Poruka kad nema vijesti', localized: true },
    { name: 'metaTitle', type: 'text', label: 'SEO naslov', localized: true },
    { name: 'metaDescription', type: 'textarea', label: 'SEO opis', localized: true },
  ],
}
