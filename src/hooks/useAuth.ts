import { useAuthContext } from '../context/AuthContext';

// Yönerge 3.2 kuralı: hooks/useAuth.ts
export const useAuth = () => {
  return useAuthContext();
};
