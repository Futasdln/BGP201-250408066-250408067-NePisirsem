import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { PantryItem } from '../types';

export interface PantryItemRowProps {
  item: PantryItem;
  onDelete: (id: string) => void;
}

export const PantryItemRow: React.FC<PantryItemRowProps> = ({ item, onDelete }) => {
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
      <View style={styles.infoCol}>
        <Text style={[styles.name, { color: colors.text, fontSize: fontSizes.body }]}>
          {item.name}
        </Text>
        <Text style={[styles.category, { color: colors.textMuted, fontSize: fontSizes.caption }]}>
          {item.category} • {item.amount}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onDelete(item.id)}
        style={[
          styles.deleteBtn,
          {
            backgroundColor: colors.inputBackground,
            borderRadius: borderRadius.round,
            paddingHorizontal: spacing.sm + 4,
            paddingVertical: spacing.xs + 2,
          },
        ]}
      >
        <Text style={[styles.deleteText, { color: colors.error, fontSize: fontSizes.caption }]}>
          Sil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  infoCol: {
    flex: 1,
  },
  name: {
    fontWeight: '700',
  },
  category: {
    marginTop: 2,
    fontWeight: '500',
  },
  deleteBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    fontWeight: '700',
  },
});
