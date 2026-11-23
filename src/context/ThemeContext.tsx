import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LIGHT_COLORS, DARK_COLORS, ThemeColors, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

interface ThemeContextType {
  isDarkMode: boolean;
  colors: ThemeColors;
  spacing: typeof SPACING;
  fontSizes: typeof FONT_SIZES;
  borderRadius: typeof BORDER_RADIUS;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const colors = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        colors,
        spacing: SPACING,
        fontSizes: FONT_SIZES,
        borderRadius: BORDER_RADIUS,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
