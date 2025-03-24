import { format } from 'date-fns'
import NotePreview from 'components/note-preview'
import AddButton from 'components/add-button'

export default async function NoteUI({ note }) {
  const { id, title, body, updated_at } = note
  const updatedAt = new Date(updated_at || 0)

  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            Last updated on {format(updatedAt, "d MMM yyyy 'at' h:mm bb")}
          </small>
          <AddButton noteId={id}>Edit</AddButton>
        </div>
      </div>
      <NotePreview>{body}</NotePreview>
    </div>
  )
}
