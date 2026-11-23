export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidPassword = (password: string): boolean => {
  // En az 6 karakter
  return password.length >= 6;
};

export const validateLoginForm = (
  email: string,
  password: string
): { isValid: boolean; errors: { email?: string; password?: string } } => {
  const errors: { email?: string; password?: string } = {};

  if (!email.trim()) {
    errors.email = 'E-posta adresi boş bırakılamaz.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Geçerli bir e-posta adresi giriniz.';
  }

  if (!password) {
    errors.password = 'Şifre boş bırakılamaz.';
  } else if (!isValidPassword(password)) {
    errors.password = 'Şifre en az 6 karakter olmalıdır.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateRegisterForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): { isValid: boolean; errors: { name?: string; email?: string; password?: string; confirmPassword?: string } } => {
  const errors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};

  if (!name.trim()) {
    errors.name = 'Ad Soyad alanı boş bırakılamaz.';
  }

  if (!email.trim()) {
    errors.email = 'E-posta adresi boş bırakılamaz.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Geçerli bir e-posta adresi giriniz.';
  }

  if (!password) {
    errors.password = 'Şifre boş bırakılamaz.';
  } else if (!isValidPassword(password)) {
    errors.password = 'Şifre en az 6 karakter olmalıdır.';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Şifreler eşleşmiyor.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
