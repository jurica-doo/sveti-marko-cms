import type { CollectionConfig } from 'payload'

import { isAdmin } from '../access'

export const MediaImages: CollectionConfig = {
  slug: 'media-images',
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  upload: {
    // Listed formats only. `image/*` also admitted SVG, which can carry
    // script — and the site serves uploads from its own domain.
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
  ],
}
