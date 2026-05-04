/*
 파일명 : useAuth.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import { useAuthStore } from '../store/authStore';
import { authApi } from '../api/auth';
import type { LoginRequest } from '../types/auth.types';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, setUser, setTokens, logout: storeLogout } = useAuthStore();

  const login = async (data: LoginRequest) => {
    const response = await authApi.login(data);
    const { accessToken, refreshToken, user } = response.data;
    await setTokens(accessToken, refreshToken);
    setUser(user);
    return user;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore API error on logout
    } finally {
      await storeLogout();
    }
  };

  return { user, isAuthenticated, isLoading, login, logout };
};
