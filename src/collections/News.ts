import type { CollectionConfig } from 'payload'

import { isAdminOrEditor, publishedOrLoggedIn } from '../access'
import { slugField } from '../fields/slug'

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'Vijest', plural: 'Vijesti' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    group: 'Vijesti',
    description: 'Župne vijesti i obavijesti. Sortiraju se po datumu objave.',
  },
  access: {
    read: publishedOrLoggedIn,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  defaultSort: '-publishedAt',
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Naslov', localized: true },
    slugField('title'),
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      label: 'Datum objave',
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd.MM.yyyy. HH:mm' },
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'news-categories',
      label: 'Kategorija',
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Istaknuta vijest',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Istaknute vijesti idu na vrh naslovnice.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media-images',
      label: 'Naslovna slika',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Sažetak',
      maxLength: 320,
      localized: true,
      admin: { description: 'Kratki uvod prikazan na kartici vijesti i u SEO opisu.' },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Sadržaj',
      localized: true,
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galerija',
      labels: { singular: 'Slika', plural: 'Slike' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media-images', required: true },
      ],
    },
    {
      name: 'author',
      type: 'text',
      label: 'Autor / potpis',
      admin: { position: 'sidebar', description: 'npr. Župni ured' },
    },
  ],
}
