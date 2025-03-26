import React from 'react'
import Sidebar from 'components/sidebar'
import AddButton from 'components/add-button'
import { Note } from '../../../types/note'
import { getNotes } from 'libs/apis'

export default async function NoteLayout({
  children
}: {
  children: React.ReactNode
}) {
  const notes = await getNotes()
  const notesArray: Note[] = notes
    ? (Object.values(notes) as Note[]).sort(
        (a, b) => Number(b.id) - Number(a.id)
      )
    : []

  return (
    <div className="container">
      <div className="main">
        <Sidebar notes={notesArray}>
          <AddButton noteId={null}>Add</AddButton>
        </Sidebar>
        <section className="col note-viewer">{children}</section>
      </div>
    </div>
  )
}
