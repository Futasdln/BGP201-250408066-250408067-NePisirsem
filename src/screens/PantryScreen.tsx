import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { PantryItemRow } from '../components/PantryItemRow';
import { PantryItem } from '../types';

const INITIAL_PANTRY: PantryItem[] = [
  { id: '1', name: 'Tavuk Göğsü', amount: '500g', category: 'Et & Tavuk', addedAt: '2026-11-20' },
  { id: '2', name: 'Makarna', amount: '1 Paket', category: 'Kuru Gıda', addedAt: '2026-11-21' },
  { id: '3', name: 'Sarımsak', amount: '3 Diş', category: 'Sebze', addedAt: '2026-11-22' },
  { id: '4', name: 'Soya Sosu', amount: '1 Şişe', category: 'Soslar', addedAt: '2026-11-19' },
  { id: '5', name: 'Kırmızı Mercimek', amount: '1 Su Bardağı', category: 'Kuru Gıda', addedAt: '2026-11-23' },
];

export default function PantryScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const { colors, spacing, fontSizes, borderRadius } = useTheme();
  const [items, setItems] = useState<PantryItem[]>(INITIAL_PANTRY);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddItem = () => {
    if (!name.trim()) {
      Alert.alert('Uyarı', 'Lütfen malzeme adını giriniz.');
      return;
    }
    const newItem: PantryItem = {
      id: Date.now().toString(),
      name: name.trim(),
      amount: amount.trim() || '1 Adet',
      category: 'Genel',
      addedAt: new Date().toISOString().split('T')[0],
    };
    setItems((prev) => [newItem, ...prev]);
    setName('');
    setAmount('');
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PantryItemRow item={item} onDelete={handleDeleteItem} />
        )}
        contentContainerStyle={{ padding: spacing.md }}
        ListHeaderComponent={
          <View style={{ marginBottom: spacing.md }}>
            <View style={[styles.addCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: borderRadius.lg, padding: spacing.md }]}>
              <Text style={[styles.addTitle, { color: colors.text, fontSize: fontSizes.subtitle, marginBottom: spacing.sm }]}>
                Kilere Malzeme Ekle 🥫
              </Text>
              <CustomInput
                placeholder="Malzeme Adı (Örn: Domates)"
                value={name}
                onChangeText={setName}
              />
              <CustomInput
                placeholder="Miktar (Örn: 2 Adet, 500g)"
                value={amount}
                onChangeText={setAmount}
              />
              <CustomButton
                title="+ Malzemeyi Ekle"
                onPress={handleAddItem}
                variant="primary"
              />
            </View>

            <View style={[styles.summaryRow, { marginTop: spacing.md, marginBottom: spacing.xs }]}>
              <Text style={{ color: colors.textSecondary, fontSize: fontSizes.bodySmall, fontWeight: '700' }}>
                MEVCUT MALZEMELER ({items.length})
              </Text>
              <CustomButton
                title="Tarif Eşleştir ⚡"
                onPress={() => navigation.navigate('SearchTab')}
                variant="secondary"
                style={{ paddingVertical: 6, paddingHorizontal: 12 }}
                textStyle={{ fontSize: fontSizes.caption }}
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={[styles.emptyContainer, { padding: spacing.xl }]}>
            <Text style={{ fontSize: 36, marginBottom: spacing.sm }}>🧊</Text>
            <Text style={{ color: colors.text, fontSize: fontSizes.body, fontWeight: '700' }}>
              Kileriniz Henüz Boş
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSizes.caption, textAlign: 'center', marginTop: spacing.xs }}>
              Yukarıdaki formu kullanarak evinizdeki malzemeleri ekleyin.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addCard: {
    borderWidth: 1,
  },
  addTitle: {
    fontWeight: '700',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});
