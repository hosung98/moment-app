/*
 파일명 : api.types.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 - API 공통 응답/에러 타입 정의
*/

// ────────────────────────────────────────────────
// 서버 공통 응답 래퍼 (Spring Boot 기준)
// { success, data, message, code }
// ────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
  code: string; // 'SUCCESS' | 'AUTH_001' | ...
}

// 페이지네이션 응답
export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// ────────────────────────────────────────────────
// 에러 코드 열거 (서버 에러코드 규격과 맞춤)
// ────────────────────────────────────────────────
export type ApiErrorCode =
  | 'AUTH_001'    // 인증 실패
  | 'AUTH_002'    // 토큰 만료
  | 'AUTH_003'    // 리프레시 토큰 만료
  | 'AUTH_004'    // 권한 없음
  | 'USER_001'    // 유저 없음
  | 'TRIP_001'    // 여행 없음
  | 'BLOG_001'    // 게시글 없음
  | 'VALID_001'   // 유효성 검사 실패
  | 'SERVER_001'  // 서버 내부 오류
  | string;       // 미정의 코드 허용

// 에러 응답 구조
export interface ApiError {
  code: ApiErrorCode;
  message: string;
  statusCode: number;
  details?: Record<string, string>; // 필드별 유효성 오류 (VALID_001 등)
}

// ────────────────────────────────────────────────
// 네트워크 계층 에러 분류
// ────────────────────────────────────────────────
export type NetworkErrorType =
  | 'TIMEOUT'         // 요청 타임아웃
  | 'NO_CONNECTION'   // 네트워크 없음
  | 'SERVER_ERROR'    // 5xx
  | 'CLIENT_ERROR'    // 4xx
  | 'UNKNOWN';        // 기타

export interface AppError {
  type: NetworkErrorType;
  apiError?: ApiError;
  originalError?: unknown;
}

// ────────────────────────────────────────────────
// 공통 요청 파라미터
// ────────────────────────────────────────────────
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string; // 'createdAt,desc'
}

export interface SearchParams extends PaginationParams {
  keyword?: string;
}
