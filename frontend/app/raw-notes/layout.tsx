import '../style.css'

export const metadata = {
  title: 'Raw SQL Query Notes',
  description: 'Raw SQL Query Notes Page',
}

export default function RawNotesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="overflow-auto">
        <div className="container">
          <div className="main">
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  )
}