import React, { useState, useEffect } from 'react';
import { X, Sparkles, Image as ImageIcon, Check } from 'lucide-react';
import { TOY_CATEGORIES, AGE_GROUPS } from '../Interfaces/toy.interface';

// Filter out 'Tümü' for the form dropdown
const FORM_CATEGORIES = TOY_CATEGORIES.filter(c => c !== 'Tümü');

// Popular sample images for quick selection
const PRESET_IMAGES = [
  { label: 'Hot Wheels', url: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80' },
  { label: 'Barbie', url: 'https://images.unsplash.com/photo-1560930950-5cc20e80e392?auto=format&fit=crop&w=600&q=80' },
  { label: 'Peluş / Bebek', url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80' },
  { label: 'Dinozor / Canavar', url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80' },
  { label: 'Aksiyon Figürü', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80' },
  { label: 'Yapı Blokları', url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80' }
];

export default function ToyModal({ isOpen, onClose, onSave, initialData }) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    name: '',
    brand: 'Mattel',
    category: FORM_CATEGORIES[0] || 'Hot Wheels',
    price: '',
    stock: '',
    ageGroup: AGE_GROUPS[1] || '3-6 Yaş',
    imageUrl: PRESET_IMAGES[0].url,
    description: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        brand: initialData.brand || 'Mattel',
        category: initialData.category || FORM_CATEGORIES[0],
        price: initialData.price ?? '',
        stock: initialData.stock ?? '',
        ageGroup: initialData.ageGroup || AGE_GROUPS[1],
        imageUrl: initialData.imageUrl || PRESET_IMAGES[0].url,
        description: initialData.description || ''
      });
    } else {
      setFormData({
        name: '',
        brand: 'Mattel',
        category: FORM_CATEGORIES[0] || 'Hot Wheels',
        price: '',
        stock: '10',
        ageGroup: AGE_GROUPS[1] || '3-6 Yaş',
        imageUrl: PRESET_IMAGES[0].url,
        description: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Oyuncak adı zorunludur.';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Geçerli bir fiyat giriniz.';
    if (formData.stock === '' || Number(formData.stock) < 0) newErrors.stock = 'Geçerli bir stok adedi giriniz.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {isEditing ? 'Oyuncağı Güncelle' : 'Yeni Oyuncak Ekle'}
              </h2>
              <p className="text-xs text-slate-500">
                {isEditing ? 'Mevcut ürün bilgilerini düzenleyin' : 'Kataloğa yeni bir Mattel oyuncağı ekleyin'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Oyuncak Adı */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Oyuncak Adı *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Örn: Hot Wheels Mega Hauler Tır"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-rose-300 ring-rose-200 bg-rose-50/30'
                  : 'border-slate-200 focus:border-rose-500 focus:ring-rose-200'
              }`}
            />
            {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
          </div>

          {/* Marka & Kategori */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Marka / Üretici
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="Örn: Mattel, Hot Wheels, Barbie"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition cursor-pointer"
              >
                {FORM_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Fiyat, Stok & Yaş Grubu */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Fiyat (₺) *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="499"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                  errors.price
                    ? 'border-rose-300 ring-rose-200 bg-rose-50/30'
                    : 'border-slate-200 focus:border-rose-500 focus:ring-rose-200'
                }`}
              />
              {errors.price && <p className="text-xs text-rose-600 mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Stok Adedi *
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="10"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                  errors.stock
                    ? 'border-rose-300 ring-rose-200 bg-rose-50/30'
                    : 'border-slate-200 focus:border-rose-500 focus:ring-rose-200'
                }`}
              />
              {errors.stock && <p className="text-xs text-rose-600 mt-1">{errors.stock}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Yaş Grubu
              </label>
              <select
                value={formData.ageGroup}
                onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition cursor-pointer"
              >
                {AGE_GROUPS.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Görsel Seçimi & URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Görsel URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition mb-2"
            />

            {/* Hızlı Örnek Görsel Seçici */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                Veya hazır görsel seçin:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition cursor-pointer ${
                      formData.imageUrl === preset.url
                        ? 'border-rose-600 ring-2 ring-rose-300'
                        : 'border-transparent hover:opacity-80'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    {formData.imageUrl === preset.url && (
                      <div className="absolute inset-0 bg-rose-600/40 flex items-center justify-center text-white">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Açıklama
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Oyuncak özellikleri, kutu içeriği ve dikkat çekici detaylar..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 rounded-xl shadow-md shadow-rose-500/20 transition cursor-pointer"
            >
              {isEditing ? 'Değişiklikleri Kaydet' : 'Oyuncağı Ekle'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
