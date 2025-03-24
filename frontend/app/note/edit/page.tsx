import NoteEditor from 'components/note-editor'

export const metadata = {
  robots: {
    index: false
  }
}

export default async function EditPage() {
  const defaultNote = {
    title: 'Untitled',
    body: ''
  }

  return <NoteEditor noteId={null} initialTitle={defaultNote.title} initialBody={defaultNote.body} />
}
