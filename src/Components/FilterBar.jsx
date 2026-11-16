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
    <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200/80 mb-6 space-y-3">
      
      {/* Arama ve Sıralama */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        
        {/* Arama Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Oyuncak adı veya marka ara..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-rose-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sıralama */}
        <div className="flex items-center gap-1.5 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-2 px-2.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white outline-none cursor-pointer"
          >
            <option value="newest">En Yeniler</option>
            <option value="price-asc">Fiyat: Artan</option>
            <option value="price-desc">Fiyat: Azalan</option>
            <option value="name-asc">İsim (A-Z)</option>
            <option value="stock-desc">Çok Satan</option>
          </select>
        </div>

      </div>

      {/* Kategori Butonları */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
        {TOY_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          const count = category === 'Tümü'
            ? toys.length
            : toys.filter(t => t.category === category).length;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{category}</span>
              <span className={`text-[10px] px-1 py-0.2 rounded font-semibold ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
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
