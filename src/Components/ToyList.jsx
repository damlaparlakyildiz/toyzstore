import React from 'react';
import ToyCard from './ToyCard';
import { PackageSearch, Plus } from 'lucide-react';

export default function ToyList({ toys, onEdit, onDelete, onAddNew, onResetFilters }) {
  if (toys.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center my-8">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <PackageSearch className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Hiç oyuncak bulunamadı</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
          Arama kriterlerinize uygun oyuncak kaydı yok veya liste boşaltılmış olabilir.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onResetFilters}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
          >
            Filtreleri Temizle
          </button>
          <button
            onClick={onAddNew}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Oyuncak Ekle</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
