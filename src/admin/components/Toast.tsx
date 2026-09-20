import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-3 duration-200 ${
                isSuccess
                  ? 'bg-[#12241A] text-white border-[#B7E84B]/40 shadow-[0_10px_25px_-5px_rgba(183,232,75,0.15)]'
                  : isError
                  ? 'bg-[#2A1212] text-white border-red-500/40 shadow-[0_10px_25px_-5px_rgba(239,68,68,0.2)]'
                  : 'bg-[#1E293B] text-white border-slate-700'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#B7E84B]" />}
                {isError && <AlertCircle className="w-5 h-5 text-red-400" />}
                {!isSuccess && !isError && <Info className="w-5 h-5 text-blue-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold uppercase tracking-wider">{toast.title}</h5>
                {toast.message && <p className="text-xs text-white/80 mt-0.5 leading-relaxed">{toast.message}</p>}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/50 hover:text-white shrink-0 -mr-1 -mt-1 p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

const fallbackToast: ToastContextType = {
  showToast: (type, title, message) => {
    if (typeof console !== 'undefined') {
      console.log(`[Toast ${type}] ${title}: ${message || ''}`);
    }
  },
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return fallbackToast;
  }
  return context;
};
