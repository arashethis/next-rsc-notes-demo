import pool from '../../libs/db';
import { Note } from '../../../types/note';
import { RowDataPacket } from 'mysql2';

export default async function DBNotesPage() {
  const [notes] = await pool.query<(Note & RowDataPacket)[]>(
    'SELECT * FROM notes ORDER BY updated_at DESC'
  );

  return (
    <div className="notes-container">
      <h1>Raw SQL Query Notes</h1>
      
      <div className="notes-grid">
        {notes.map((note: Note) => (
          <div key={note.id} className="note-card">
            <h2>{note.title}</h2>
            <p>{note.body.slice(0, 100)}...</p>
            <div className="note-footer">
              <span>Updated at: {new Date(note.updated_at).toLocaleString()}</span>
            </div>
          </div>
        ))}      
      </div>
    </div>
  );
}