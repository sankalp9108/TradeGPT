import React from 'react';
import { AlertCircle } from 'lucide-react';

export function ErrorMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-3 rounded-2xl border border-red-400/40 bg-red-500/15 px-5 py-3 text-red-100 shadow-lg backdrop-blur-xl">
      <AlertCircle size={20} />
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-2 text-red-100 transition hover:text-white">
          ✕
        </button>
      )}
    </div>
  );
}
