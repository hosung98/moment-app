/*
 파일명 : authStore.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import { create } from 'zustand';
import { tokenManager } from '@/utils/tokenManager';
import type { User } from '../types/auth.types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => Promise<void>;
  loadStoredAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: true }),

  setTokens: async (accessToken, refreshToken) => {
    await tokenManager.setTokens(accessToken, refreshToken);
    set({ accessToken, refreshToken, isAuthenticated: true });
  },

  logout: async () => {
    await tokenManager.clearTokens();
    set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
  },

  loadStoredAuth: async () => {
    try {
      const { accessToken, refreshToken } = await tokenManager.getTokens();
      if (accessToken && refreshToken) {
        set({ accessToken, refreshToken, isAuthenticated: true });
      }
    } catch {
      // ignore
    } finally {
      set({ isLoading: false });
    }
  },
}));
