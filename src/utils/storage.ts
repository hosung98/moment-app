/*
 파일명 : storage.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 - AsyncStorage 타입 안전 래퍼 (비민감 데이터용)
*/

/**
 * [사용 구분]
 * tokenManager (SecureStore)  : 토큰 등 민감 데이터
 * storage (AsyncStorage)      : 설정, 캐시 등 비민감 데이터
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from '@/utils/logger';

// 앱에서 사용하는 스토리지 키 목록 (타입 안전)
interface StorageSchema {
  'settings:theme': 'light' | 'dark' | 'system';
  'settings:language': 'ko' | 'en' | 'ja';
  'settings:notification': boolean;
  'onboarding:completed': boolean;
  'user:lastLoginAt': string;
  'explore:recentKeywords': string[];  // 최근 검색어
}

type StorageKey = keyof StorageSchema;
type StorageValue<K extends StorageKey> = StorageSchema[K];

// ────────────────────────────────────────────────
// 타입 안전 래퍼
// ────────────────────────────────────────────────
export const storage = {
  async get<K extends StorageKey>(key: K): Promise<StorageValue<K> | null> {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (raw === null) return null;
      return JSON.parse(raw) as StorageValue<K>;
    } catch (e) {
      logger.error('Storage', `읽기 실패: ${key}`, e);
      return null;
    }
  },

  async set<K extends StorageKey>(key: K, value: StorageValue<K>): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      logger.error('Storage', `쓰기 실패: ${key}`, e);
    }
  },

  async remove(key: StorageKey): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      logger.error('Storage', `삭제 실패: ${key}`, e);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
      logger.info('Storage', '전체 삭제 완료');
    } catch (e) {
      logger.error('Storage', '전체 삭제 실패', e);
    }
  },
};
