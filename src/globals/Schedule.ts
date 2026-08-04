import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '../access'

/**
 * Single source of truth for every time the parish publishes: masses,
 * confessions, adoration and office hours. Rendered in the hero overlay,
 * on the home page and on the contact page.
 */
export const Schedule: GlobalConfig = {
  slug: 'schedule',
  label: 'Raspored (mise, ispovijed, ured)',
  admin: {
    group: 'Župa',
    description: 'Mijenja se na jednom mjestu — prikazuje se na naslovnici i na kontaktu.',
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
          label: 'Svete mise',
          fields: [
            {
              name: 'masses',
              type: 'array',
              label: 'Raspored misa',
              labels: { singular: 'Termin', plural: 'Termini' },
              admin: { initCollapsed: false },
              fields: [
                {
                  name: 'day',
                  type: 'text',
                  required: true,
                  label: 'Dan',
                  admin: { description: 'npr. Nedjelja, Radnim danom, Subota' },
                },
                {
                  name: 'times',
                  type: 'text',
                  required: true,
                  label: 'Vrijeme',
                  admin: { description: 'npr. 9:00, 11:00 i 20:00' },
                },
                { name: 'note', type: 'text', label: 'Napomena' },
                {
                  name: 'highlight',
                  type: 'checkbox',
                  label: 'Istakni u heroju',
                  defaultValue: true,
                },
              ],
            },
            { name: 'massesNote', type: 'textarea', label: 'Napomena uz raspored misa' },
          ],
        },
        {
          label: 'Ispovijed',
          fields: [
            {
              name: 'confessions',
              type: 'array',
              label: 'Prilika za ispovijed',
              labels: { singular: 'Termin', plural: 'Termini' },
              fields: [
                { name: 'day', type: 'text', required: true, label: 'Dan' },
                { name: 'times', type: 'text', required: true, label: 'Vrijeme' },
                { name: 'note', type: 'text', label: 'Napomena' },
                {
                  name: 'highlight',
                  type: 'checkbox',
                  label: 'Istakni u heroju',
                  defaultValue: true,
                },
              ],
            },
            { name: 'confessionsNote', type: 'textarea', label: 'Napomena uz ispovijed' },
          ],
        },
        {
          label: 'Pobožnosti',
          fields: [
            {
              name: 'devotions',
              type: 'array',
              label: 'Klanjanje i pobožnosti',
              labels: { singular: 'Pobožnost', plural: 'Pobožnosti' },
              fields: [
                { name: 'title', type: 'text', required: true, label: 'Naziv' },
                { name: 'day', type: 'text', label: 'Dan' },
                { name: 'times', type: 'text', label: 'Vrijeme' },
                { name: 'note', type: 'text', label: 'Napomena' },
              ],
            },
          ],
        },
        {
          label: 'Župni ured',
          fields: [
            {
              name: 'officeHours',
              type: 'array',
              label: 'Radno vrijeme župnog ureda',
              labels: { singular: 'Termin', plural: 'Termini' },
              fields: [
                { name: 'day', type: 'text', required: true, label: 'Dan' },
                {
                  name: 'hours',
                  type: 'text',
                  required: true,
                  label: 'Vrijeme',
                  admin: { description: 'npr. 09:00 - 11:00 ili Zatvoreno' },
                },
                { name: 'note', type: 'text', label: 'Napomena' },
              ],
            },
            {
              name: 'officeNotes',
              type: 'array',
              label: 'Važne napomene',
              labels: { singular: 'Napomena', plural: 'Napomene' },
              fields: [
                { name: 'title', type: 'text', required: true, label: 'Naslov' },
                { name: 'text', type: 'textarea', required: true, label: 'Tekst' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
