import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../Components/Navbar';
import StatCards from '../Components/StatCards';
import FilterBar from '../Components/FilterBar';
import ToyList from '../Components/ToyList';
import ToyModal from '../Components/ToyModal';
import DeleteConfirmModal from '../Components/DeleteConfirmModal';
import Toast from '../Components/Toast';
import { getStoredToys, saveStoredToys, resetStoredToys } from '../utils/storage';
import { Sparkles, Heart, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const [toys, setToys] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [sortBy, setSortBy] = useState('newest');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingToy, setEditingToy] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingToy, setDeletingToy] = useState(null);

  // Notification Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Load from LocalStorage on mount
  useEffect(() => {
    const data = getStoredToys();
    setToys(data);
  }, []);

  // Sync to LocalStorage when toys change
  const updateToysState = (newToys) => {
    setToys(newToys);
    saveStoredToys(newToys);
  };

  // --- CRUD: CREATE (Ekle) ---
  const handleAddNewClick = () => {
    setEditingToy(null);
    setIsModalOpen(true);
  };

  // --- CRUD: UPDATE (Güncelle) ---
  const handleEditClick = (toy) => {
    setEditingToy(toy);
    setIsModalOpen(true);
  };

  const handleSaveToy = (toyFormData) => {
    if (editingToy) {
      // UPDATE
      const updatedList = toys.map((t) =>
        t.id === editingToy.id
          ? { ...t, ...toyFormData, updatedAt: new Date().toISOString() }
          : t
      );
      updateToysState(updatedList);
      showToast(`"${toyFormData.name}" başarıyla güncellendi!`, 'success');
    } else {
      // CREATE
      const newToy = {
        ...toyFormData,
        id: `toy-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      const updatedList = [newToy, ...toys];
      updateToysState(updatedList);
      showToast(`"${toyFormData.name}" kataloğa eklendi!`, 'success');
    }
    setIsModalOpen(false);
    setEditingToy(null);
  };

  // --- CRUD: DELETE (Sil) ---
  const handleDeleteClick = (toy) => {
    setDeletingToy(toy);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (id) => {
    const target = toys.find(t => t.id === id);
    const updatedList = toys.filter((t) => t.id !== id);
    updateToysState(updatedList);
    setIsDeleteModalOpen(false);
    setDeletingToy(null);
    showToast(`"${target?.name || 'Oyuncak'}" silindi.`, 'info');
  };

  // --- RESET TO DEMO DATA ---
  const handleResetData = () => {
    if (window.confirm('Katalog varsayılan demo oyuncaklara sıfırlansın mı?')) {
      const initial = resetStoredToys();
      setToys(initial);
      setSearchQuery('');
      setSelectedCategory('Tümü');
      showToast('Katalog başlangıç verilerine sıfırlandı.', 'info');
    }
  };

  // --- CRUD: READ / LIST (Filtreleme & Sıralama) ---
  const filteredAndSortedToys = useMemo(() => {
    let result = [...toys];

    // Search filter
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

    // Category filter
    if (selectedCategory !== 'Tümü') {
      result = result.filter((t) => t.category === selectedCategory);
    }

    // Sorting
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
    <div className="min-h-screen flex flex-col bg-slate-50/70">
      
      {/* 1. Navbar */}
      <Navbar
        onAddNew={handleAddNewClick}
        onReset={handleResetData}
        totalCount={toys.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white p-6 sm:p-10 mb-8 shadow-lg shadow-rose-500/15 overflow-hidden">
          <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Modern Web Geliştirme Projesi</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Mattel ToyVault & Oyuncak Kataloğu
            </h1>
            
            <p className="mt-2 text-sm sm:text-base text-rose-50/90 leading-relaxed">
              ReactJS, Tailwind CSS ve LocalStorage kullanılarak geliştirilmiş oyuncak yönetim uygulaması.
              Hot Wheels, Barbie, Fisher-Price ve çok daha fazlasını ekleyin, güncelleyin veya yönetin.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium">
              <span className="bg-white/20 px-2.5 py-1 rounded-lg backdrop-blur-xs">✓ Ekleme (Create)</span>
              <span className="bg-white/20 px-2.5 py-1 rounded-lg backdrop-blur-xs">✓ Listeleme (Read)</span>
              <span className="bg-white/20 px-2.5 py-1 rounded-lg backdrop-blur-xs">✓ Güncelleme (Update)</span>
              <span className="bg-white/20 px-2.5 py-1 rounded-lg backdrop-blur-xs">✓ Silme (Delete)</span>
              <span className="bg-white/20 px-2.5 py-1 rounded-lg backdrop-blur-xs">✓ LocalStorage Kalıcı Bellek</span>
            </div>
          </div>
        </div>

        {/* 2. Stat Cards */}
        <StatCards toys={toys} />

        {/* 3. Search & Category Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          toys={toys}
        />

        {/* 4. Toy Grid List (CRUD: Read, Update, Delete Triggers) */}
        <ToyList
          toys={filteredAndSortedToys}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onAddNew={handleAddNewClick}
          onResetFilters={() => {
            setSearchQuery('');
            setSelectedCategory('Tümü');
          }}
        />

      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p className="font-semibold text-slate-700">
              Web Geliştirme Javascript Proje Ödevi • Mattel ToyVault
            </p>
            <p className="mt-0.5">
              React + Tailwind CSS + LocalStorage ile modern mimaride geliştirildi.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-slate-600">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              Özenle Hazırlandı
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ToyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingToy(null);
        }}
        onSave={handleSaveToy}
        initialData={editingToy}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingToy(null);
        }}
        onConfirm={handleConfirmDelete}
        toy={deletingToy}
      />

      {/* Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
