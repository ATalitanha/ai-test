import { SelectProps } from '../common/types';

export const Select = ({
  options,
  value,
  onChange,
  placeholder,
  error,
  label,
  className,
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          rounded-md border border-gray-300 px-3 py-2 
          bg-white dark:bg-gray-800 
          focus:border-blue-500 focus:outline-none
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};