import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '../access'

export const UsefulLinks: CollectionConfig = {
  slug: 'useful-links',
  labels: { singular: 'Poveznica', plural: 'Korisne poveznice' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'url', 'group', 'order'],
    group: 'Župa',
    description: 'Vanjske stranice koje se prikazuju na naslovnici i u podnožju.',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Naziv' },
    { name: 'url', type: 'text', required: true, label: 'Poveznica (URL)' },
    { name: 'description', type: 'textarea', label: 'Kratki opis' },
    {
      name: 'group',
      type: 'select',
      label: 'Skupina',
      defaultValue: 'crkva',
      options: [
        { label: 'Crkva u Hrvatskoj', value: 'crkva' },
        { label: 'Duhovnost i mediji', value: 'duhovnost' },
        { label: 'Zajednica i mjesto', value: 'zajednica' },
      ],
    },
    {
      name: 'featuredOnHome',
      type: 'checkbox',
      label: 'Prikaži na naslovnici',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Redoslijed',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
