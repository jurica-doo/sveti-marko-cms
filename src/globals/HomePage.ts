import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '../access'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Naslovnica',
  admin: {
    group: 'Stranice',
    description: 'Hero, sekcije i tekstovi na naslovnici.',
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
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Hero sekcija',
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media-images', label: 'Pozadinska slika' },
                { name: 'eyebrow', type: 'text', label: 'Nadnaslov', localized: true },
                { name: 'title', type: 'text', required: true, label: 'Naslov', localized: true },
                { name: 'subtitle', type: 'textarea', label: 'Podnaslov', localized: true },
                {
                  name: 'primaryCta',
                  type: 'group',
                  label: 'Glavni gumb',
                  fields: [
                    { name: 'label', type: 'text', label: 'Naziv', localized: true },
                    { name: 'href', type: 'text', label: 'Putanja' },
                  ],
                },
                {
                  name: 'secondaryCta',
                  type: 'group',
                  label: 'Sporedni gumb',
                  fields: [
                    { name: 'label', type: 'text', label: 'Naziv', localized: true },
                    { name: 'href', type: 'text', label: 'Putanja' },
                  ],
                },
                {
                  name: 'showSchedule',
                  type: 'checkbox',
                  label: 'Prikaži mise i ispovijed preko slike',
                  defaultValue: true,
                },
                { name: 'massesTitle', type: 'text', label: 'Naslov kartice misa', defaultValue: 'Svete mise', localized: true },
                {
                  name: 'confessionsTitle',
                  type: 'text',
                  label: 'Naslov kartice ispovijedi',
                  defaultValue: 'Ispovijed',
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Župni ured',
          fields: [
            {
              name: 'officeSection',
              type: 'group',
              label: 'Sekcija o župnom uredu',
              fields: [
                { name: 'eyebrow', type: 'text', label: 'Nadnaslov', localized: true },
                { name: 'title', type: 'text', label: 'Naslov', localized: true },
                { name: 'intro', type: 'textarea', label: 'Uvodni tekst', localized: true },
                {
                  name: 'cards',
                  type: 'array',
                  label: 'Info kartice',
                  labels: { singular: 'Kartica', plural: 'Kartice' },
                  admin: { description: 'Krštenja, vjenčanja, sprovodi, bolesnici…' },
                  fields: [
                    { name: 'title', type: 'text', required: true, label: 'Naslov', localized: true },
                    { name: 'text', type: 'textarea', required: true, label: 'Tekst', localized: true },
                    { name: 'href', type: 'text', label: 'Poveznica (nije obavezno)' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Vijesti',
          fields: [
            {
              name: 'newsSection',
              type: 'group',
              label: 'Sekcija vijesti',
              fields: [
                { name: 'eyebrow', type: 'text', label: 'Nadnaslov', localized: true },
                { name: 'title', type: 'text', label: 'Naslov', localized: true },
                { name: 'intro', type: 'textarea', label: 'Uvodni tekst', localized: true },
                {
                  name: 'count',
                  type: 'number',
                  label: 'Broj vijesti na naslovnici',
                  defaultValue: 3,
                  min: 1,
                  max: 9,
                },
                { name: 'ctaLabel', type: 'text', label: 'Naziv gumba', defaultValue: 'Sve vijesti', localized: true },
              ],
            },
          ],
        },
        {
          label: 'Citat',
          fields: [
            {
              name: 'quote',
              type: 'group',
              label: 'Istaknuti citat',
              fields: [
                { name: 'enabled', type: 'checkbox', label: 'Prikaži citat', defaultValue: true },
                { name: 'text', type: 'textarea', label: 'Citat', localized: true },
                { name: 'source', type: 'text', label: 'Izvor', localized: true, admin: { description: 'npr. Mk 16, 15' } },
                { name: 'image', type: 'upload', relationTo: 'media-images', label: 'Pozadinska slika' },
              ],
            },
          ],
        },
        {
          label: 'Poveznice',
          fields: [
            {
              name: 'linksSection',
              type: 'group',
              label: 'Sekcija korisnih poveznica',
              fields: [
                { name: 'eyebrow', type: 'text', label: 'Nadnaslov', localized: true },
                { name: 'title', type: 'text', label: 'Naslov', localized: true },
                { name: 'intro', type: 'textarea', label: 'Uvodni tekst', localized: true },
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
