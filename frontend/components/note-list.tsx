import React from 'react'
import { format, isToday } from 'date-fns'
import marked from 'marked'
import ClientSidebarNote from './sidebar-note'
import { load } from 'cheerio'

export default function NoteList({ notes }) {
  if (notes.length === 0) {
    return <div className="notes-empty">No notes created yet!</div>
  }

  return (
    <ul className="notes-list">
      {notes.map((note) => (
        <li key={note.id}>
          <SidebarNote note={note} />
        </li>
      ))}
    </ul>
  )
}

function excerpts(html, length) {
  const text = load(html)
    .text()
    .trim()
    .replace(/(\r\n|\r|\n|\s)+/g, ' ')

  let excerpt = ''
  if (length) {
    excerpt = text.split(' ').slice(0, length).join(' ')
  }
  if (excerpt.length < text.length) excerpt += '...'

  return excerpt
}

function SidebarNote({ note }) {
  const updatedAt = new Date(note.updated_at)
  const lastUpdatedAt = isToday(updatedAt)
    ? format(updatedAt, 'h:mm bb')
    : format(updatedAt, 'M/d/yy')
  const summary = excerpts(marked(note.body || ''), 20)

  return (
    <ClientSidebarNote
      id={note.id}
      title={note.title}
      expandedChildren={
        <p className="sidebar-note-excerpt">{summary || <i>(No content)</i>}</p>
      }
    >
      <header className="sidebar-note-header">
        <strong>{note.title}</strong>
        <small>{lastUpdatedAt}</small>
      </header>
    </ClientSidebarNote>
  )
}
