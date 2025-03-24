import Link from 'next/link'

export default async function Page() {
  return (
    <div className="note--empty-state">
      <Link href="/note">React Notes</Link>
    </div>
  )
}
