import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { validateRegisterForm } from '../utils/validation';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const { colors, spacing, fontSizes, borderRadius } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    const result = validateRegisterForm(name, email, password, confirmPassword);
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
        <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.header }]}>
          Hesap Oluştur
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: fontSizes.body, marginTop: spacing.xs }]}>
          Akıllı kiler yönetimine hemen başlayın
        </Text>
      </View>

      <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: borderRadius.lg, padding: spacing.lg }]}>
        <CustomInput
          label="Ad Soyad"
          placeholder="Ahmet Yılmaz"
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          error={errors.name}
        />

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

        <CustomInput
          label="Şifre Tekrar"
          placeholder="••••••"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
          secureTextEntry
          error={errors.confirmPassword}
        />

        <CustomButton
          title="Kayıt Ol ve Başla"
          onPress={handleRegister}
          loading={loading}
          style={{ marginTop: spacing.sm }}
        />

        <View style={[styles.loginRow, { marginTop: spacing.lg }]}>
          <Text style={{ color: colors.textSecondary, fontSize: fontSizes.bodySmall }}>
            Zaten hesabınız var mı?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: colors.primary, fontWeight: '700', fontSize: fontSizes.bodySmall }}>
              Giriş Yap
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
    marginBottom: 24,
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
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
