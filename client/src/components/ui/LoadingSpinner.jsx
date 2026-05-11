import { Loader2 } from 'lucide-react';

/**
 * Loading spinner with medical-themed design
 * Uses a pulsing animation with the brand colors
 */
export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="relative">
        <div className={`${sizes[size]} animate-spin text-blue-600`}>
          <Loader2 className="w-full h-full" />
        </div>
        <div className="absolute inset-0 animate-ping opacity-20">
          <div className={`${sizes[size]} rounded-full bg-blue-500`} />
        </div>
      </div>
      {text && (
        <p className="text-slate-500 text-sm font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
}
