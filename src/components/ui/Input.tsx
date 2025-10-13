import { InputProps } from '../common/types';
import { clsx } from 'clsx';

export const Input = ({
  className,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  label,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          'rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none',
          error && 'border-red-500',
          className
        )}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};