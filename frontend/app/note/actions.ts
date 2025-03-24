'use server'

import { createNote, updateNote, deleteNote as deleteNoteApi } from 'libs/apis'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveNote(
  noteId: string | null,
  title: string,
  body: string
) {

  let saveNoteApi = updateNote
  if (!noteId) {
    noteId = Date.now().toString()
    saveNoteApi = createNote
  }

  const payload = {
    id: noteId,
    title: title.slice(0, 255),
    updated_at: Date.now(),
    body: body.slice(0, 2048),
  }
  
  await saveNoteApi(payload);

  revalidatePath('/note')
  redirect(`/note/${noteId}`)
}

export async function deleteNote(noteId: string) {
  await deleteNoteApi(noteId);

  revalidatePath('/note')
  redirect('/note')
}
