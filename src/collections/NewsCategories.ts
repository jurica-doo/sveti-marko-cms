import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '../access'
import { slugField } from '../fields/slug'

export const NewsCategories: CollectionConfig = {
  slug: 'news-categories',
  labels: { singular: 'Kategorija', plural: 'Kategorije vijesti' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Vijesti',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Naziv', localized: true },
    slugField('title'),
    {
      name: 'description',
      type: 'textarea',
      label: 'Opis',
      localized: true,
      admin: { description: 'Kratki opis kategorije, prikazuje se na popisu vijesti.' },
    },
  ],
}
