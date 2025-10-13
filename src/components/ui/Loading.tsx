import { LoadingProps } from '../common/types';

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export const Loading = ({ size = 'md', fullScreen = false, className }: LoadingProps) => {
  const spinner = (
    <div
      className={`${sizes[size]} ${className} border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-75 z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};