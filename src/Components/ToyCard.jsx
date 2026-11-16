import React, { useState } from 'react';
import { Pencil, Trash2, ShoppingCart, Star, Check } from 'lucide-react';

export default function ToyCard({ toy, onEdit, onDelete, onAddToCart, isAdmin }) {
  const [imgError, setImgError] = useState(false);
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  const fallbackImage = 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80';
  const isOutOfStock = Number(toy.stock) === 0;

  const handleAddToCartClick = () => {
    if (isOutOfStock) return;
    onAddToCart(toy);
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 1200);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition flex flex-col overflow-hidden relative">
      
      {/* Görsel */}
      <div className="relative aspect-4/3 w-full bg-slate-50 overflow-hidden">
        <img
          src={imgError ? fallbackImage : (toy.imageUrl || fallbackImage)}
          alt={toy.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Üst Rozet */}
        <div className="absolute top-2.5 left-2.5 flex gap-1">
          {toy.badge && (
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              {toy.badge}
            </span>
          )}
          <span className="bg-white/90 text-slate-800 text-[10px] font-medium px-1.5 py-0.5 rounded">
            {toy.brand}
          </span>
        </div>

        {/* Yönetici Butonları */}
        {isAdmin && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-white/95 p-1 rounded-lg shadow-sm border border-slate-200">
            <button
              onClick={() => onEdit(toy)}
              title="Düzenle"
              className="p-1 text-slate-600 hover:text-amber-600 rounded cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(toy)}
              title="Sil"
              className="p-1 text-slate-600 hover:text-rose-600 rounded cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* İçerik */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] text-slate-400 font-medium">
              {toy.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 text-xs">
              <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              <span className="font-bold">{toy.rating || 4.9}</span>
            </div>
          </div>

          <h3 className="font-bold text-slate-900 text-sm line-clamp-1">
            {toy.name}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {toy.description}
          </p>
        </div>

        {/* Fiyat ve Sepete Ekle */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-slate-900">
                {Number(toy.price).toLocaleString('tr-TR')} ₺
              </span>
              {toy.oldPrice && (
                <span className="text-[11px] text-slate-400 line-through">
                  {Number(toy.oldPrice).toLocaleString('tr-TR')} ₺
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCartClick}
            disabled={isOutOfStock}
            className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : isAddedAnim
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-rose-600 text-white'
            }`}
          >
            {isOutOfStock ? (
              <span>Tükendi</span>
            ) : isAddedAnim ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Eklendi</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Ekle</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
