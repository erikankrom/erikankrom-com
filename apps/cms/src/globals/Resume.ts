import type { GlobalConfig } from 'payload'

export const Resume: GlobalConfig = {
  slug: 'resume',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      admin: {
        description: 'Short professional headline (e.g. "Software Engineer")',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: {
        description: 'Brief professional summary',
      },
    },
    {
      name: 'experience',
      type: 'array',
      admin: {
        description: 'Work experience, most recent first',
      },
      fields: [
        {
          name: 'company',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'startDate',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "Jan 2022"',
          },
        },
        {
          name: 'endDate',
          type: 'text',
          admin: {
            description: 'e.g. "Present" or "Dec 2024"',
          },
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'highlights',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'education',
      type: 'array',
      fields: [
        {
          name: 'institution',
          type: 'text',
          required: true,
        },
        {
          name: 'degree',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "B.S. Computer Science"',
          },
        },
        {
          name: 'startDate',
          type: 'text',
        },
        {
          name: 'endDate',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      admin: {
        description: 'Skill categories (e.g. "Languages", "Frameworks")',
      },
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'issuer',
          type: 'text',
        },
        {
          name: 'date',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
}
