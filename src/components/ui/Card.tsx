import { CardProps } from '../common/types';

export const Card = ({ children, className, title, header, footer }: CardProps) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm ${className}`}>
      {(header || title) && (
        <div className="px-4 py-3 border-b dark:border-gray-700">
          {header || <h3 className="text-lg font-semibold">{title}</h3>}
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && (
        <div className="px-4 py-3 border-t dark:border-gray-700">{footer}</div>
      )}
    </div>
  );
};