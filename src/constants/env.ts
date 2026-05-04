/*
 파일명 : env.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 - 환경별 설정 분리 (dev / staging / prod)
*/
import Constants from 'expo-constants';

type Env = 'development' | 'staging' | 'production';

interface EnvConfig {
  ENV: Env;
  API_BASE_URL: string;
  WS_BASE_URL: string;        // WebSocket (채팅)
  MAP_API_KEY: string;
  SENTRY_DSN: string;
  ENABLE_LOGGING: boolean;
  REQUEST_TIMEOUT: number;    // ms
  MAX_RETRY_COUNT: number;
}

// expo-constants의 expoConfig.extra 값 또는 기본값 사용
// app.json의 extra 필드에 환경변수 주입 (EAS Build 사용 시 eas.json에서 관리)
const extra = Constants.expoConfig?.extra ?? {};

const ENV_CONFIGS: Record<Env, EnvConfig> = {
  development: {
    ENV: 'development',
    API_BASE_URL: 'http://localhost:8080/v1',
    WS_BASE_URL: 'ws://localhost:8080/ws',
    MAP_API_KEY: extra.mapApiKeyDev ?? '',
    SENTRY_DSN: '',
    ENABLE_LOGGING: true,
    REQUEST_TIMEOUT: 10000,
    MAX_RETRY_COUNT: 1,
  },
  staging: {
    ENV: 'staging',
    API_BASE_URL: 'https://api-staging.moment-app.com/v1',
    WS_BASE_URL: 'wss://api-staging.moment-app.com/ws',
    MAP_API_KEY: extra.mapApiKeyStaging ?? '',
    SENTRY_DSN: extra.sentryDsn ?? '',
    ENABLE_LOGGING: true,
    REQUEST_TIMEOUT: 15000,
    MAX_RETRY_COUNT: 2,
  },
  production: {
    ENV: 'production',
    API_BASE_URL: 'https://api.moment-app.com/v1',
    WS_BASE_URL: 'wss://api.moment-app.com/ws',
    MAP_API_KEY: extra.mapApiKeyProd ?? '',
    SENTRY_DSN: extra.sentryDsn ?? '',
    ENABLE_LOGGING: false,
    REQUEST_TIMEOUT: 15000,
    MAX_RETRY_COUNT: 2,
  },
};

// __DEV__: React Native 빌드 시 자동으로 주입되는 개발 모드 플래그
const currentEnv: Env = __DEV__
  ? 'development'
  : (extra.env as Env) ?? 'production';

export const ENV = ENV_CONFIGS[currentEnv];
export const IS_DEV = currentEnv === 'development';
export const IS_PROD = currentEnv === 'production';
