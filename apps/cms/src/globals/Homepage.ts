import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      required: true,
      defaultValue: 'Software engineer, builder, thinker.',
      admin: {
        description: 'Main tagline displayed on the homepage',
      },
    },
    {
      name: 'links',
      type: 'array',
      admin: {
        description: 'Call-to-action buttons on the homepage',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
