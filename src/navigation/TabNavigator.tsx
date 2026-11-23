import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from './types';
import { useTheme } from '../context/ThemeContext';

import HomeScreen from '../screens/HomeScreen';
import PantryScreen from '../screens/PantryScreen';
import RecipeSearchScreen from '../screens/RecipeSearchScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const tabIconStyles = StyleSheet.create({
  icon: {
    fontSize: 20,
  },
});

const renderHomeIcon = ({ color }: { color: string }) => <Text style={[tabIconStyles.icon, { color }]}>🍳</Text>;
const renderPantryIcon = ({ color }: { color: string }) => <Text style={[tabIconStyles.icon, { color }]}>🥫</Text>;
const renderSearchIcon = ({ color }: { color: string }) => <Text style={[tabIconStyles.icon, { color }]}>⚡</Text>;
const renderShoppingListIcon = ({ color }: { color: string }) => <Text style={[tabIconStyles.icon, { color }]}>🛒</Text>;
const renderProfileIcon = ({ color }: { color: string }) => <Text style={[tabIconStyles.icon, { color }]}>👤</Text>;

export default function TabNavigator() {
  const { colors, fontSizes } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: fontSizes.caption - 1,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: colors.surface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: fontSizes.subtitle,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: renderHomeIcon,
        }}
      />
      <Tab.Screen
        name="PantryTab"
        component={PantryScreen}
        options={{
          title: 'Kilerim',
          tabBarIcon: renderPantryIcon,
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={RecipeSearchScreen}
        options={{
          title: 'Tarif Bul',
          tabBarIcon: renderSearchIcon,
        }}
      />
      <Tab.Screen
        name="ShoppingListTab"
        component={ShoppingListScreen}
        options={{
          title: 'Alışveriş',
          tabBarIcon: renderShoppingListIcon,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: renderProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
}
