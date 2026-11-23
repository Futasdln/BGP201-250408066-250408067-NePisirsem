import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe } from '../types';

const SEARCH_RESULTS: Recipe[] = [
  {
    id: '52804',
    title: 'Kremalı Mantarlı Makarna',
    category: 'Makarna',
    area: 'İtalyan',
    instructions: 'Mantarları soteleyin, kremayı ekleyin. Haşlanmış makarna ile birleştirin.',
    thumbnail: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    ingredients: [
      { name: 'Makarna', measure: '1 paket', inPantry: true },
      { name: 'Mantar', measure: '300g', inPantry: true },
      { name: 'Krema', measure: '200ml', inPantry: true },
    ],
    preparationTimeMinutes: 10,
    cookingTimeMinutes: 15,
    servings: 3,
    difficulty: 'Kolay',
    matchPercentage: 100,
    missingIngredientsCount: 0,
  },
  {
    id: '52772',
    title: 'Teriyaki Tavuk & Sebze',
    category: 'Tavuk',
    area: 'Japon',
    instructions: 'Tavuk göğsünü marine edin ve sebzelerle tavada pişirin.',
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
    id: '52855',
    title: 'Fırında Beşamel Soslu Patates',
    category: 'Vejetaryen',
    area: 'Türk',
    instructions: 'Patatesleri dilimleyin. Beşamel sos hazırlayıp fırında kaşar eriyene kadar pişirin.',
    thumbnail: 'https://www.themealdb.com/images/media/meals/wqqvyv1511179730.jpg',
    ingredients: [
      { name: 'Patates', measure: '3 adet', inPantry: true },
      { name: 'Süt', measure: '2 bardak', inPantry: false },
      { name: 'Un', measure: '2 kaşık', inPantry: false },
    ],
    preparationTimeMinutes: 20,
    cookingTimeMinutes: 35,
    servings: 4,
    difficulty: 'Orta',
    matchPercentage: 40,
    missingIngredientsCount: 2,
  },
];

const DIFFICULTY_FILTERS = ['Tümü', 'Kolay', 'Orta', 'Zor'];

export default function RecipeSearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors, spacing, fontSizes, borderRadius } = useTheme();
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tümü');

  const filteredList = SEARCH_RESULTS.filter((recipe) => {
    if (selectedDifficulty === 'Tümü') return true;
    return recipe.difficulty === selectedDifficulty;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filteredList}
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
        ListHeaderComponent={
          <View style={{ marginBottom: spacing.md }}>
            <View style={[styles.matchHeader, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: borderRadius.lg, padding: spacing.md }]}>
              <Text style={[styles.headerTitle, { color: colors.text, fontSize: fontSizes.subtitle }]}>
                Kiler Eşleşme Oranları 📊
              </Text>
              <Text style={{ color: colors.textSecondary, fontSize: fontSizes.bodySmall, marginTop: 4 }}>
                Malzemelerinize en uygun tarifler yüksek eşleşme yüzdesiyle sıralandı.
              </Text>

              <View style={[styles.filterRow, { marginTop: spacing.md }]}>
                {DIFFICULTY_FILTERS.map((diff) => {
                  const isSelected = selectedDifficulty === diff;
                  return (
                    <TouchableOpacity
                      key={diff}
                      onPress={() => setSelectedDifficulty(diff)}
                      style={[
                        styles.filterButton,
                        {
                          backgroundColor: isSelected ? colors.primary : colors.inputBackground,
                          borderRadius: borderRadius.md,
                          paddingVertical: spacing.xs + 2,
                          paddingHorizontal: spacing.md,
                          marginRight: spacing.sm,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: isSelected ? '#FFFFFF' : colors.textSecondary,
                          fontWeight: isSelected ? '700' : '500',
                          fontSize: fontSizes.caption,
                        }}
                      >
                        {diff}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
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
  matchHeader: {
    borderWidth: 1,
  },
  headerTitle: {
    fontWeight: '800',
  },
  filterRow: {
    flexDirection: 'row',
  },
  filterButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
