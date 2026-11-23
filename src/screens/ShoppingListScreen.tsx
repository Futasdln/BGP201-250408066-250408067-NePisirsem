import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { ShoppingItemRow } from '../components/ShoppingItemRow';
import { ShoppingItem } from '../types';

const INITIAL_SHOPPING_LIST: ShoppingItem[] = [
  { id: '1', name: 'Biber', measure: '2 adet', isCompleted: false, recipeSource: 'Teriyaki Tavuk' },
  { id: '2', name: 'Susam Yağı', measure: '1 çay kaşığı', isCompleted: false, recipeSource: 'Teriyaki Tavuk' },
  { id: '3', name: 'Havuç', measure: '1 adet', isCompleted: true, recipeSource: 'Mercimek Çorbası' },
];

export default function ShoppingListScreen() {
  const { colors, spacing, fontSizes, borderRadius } = useTheme();
  const [items, setItems] = useState<ShoppingItem[]>(INITIAL_SHOPPING_LIST);
  const [newItemName, setNewItemName] = useState('');

  const handleToggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item))
    );
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) {
      Alert.alert('Uyarı', 'Lütfen ürün adını yazınız.');
      return;
    }
    const item: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      measure: '1 Adet',
      isCompleted: false,
    };
    setItems((prev) => [item, ...prev]);
    setNewItemName('');
  };

  const handleClearCompleted = () => {
    setItems((prev) => prev.filter((item) => !item.isCompleted));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShoppingItemRow item={item} onToggle={handleToggle} onDelete={handleDelete} />
        )}
        contentContainerStyle={{ padding: spacing.md }}
        ListHeaderComponent={
          <View style={{ marginBottom: spacing.md }}>
            <View style={[styles.addCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: borderRadius.lg, padding: spacing.md }]}>
              <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.subtitle, marginBottom: spacing.sm }]}>
                Alışveriş Listem 🛒
              </Text>
              <CustomInput
                placeholder="Listeye özel ürün ekle (Örn: Süt)"
                value={newItemName}
                onChangeText={setNewItemName}
              />
              <CustomButton
                title="+ Listeye Ekle"
                onPress={handleAddItem}
              />
            </View>

            <View style={[styles.actionsRow, { marginTop: spacing.md }]}>
              <Text style={{ color: colors.textSecondary, fontSize: fontSizes.bodySmall, fontWeight: '700' }}>
                ALINACAKLAR ({items.filter((i) => !i.isCompleted).length} / {items.length})
              </Text>
              <CustomButton
                title="Tamamlananları Sil"
                onPress={handleClearCompleted}
                variant="outline"
                style={{ paddingVertical: 4, paddingHorizontal: 10 }}
                textStyle={{ fontSize: fontSizes.caption }}
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={[styles.emptyContainer, { padding: spacing.xl }]}>
            <Text style={{ fontSize: 40, marginBottom: spacing.sm }}>🎉</Text>
            <Text style={{ color: colors.text, fontSize: fontSizes.body, fontWeight: '700' }}>
              Listeniz Tertemiz!
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSizes.caption, textAlign: 'center', marginTop: spacing.xs }}>
              Eksik malzemeniz kalmadı ya da henüz bir tariften malzeme eklemediniz.
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
  title: {
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
});
