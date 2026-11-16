import React from 'react';
import { Package, Layers, CircleDollarSign, Boxes } from 'lucide-react';

export default function StatCards({ toys }) {
  const totalItems = toys.length;
  const totalStock = toys.reduce((sum, item) => sum + (Number(item.stock) || 0), 0);
  const totalValue = toys.reduce(
    (sum, item) => sum + ((Number(item.price) || 0) * (Number(item.stock) || 0)),
    0
  );
  const categoriesCount = new Set(toys.map(t => t.category)).size;

  const stats = [
    {
      title: 'Toplam Çeşit',
      value: totalItems,
      subtitle: 'Kayıtlı Oyuncak Modeli',
      icon: Package,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Toplam Stok',
      value: totalStock,
      subtitle: 'Adet Ürün Depoda',
      icon: Boxes,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Aktif Kategoriler',
      value: categoriesCount,
      subtitle: 'Farklı Ürün Grubu',
      icon: Layers,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'Toplam Envanter Değeri',
      value: `${totalValue.toLocaleString('tr-TR')} ₺`,
      subtitle: 'Stoktaki Toplam Tutar',
      icon: CircleDollarSign,
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50 text-rose-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {stat.title}
              </span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
                <IconComponent className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {stat.value}
              </div>
              <p className="text-xs text-slate-400 mt-1 truncate">
                {stat.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
