import React, { useState, useMemo } from 'react';
import Navbar from '../Components/Navbar';
import FilterBar from '../Components/FilterBar';
import ToyList from '../Components/ToyList';
import ToyModal from '../Components/ToyModal';
import DeleteConfirmModal from '../Components/DeleteConfirmModal';
import CartDrawer from '../Components/CartDrawer';
import Toast from '../Components/Toast';
import {
  getStoredToys,
  saveStoredToys,
  resetStoredToys,
  getStoredCart,
  saveStoredCart
} from '../utils/storage';
import { Truck, ShieldCheck, RotateCcw, ArrowRight, Plus } from 'lucide-react';

export default function HomePage() {
  // Catalog State
  const [toys, setToys] = useState(() => getStoredToys());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [sortBy, setSortBy] = useState('newest');

  // Admin / Seller Mode (Varsayılan olarak KAPALI)
  const [isAdmin, setIsAdmin] = useState(false);

  // Cart State
  const [cart, setCart] = useState(() => getStoredCart());
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingToy, setEditingToy] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingToy, setDeletingToy] = useState(null);

  // Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Sync Toys
  const updateToysState = (newToys) => {
    setToys(newToys);
    saveStoredToys(newToys);
  };

  // Sync Cart
  const updateCartState = (newCart) => {
    setCart(newCart);
    saveStoredCart(newCart);
  };

  // --- CART ACTIONS ---
  const handleAddToCart = (toy) => {
    const existingIndex = cart.findIndex((item) => item.id === toy.id);
    let updated;
    if (existingIndex > -1) {
      updated = cart.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    } else {
      updated = [...cart, { ...toy, quantity: 1 }];
    }
    updateCartState(updated);
    showToast(`"${toy.name}" sepete eklendi!`, 'success');
  };

  const handleUpdateCartQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCartState(updated);
  };

  const handleRemoveFromCart = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCartState(updated);
    showToast('Ürün sepetten çıkarıldı.', 'info');
  };

  const handleClearCart = () => {
    updateCartState([]);
  };

  const totalCartItemsCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // --- CRUD: CREATE ---
  const handleAddNewClick = () => {
    setEditingToy(null);
    setIsModalOpen(true);
  };

  // --- CRUD: UPDATE ---
  const handleEditClick = (toy) => {
    setEditingToy(toy);
    setIsModalOpen(true);
  };

  const handleSaveToy = (toyFormData) => {
    if (editingToy) {
      const updatedList = toys.map((t) =>
        t.id === editingToy.id
          ? { ...t, ...toyFormData, updatedAt: new Date().toISOString() }
          : t
      );
      updateToysState(updatedList);
      showToast(`"${toyFormData.name}" güncellendi!`, 'success');
    } else {
      const newToy = {
        ...toyFormData,
        id: `toy-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      const updatedList = [newToy, ...toys];
      updateToysState(updatedList);
      showToast(`"${toyFormData.name}" eklendi!`, 'success');
    }
    setIsModalOpen(false);
    setEditingToy(null);
  };

  // --- CRUD: DELETE ---
  const handleDeleteClick = (toy) => {
    setDeletingToy(toy);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (id) => {
    const target = toys.find((t) => t.id === id);
    const updatedList = toys.filter((t) => t.id !== id);
    updateToysState(updatedList);
    updateCartState(cart.filter((c) => c.id !== id));
    setIsDeleteModalOpen(false);
    setDeletingToy(null);
    showToast(`"${target?.name || 'Ürün'}" silindi.`, 'info');
  };

  // --- RESET DATA ---
  const handleResetData = () => {
    if (window.confirm('Katalog varsayılan ürünlerle sıfırlansın mı?')) {
      const initial = resetStoredToys();
      setToys(initial);
      setSearchQuery('');
      setSelectedCategory('Tümü');
      showToast('Katalog sıfırlandı.', 'info');
    }
  };

  // --- FILTER & SORT ---
  const filteredAndSortedToys = useMemo(() => {
    let result = [...toys];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.brand?.toLowerCase().includes(q) ||
          t.category?.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'Tümü') {
      result = result.filter((t) => t.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
        break;
      case 'stock-desc':
        result.sort((a, b) => Number(b.stock) - Number(a.stock));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
    }

    return result;
  }, [toys, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Navbar */}
      <Navbar
        cartCount={totalCartItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        onAddNew={handleAddNewClick}
        onReset={handleResetData}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />

      {/* Yönetici Modu Bandı */}
      {isAdmin && (
        <div className="bg-amber-300 text-slate-900 px-4 py-1.5 text-xs font-semibold flex items-center justify-between max-w-7xl mx-auto w-full border-b border-amber-400">
          <span>⚙️ Yönetici Modu: Ürün ekleyebilir, düzenleyebilir veya silebilirsiniz.</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddNewClick}
              className="bg-slate-900 text-white px-2.5 py-0.5 rounded text-xs font-bold hover:bg-slate-800 cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>Yeni Ürün Ekle</span>
            </button>
            <button
              onClick={() => setIsAdmin(false)}
              className="text-slate-900 underline text-xs cursor-pointer ml-1"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* Main İçerik */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        
        {/* Sade Hero Banner */}
        <section className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-8 mb-6 shadow-sm">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Bahar Fırsatları
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-1 text-white">
              En Sevilen Oyuncaklar
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300">
              Hot Wheels, Barbie ve LEGO modellerinde indirimli fiyatlar.
            </p>
            <div className="mt-4">
              <a
                href="#catalog"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
              >
                <span>Ürünleri İncele</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Sade Güven Rozetleri */}
        <div className="flex flex-wrap items-center justify-around gap-3 bg-white p-3 rounded-xl border border-slate-200/80 mb-6 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-medium">
            <Truck className="w-4 h-4 text-rose-600" />
            <span>Hızlı & Güvenli Teslimat</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>%100 Orijinal Ürün</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <RotateCcw className="w-4 h-4 text-indigo-600" />
            <span>14 Gün Kolay İade</span>
          </div>
        </div>

        {/* Filtre ve Arama */}
        <div id="catalog">
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            toys={toys}
          />
        </div>

        {/* Ürün Listesi */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-900">
              {selectedCategory === 'Tümü' ? 'Tüm Oyuncaklar' : selectedCategory}
            </h2>
            <span className="text-xs text-slate-400">
              {filteredAndSortedToys.length} ürün
            </span>
          </div>

          <ToyList
            toys={filteredAndSortedToys}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onAddToCart={handleAddToCart}
            isAdmin={isAdmin}
            onAddNew={handleAddNewClick}
          />
        </div>

      </main>

      {/* Sepet Çekmecesi */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Modal Formu (Ekle & Düzenle) */}
      <ToyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingToy(null);
        }}
        onSave={handleSaveToy}
        initialData={editingToy}
      />

      {/* Silme Onay Modalı */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingToy(null);
        }}
        onConfirm={handleConfirmDelete}
        toy={deletingToy}
      />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Sade Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">ToyzStore</span>
            <span>— Oyuncak Satış Mağazası</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className="text-slate-500 hover:text-slate-900 underline cursor-pointer text-xs"
            >
              {isAdmin ? 'Yönetici Modunu Kapat' : 'Yetkili Girişi'}
            </button>
            <span>© 2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
