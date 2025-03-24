import Link from 'next/link'

export default async function AddButton({
  children,
  noteId
}: {
  children: React.ReactNode
  noteId: string | null
}) {
  const isDraft = noteId == null

  return (
    // Use hard link
    <Link href={`/note/edit/${noteId || ''}`} className="link--unstyled">
      <button
        className={[
          'edit-button',
          isDraft ? 'edit-button--solid' : 'edit-button--outline'
        ].join(' ')}
        role="menuitem"
      >
        {children}
      </button>
    </Link>
  )
}
