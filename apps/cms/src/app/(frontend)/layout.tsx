import React from 'react'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  title: 'Erik Ankrom CMS',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
