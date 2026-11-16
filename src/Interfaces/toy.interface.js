/**
 * @typedef {Object} Toy
 * @property {string} id - Benzersiz oyuncak kimliği
 * @property {string} name - Oyuncak adı
 * @property {string} brand - Marka (Hot Wheels, Barbie, Fisher-Price vb.)
 * @property {string} category - Kategori
 * @property {number} price - Fiyat (TL)
 * @property {number} stock - Stok adedi
 * @property {string} ageGroup - Uygun yaş grubu
 * @property {string} imageUrl - Oyuncak görsel URL'i
 * @property {string} description - Kısa açıklama
 * @property {string} createdAt - Eklenme tarihi
 */

export const TOY_CATEGORIES = [
  'Tümü',
  'Hot Wheels',
  'Barbie',
  'Fisher-Price',
  'Aksiyon & Figür',
  'Koleksiyon & Hobi',
  'Yapı & Blok',
];

export const AGE_GROUPS = [
  '0-3 Yaş',
  '3-6 Yaş',
  '6-12 Yaş',
  '12+ Yaş'
];

export const INITIAL_TOYS = [
  {
    id: 'toy-1',
    name: "Hot Wheels '68 Corvette Gas Monkey",
    brand: 'Hot Wheels',
    category: 'Hot Wheels',
    price: 249,
    stock: 14,
    ageGroup: '3-6 Yaş',
    imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80',
    description: "Özel metal gövde ve aerodinamik detaylarıyla efsanevi Gas Monkey Corvette modeli.",
    createdAt: new Date().toISOString()
  },
  {
    id: 'toy-2',
    name: "Barbie Color Reveal Sürpriz Seri Bebek",
    brand: 'Barbie',
    category: 'Barbie',
    price: 699,
    stock: 8,
    ageGroup: '3-6 Yaş',
    imageUrl: 'https://images.unsplash.com/photo-1560930950-5cc20e80e392?auto=format&fit=crop&w=600&q=80',
    description: "Su ile açığa çıkan sihirli renk değişimi ve sürpriz aksesuar paketleri.",
    createdAt: new Date().toISOString()
  },
  {
    id: 'toy-3',
    name: "Fisher-Price Eğitici Neşeli Köpekçik",
    brand: 'Fisher-Price',
    category: 'Fisher-Price',
    price: 849,
    stock: 6,
    ageGroup: '0-3 Yaş',
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
    description: "Akıllı Aşamalar teknolojisiyle 75'ten fazla şarkı, ses ve ifade sunan yumuşak peluş.",
    createdAt: new Date().toISOString()
  },
  {
    id: 'toy-4',
    name: "Jurassic World Roar Strikers T-Rex",
    brand: 'Mattel',
    category: 'Aksiyon & Figür',
    price: 1199,
    stock: 5,
    ageGroup: '6-12 Yaş',
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    description: "Gerçekçi kükreme sesleri, hareketli çene ve Dino Tracker artırılmış gerçeklik kodu.",
    createdAt: new Date().toISOString()
  },
  {
    id: 'toy-5',
    name: "Masters of the Universe He-Man Figürü",
    brand: 'Mattel',
    category: 'Koleksiyon & Hobi',
    price: 549,
    stock: 12,
    ageGroup: '6-12 Yaş',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    description: "Efsanevi Güç Kılıcı ve hareketli eklem yapısına sahip 14 cm retro koleksiyon figürü.",
    createdAt: new Date().toISOString()
  },
  {
    id: 'toy-6',
    name: "Mega Bloks İlk Bloklarım 60 Parça Çantalı",
    brand: 'Mega Bloks',
    category: 'Yapı & Blok',
    price: 489,
    stock: 20,
    ageGroup: '0-3 Yaş',
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80',
    description: "Minik eller için özel tasarlanmış, motor becerilerini geliştiren renkli yapı blokları.",
    createdAt: new Date().toISOString()
  }
];
