import { useSearchParams } from 'next/navigation'
import NoteList from 'components/note-list'

type Note = {
  id: string
  title: string
  body: string
  updated_at: number
}

export default function Notes({ notes }: { notes: Note[] }) {
  const searchParams = useSearchParams()
  const search = searchParams.get('q')

  return <NoteList notes={notes} searchText={search} />
}