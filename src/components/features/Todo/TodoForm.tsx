import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { TodoFormProps } from './types';

export const TodoForm = ({
  initialValue = '',
  onSubmit,
  onCancel,
  isEditing = false,
}: TodoFormProps) => {
  const [title, setTitle] = useState(initialValue);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    onSubmit(title.trim());
    if (!isEditing) {
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={title}
        onChange={setTitle}
        placeholder="Add a new todo..."
        error={error}
        className="flex-grow"
      />
      <Button type="submit">
        {isEditing ? 'Update' : 'Add'}
      </Button>
      {onCancel && (
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </form>
  );
};