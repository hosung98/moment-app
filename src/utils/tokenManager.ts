/*
 파일명 : tokenManager.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 - SecureStore 기반 토큰 관리 (AsyncStorage보다 안전)
*/

/**
 * [왜 SecureStore인가?]
 * AsyncStorage: 평문 저장 → 루팅/탈옥 기기에서 토큰 탈취 가능
 * SecureStore: iOS Keychain / Android Keystore 사용 → 암호화 저장
 */
import * as SecureStore from 'expo-secure-store';
import { logger } from '@/utils/logger';

const KEYS = {
  ACCESS_TOKEN: 'moment_access_token',
  REFRESH_TOKEN: 'moment_refresh_token',
} as const;

export const tokenManager = {
  // ── 저장 ─────────────────────────────────────
  async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    try {
      await Promise.all([
        SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, accessToken),
        SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, refreshToken),
      ]);
      logger.debug('TokenManager', '토큰 저장 완료');
    } catch (e) {
      logger.error('TokenManager', '토큰 저장 실패', e);
      throw e;
    }
  },

  // ── 읽기 ─────────────────────────────────────
  async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(KEYS.ACCESS_TOKEN);
    } catch (e) {
      logger.error('TokenManager', 'AccessToken 읽기 실패', e);
      return null;
    }
  },

  async getRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(KEYS.REFRESH_TOKEN);
    } catch (e) {
      logger.error('TokenManager', 'RefreshToken 읽기 실패', e);
      return null;
    }
  },

  async getTokens(): Promise<{ accessToken: string | null; refreshToken: string | null }> {
    const [accessToken, refreshToken] = await Promise.all([
      tokenManager.getAccessToken(),
      tokenManager.getRefreshToken(),
    ]);
    return { accessToken, refreshToken };
  },

  // ── 삭제 (로그아웃) ───────────────────────────
  async clearTokens(): Promise<void> {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN),
        SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN),
      ]);
      logger.debug('TokenManager', '토큰 삭제 완료');
    } catch (e) {
      logger.error('TokenManager', '토큰 삭제 실패', e);
    }
  },

  // ── 유효성 확인 (JWT 만료시간 디코딩) ──────────
  isTokenExpired(token: string): boolean {
    try {
      // JWT payload는 두 번째 파트 (Base64)
      const payload = JSON.parse(atob(token.split('.')[1]));
      // exp는 초 단위, Date.now()는 밀리초
      return payload.exp * 1000 < Date.now();
    } catch {
      return true; // 파싱 실패 시 만료로 간주
    }
  },
};
