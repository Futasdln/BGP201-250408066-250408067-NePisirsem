export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  badge: string;
  inputBackground: string;
}

export const LIGHT_COLORS: ThemeColors = {
  primary: '#FF6B4A',
  primaryLight: '#FFE8E3',
  primaryDark: '#E04F2E',
  secondary: '#2EC4B6',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1A202C',
  textSecondary: '#4A5568',
  textMuted: '#A0AEC0',
  border: '#E2E8F0',
  error: '#E53E3E',
  success: '#38A169',
  warning: '#DD6B20',
  badge: '#FFF5F2',
  inputBackground: '#F7FAFC',
};

export const DARK_COLORS: ThemeColors = {
  primary: '#FF7D5F',
  primaryLight: '#3D201A',
  primaryDark: '#FF5733',
  secondary: '#2EC4B6',
  background: '#121212',
  surface: '#1E1E1E',
  card: '#242424',
  text: '#F7FAFC',
  textSecondary: '#CBD5E0',
  textMuted: '#718096',
  border: '#333333',
  error: '#FC8181',
  success: '#68D391',
  warning: '#F6AD55',
  badge: '#362420',
  inputBackground: '#2A2A2A',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const FONT_SIZES = {
  caption: 12,
  bodySmall: 14,
  body: 16,
  subtitle: 18,
  title: 22,
  header: 28,
  hero: 34,
};

export const BORDER_RADIUS = {
  sm: 6,
  md: 12,
  lg: 18,
  xl: 24,
  round: 999,
};

export const THEME = {
  colors: LIGHT_COLORS,
  spacing: SPACING,
  fontSizes: FONT_SIZES,
  borderRadius: BORDER_RADIUS,
};
