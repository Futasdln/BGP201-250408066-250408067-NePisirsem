// Yönerge 3.2 & 12. Hafta gereksinimi: Firebase Konfigürasyonu
// Firebase JS SDK bağlantı şablonu (Backend sorumlusu arkadaşınız gerçek anahtarları bağlayacaktır)

export interface FirebaseAuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

// Mock auth ve db objeleri (Firebase kütüphanesi yapılandırılana kadar TypeScript derlemesini korur)
export const auth = {
  currentUser: null as FirebaseAuthUser | null,
};

export const db = {};
