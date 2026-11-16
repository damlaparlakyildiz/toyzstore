import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 px-4 py-3 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-900/10">
        {icons[toast.type] || icons.info}
        <span className="text-sm font-semibold text-slate-800">{toast.message}</span>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 ml-2 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
