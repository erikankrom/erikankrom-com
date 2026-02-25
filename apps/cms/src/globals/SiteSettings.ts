import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Erik Ankrom',
      admin: {
        description: 'Site name shown in the header and page titles',
      },
    },
    {
      name: 'siteDescription',
      type: 'text',
      defaultValue: 'Personal website of Erik Ankrom',
      admin: {
        description: 'Default meta description for SEO',
      },
    },
    {
      name: 'navLinks',
      type: 'array',
      admin: {
        description: 'Navigation links in the header',
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
    {
      name: 'footerLinks',
      type: 'array',
      admin: {
        description: 'Links displayed in the footer',
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
        {
          name: 'external',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Opens in a new tab',
          },
        },
      ],
    },
    {
      name: 'copyrightName',
      type: 'text',
      defaultValue: 'Erik Ankrom',
      admin: {
        description: 'Name shown in the copyright notice',
      },
    },
  ],
}
