import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  HomeTab: undefined;
  PantryTab: undefined;
  SearchTab: undefined;
  ShoppingListTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: NavigatorScreenParams<TabParamList>;
  RecipeDetail: {
    recipeId: string;
    recipeTitle: string;
    recipeThumbnail?: string;
  };
};
