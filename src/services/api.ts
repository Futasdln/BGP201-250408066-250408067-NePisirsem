import { Recipe } from '../types';

// Yönerge 3.3 kuralı: Sabitler BÜYÜK_HARF, API çağrıları services/ içinde yazılır
export const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function fetchFeaturedRecipes(): Promise<Recipe[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/search.php?s=chicken`);
    if (!response.ok) {
      throw new Error(`API Hatası: ${response.status}`);
    }
    const data = await response.json();
    return (data.meals || []).map((meal: Record<string, string | null>) => ({
      id: meal.idMeal ?? '',
      title: meal.strMeal ?? '',
      category: meal.strCategory ?? 'Genel',
      area: meal.strArea ?? 'Dünya Mutfağı',
      instructions: meal.strInstructions ?? '',
      thumbnail: meal.strMealThumb ?? '',
      ingredients: [],
      preparationTimeMinutes: 15,
      cookingTimeMinutes: 25,
      servings: 4,
      difficulty: 'Orta',
    }));
  } catch (error) {
    console.error('Tarifler yüklenirken hata oluştu:', error);
    return [];
  }
}
