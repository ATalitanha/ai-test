import { Note, Todo, User, Message, Calculation, HistoryItem } from './models';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  user: Pick<User, 'id' | 'username' | 'email'>;
  token: string;
}

export interface NotesResponse {
  notes: Note[];
}

export interface TodosResponse {
  todos: Todo[];
}

export interface MessagesResponse {
  messages: Message[];
}

export interface CalculationResponse {
  calculation: Calculation;
}

export interface HistoryResponse {
  history: HistoryItem[];
}