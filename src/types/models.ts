export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: number;
  title: string;
  body: string;
}

export interface Calculation {
  id: string;
  expression: string;
  result: string;
  createdAt: Date;
}

export interface HistoryItem {
  id: string;
  expr: string;
  result: string;
  createdAt: Date;
}