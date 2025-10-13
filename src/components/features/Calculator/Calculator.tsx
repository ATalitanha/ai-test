import { useCalculator } from '@/hooks/useCalculator';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

interface CalculatorProps {
  onCalculate?: (result: string) => void;
}

export const Calculator = ({ onCalculate }: CalculatorProps) => {
  const [display, setDisplay] = useState('');
  const { calculate, loading } = useCalculator();

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      handleCalculate();
    } else if (value === 'C') {
      setDisplay('');
    } else {
      setDisplay(prev => prev + value);
    }
  };

  const handleCalculate = async () => {
    if (!display) return;
    
    const result = await calculate(display);
    setDisplay(result);
    onCalculate?.(result);
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="mb-4">
        <input
          type="text"
          value={display}
          readOnly
          className="w-full p-2 text-right text-2xl bg-gray-100 dark:bg-gray-700 rounded"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <Button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            disabled={loading}
            variant={btn === '=' ? 'primary' : btn === 'C' ? 'danger' : 'secondary'}
            className="h-12"
          >
            {btn}
          </Button>
        ))}
      </div>
    </div>
  );
};