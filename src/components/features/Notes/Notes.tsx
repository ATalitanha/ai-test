import { useState } from 'react';
import { useNotes } from '@/hooks/useNotes';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Note } from '@/types/models';

interface NoteEditorProps {
  note?: Note;
  onSave: (title: string, content: string) => Promise<void>;
  onCancel: () => void;
}

const NoteEditor = ({ note, onSave, onCancel }: NoteEditorProps) => {
  const [title, setTitle] = useState(note?.title ?? '');
  const [content, setContent] = useState(note?.content ?? '');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      await onSave(title.trim(), content.trim());
      setTitle('');
      setContent('');
    } catch (err) {
      setError('Failed to save note');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        value={title}
        onChange={setTitle}
        error={error}
        placeholder="Note title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note content"
        className="w-full h-32 p-2 border rounded-md"
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {note ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export const Notes = () => {
  const { notes, loading, createNote, updateNote, deleteNote } = useNotes();
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = async (title: string, content: string) => {
    if (editingNote) {
      await updateNote(editingNote.id, title, content);
      setEditingNote(null);
    } else {
      await createNote(title, content);
      setIsCreating(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {(isCreating || editingNote) && (
        <NoteEditor
          note={editingNote ?? undefined}
          onSave={handleSave}
          onCancel={() => {
            setIsCreating(false);
            setEditingNote(null);
          }}
        />
      )}
      
      {!isCreating && !editingNote && (
        <Button onClick={() => setIsCreating(true)}>
          Create Note
        </Button>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{note.content}</p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={() => setEditingNote(note)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};