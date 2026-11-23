import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { validateLoginForm } from '../utils/validation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { colors, spacing, fontSizes, borderRadius } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const result = validateLoginForm(email, password);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.replace('MainTabs', { screen: 'HomeTab' });
    }, 600);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContent,
        { backgroundColor: colors.background, padding: spacing.xl },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <View style={[styles.logoBadge, { backgroundColor: colors.primaryLight, borderRadius: borderRadius.round }]}>
          <Text style={styles.logoIcon}>🍳</Text>
        </View>
        <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.header, marginTop: spacing.md }]}>
          NePişirsem
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: fontSizes.body, marginTop: spacing.xs }]}>
          Evdeki malzemelerle harika tarifler keşfet
        </Text>
      </View>

      <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: borderRadius.lg, padding: spacing.lg }]}>
        <CustomInput
          label="E-Posta Adresi"
          placeholder="ornek@mail.com"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <CustomInput
          label="Şifre"
          placeholder="••••••"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          secureTextEntry
          error={errors.password}
        />

        <CustomButton
          title="Giriş Yap"
          onPress={handleLogin}
          loading={loading}
          style={{ marginTop: spacing.sm }}
        />

        <View style={[styles.registerRow, { marginTop: spacing.lg }]}>
          <Text style={{ color: colors.textSecondary, fontSize: fontSizes.bodySmall }}>
            Hesabınız yok mu?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: colors.primary, fontWeight: '700', fontSize: fontSizes.bodySmall }}>
              Kayıt Ol
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoBadge: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 40,
  },
  title: {
    fontWeight: '800',
  },
  subtitle: {
    textAlign: 'center',
  },
  formCard: {
    borderWidth: 1,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
