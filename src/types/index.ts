export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

export interface PantryItem {
  id: string;
  name: string;
  amount: string;
  category: string;
  addedAt: string;
}

export interface RecipeIngredient {
  name: string;
  measure: string;
  inPantry?: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  category: string;
  area: string;
  instructions: string;
  thumbnail: string;
  ingredients: RecipeIngredient[];
  preparationTimeMinutes: number;
  cookingTimeMinutes: number;
  servings: number;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  matchPercentage?: number;
  missingIngredientsCount?: number;
}

export interface ShoppingItem {
  id: string;
  name: string;
  measure: string;
  isCompleted: boolean;
  recipeSource?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
