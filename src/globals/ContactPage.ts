import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '../access'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Kontakt',
  admin: {
    group: 'Stranice',
    description: 'Adresa, telefon, e-mail, karta i dolazak.',
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
            { name: 'eyebrow', type: 'text', label: 'Nadnaslov' },
            { name: 'title', type: 'text', required: true, label: 'Naslov' },
            { name: 'intro', type: 'textarea', label: 'Uvodni tekst' },
            { name: 'heroImage', type: 'upload', relationTo: 'media-images', label: 'Slika zaglavlja' },
          ],
        },
        {
          label: 'Podaci',
          fields: [
            {
              name: 'contact',
              type: 'group',
              label: 'Kontakt podaci',
              fields: [
                { name: 'parishOfficeName', type: 'text', label: 'Naziv ureda', defaultValue: 'Župni ured' },
                { name: 'street', type: 'text', required: true, label: 'Ulica i broj' },
                { name: 'postalCode', type: 'text', required: true, label: 'Poštanski broj' },
                { name: 'city', type: 'text', required: true, label: 'Grad' },
                { name: 'country', type: 'text', label: 'Država', defaultValue: 'Hrvatska' },
                { name: 'phone', type: 'text', label: 'Telefon' },
                { name: 'mobile', type: 'text', label: 'Mobitel' },
                { name: 'email', type: 'email', label: 'E-mail' },
                { name: 'iban', type: 'text', label: 'IBAN (za darove i milostinju)' },
                { name: 'oib', type: 'text', label: 'OIB' },
              ],
            },
          ],
        },
        {
          label: 'Karta i dolazak',
          fields: [
            {
              name: 'map',
              type: 'group',
              label: 'Karta',
              fields: [
                {
                  name: 'embedUrl',
                  type: 'text',
                  label: 'Google Maps embed URL',
                  admin: { description: 'Google Maps → Dijeli → Ugradi kartu → src iz <iframe>.' },
                },
                {
                  name: 'directionsUrl',
                  type: 'text',
                  label: 'Poveznica za upute (Google Maps)',
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', label: 'SEO naslov' },
            { name: 'metaDescription', type: 'textarea', label: 'SEO opis' },
          ],
        },
      ],
    },
  ],
}
