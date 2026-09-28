import React from 'react';
import { Sparkles, X, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-xl border border-neutral-800 flex items-center justify-between gap-3 text-xs sm:text-sm animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="flex items-center gap-2.5">
        <Info className="w-4 h-4 text-indigo-400 shrink-0" />
        <span className="font-medium text-neutral-100">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
