/*
 파일명 : env.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 / 환경 구분 local|dev|prod 3단계로 변경

 환경 전환 방법:
   로컬 개발  → APP_ENV=local npx expo start
   개발 서버  → APP_ENV=dev npx expo start
   프로덕션   → eas build --profile prod

 APP_ENV는 app.config.ts에서 extra.env로 주입되고
 여기서 Constants.expoConfig.extra.env로 읽힘
*/
import Constants from 'expo-constants';

/** 앱이 동작하는 환경 */
type Env = 'local' | 'dev' | 'prod';

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

// app.config.ts → extra 필드로 주입된 값들
const extra = Constants.expoConfig?.extra ?? {};

const ENV_CONFIGS: Record<Env, EnvConfig> = {
  // ─── 로컬 개발 ───────────────────────────────────────────
  // 백엔드를 내 PC에서 직접 실행할 때 사용
  // iOS 시뮬레이터: localhost 그대로 동작
  // Android 에뮬레이터: localhost → 10.0.2.2 로 변경 필요
  local: {
    ENV: 'local',
    API_BASE_URL: 'http://localhost:8080/v1',
    WS_BASE_URL: 'ws://localhost:8080/ws',
    MAP_API_KEY: extra.mapApiKeyDev ?? '',
    SENTRY_DSN: '',
    ENABLE_LOGGING: true,
    REQUEST_TIMEOUT: 10000,
    MAX_RETRY_COUNT: 1,
  },

  // ─── 개발 서버 (dev) ─────────────────────────────────────
  // 팀 공유 개발 서버. QA, 기획 확인용.
  // 실제 기기 테스트 시 이 환경을 사용
  dev: {
    ENV: 'dev',
    API_BASE_URL: 'https://api-dev.moment-app.com/v1',
    WS_BASE_URL: 'wss://api-dev.moment-app.com/ws',
    MAP_API_KEY: extra.mapApiKeyDev ?? '',
    SENTRY_DSN: extra.sentryDsnDev ?? '',
    ENABLE_LOGGING: true,
    REQUEST_TIMEOUT: 15000,
    MAX_RETRY_COUNT: 2,
  },

  // ─── 프로덕션 (prod) ─────────────────────────────────────
  // 실 사용자에게 배포되는 버전. 로그 비활성화.
  prod: {
    ENV: 'prod',
    API_BASE_URL: 'https://api.moment-app.com/v1',
    WS_BASE_URL: 'wss://api.moment-app.com/ws',
    MAP_API_KEY: extra.mapApiKeyProd ?? '',
    SENTRY_DSN: extra.sentryDsnProd ?? '',
    ENABLE_LOGGING: false,
    REQUEST_TIMEOUT: 15000,
    MAX_RETRY_COUNT: 3,
  },
};

// app.config.ts에서 주입한 APP_ENV 값을 읽음
// 없으면 __DEV__ 여부로 fallback (local vs prod)
const currentEnv: Env = (extra.env as Env) ?? (__DEV__ ? 'local' : 'prod');

export const ENV = ENV_CONFIGS[currentEnv];
export const IS_LOCAL = currentEnv === 'local';
export const IS_DEV   = currentEnv === 'dev';
export const IS_PROD  = currentEnv === 'prod';
