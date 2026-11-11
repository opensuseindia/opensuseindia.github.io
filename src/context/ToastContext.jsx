import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { sounds } from '../lib/sound';

const ToastContext = createContext({
  toast: () => {},
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (type === 'success') {
      sounds.success();
    } else {
      sounds.click();
    }

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm w-full px-4">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className={`p-3.5 rounded-xl border pointer-events-auto flex items-start gap-3 shadow-2xl backdrop-blur-md font-mono text-xs ${
                t.type === 'success'
                  ? 'bg-cyber-card/95 border-geeko-500/50 text-white shadow-[0_0_20px_rgba(115,186,37,0.25)]'
                  : t.type === 'error'
                  ? 'bg-cyber-card/95 border-red-500/50 text-white shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                  : t.type === 'warning'
                  ? 'bg-cyber-card/95 border-amber-500/50 text-white shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                  : 'bg-cyber-card/95 border-cyber-border text-slate-200'
              }`}
            >
              <div className="mt-0.5">
                {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-geeko-400" />}
                {t.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
                {t.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                {t.type === 'info' && <Info className="w-4 h-4 text-blue-400" />}
              </div>
              <div className="flex-1 leading-snug">{t.message}</div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
