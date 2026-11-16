# 🧸 ToyVault - Mattel Oyuncak Kataloğu & Yönetim Paneli

Bu proje, **Web Geliştirme; Javascript Proje Yönergesi** kapsamında modern JavaScript kütüphanesi (ReactJS) ve Tailwind CSS kullanılarak geliştirilmiş tam kapsamlı bir CRUD (Ekle, Listele, Güncelle, Sil) ve LocalStorage tabanlı web uygulamasıdır.

🔗 **Canlı Demo (Netlify):** [https://toyvault-demo.netlify.app](https://toyvault-demo.netlify.app) *(Kendi Netlify linkinizi buraya ekleyebilirsiniz)*  
📁 **GitHub Deposu:** [https://github.com/kullanici-adiniz/toy-store-app](https://github.com/kullanici-adiniz/toy-store-app)

---

## 📸 Proje Ekran Görüntüleri

![ToyVault Dashboard](./screenshots/dashboard.png)

> **Not:** Uygulamayı çalıştırdıktan sonra tarayıcınızdan aldığınız ekran görüntüsünü `screenshots/dashboard.png` olarak bu klasöre kaydedebilirsiniz.

---

## 🚀 Proje Özellikleri ve Yönerge Uyumluluğu

| Yönerge Maddesi | Durum | Projedeki Karşılığı |
| :--- | :---: | :--- |
| **Modern JS Kütüphanesi** | ✅ | **React 19 & Vite** mimarisi kullanıldı. |
| **Kalıcı Veri (LocalStorage)** | ✅ | Oyuncaklar tarayıcının `LocalStorage` belleğinde saklanır, sayfa yenilense de veriler kaybolmaz. İlk açılışta zengin örnek verilerle başlar. |
| **Dosya Ağaç Yapısı** | ✅ | `Components/`, `Pages/`, `Interfaces/` klasörleri açıldı ve modüler yapı kuruldu. |
| **Stil Kütüphanesi** | ✅ | **Tailwind CSS v4** ile responsive, modern ve mobil uyumlu bir arayüz geliştirildi. |
| **Ekle (Create) İşlemi** | ✅ | "Yeni Oyuncak Ekle" butonu ile açılan modal formu üzerinden doğrulamalı (validation) ürün ekleme. |
| **Listele (Read) İşlemi** | ✅ | Oyuncakların kartlar halinde dinamik listelenmesi, anlık arama (search), kategori filtreleme ve sıralama (fiyat, isim, stok). |
| **Güncelle (Update) İşlemi** | ✅ | Her oyuncak kartındaki "Düzenle" butonu ile mevcut verilerin modalda açılarak güncellenmesi. |
| **Sil (Delete) İşlemi** | ✅ | Her oyuncak kartındaki "Sil" butonu ile onay modalı (Confirmation Dialog) eşliğinde güvenli silme. |
| **Netlify Uyumluluğu** | ✅ | `netlify.toml` ve `public/_redirects` dosyaları yapılandırıldı, tek komutla veya GitHub üzerinden canlıya alınabilir. |

---

## 📂 Proje Dizin Yapısı

```text
toy-store-app/
├── public/
│   └── _redirects              # Netlify yönlendirme kuralı (SPA uyumluluğu)
├── screenshots/
│   └── dashboard.png           # Proje ekran görüntüsü
├── src/
│   ├── Components/             # Yeniden kullanılabilir arayüz bileşenleri
│   │   ├── DeleteConfirmModal.jsx # Silme onay modalı
│   │   ├── FilterBar.jsx       # Arama, kategori hapları ve sıralama barı
│   │   ├── Navbar.jsx          # Üst navigasyon ve logo
│   │   ├── StatCards.jsx       # İstatistik kartları (Stok, Çeşit, Değer vb.)
│   │   ├── Toast.jsx           # Bildirim mesajları (Eklendi, Güncellendi vb.)
│   │   ├── ToyCard.jsx         # Tekil oyuncak kartı (Düzenle & Sil butonlu)
│   │   ├── ToyList.jsx         # Kart ızgarası ve boş durum (empty state)
│   │   └── ToyModal.jsx        # Ekleme & Düzenleme form modalı
│   ├── Interfaces/             # Veri modelleri ve tip tanımlamaları
│   │   └── toy.interface.js    # Oyuncak veri yapısı, kategoriler ve başlangıç verileri
│   ├── Pages/                  # Sayfa bileşenleri
│   │   └── HomePage.jsx        # Ana sayfa (Tüm durumların ve CRUD fonksiyonlarının yönetildiği sayfa)
│   ├── utils/                  # Yardımcı araçlar
│   │   └── storage.js          # LocalStorage okuma/yazma/sıfırlama işlemleri
│   ├── App.jsx                 # Kök React bileşeni
│   ├── index.css               # Tailwind CSS tanımları
│   └── main.jsx                # React giriş noktası
├── index.html                  # HTML şablonu
├── netlify.toml                # Netlify dağıtım ayarları
├── package.json                # Bağımlılıklar ve npm betikleri
└── vite.config.js              # Vite & Tailwind yapılandırması
```

---

## 🛠️ Yerel Geliştirme (Local Kurulum)

Projeyi bilgisayarınızda çalıştırmak için:

1. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

2. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```
   Tarayıcınızda `http://localhost:5173` adresini açarak uygulamayı test edebilirsiniz.

3. **Üretim (Production) Derlemesi:**
   ```bash
   npm run build
   ```
   Derleme çıktıları `dist/` klasörüne oluşturulur.

---

## 🌐 Netlify Üzerinde Yayına Alma (Deploy)

1. Projenizi GitHub'a yükleyin.
2. [Netlify](https://www.netlify.com/)'a giriş yapın ve **"Add new site" > "Import an existing project"** seçeneğini seçin.
3. GitHub deponuzu seçin.
4. Derleme ayarlarını kontrol edin:
   * **Build command:** `npm run build`
   * **Publish directory:** `dist`
5. **"Deploy site"** butonuna basarak saniyeler içinde yayına alın!
