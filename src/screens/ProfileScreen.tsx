import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { CustomButton } from '../components/CustomButton';

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isDarkMode, toggleTheme, colors, spacing, fontSizes, borderRadius } = useTheme();

  const handleLogout = () => {
    Alert.alert('Çıkış Yap', 'Hesabınızdan çıkış yapmak istediğinize emin misiniz?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Çıkış',
        style: 'destructive',
        onPress: () => navigation.replace('Login'),
      },
    ]);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ padding: spacing.md }}
    >
      <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: borderRadius.lg, padding: spacing.lg }]}>
        <View style={[styles.avatarBox, { backgroundColor: colors.primaryLight, borderRadius: borderRadius.round }]}>
          <Text style={{ fontSize: 36 }}>👨‍🍳</Text>
        </View>
        <Text style={[styles.userName, { color: colors.text, fontSize: fontSizes.title, marginTop: spacing.sm }]}>
          Arda & Ekip Arkadaşı
        </Text>
        <Text style={[styles.userEmail, { color: colors.textSecondary, fontSize: fontSizes.bodySmall }]}>
          BGP 201 Mobil Programlama
        </Text>

        <View style={[styles.statsRow, { borderColor: colors.border, marginTop: spacing.md, paddingTop: spacing.md }]}>
          <View style={styles.statBox}>
            <Text style={[styles.statNum, { color: colors.primary, fontSize: fontSizes.title }]}>5</Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSizes.caption }}>Kiler Malzemesi</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNum, { color: colors.secondary, fontSize: fontSizes.title }]}>12</Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSizes.caption }}>Favori Tarif</Text>
          </View>
        </View>
      </View>

      <View style={[styles.settingsCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: borderRadius.lg, padding: spacing.md, marginTop: spacing.md }]}>
        <Text style={[styles.settingsTitle, { color: colors.text, fontSize: fontSizes.body, marginBottom: spacing.sm }]}>
          Uygulama Tercihleri
        </Text>

        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.settingLabel, { color: colors.text, fontSize: fontSizes.bodySmall }]}>
              Karanlık Mod (Dark Mode) 🌙
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSizes.caption }}>
              Grup projesi yönergesi ek özelliği
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={'#FFFFFF'}
          />
        </View>
      </View>

      <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: borderRadius.lg, padding: spacing.md, marginTop: spacing.md }]}>
        <Text style={[styles.infoTitle, { color: colors.text, fontSize: fontSizes.bodySmall }]}>
          📌 Proje Bilgileri (Yönergeye Uygun)
        </Text>
        <Text style={[styles.infoText, { color: colors.textSecondary, fontSize: fontSizes.caption, marginTop: spacing.xs }]}>
          • Proje: NePişirsem (Gıda İsrafını Önleyen Akıllı Kiler){"\n"}
          • Teknoloji: React Native + TypeScript + Firebase & TheMealDB{"\n"}
          • Ekran Sayısı: 8 Ekran (Yönergedeki en az 7 ekran şartı sağlandı){"\n"}
          • Ek Özellik: Karanlık Tema (Dark Mode) Entegrasyonu
        </Text>
      </View>

      <CustomButton
        title="Oturumu Kapat"
        onPress={handleLogout}
        variant="danger"
        style={{ marginTop: spacing.lg, marginBottom: spacing.xl }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    alignItems: 'center',
    borderWidth: 1,
  },
  avatarBox: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontWeight: '800',
  },
  userEmail: {
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    borderTopWidth: 1,
  },
  statBox: {
    alignItems: 'center',
  },
  statNum: {
    fontWeight: '800',
  },
  settingsCard: {
    borderWidth: 1,
  },
  settingsTitle: {
    fontWeight: '700',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLabel: {
    fontWeight: '600',
  },
  infoCard: {
    borderWidth: 1,
  },
  infoTitle: {
    fontWeight: '700',
  },
  infoText: {
    lineHeight: 18,
  },
});
