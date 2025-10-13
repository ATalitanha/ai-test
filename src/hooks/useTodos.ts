import { useState, useCallback, useEffect } from 'react';
import { Todo } from '@/types/models';
import { ApiResponse } from '@/types/api';

interface UseTodosReturn {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  addTodo: (title: string) => Promise<boolean>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<boolean>;
  deleteTodo: (id: string) => Promise<boolean>;
  toggleTodo: (id: string) => Promise<boolean>;
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/todo');
      const data: ApiResponse<{ todos: Todo[] }> = await response.json();
      
      if (data.success && data.data && data.data.todos) {
        setTodos(data.data.todos);
        return true;
      }
      setError(data.error || 'Failed to fetch todos');
      return false;
    } catch (err) {
      setError('An error occurred while fetching todos');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // fetch todos once on mount
  useEffect(() => {
    void fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (title: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      
      const data: ApiResponse<{ todo: Todo }> = await response.json();
      if (data.success && data.data && data.data.todo) {
        setTodos(prev => [...prev, data.data.todo]);
        return true;
      }
      setError(data.error || 'Failed to add todo');
      return false;
    } catch (err) {
      setError('An error occurred while adding todo');
      return false;
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>): Promise<boolean> => {
    try {
      const response = await fetch(`/api/todo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      const data: ApiResponse<{ todo: Todo }> = await response.json();
      if (data.success && data.data && data.data.todo) {
        setTodos(prev => prev.map(todo => 
          todo.id === id ? { ...todo, ...updates } : todo
        ));
        return true;
      }
      setError(data.error || 'Failed to update todo');
      return false;
    } catch (err) {
      setError('An error occurred while updating todo');
      return false;
    }
  };

  const deleteTodo = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/todo/${id}`, {
        method: 'DELETE',
      });
      
      const data: ApiResponse<void> = await response.json();
      if (data.success) {
        setTodos(prev => prev.filter(todo => todo.id !== id));
        return true;
      }
      setError(data.error || 'Failed to delete todo');
      return false;
    } catch (err) {
      setError('An error occurred while deleting todo');
      return false;
    }
  };

  const toggleTodo = async (id: string): Promise<boolean> => {
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      setError('Todo not found');
      return false;
    }

    return updateTodo(id, { completed: !todo.completed });
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };
};