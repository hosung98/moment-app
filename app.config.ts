/*
 파일명 : app.config.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : app.json → app.config.ts 전환 (동적 환경변수 주입)

 이 파일은 Metro 번들러 / EAS Build 시 Node.js 환경에서 실행됨
 → process.env 를 읽어 앱 내부(Constants.expoConfig.extra)에 주입 가능

 실행 방법:
   로컬 개발  : APP_ENV=local npx expo start
   개발 서버  : APP_ENV=dev npx expo start
   prod 빌드  : eas build --profile prod
*/
import type { ExpoConfig, ConfigContext } from 'expo/config';

/** APP_ENV 환경변수에 따라 앱 이름 suffix 부여 (실기기에서 구분하기 쉽게) */
const appNameSuffix: Record<string, string> = {
  local: ' (Local)',
  dev:   ' (Dev)',
  prod:  '',
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const appEnv = process.env.APP_ENV ?? 'local';
  const suffix = appNameSuffix[appEnv] ?? '';

  return {
    ...config,

    name: `moment-app${suffix}`,   // 아이콘 아래 표시되는 앱 이름
    slug: 'moment-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,

    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier:
        appEnv === 'prod'
          ? 'com.moment.app'
          : `com.moment.app.${appEnv}`,   // local/dev는 별도 번들 ID → 동시 설치 가능
    },

    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package:
        appEnv === 'prod'
          ? 'com.moment.app'
          : `com.moment.app.${appEnv}`,
    },

    web: {
      favicon: './assets/favicon.png',
    },

    plugins: ['expo-secure-store'],

    // ──────────────────────────────────────────────────────────
    // extra: 앱 런타임에서 Constants.expoConfig.extra 로 접근
    // 민감한 키(API key, Sentry DSN)는 절대 소스에 직접 넣지 말고
    // EAS Secret 또는 .env 파일(gitignore)에서 주입
    // ──────────────────────────────────────────────────────────
    extra: {
      env: appEnv,

      // 지도 API 키 (환경별)
      mapApiKeyDev:  process.env.MAP_API_KEY_DEV  ?? '',
      mapApiKeyProd: process.env.MAP_API_KEY_PROD ?? '',

      // Sentry DSN (환경별)
      sentryDsnDev:  process.env.SENTRY_DSN_DEV  ?? '',
      sentryDsnProd: process.env.SENTRY_DSN_PROD ?? '',

      // EAS 업데이트용 (eas update 사용 시)
      eas: {
        projectId: '8e79a683-8489-4501-b9f4-e0a5bb6fa6a1',
      },
    },
  };
};
