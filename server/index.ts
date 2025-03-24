import express from 'express';
import cors from 'cors';
// 从服务器目录下的types文件夹导入Note类型
import { Note } from '../types/note';
import pool from './db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const app = express();
const PORT = process.env.PORT || 8080;

// 中间件
app.use(cors());
app.use(express.json());

// 获取所有笔记
app.get('/api/notes', async (req, res) => {
  try {
    const [notes] = await pool.query<(Note & RowDataPacket)[]>('SELECT * FROM notes ORDER BY updated_at DESC');
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 获取单个笔记
app.get('/api/notes/:id', async (req, res) => {
  try {
    const [notes] = await pool.query<(Note & RowDataPacket)[]>('SELECT * FROM notes WHERE id = ?', [req.params.id]);
    
    if (notes.length === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json(notes[0]);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 更新笔记
app.put('/api/notes/:id', async (req, res) => {
  try {
    const { title, body } = req.body;
    const updated_at = Date.now();
    
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE notes SET title = ?, body = ?, updated_at = ? WHERE id = ?',
      [title, body, updated_at, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    const [updatedNote] = await pool.query<(Note & RowDataPacket)[]>('SELECT * FROM notes WHERE id = ?', [req.params.id]);
    res.json(updatedNote[0]);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 创建笔记
app.post('/api/notes', async (req, res) => {
  try {
    const newNote: Note = {
      id: Date.now().toString(),
      title: req.body.title || 'Untitled',
      body: req.body.body || '',
      updated_at: Date.now()
    };
    
    await pool.query<ResultSetHeader>(
      'INSERT INTO notes (id, title, body, updated_at) VALUES (?, ?, ?, ?)',
      [newNote.id, newNote.title, newNote.body, newNote.updated_at]
    );
    
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 删除笔记
app.delete('/api/notes/:id', async (req, res) => {
  try {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM notes WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});