import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { CustomButton } from '../components/CustomButton';
import { RecipeIngredient } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>;

const MOCK_INGREDIENTS: RecipeIngredient[] = [
  { name: 'Tavuk Göğsü', measure: '500g', inPantry: true },
  { name: 'Soya Sosu', measure: '3 yemek kaşığı', inPantry: true },
  { name: 'Sarımsak', measure: '2 diş', inPantry: true },
  { name: 'Biber', measure: '2 adet', inPantry: false },
  { name: 'Susam Yağı', measure: '1 çay kaşığı', inPantry: false },
];

export default function RecipeDetailScreen({ route }: Props) {
  const { colors, spacing, fontSizes, borderRadius } = useTheme();
  const { recipeTitle, recipeThumbnail } = route.params;
  const [ingredients] = useState<RecipeIngredient[]>(MOCK_INGREDIENTS);
  const [addedToList, setAddedToList] = useState(false);

  const missingIngredients = ingredients.filter((item) => !item.inPantry);

  const handleAddMissingToShoppingList = () => {
    setAddedToList(true);
    Alert.alert(
      'Alışveriş Listesine Eklendi! 🛒',
      `${missingIngredients.length} adet eksik malzeme alışveriş listenize başarıyla aktarıldı.`,
      [{ text: 'Tamam' }]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={{
          uri: recipeThumbnail || 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
        }}
        style={styles.bannerImage}
        resizeMode="cover"
      />

      <View style={[styles.contentCard, { backgroundColor: colors.surface, borderTopLeftRadius: borderRadius.xl, borderTopRightRadius: borderRadius.xl, padding: spacing.lg }]}>
        <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.title }]}>
          {recipeTitle}
        </Text>

        <View style={[styles.statsRow, { borderColor: colors.border, paddingVertical: spacing.md, marginVertical: spacing.md }]}>
          <View style={styles.statItem}>
            <Text style={{ fontSize: fontSizes.subtitle }}>⏱</Text>
            <Text style={[styles.statValue, { color: colors.text, fontSize: fontSizes.bodySmall }]}>35 dk</Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSizes.caption }}>Süre</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={{ fontSize: fontSizes.subtitle }}>🍽</Text>
            <Text style={[styles.statValue, { color: colors.text, fontSize: fontSizes.bodySmall }]}>4 Kişilik</Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSizes.caption }}>Porsiyon</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={{ fontSize: fontSizes.subtitle }}>🎯</Text>
            <Text style={[styles.statValue, { color: colors.text, fontSize: fontSizes.bodySmall }]}>Kolay</Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSizes.caption }}>Zorluk</Text>
          </View>
        </View>

        <View style={{ marginBottom: spacing.lg }}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontSize: fontSizes.subtitle }]}>
              Malzemeler ({ingredients.length})
            </Text>
            {missingIngredients.length > 0 && (
              <Text style={{ color: colors.error, fontSize: fontSizes.caption, fontWeight: '700' }}>
                {missingIngredients.length} Eksik
              </Text>
            )}
          </View>

          {ingredients.map((item, index) => (
            <View
              key={index}
              style={[
                styles.ingredientRow,
                {
                  borderBottomColor: colors.border,
                  paddingVertical: spacing.sm,
                },
              ]}
            >
              <Text style={[styles.ingredientText, { color: colors.text, fontSize: fontSizes.bodySmall }]}>
                • {item.name} ({item.measure})
              </Text>
              <View
                style={[
                  styles.statusTag,
                  {
                    backgroundColor: item.inPantry ? colors.primaryLight : colors.badge,
                    borderRadius: borderRadius.sm,
                  },
                ]}
              >
                <Text
                  style={{
                    color: item.inPantry ? colors.primaryDark : colors.error,
                    fontSize: fontSizes.caption,
                    fontWeight: '700',
                  }}
                >
                  {item.inPantry ? '✓ Evde Var' : '✕ Eksik'}
                </Text>
              </View>
            </View>
          ))}

          {missingIngredients.length > 0 && (
            <CustomButton
              title={addedToList ? '✓ Listeye Eklendi' : 'Eksik Malzemeleri Alışveriş Listeme Ekle 🛒'}
              onPress={handleAddMissingToShoppingList}
              variant={addedToList ? 'secondary' : 'primary'}
              disabled={addedToList}
              style={{ marginTop: spacing.md }}
            />
          )}
        </View>

        <View style={{ marginBottom: spacing.xxl }}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontSize: fontSizes.subtitle, marginBottom: spacing.sm }]}>
            Hazırlanış Adımları 📝
          </Text>
          <Text style={[styles.instructions, { color: colors.textSecondary, fontSize: fontSizes.bodySmall }]}>
            1. Tavuk göğsünü kuşbaşı büyüklüğünde doğrayıp derin bir kaseye alın.{"\n\n"}
            2. Üzerine sarımsak, soya sosu ve baharatları ekleyip 15 dakika dinlendirin.{"\n\n"}
            3. Geniş bir tavayı ısıtın, tavukları yüksek ateşte suyunu salıp çekene kadar soteleyin.{"\n\n"}
            4. Sebzeleri ilave edip 5 dakika daha soteleyerek sıcak servis yapın.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerImage: {
    width: '100%',
    height: 240,
  },
  contentCard: {
    marginTop: -20,
  },
  title: {
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: '700',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: '700',
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  ingredientText: {
    fontWeight: '500',
    flex: 1,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  instructions: {
    lineHeight: 22,
  },
});
