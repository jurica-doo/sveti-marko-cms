import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '../access'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Postavke stranice',
  admin: {
    group: 'Postavke',
    description: 'Naziv župe, izbornik, podnožje i društvene mreže.',
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
          label: 'Identitet',
          fields: [
            { name: 'siteName', type: 'text', required: true, label: 'Naziv župe' },
            { name: 'shortName', type: 'text', label: 'Kratki naziv (navbar)' },
            { name: 'tagline', type: 'text', label: 'Podnaslov / geslo' },
            { name: 'logo', type: 'upload', relationTo: 'media-images', label: 'Logo / grb' },
            {
              name: 'diocese',
              type: 'text',
              label: 'Nadbiskupija / biskupija',
              defaultValue: 'Splitsko-makarska nadbiskupija',
            },
          ],
        },
        {
          label: 'Traka obavijesti',
          fields: [
            {
              name: 'announcement',
              type: 'group',
              label: 'Traka na vrhu stranice',
              fields: [
                { name: 'enabled', type: 'checkbox', label: 'Prikaži traku', defaultValue: false },
                { name: 'text', type: 'text', label: 'Tekst' },
                { name: 'href', type: 'text', label: 'Poveznica (nije obavezno)' },
              ],
            },
          ],
        },
        {
          label: 'Izbornik',
          fields: [
            {
              name: 'navigation',
              type: 'array',
              label: 'Glavni izbornik',
              labels: { singular: 'Stavka', plural: 'Stavke' },
              fields: [
                { name: 'label', type: 'text', required: true, label: 'Naziv' },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                  label: 'Putanja',
                  admin: { description: 'npr. /vijesti/ — interne putanje uvijek s kosom crtom na kraju.' },
                },
              ],
            },
            {
              name: 'headerCta',
              type: 'group',
              label: 'Gumb u zaglavlju',
              fields: [
                { name: 'label', type: 'text', label: 'Naziv' },
                { name: 'href', type: 'text', label: 'Putanja' },
              ],
            },
          ],
        },
        {
          label: 'Podnožje',
          fields: [
            { name: 'footerIntro', type: 'textarea', label: 'Uvodni tekst u podnožju' },
            {
              name: 'footerColumns',
              type: 'array',
              label: 'Stupci u podnožju',
              labels: { singular: 'Stupac', plural: 'Stupci' },
              maxRows: 3,
              fields: [
                { name: 'title', type: 'text', required: true, label: 'Naslov stupca' },
                {
                  name: 'links',
                  type: 'array',
                  label: 'Poveznice',
                  fields: [
                    { name: 'label', type: 'text', required: true, label: 'Naziv' },
                    { name: 'href', type: 'text', required: true, label: 'Putanja ili URL' },
                  ],
                },
              ],
            },
            { name: 'copyright', type: 'text', label: 'Tekst autorskih prava' },
          ],
        },
        {
          label: 'Društvene mreže',
          fields: [
            {
              name: 'social',
              type: 'array',
              label: 'Profili',
              labels: { singular: 'Profil', plural: 'Profili' },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  label: 'Mreža',
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'WhatsApp', value: 'whatsapp' },
                  ],
                },
                { name: 'url', type: 'text', required: true, label: 'URL' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
