 # NePişirsem 🍲

> BGP 201 Mobil Programlama Dersi Dönem Projesi

---

## 👥 Proje ve Öğrenci Bilgileri
- **Ders Adı:** BGP 201 Mobil Programlama
- **Proje Adı:** NePişirsem
- **Grup Üyeleri ve Görev Dağılımı (Yönerge Bölüm 3.7):**
  - **1. Geliştirici (SİZ):** Frontend & UI/UX Geliştiricisi - *Öğrenci No: 250408066*
    - **Sorumluluk Alanı:** Mobil Arayüz & Kullanıcı Deneyimi (UI/UX)
    - **Ekran Tasarımları:** Login, Register, Home, Kiler (Pantry), Akıllı Arama (RecipeSearch), Tarif Detay (RecipeDetail), Alışveriş Listesi (ShoppingList), Profil & Ayarlar (Profile).
    - **Bileşen & UX:** Navigasyon (Stack & Tab), Form Giriş Kontrolleri (Regex Validasyon), FlatList Performansı, Açık/Koyu Tema (Dark Mode) ve Ön Yüz REST API Veri Bağlantıları.
  - **2. Geliştirici:** Backend, Veri & Mimari Geliştiricisi - *Öğrenci No: 250408067*
    - **Sorumluluk Alanı:** Arka Yüz Servisleri, Veritabanı Mimarisi & Eşleşme Algoritmaları
    - **Veri & API:** İlişkisel Veritabanı (PostgreSQL / Firestore), JWT Kimlik Doğrulama & Yetkilendirme Servisleri, DTO/Entity Veri Modelleri ve API Uç Noktaları.
    - **İş Mantığı:** Kilerdeki malzemelere göre tarif uygunluk yüzdesi hesaplayan eşleşme sorguları ve çevrimdışı önbellekleme (Caching/Sync).
- **Kategori:** Yemek ve Tarif (Malzemeye Göre Tarif Bulma)

---

## 🎯 Uygulamanın Amacı
Kullanıcıların evlerindeki kiler ve buzdolabı malzemelerini kaydederek yapabilecekleri en uygun yemek tariflerini eşleşme yüzdesiyle bulmalarını sağlayan, gıda israfını önleyen ve eksik malzemelerden otomatik alışveriş listesi oluşturan akıllı mobil uygulama.

---

## 🚀 Özellik Listesi (MVP)
- **Malzeme Bazlı Akıllı Tarif Eşleştirme:** Kilerdeki malzemelere göre tariflerin %100, %75 vb. eşleşme oranlarıyla listelenmesi.
- **Kiler / Buzdolabı Yönetimi:** Evdeki malzemelerin dinamik olarak eklenmesi, miktar kontrolü ve silinmesi.
- **Detaylı Tarif Sayfası:** Hazırlama süresi, porsiyon, zorluk derecesi, adım adım tarif akışı ve görsel gösterimi.
- **Eksik Malzeme & Otomatik Alışveriş Listesi:** Tarif detayında evde olmayan eksik malzemelerin tek tıkla alışveriş listesine aktarılması ve kontrolü.
- **Dinamik Filtreleme & Arama:** Kategori, zorluk derecesi ve metin bazlı anlık arama.
- **Kullanıcı Giriş & Kayıt Formu:** E-posta/şifre doğrulaması ve regex hata kontrolleri.
- **Ek Özellik (Grup Şartı):** **Karanlık Tema (Dark Mode)** ve aydınlık tema arasında anlık geçiş desteği.

---

## 🛠️ Kullanılan Kütüphaneler ve API'ler
- **Temel Platform:** React Native (CLI) + TypeScript
- **Navigasyon:** `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`
- **Ekran & Güvenli Alan:** `react-native-screens`, `react-native-safe-area-context`
- **Harici REST API:** TheMealDB API (Yönergede 10. hafta için önerilen resmi API)
- **Arka Uç:** Firebase (Authentication + Firestore)

---

## 📱 Ekranlar (En Az 7 Ekran Şartı)
1. `LoginScreen` - Kullanıcı giriş ekranı ve doğrulama
2. `RegisterScreen` - Kullanıcı kayıt formu
3. `HomeScreen` - Öne çıkan tarifler, kategoriler ve arama
4. `PantryScreen` - Kiler & buzdolabı malzeme yönetimi
5. `RecipeSearchScreen` - Malzeme eşleşme oranlı filtreleme
6. `RecipeDetailScreen` - Detaylı tarif, adımlar ve tek tıkla alışverişe ekleme
7. `ShoppingListScreen` - Dinamik alışveriş listesi ve tamamlama
8. `ProfileScreen` - Profil, tema seçimi (Dark Mode) ve oturum kapatma

---

## 💻 Kurulum ve Çalıştırma Adımları

### 1. Bağımlılıkları Yükleme
```bash
npm install
```

### 2. TypeScript Derleme Kontrolü
```bash
npx tsc --noEmit
```

### 3. Uygulamayı Başlatma
```bash
# Metro sunucusunu başlatmak için:
npx react-native start

# Android cihazda/emülatörde çalıştırmak için:
npx react-native run-android
```

---

## 📸 Ekran Görüntüleri
*(En az 5 ekran görüntüsü `docs/` klasörüne eklenecektir)*
- `docs/screenshots/01_login.png`
- `docs/screenshots/02_home.png`
- `docs/screenshots/03_pantry.png`
- `docs/screenshots/04_recipe_detail.png`
- `docs/screenshots/05_shopping_list.png`

---

## 🎥 Demo Videosu
- Video bağlantısı: `docs/demo-video.mp4` (veya YouTube linki)

---

## 🤖 Yapay Zekâ Kullanım Beyanı
Bu projede arayüz bileşenlerinin iskelet tasarımı, tema şablonu ve navigasyon mimarisinin yapılandırılmasında yapay zekâ araçlarından (Google DeepMind Antigravity) kod mimarisi ve şablon oluşturma yardımcısı olarak faydalanılmıştır. Tüm iş mantığı, ekran akışları ve kod yapısı tarafımızca incelenmiş, test edilmiş ve proje yönergesine uygun hale getirilmiştir.
