import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) {
  const [orderCompleted, setOrderCompleted] = React.useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );
  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 39;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setOrderCompleted(true);
    setTimeout(() => {
      onClearCart();
      setOrderCompleted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-sm bg-white h-full shadow-xl flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Başlık */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-600" />
            <h2 className="font-bold text-slate-900 text-sm">Sepetim ({cartItems.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sipariş Başarılı */}
        {orderCompleted ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Siparişiniz Alındı!
            </h3>
            <p className="text-xs text-slate-500">
              Teşekkürler, siparişiniz kargoya hazırlanıyor.
            </p>
          </div>
        ) : cartItems.length === 0 ? (
          /* Boş Sepet */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <ShoppingBag className="w-12 h-12 text-slate-300 stroke-1 mb-2" />
            <h3 className="font-bold text-slate-800 text-sm">Sepetiniz Boş</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Henüz ürün eklemediniz.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-rose-600 transition cursor-pointer"
            >
              Alışverişe Devam Et
            </button>
          </div>
        ) : (
          /* Dolu Sepet */
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
              {cartItems.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs font-semibold text-rose-600 mt-0.5">
                      {Number(item.price).toLocaleString('tr-TR')} ₺
                    </p>
                    
                    {/* Adet Kontrolü */}
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center border border-slate-200 rounded overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="px-1.5 py-0.5 hover:bg-slate-100 text-slate-600 text-xs"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-slate-800">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="px-1.5 py-0.5 hover:bg-slate-100 text-slate-600 text-xs"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Sil"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Alt Toplam & Sipariş Butonu */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2.5">
              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Ara Toplam</span>
                  <span className="font-semibold text-slate-800">{subtotal.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between">
                  <span>Kargo</span>
                  <span className="font-semibold text-slate-800">
                    {shipping === 0 ? <span className="text-emerald-600 font-bold">Ücretsiz</span> : `${shipping} ₺`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-200">
                  <span>Toplam</span>
                  <span className="text-rose-600">{total.toLocaleString('tr-TR')} ₺</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>Siparişi Tamamla</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
