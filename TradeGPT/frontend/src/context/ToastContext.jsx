import React, { createContext, useContext, useMemo, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

const TOAST_ICONS = {
  success: <CheckCircle2 size={18} />,
  error: <AlertCircle size={18} />,
  info: <Info size={18} />,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  const showToast = ({ type = 'info', title, message, duration = 2800 }) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((current) => [...current, { id, type, title, message }]);

    window.setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[100] flex w-[min(92vw,24rem)] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`glass-panel toast-enter rounded-2xl border px-4 py-3 shadow-2xl ${
              toast.type === 'error'
                ? 'border-red-500/50 text-red-100'
                : toast.type === 'success'
                  ? 'border-lime-400/50 text-lime-100'
                  : 'border-blue-400/50 text-blue-100'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5">{TOAST_ICONS[toast.type] || TOAST_ICONS.info}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{toast.title || 'Notification'}</p>
                {toast.message ? <p className="text-xs opacity-90">{toast.message}</p> : null}
              </div>
              <button onClick={() => removeToast(toast.id)} className="opacity-80 transition hover:opacity-100">
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
