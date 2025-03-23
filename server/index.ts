import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { Note } from '../types/note';

const app = express();
const PORT = process.env.PORT || 8080;

// 中间件
app.use(cors());
app.use(express.json());

// 数据文件路径
const dataFilePath = path.join(__dirname, 'data', 'notes.json');

// 读取笔记数据
const readNotesData = (): Note[] => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading notes data:', error);
    return [];
  }
};

// 写入笔记数据
const writeNotesData = (notes: Note[]): void => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(notes, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing notes data:', error);
  }
};

// 获取所有笔记
app.get('/api/notes', (req, res) => {
  const notes = readNotesData();
  res.json(notes);
});

// 获取单个笔记
app.get('/api/notes/:id', (req, res) => {
  const notes = readNotesData();
  const note = notes.find((n) => n.id === req.params.id);
  
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  
  res.json(note);
});

// 更新笔记
app.put('/api/notes/:id', (req, res) => {
  const notes = readNotesData();
  const noteIndex = notes.findIndex((n) => n.id === req.params.id);
  
  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }
  
  const updatedNote: Note = {
    ...notes[noteIndex],
    ...req.body,
    updated_at: Date.now()
  };
  
  notes[noteIndex] = updatedNote;
  writeNotesData(notes);
  
  res.json(updatedNote);
});

// 创建笔记
app.post('/api/notes', (req, res) => {
  const notes = readNotesData();
  const newNote: Note = {
    id: Date.now().toString(),
    title: req.body.title || 'Untitled',
    body: req.body.body || '',
    updated_at: Date.now()
  };
  
  notes.push(newNote);
  writeNotesData(notes);
  
  res.status(201).json(newNote);
});

// 删除笔记
app.delete('/api/notes/:id', (req, res) => {
  const notes = readNotesData();
  const filteredNotes = notes.filter((n) => n.id !== req.params.id);
  
  if (filteredNotes.length === notes.length) {
    return res.status(404).json({ message: 'Note not found' });
  }
  
  writeNotesData(filteredNotes);
  res.json({ message: 'Note deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});