import { Note } from "../../types/note"

const API_BASE_URL = 'http://localhost:8080/api';

// 获取所有笔记
export const getNotes = async (): Promise<Note[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`);
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
}

// 获取单个笔记
export const getNote = async (id: Note['id']): Promise<Note | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch note');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching note ${id}:`, error);
    return null;
  }
}

// 更新笔记
export const updateNote = async (note: Note): Promise<Note | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${note.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update note');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating note:', error);
    return null;
  }
}

// 创建笔记
export const createNote = async (note: Omit<Note, 'id' | 'updated_at'>): Promise<Note | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create note');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating note:', error);
    return null;
  }
}

// 删除笔记
export const deleteNote = async (id: Note['id']): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete note');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting note:', error);
    return false;
  }
}