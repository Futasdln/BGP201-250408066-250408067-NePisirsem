import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  style,
  ...textInputProps
}) => {
  const { colors, spacing, fontSizes, borderRadius } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.md }]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: colors.textSecondary,
              fontSize: fontSizes.bodySmall,
              marginBottom: spacing.xs,
            },
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            color: colors.text,
            borderColor: error ? colors.error : colors.border,
            borderRadius: borderRadius.md,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm + 4,
            fontSize: fontSizes.body,
          },
          style,
        ]}
        {...textInputProps}
      />
      {error ? (
        <Text
          style={[
            styles.errorText,
            {
              color: colors.error,
              fontSize: fontSizes.caption,
              marginTop: spacing.xs,
            },
          ]}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
  },
  errorText: {
    fontWeight: '500',
  },
});
