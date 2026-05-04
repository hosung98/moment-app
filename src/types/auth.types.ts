/*
 파일명 : auth.types.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
export interface User {
  id: string;
  email: string;
  nickname: string;
  profileImage?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  tripsCount: number;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface SocialLoginProvider {
  provider: 'google' | 'kakao';
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface TokenPayload {
  sub: string;
  email: string;
  exp: number;
  iat: number;
}
