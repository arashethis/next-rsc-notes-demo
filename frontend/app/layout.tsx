import './style.css'

import React from 'react'

export const metadata = {
  title: 'React Server Components Demo',
  description: 'Demo of React Server Components in Next.js..',
  openGraph: {
    title: 'React Server Components Demo',
    description:
      'Demo of React Server Components in Next.js.',
    images: ['https://next-rsc-notes.vercel.app/og.png']
  },
  robots: {
    index: true,
    follow: true
  },
  metadataBase: new URL('https://next-rsc-notes.vercel.app/')
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="main">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
