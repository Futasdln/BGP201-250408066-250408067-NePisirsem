import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Recipe } from '../types';

export interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress }) => {
  const { colors, spacing, fontSizes, borderRadius } = useTheme();

  const hasMatch = recipe.matchPercentage !== undefined;

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderRadius: borderRadius.lg,
          borderColor: colors.border,
          marginBottom: spacing.md,
        },
      ]}
    >
      <Image
        source={{ uri: recipe.thumbnail }}
        style={[styles.image, { borderTopLeftRadius: borderRadius.lg, borderTopRightRadius: borderRadius.lg }]}
        resizeMode="cover"
      />
      {hasMatch && (
        <View
          style={[
            styles.matchBadge,
            {
              backgroundColor: (recipe.matchPercentage ?? 0) >= 70 ? colors.success : colors.warning,
              borderRadius: borderRadius.round,
              top: spacing.sm,
              right: spacing.sm,
            },
          ]}
        >
          <Text style={[styles.matchText, { fontSize: fontSizes.caption }]}>
            %{recipe.matchPercentage} Uyumlu
          </Text>
        </View>
      )}
      <View style={[styles.content, { padding: spacing.md }]}>
        <View style={styles.headerRow}>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              {
                color: colors.text,
                fontSize: fontSizes.subtitle,
                flex: 1,
              },
            ]}
          >
            {recipe.title}
          </Text>
        </View>
        <Text
          style={[
            styles.category,
            {
              color: colors.primary,
              fontSize: fontSizes.caption,
              marginTop: spacing.xs,
            },
          ]}
        >
          {recipe.category} • {recipe.area}
        </Text>
        <View style={[styles.footerRow, { marginTop: spacing.sm }]}>
          <Text style={[styles.metaText, { color: colors.textMuted, fontSize: fontSizes.caption }]}>
            ⏱ {recipe.preparationTimeMinutes + recipe.cookingTimeMinutes} dk
          </Text>
          <Text style={[styles.metaText, { color: colors.textMuted, fontSize: fontSizes.caption }]}>
            🍽 {recipe.servings} Kişilik
          </Text>
          <Text
            style={[
              styles.difficultyBadge,
              {
                color: colors.textSecondary,
                fontSize: fontSizes.caption,
              },
            ]}
          >
            🎯 {recipe.difficulty}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
  },
  matchBadge: {
    position: 'absolute',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  matchText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  content: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
  },
  category: {
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaText: {
    fontWeight: '500',
  },
  difficultyBadge: {
    fontWeight: '600',
  },
});
