import NoteUI from 'components/note-ui'
import { getNote } from 'libs/apis';

export const metadata = {
  robots: {
    index: false
  }
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const note = await getNote(params.id);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  return <NoteUI note={note} />
}
