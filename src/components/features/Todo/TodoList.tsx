import { useState } from 'react';
import { Todo } from '@/types/models';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TodoForm } from './TodoForm';
import { TodoItemProps } from './types';
import { CheckCircle, Circle, Edit2, Trash2 } from 'lucide-react';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { Loading } from '@/components/ui/Loading';
import { useTodos } from '@/hooks/useTodos';

const TodoItem = ({ todo, onEdit, onDelete, onToggle }: TodoItemProps) => (
  <Card className="flex items-center justify-between p-4 mb-2">
    <div className="flex items-center gap-3">
      <button
        onClick={() => onToggle(todo.id)}
        className="text-gray-500 hover:text-blue-500 dark:text-gray-400"
      >
        {todo.completed ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>
      <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
        {todo.title}
      </span>
    </div>
    <div className="flex gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onEdit(todo)}
      >
        <Edit2 className="w-4 h-4" />
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={() => onDelete(todo.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  </Card>
);

export const TodoList = () => {
  const { todos, loading, error, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAddTodo = async (title: string) => {
    await addTodo(title);
  };

  const handleUpdateTodo = async (id: string, title: string) => {
    const success = await updateTodo(id, { title });
    if (success) setEditingTodo(null);
  };

  const handleDeleteTodo = async () => {
    if (!deleteId) return;
    const success = await deleteTodo(deleteId);
    if (success) setDeleteId(null);
  };

  if (loading) return <Loading size="lg" />;

  return (
    <div className="space-y-4">
      <TodoForm onSubmit={handleAddTodo} />

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="space-y-2">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={setEditingTodo}
            onDelete={(id) => setDeleteId(id)}
            onToggle={toggleTodo}
          />
        ))}
      </div>

      {editingTodo && (
        <TodoForm
          initialValue={editingTodo.title}
          onSubmit={(title) => handleUpdateTodo(editingTodo.id, title)}
          onCancel={() => setEditingTodo(null)}
          isEditing
        />
      )}

      <DeleteConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteTodo}
        title="Delete Todo"
        message="Are you sure you want to delete this todo?"
      />
    </div>
  );
};