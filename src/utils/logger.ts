/*
 파일명 : logger.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 - 환경별 로깅, Sentry 연동 준비
*/
import { IS_DEV } from '@/constants/env';

// 로그 레벨
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const PREFIX: Record<LogLevel, string> = {
  debug: '[DEBUG]',
  info:  '[INFO] ',
  warn:  '[WARN] ',
  error: '[ERROR]',
};

function formatMessage(level: LogLevel, tag: string, message: string): string {
  const time = new Date().toTimeString().slice(0, 8);
  return `${PREFIX[level]} ${time} [${tag}] ${message}`;
}

// ────────────────────────────────────────────────
// 실제 로거 함수
// ────────────────────────────────────────────────
export const logger = {
  debug(tag: string, message: string, data?: unknown): void {
    if (!IS_DEV) return;
    console.log(formatMessage('debug', tag, message), data ?? '');
  },

  info(tag: string, message: string, data?: unknown): void {
    if (!IS_DEV) return;
    console.info(formatMessage('info', tag, message), data ?? '');
  },

  warn(tag: string, message: string, data?: unknown): void {
    if (IS_DEV) {
      console.warn(formatMessage('warn', tag, message), data ?? '');
    }
    // 운영: Sentry.captureMessage() 등으로 교체
  },

  error(tag: string, message: string, error?: unknown): void {
    if (IS_DEV) {
      console.error(formatMessage('error', tag, message), error ?? '');
    } else {
      // 운영 환경: Sentry 연동 예시
      // Sentry.captureException(error, { extra: { tag, message } });
    }
  },

  // API 요청/응답 전용 로그 (개발에서만 출력)
  api: {
    request(method: string, url: string, data?: unknown): void {
      if (!IS_DEV) return;
      console.log(`[API→] ${method.toUpperCase()} ${url}`, data ?? '');
    },
    response(method: string, url: string, status: number, data?: unknown): void {
      if (!IS_DEV) return;
      const color = status < 400 ? '✅' : '❌';
      console.log(`[API←] ${color} ${status} ${method.toUpperCase()} ${url}`, data ?? '');
    },
    error(method: string, url: string, error: unknown): void {
      console.error(`[API✗] ${method.toUpperCase()} ${url}`, error);
    },
  },
};
