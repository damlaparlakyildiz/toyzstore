import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { TOY_CATEGORIES } from '../Interfaces/toy.interface';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  toys
}) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-8 space-y-4">
      
      {/* Top Search & Sort Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Oyuncak adı, marka veya anahtar kelime ara (örn: Barbie, Hot Wheels)..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm text-slate-800 placeholder-slate-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-1.5 py-0.5 rounded cursor-pointer"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Sırala:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-2.5 px-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition cursor-pointer"
          >
            <option value="newest">En Yeniler</option>
            <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
            <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
            <option value="name-asc">İsim (A - Z)</option>
            <option value="stock-desc">En Çok Stok</option>
          </select>
        </div>

      </div>

      {/* Categories Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
        {TOY_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          const count = category === 'Tümü'
            ? toys.length
            : toys.filter(t => t.category === category).length;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <span>{category}</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
