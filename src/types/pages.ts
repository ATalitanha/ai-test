import { Note, Todo } from './models';

export interface PageProps {
  className?: string;
}

export interface DashboardPageProps extends PageProps {
  notes: Note[];
  todos: Todo[];
}

export interface NotesPageProps extends PageProps {
  notes: Note[];
}

export interface TodoPageProps extends PageProps {
  todos: Todo[];
}

export interface CalculatorPageProps extends PageProps {
  history?: boolean;
  advanced?: boolean;
}

export interface AuthPageProps extends PageProps {
  mode: 'login' | 'signup';
}

export interface MessengerPageProps extends PageProps {
  initialMessages?: string[];
}