import React from 'react';
import { ShoppingBag, PlusCircle, Search, Sparkles, RotateCcw, ShieldCheck, UserCheck } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  onAddNew,
  onReset,
  searchQuery,
  setSearchQuery,
  isAdmin,
  setIsAdmin
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Üst Bilgi Çubuğu */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 flex items-center justify-between">
        <span className="text-[11px] sm:text-xs text-slate-300">
          🚚 500 TL üzeri kargo bedava!
        </span>

        {/* Yönetici Girişi Toggle */}
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition cursor-pointer ${
            isAdmin
              ? 'bg-amber-400 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {isAdmin ? (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
              <span>Yönetici Açık</span>
            </>
          ) : (
            <>
              <UserCheck className="w-3.5 h-3.5" />
              <span>Yetkili Girişi</span>
            </>
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-black text-xl tracking-tight text-slate-900">
              Toyz<span className="text-rose-600">Store</span>
            </span>
          </div>

          {/* Arama Kutusu */}
          <div className="flex-1 max-w-sm hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Oyuncak ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-100 focus:bg-white border border-transparent focus:border-rose-400 rounded-lg outline-none text-slate-800"
              />
            </div>
          </div>

          {/* Sağ Butonlar */}
          <div className="flex items-center gap-2">
            {isAdmin && (
              <>
                <button
                  onClick={onReset}
                  title="Kataloğu Sıfırla"
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={onAddNew}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-300 hover:bg-amber-400 rounded-lg transition"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Ürün Ekle</span>
                </button>
              </>
            )}

            {/* Sepet Butonu */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Sepet</span>
              {cartCount > 0 && (
                <span className="bg-white text-rose-600 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobil Arama */}
        <div className="pb-2.5 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Oyuncak ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 rounded-lg outline-none text-slate-800"
            />
          </div>
        </div>

      </div>
    </header>
  );
}
