/*
 파일명 : errorHandler.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 - Axios 에러 분류, 사용자 친화적 메시지 변환
*/
import { AxiosError } from 'axios';
import type { ApiError, AppError, NetworkErrorType } from '@/types/api.types';
import { logger } from '@/utils/logger';

// ────────────────────────────────────────────────
// Axios 에러 → AppError 변환
// ────────────────────────────────────────────────
export function parseAxiosError(error: unknown): AppError {
  if (!(error instanceof AxiosError)) {
    return { type: 'UNKNOWN', originalError: error };
  }

  // 타임아웃
  if (error.code === 'ECONNABORTED') {
    return { type: 'TIMEOUT', originalError: error };
  }

  // 네트워크 없음 (응답 자체가 없음)
  if (!error.response) {
    return { type: 'NO_CONNECTION', originalError: error };
  }

  const status = error.response.status;
  const serverData = error.response.data as Partial<ApiError>;

  const apiError: ApiError = {
    code: serverData?.code ?? 'UNKNOWN',
    message: serverData?.message ?? '오류가 발생했습니다.',
    statusCode: status,
    details: serverData?.details,
  };

  let type: NetworkErrorType = 'UNKNOWN';
  if (status >= 500) type = 'SERVER_ERROR';
  else if (status >= 400) type = 'CLIENT_ERROR';

  logger.error('ErrorHandler', `[${status}] ${apiError.code}: ${apiError.message}`);

  return { type, apiError, originalError: error };
}

// ────────────────────────────────────────────────
// 에러 코드 → 사용자 표시 메시지
// ────────────────────────────────────────────────
const ERROR_MESSAGES: Record<string, string> = {
  AUTH_001: '로그인이 필요합니다.',
  AUTH_002: '세션이 만료되었습니다. 다시 로그인해 주세요.',
  AUTH_003: '다시 로그인이 필요합니다.',
  AUTH_004: '해당 기능에 대한 권한이 없습니다.',
  USER_001: '사용자 정보를 찾을 수 없습니다.',
  TRIP_001: '여행 정보를 찾을 수 없습니다.',
  BLOG_001: '게시글을 찾을 수 없습니다.',
  VALID_001: '입력 정보를 다시 확인해 주세요.',
  SERVER_001: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  TIMEOUT: '요청 시간이 초과되었습니다.',
  NO_CONNECTION: '네트워크 연결을 확인해 주세요.',
  UNKNOWN: '알 수 없는 오류가 발생했습니다.',
};

export function getErrorMessage(error: AppError): string {
  if (error.type === 'TIMEOUT') return ERROR_MESSAGES.TIMEOUT;
  if (error.type === 'NO_CONNECTION') return ERROR_MESSAGES.NO_CONNECTION;

  const code = error.apiError?.code;
  if (code && ERROR_MESSAGES[code]) return ERROR_MESSAGES[code];

  return error.apiError?.message ?? ERROR_MESSAGES.UNKNOWN;
}

// ────────────────────────────────────────────────
// 필드별 유효성 오류 추출 (VALID_001용)
// { field: 'email', message: '이미 사용 중인 이메일' } 형태
// ────────────────────────────────────────────────
export function getFieldErrors(error: AppError): Record<string, string> {
  return error.apiError?.details ?? {};
}

// ────────────────────────────────────────────────
// 에러 타입 체크 헬퍼
// ────────────────────────────────────────────────
export function isAuthError(error: AppError): boolean {
  return ['AUTH_001', 'AUTH_002', 'AUTH_003'].includes(error.apiError?.code ?? '');
}

export function isNetworkError(error: AppError): boolean {
  return error.type === 'NO_CONNECTION' || error.type === 'TIMEOUT';
}
