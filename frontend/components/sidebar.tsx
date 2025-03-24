import React, { Suspense } from 'react'
import Link from 'next/link'
import NoteListSkeleton from 'components/note-list-skeleton'
import NoteList from 'components/note-list'

type Note = {
  id: string
  title: string
  body: string
  updated_at: number
}

export default function Sidebar({
  children,
  notes,
}: {
  children: React.ReactNode
  notes: Note[]
}) {
  return (
    <>
      <input type="checkbox" className="sidebar-toggle" id="sidebar-toggle" />
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
          <section className="sidebar-header">
            <img
              className="logo"
              src="/logo.svg"
              width="22px"
              height="20px"
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          {children}
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <NoteList notes={notes} />
          </Suspense>
        </nav>
      </section>
    </>
  )
}
