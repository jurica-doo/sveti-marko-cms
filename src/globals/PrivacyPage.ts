import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '../access'

/**
 * The privacy notice: what the website does with a visitor's data.
 *
 * Kept as editable text rather than written into the site's code, because the
 * wording is the parish's to own — it may need to follow the Church's own data
 * protection rules or a lawyer's review, and both change on their own schedule.
 */
export const PrivacyPage: GlobalConfig = {
  slug: 'privacy-page',
  label: 'Privatnost (stranica)',
  admin: {
    group: 'Stranice',
    description:
      'Obavijest o zaštiti osobnih podataka. Prije objave neka je pregleda odgovorna osoba župe.',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Nadnaslov', localized: true },
    { name: 'title', type: 'text', required: true, label: 'Naslov', localized: true },
    { name: 'intro', type: 'textarea', label: 'Uvodni tekst', localized: true },
    { name: 'body', type: 'richText', label: 'Tekst', localized: true },
    {
      name: 'updatedAtLabel',
      type: 'text',
      label: 'Datum zadnje izmjene',
      localized: true,
      admin: { description: 'npr. 4. studenoga 2026.' },
    },
    { name: 'metaTitle', type: 'text', label: 'SEO naslov', localized: true },
    { name: 'metaDescription', type: 'textarea', label: 'SEO opis', localized: true },
  ],
}
