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
                  localized: true,
                  admin: { description: 'npr. Nedjelja, Radnim danom, Subota' },
                },
                {
                  name: 'times',
                  type: 'text',
                  required: true,
                  label: 'Vrijeme',
                  localized: true,
                  admin: { description: 'npr. 9:00, 11:00 i 20:00 — ili rečenica poput "Prije svake mise".' },
                },
                { name: 'note', type: 'text', label: 'Napomena', localized: true },
                {
                  name: 'highlight',
                  type: 'checkbox',
                  label: 'Istakni u heroju',
                  defaultValue: true,
                },
              ],
            },
            {
              name: 'massesNote',
              type: 'textarea',
              label: 'Napomena uz raspored misa',
              localized: true,
            },
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
                { name: 'day', type: 'text', required: true, label: 'Dan', localized: true },
                {
                  name: 'times',
                  type: 'text',
                  required: true,
                  label: 'Vrijeme',
                  localized: true,
                  admin: { description: 'Broj ili rečenica poput "Prije svake mise".' },
                },
                { name: 'note', type: 'text', label: 'Napomena', localized: true },
                {
                  name: 'highlight',
                  type: 'checkbox',
                  label: 'Istakni u heroju',
                  defaultValue: true,
                },
              ],
            },
            {
              name: 'confessionsNote',
              type: 'textarea',
              label: 'Napomena uz ispovijed',
              localized: true,
            },
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
                { name: 'title', type: 'text', required: true, label: 'Naziv', localized: true },
                { name: 'day', type: 'text', label: 'Dan', localized: true },
                { name: 'times', type: 'text', label: 'Vrijeme', localized: true },
                { name: 'note', type: 'text', label: 'Napomena', localized: true },
              ],
            },
          ],
        },
        {
          label: 'Posebno',
          fields: [
            {
              name: 'specialSchedule',
              type: 'array',
              label: 'Prigodni raspored',
              labels: { singular: 'Blok', plural: 'Blokovi' },
              admin: {
                description:
                  'Privremeni blokovi za blagdane i posebne prigode — npr. "Božićna ispovijed" ili "Uskrsne mise". Prikazuje se istaknuto iznad redovnog rasporeda. Kad prigoda prođe, ugasite "Prikaži" umjesto brisanja — spremno je za sljedeću godinu.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Naslov',
                  localized: true,
                  admin: { description: 'npr. Božićna ispovijed' },
                },
                { name: 'active', type: 'checkbox', label: 'Prikaži', defaultValue: true },
                {
                  name: 'entries',
                  type: 'array',
                  label: 'Termini',
                  labels: { singular: 'Termin', plural: 'Termini' },
                  minRows: 1,
                  fields: [
                    {
                      name: 'day',
                      type: 'text',
                      required: true,
                      label: 'Dan',
                      localized: true,
                      admin: { description: 'npr. 23.12. ponedjeljak' },
                    },
                    {
                      name: 'times',
                      type: 'text',
                      required: true,
                      label: 'Vrijeme',
                      localized: true,
                      admin: { description: 'npr. 10h – 15h ili 9h, 10h, 12h i 17h' },
                    },
                    { name: 'note', type: 'text', label: 'Napomena', localized: true },
                  ],
                },
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
                { name: 'day', type: 'text', required: true, label: 'Dan', localized: true },
                {
                  name: 'hours',
                  type: 'text',
                  required: true,
                  label: 'Vrijeme',
                  localized: true,
                  admin: { description: 'npr. 09:00 - 11:00 ili Zatvoreno' },
                },
                { name: 'note', type: 'text', label: 'Napomena', localized: true },
              ],
            },
            {
              name: 'officeNotes',
              type: 'array',
              label: 'Važne napomene',
              labels: { singular: 'Napomena', plural: 'Napomene' },
              fields: [
                { name: 'title', type: 'text', required: true, label: 'Naslov', localized: true },
                { name: 'text', type: 'textarea', required: true, label: 'Tekst', localized: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
