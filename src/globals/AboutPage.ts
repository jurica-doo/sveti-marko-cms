import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '../access'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'O nama',
  admin: {
    group: 'Stranice',
    description: 'Povijest župe, crkva i sv. Marko Evanđelist.',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Zaglavlje',
          fields: [
            { name: 'eyebrow', type: 'text', label: 'Nadnaslov', localized: true },
            { name: 'title', type: 'text', required: true, label: 'Naslov', localized: true },
            { name: 'intro', type: 'textarea', label: 'Uvodni tekst', localized: true },
            { name: 'heroImage', type: 'upload', relationTo: 'media-images', label: 'Slika zaglavlja' },
          ],
        },
        {
          label: 'Župa',
          fields: [
            {
              name: 'parish',
              type: 'group',
              label: 'O župi',
              fields: [
                { name: 'title', type: 'text', label: 'Naslov', localized: true },
                { name: 'body', type: 'richText', label: 'Tekst', localized: true },
                { name: 'image', type: 'upload', relationTo: 'media-images', label: 'Slika' },
              ],
            },
          ],
        },
        {
          label: 'Crkva',
          fields: [
            {
              name: 'church',
              type: 'group',
              label: 'O crkvi',
              fields: [
                { name: 'title', type: 'text', label: 'Naslov', localized: true },
                { name: 'body', type: 'richText', label: 'Tekst', localized: true },
                { name: 'image', type: 'upload', relationTo: 'media-images', label: 'Slika' },
              ],
            },
          ],
        },
        {
          label: 'Sv. Marko',
          fields: [
            {
              name: 'patron',
              type: 'group',
              label: 'Nebeski zaštitnik',
              fields: [
                { name: 'title', type: 'text', label: 'Naslov', localized: true },
                { name: 'feastDay', type: 'text', label: 'Blagdan', localized: true, admin: { description: 'npr. 25. travnja' } },
                { name: 'body', type: 'richText', label: 'Tekst', localized: true },
                { name: 'image', type: 'upload', relationTo: 'media-images', label: 'Slika' },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', label: 'SEO naslov', localized: true },
            { name: 'metaDescription', type: 'textarea', label: 'SEO opis', localized: true },
          ],
        },
      ],
    },
  ],
}
