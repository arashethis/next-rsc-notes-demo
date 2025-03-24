import './style.css'

import React from 'react'
import Sidebar from 'components/sidebar'
import AddButton from 'components/add-button'
import { Note } from '../../types/note'
import { getNotes } from 'libs/apis'

export const metadata = {
  title: 'Next.js App Router + React Server Components Demo',
  description: 'Demo of React Server Components in Next.js. Hosted on Vercel.',
  openGraph: {
    title: 'Next.js App Router + React Server Components Demo',
    description:
      'Demo of React Server Components in Next.js. Hosted on Vercel.',
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
  params,
}: {
  children: React.ReactNode
}) {
  const notes = await getNotes();
  let notesArray: Note[] = notes
    ? (Object.values(notes) as Note[]).sort(
        (a, b) => Number(b.id) - Number(a.id)
      )
    : []

  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="main">
            <Sidebar notes={notesArray}>
              <AddButton noteId={null}>Add</AddButton>
            </Sidebar>
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  )
}
