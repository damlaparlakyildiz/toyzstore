import React from 'react';
import { Sparkles, Plus, RotateCcw, Package } from 'lucide-react';

export default function Navbar({ onAddNew, onReset, totalCount, totalStock }) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900">
                  Toy<span className="text-rose-600">Vault</span>
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                  Mattel Hub
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Modern Oyuncak Koleksiyonu & Ürün Yönetim Paneli
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onReset}
              title="Varsayılan Oyuncakları Geri Yükle"
              className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden md:inline">Sıfırla</span>
            </button>

            <button
              onClick={onAddNew}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 rounded-xl shadow-md shadow-rose-500/25 hover:shadow-lg hover:shadow-rose-500/35 transition cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Yeni Oyuncak Ekle</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
