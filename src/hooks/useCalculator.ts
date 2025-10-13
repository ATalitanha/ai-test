import { useState } from 'react';
import { Calculation, HistoryItem } from '@/types/models';
import { ApiResponse } from '@/types/api';

export const useCalculator = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const calculate = async (expression: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression }),
      });
      const data: ApiResponse<{ calculation: Calculation }> = await response.json();
      if (data.success && data.data) {
        const newHistoryItem: HistoryItem = {
          id: data.data.calculation.id,
          expr: data.data.calculation.expression,
          result: data.data.calculation.result,
          createdAt: new Date(data.data.calculation.createdAt),
        };
        setHistory([newHistoryItem, ...history]);
        return data.data.calculation.result;
      }
      return 'Error';
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/history');
      const data: ApiResponse<{ history: HistoryItem[] }> = await response.json();
      if (data.success && data.data) {
        setHistory(data.data.history);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/history', {
        method: 'DELETE',
      });
      const data: ApiResponse<void> = await response.json();
      if (data.success) {
        setHistory([]);
        return true;
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    history,
    loading,
    calculate,
    fetchHistory,
    clearHistory,
  };
};