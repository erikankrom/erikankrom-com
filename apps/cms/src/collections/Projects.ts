import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'url'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Banner image displayed at the top of the project',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      admin: {
        description: 'Product screenshots and images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        description: 'Live URL of the project',
      },
    },
    {
      name: 'repo',
      type: 'text',
      admin: {
        description: 'Source code repository URL',
      },
    },
  ],
}
