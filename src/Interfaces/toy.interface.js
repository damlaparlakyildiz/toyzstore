export const TOY_CATEGORIES = [
  'Tümü',
  'Hot Wheels',
  'Barbie',
  'LEGO & Blok',
  'Peluş',
  'Figür'
];

export const AGE_GROUPS = [
  '0-3 Yaş',
  '3-6 Yaş',
  '6-9 Yaş',
  '9+ Yaş'
];

export const PRESET_IMAGES = [
  {
    label: "Hot Wheels Kırmızı",
    url: "https://images.unsplash.com/photo-1704312937293-a03886b9e104?auto=format&fit=crop&w=800&q=80"
  },
  {
    label: "Hot Wheels Siyah",
    url: "https://images.unsplash.com/photo-1717255909241-11c52b21cfbc?auto=format&fit=crop&w=800&q=80"
  },
  {
    label: "Klasik Barbie Bebek",
    url: "https://images.unsplash.com/photo-1734034898083-ee06576f0597?auto=format&fit=crop&w=800&q=80"
  },
  {
    label: "LEGO Bloklar",
    url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80"
  },
  {
    label: "Peluş Ayıcık",
    url: "https://images.unsplash.com/photo-1648311203209-da34f7d0d800?auto=format&fit=crop&w=800&q=80"
  },
  {
    label: "T-Rex Dinozor",
    url: "https://images.unsplash.com/photo-1469004243181-2a4364487fbf?auto=format&fit=crop&w=800&q=80"
  }
];

export const INITIAL_TOYS = [
  {
    id: 'toy-1',
    name: "Hot Wheels Kırmızı Yarış Arabası",
    brand: 'Hot Wheels',
    category: 'Hot Wheels',
    price: 189,
    oldPrice: 249,
    stock: 18,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Çok Satan',
    ageGroup: '3-6 Yaş',
    imageUrl: 'https://images.unsplash.com/photo-1704312937293-a03886b9e104?auto=format&fit=crop&w=800&q=80',
    description: "Metal gövdeli, hızlı ve dayanıklı 1:64 model araba.",
    createdAt: new Date().toISOString()
  },
  {
    id: 'toy-2',
    name: "Barbie Klasik Moda Bebeği",
    brand: 'Barbie',
    category: 'Barbie',
    price: 549,
    oldPrice: 729,
    stock: 9,
    rating: 4.8,
    reviewsCount: 98,
    badge: '%25 İndirim',
    ageGroup: '3-6 Yaş',
    imageUrl: 'https://images.unsplash.com/photo-1734034898083-ee06576f0597?auto=format&fit=crop&w=800&q=80',
    description: "Şık elbisesi ve ikonik aksesuarlarıyla klasik Barbie bebek.",
    createdAt: new Date().toISOString()
  },
  {
    id: 'toy-3',
    name: "Hot Wheels Mat Siyah Koleksiyon",
    brand: 'Hot Wheels',
    category: 'Hot Wheels',
    price: 269,
    oldPrice: 320,
    stock: 6,
    rating: 5.0,
    reviewsCount: 64,
    badge: 'Sınırlı Stok',
    ageGroup: '6-9 Yaş',
    imageUrl: 'https://images.unsplash.com/photo-1717255909241-11c52b21cfbc?auto=format&fit=crop&w=800&q=80',
    description: "Özel mat boya kaplamalı koleksiyon modeli.",
    createdAt: new Date().toISOString()
  },
  {
    id: 'toy-4',
    name: "Renkli Yapı Blokları (60 Parça)",
    brand: 'LEGO',
    category: 'LEGO & Blok',
    price: 459,
    oldPrice: 599,
    stock: 24,
    rating: 4.9,
    reviewsCount: 210,
    badge: 'Eğitici',
    ageGroup: '3-6 Yaş',
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
    description: "Çocukların yaratıcılığını geliştiren güvenli blok seti.",
    createdAt: new Date().toISOString()
  },
  {
    id: 'toy-5',
    name: "Yumuşak Peluş Ayıcık (45 cm)",
    brand: 'Fisher-Price',
    category: 'Peluş',
    price: 389,
    oldPrice: 479,
    stock: 12,
    rating: 4.7,
    reviewsCount: 85,
    badge: 'Popüler',
    ageGroup: '0-3 Yaş',
    imageUrl: 'https://images.unsplash.com/photo-1648311203209-da34f7d0d800?auto=format&fit=crop&w=800&q=80',
    description: "Antialerjik yumuşak kumaşlı sevimli oyun arkadaşı.",
    createdAt: new Date().toISOString()
  },
  {
    id: 'toy-6',
    name: "Jurassic T-Rex Sesli Dinozor",
    brand: 'Mattel',
    category: 'Figür',
    price: 899,
    oldPrice: 1150,
    stock: 5,
    rating: 4.9,
    reviewsCount: 119,
    badge: 'Fırsat',
    ageGroup: '6-9 Yaş',
    imageUrl: 'https://images.unsplash.com/photo-1469004243181-2a4364487fbf?auto=format&fit=crop&w=800&q=80',
    description: "Kükreme sesleri çıkaran hareketli figür.",
    createdAt: new Date().toISOString()
  }
];
