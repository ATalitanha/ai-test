import { Todo } from '@/types/models';

export interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export interface TodoFormProps {
  initialValue?: string;
  onSubmit: (title: string) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}