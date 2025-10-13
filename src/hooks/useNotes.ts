import { useState, useEffect } from 'react';
import { Note } from '@/types/models';
import { ApiResponse, NotesResponse } from '@/types/api';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      const data: ApiResponse<NotesResponse> = await response.json();
      if (data.success && data.data) {
        setNotes(data.data.notes);
      }
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (title: string, content: string) => {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    const data: ApiResponse<{ note: Note }> = await response.json();
    if (data.success && data.data && data.data.note) {
      setNotes(prev => [...prev, data.data!.note]);
      return true;
    }
    return false;
  };

  const updateNote = async (id: string, title: string, content: string) => {
    const response = await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    const data: ApiResponse<{ note: Note }> = await response.json();
    if (data.success && data.data && data.data.note) {
      setNotes(prev => prev.map(note => note.id === id ? data.data!.note : note));
      return true;
    }
    return false;
  };

  const deleteNote = async (id: string) => {
    const response = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    });
    const data: ApiResponse<void> = await response.json();
    if (data.success) {
      setNotes(notes.filter(note => note.id !== id));
      return true;
    }
    return false;
  };

  return {
    notes,
    loading,
    createNote,
    updateNote,
    deleteNote,
  };
};