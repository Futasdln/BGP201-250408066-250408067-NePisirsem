import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ShoppingItem } from '../types';

export interface ShoppingItemRowProps {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ShoppingItemRow: React.FC<ShoppingItemRowProps> = ({ item, onToggle, onDelete }) => {
  const { colors, spacing, fontSizes, borderRadius } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: borderRadius.md,
          padding: spacing.md,
          marginBottom: spacing.sm,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => onToggle(item.id)}
        style={[
          styles.checkbox,
          {
            borderColor: item.isCompleted ? colors.success : colors.border,
            backgroundColor: item.isCompleted ? colors.success : 'transparent',
            borderRadius: borderRadius.sm,
            marginRight: spacing.md,
          },
        ]}
      >
        {item.isCompleted ? <Text style={styles.checkMark}>✓</Text> : null}
      </TouchableOpacity>

      <View style={styles.textCol}>
        <Text
          style={[
            styles.name,
            {
              color: item.isCompleted ? colors.textMuted : colors.text,
              fontSize: fontSizes.body,
              textDecorationLine: item.isCompleted ? 'line-through' : 'none',
            },
          ]}
        >
          {item.name}
        </Text>
        {item.measure ? (
          <Text style={[styles.measure, { color: colors.textSecondary, fontSize: fontSizes.caption }]}>
            {item.measure} {item.recipeSource ? `• (${item.recipeSource})` : ''}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
        <Text style={[styles.deleteSymbol, { color: colors.textMuted, fontSize: fontSizes.subtitle }]}>
          ✕
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textCol: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
  },
  measure: {
    marginTop: 2,
  },
  deleteButton: {
    padding: 6,
  },
  deleteSymbol: {
    fontWeight: '700',
  },
});
