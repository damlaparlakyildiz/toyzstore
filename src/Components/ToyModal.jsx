import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { TOY_CATEGORIES, AGE_GROUPS, PRESET_IMAGES } from '../Interfaces/toy.interface';

const FORM_CATEGORIES = TOY_CATEGORIES.filter(c => c !== 'Tümü');

function ToyModalForm({ onClose, onSave, initialData }) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || '',
    brand: initialData?.brand || 'Hot Wheels',
    category: initialData?.category || FORM_CATEGORIES[0] || 'Hot Wheels',
    price: initialData?.price ?? '',
    oldPrice: initialData?.oldPrice ?? '',
    stock: initialData?.stock ?? '',
    ageGroup: initialData?.ageGroup || AGE_GROUPS[1] || '3-6 Yaş',
    imageUrl: initialData?.imageUrl || PRESET_IMAGES[0].url,
    badge: initialData?.badge || '',
    description: initialData?.description || ''
  }));

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Ürün adı gerekli.';
    if (!formData.price || Number(formData.price) <= 0) {
      errs.price = 'Geçerli fiyat girin.';
    }
    if (formData.stock === '' || Number(formData.stock) < 0) {
      errs.stock = 'Stok adedi girin.';
    }
    if (!formData.imageUrl.trim()) {
      errs.imageUrl = 'Görsel gerekli.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      rating: initialData?.rating || 5.0,
      reviewsCount: initialData?.reviewsCount || 1
    });
  };

  return (
    <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      
      {/* Modal Başlık */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-base">
          {isEditing ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-5 space-y-3.5 max-h-[80vh] overflow-y-auto">
        
        {/* Ad */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Ürün Adı *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Örn: Hot Wheels Kırmızı Yarış Arabası"
            className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border bg-white outline-none ${
              errors.name ? 'border-rose-500' : 'border-slate-200 focus:border-rose-500'
            }`}
          />
          {errors.name && <p className="text-[11px] text-rose-600 mt-0.5">{errors.name}</p>}
        </div>

        {/* Marka & Kategori */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Marka</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white outline-none focus:border-rose-500 cursor-pointer"
            >
              {FORM_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Fiyat & Stok */}
        <div className="grid grid-cols-3 gap-2.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Fiyat (TL) *</label>
            <input
              type="number"
              min="1"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="199"
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border outline-none ${
                errors.price ? 'border-rose-500' : 'border-slate-200 focus:border-rose-500'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Eski Fiyat</label>
            <input
              type="number"
              min="1"
              value={formData.oldPrice}
              onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
              placeholder="249"
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Stok *</label>
            <input
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              placeholder="10"
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border outline-none ${
                errors.stock ? 'border-rose-500' : 'border-slate-200 focus:border-rose-500'
              }`}
            />
          </div>
        </div>

        {/* Yaş Grubu & Rozet */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Yaş Grubu</label>
            <select
              value={formData.ageGroup}
              onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white outline-none cursor-pointer"
            >
              {AGE_GROUPS.map((age) => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Etiket (Rozet)</label>
            <input
              type="text"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              placeholder="Örn: %20 İndirim"
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Hazır Görsel Seçimi */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Hazır Fotoğraf Seç</label>
          <div className="grid grid-cols-6 gap-1.5">
            {PRESET_IMAGES.map((img) => {
              const isSelected = formData.imageUrl === img.url;
              return (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: img.url })}
                  className={`relative rounded-lg overflow-hidden aspect-square border-2 cursor-pointer ${
                    isSelected ? 'border-rose-600' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  {isSelected && (
                    <div className="absolute inset-0 bg-rose-600/30 flex items-center justify-center text-white">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Açıklama */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Kısa Açıklama</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Kısa bir cümle..."
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 outline-none focus:border-rose-500"
          />
        </div>

        {/* Butonlar */}
        <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition cursor-pointer"
          >
            {isEditing ? 'Kaydet' : 'Ekle'}
          </button>
        </div>

      </form>

    </div>
  );
}

export default function ToyModal({ isOpen, onClose, onSave, initialData }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <ToyModalForm
        key={initialData ? initialData.id : 'new-toy'}
        onClose={onClose}
        onSave={onSave}
        initialData={initialData}
      />
    </div>
  );
}
