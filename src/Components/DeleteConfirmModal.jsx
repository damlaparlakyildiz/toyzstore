import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, toy }) {
  if (!isOpen || !toy) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-6 text-center">
        
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1">
          Oyuncağı Silmek İstiyor musunuz?
        </h3>

        <p className="text-sm text-slate-500 mb-6">
          <span className="font-semibold text-slate-800">"{toy.name}"</span> adlı oyuncak kalıcı olarak listeden silinecek. Bu işlem geri alınamaz.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="py-2.5 px-4 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
          >
            Vazgeç
          </button>
          
          <button
            onClick={() => onConfirm(toy.id)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-4 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md shadow-rose-500/25 transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Evet, Sil</span>
          </button>
        </div>

      </div>
    </div>
  );
}
