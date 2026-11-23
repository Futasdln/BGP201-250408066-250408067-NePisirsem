import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe } from '../types';

const MOCK_RECIPES: Recipe[] = [
  {
    id: '52772',
    title: 'Teriyaki Tavuk & Sebze',
    category: 'Tavuk',
    area: 'Japon',
    instructions: 'Tavuk göğsünü doğrayın. Soya sosu ve sarımsak ile marine edin. Sebzeleri soteleyip tavuğu ekleyin.',
    thumbnail: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    ingredients: [
      { name: 'Tavuk Göğsü', measure: '500g', inPantry: true },
      { name: 'Soya Sosu', measure: '3 yemek kaşığı', inPantry: true },
      { name: 'Sarımsak', measure: '2 diş', inPantry: true },
      { name: 'Biber', measure: '2 adet', inPantry: false },
    ],
    preparationTimeMinutes: 15,
    cookingTimeMinutes: 20,
    servings: 4,
    difficulty: 'Kolay',
    matchPercentage: 75,
    missingIngredientsCount: 1,
  },
  {
    id: '52804',
    title: 'Kremalı Mantarlı Makarna',
    category: 'Makarna',
    area: 'İtalyan',
    instructions: 'Makarnayı haşlayın. Mantarları tereyağında soteleyip krema ekleyin. Makarnayla harmanlayın.',
    thumbnail: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    ingredients: [
      { name: 'Makarna', measure: '1 paket', inPantry: true },
      { name: 'Mantar', measure: '300g', inPantry: true },
      { name: 'Krema', measure: '200ml', inPantry: true },
      { name: 'Kaşar Peyniri', measure: '100g', inPantry: true },
    ],
    preparationTimeMinutes: 10,
    cookingTimeMinutes: 15,
    servings: 3,
    difficulty: 'Kolay',
    matchPercentage: 100,
    missingIngredientsCount: 0,
  },
  {
    id: '52977',
    title: 'Geleneksel Mercimek Çorbası',
    category: 'Çorba',
    area: 'Türk',
    instructions: 'Mercimek, soğan, havuç ve patatesi haşlayın. Blenderdan geçirip tereyağlı nane sosu dökün.',
    thumbnail: 'https://www.themealdb.com/images/media/meals/7n8su21699013057.jpg',
    ingredients: [
      { name: 'Kırmızı Mercimek', measure: '1 su bardağı', inPantry: true },
      { name: 'Soğan', measure: '1 adet', inPantry: true },
      { name: 'Havuç', measure: '1 adet', inPantry: false },
      { name: 'Tereyağı', measure: '1 yemek kaşığı', inPantry: true },
    ],
    preparationTimeMinutes: 10,
    cookingTimeMinutes: 25,
    servings: 4,
    difficulty: 'Kolay',
    matchPercentage: 75,
    missingIngredientsCount: 1,
  },
];

const CATEGORIES = ['Tümü', 'Tavuk', 'Makarna', 'Çorba', 'Tatlı', 'Sebze'];

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors, spacing, fontSizes, borderRadius } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredRecipes = MOCK_RECIPES.filter((recipe) => {
    const matchesCat = selectedCategory === 'Tümü' || recipe.category === selectedCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() =>
              navigation.navigate('RecipeDetail', {
                recipeId: item.id,
                recipeTitle: item.title,
                recipeThumbnail: item.thumbnail,
              })
            }
          />
        )}
        contentContainerStyle={{ padding: spacing.md }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }
        ListHeaderComponent={
          <View style={{ marginBottom: spacing.md }}>
            <View style={[styles.welcomeBanner, { backgroundColor: colors.primaryLight, borderRadius: borderRadius.lg, padding: spacing.lg }]}>
              <Text style={[styles.welcomeTitle, { color: colors.primaryDark, fontSize: fontSizes.title }]}>
                Bugün Ne Pişirsek? 🍲
              </Text>
              <Text style={[styles.welcomeSub, { color: colors.textSecondary, fontSize: fontSizes.bodySmall, marginTop: spacing.xs }]}>
                Kilerinizdeki malzemelere göre eşleşen en lezzetli tarifler aşağıda listelendi.
              </Text>
            </View>

            <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: borderRadius.md, marginTop: spacing.md, paddingHorizontal: spacing.md }]}>
              <Text style={{ marginRight: spacing.sm, fontSize: fontSizes.body }}>🔍</Text>
              <TextInput
                placeholder="Tarif veya yemek adı ara..."
                placeholderTextColor={colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={[styles.searchInput, { color: colors.text, fontSize: fontSizes.body }]}
              />
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={CATEGORIES}
              keyExtractor={(item) => item}
              style={{ marginTop: spacing.md }}
              renderItem={({ item }) => {
                const isSelected = selectedCategory === item;
                return (
                  <TouchableOpacity
                    onPress={() => setSelectedCategory(item)}
                    style={[
                      styles.categoryChip,
                      {
                        backgroundColor: isSelected ? colors.primary : colors.card,
                        borderColor: isSelected ? colors.primary : colors.border,
                        borderRadius: borderRadius.round,
                        paddingHorizontal: spacing.md,
                        paddingVertical: spacing.xs + 3,
                        marginRight: spacing.sm,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: isSelected ? '#FFFFFF' : colors.textSecondary,
                        fontWeight: isSelected ? '700' : '500',
                        fontSize: fontSizes.bodySmall,
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        }
        ListEmptyComponent={
          <View style={[styles.emptyBox, { padding: spacing.xl }]}>
            <Text style={{ fontSize: 40, marginBottom: spacing.sm }}>🥣</Text>
            <Text style={{ color: colors.text, fontSize: fontSizes.subtitle, fontWeight: '700' }}>
              Tarif Bulunamadı
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: fontSizes.bodySmall, textAlign: 'center', marginTop: spacing.xs }}>
              Arama kriterlerinize uygun tarif bulunamadı. Lütfen başka bir terim deneyin.
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
  welcomeBanner: {},
  welcomeTitle: {
    fontWeight: '800',
  },
  welcomeSub: {
    lineHeight: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: 48,
  },
  searchInput: {
    flex: 1,
  },
  categoryChip: {
    borderWidth: 1,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
});
