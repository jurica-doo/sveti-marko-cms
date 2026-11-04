import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

export const MediaVideos: CollectionConfig = {
  slug: 'media-videos',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  upload: {
    // Listed formats only, rather than every `video/*` type.
    mimeTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
  },
  fields: [
    {
      name: 'title',
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
