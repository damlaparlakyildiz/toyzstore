import React, { useState } from 'react';
import { Pencil, Trash2, Tag, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ToyCard({ toy, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false);

  const fallbackImage = 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80';

  const isLowStock = Number(toy.stock) <= 5 && Number(toy.stock) > 0;
  const isOutOfStock = Number(toy.stock) === 0;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={imgError ? fallbackImage : (toy.imageUrl || fallbackImage)}
          alt={toy.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="bg-white/95 backdrop-blur-xs text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg shadow-xs pointer-events-auto">
            {toy.brand || 'Mattel'}
          </span>

          <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-lg pointer-events-auto">
            {toy.ageGroup || '3+ Yaş'}
          </span>
        </div>

        {/* Category Pill on Image Bottom */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="bg-rose-600/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md shadow-xs pointer-events-auto">
            {toy.category}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug line-clamp-1 group-hover:text-rose-600 transition-colors">
            {toy.name}
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {toy.description || 'Bu oyuncak için henüz açıklama girilmemiş.'}
          </p>
        </div>

        {/* Price & Stock Status */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Fiyat
              </span>
              <span className="text-lg sm:text-xl font-black text-slate-900">
                {Number(toy.price).toLocaleString('tr-TR')} ₺
              </span>
            </div>

            {/* Stock indicator */}
            <div className="text-right">
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded-md">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Tükendi
                </span>
              ) : isLowStock ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-md">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Son {toy.stock} adet!
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Stok: {toy.stock}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons: Update & Delete */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => onEdit(toy)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-xl transition cursor-pointer active:scale-95"
            >
              <Pencil className="w-3.5 h-3.5 text-slate-500" />
              <span>Düzenle</span>
            </button>

            <button
              onClick={() => onDelete(toy)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs sm:text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 rounded-xl transition cursor-pointer active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Sil</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
