/*
 파일명 : auth.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import api from './axios';
import type { LoginRequest, LoginResponse, RegisterRequest } from '../types/auth.types';

export const authApi = {
  login: (data: LoginRequest) =>
    api.post<LoginResponse>('/auth/login', data),

  register: (data: RegisterRequest) =>
    api.post<LoginResponse>('/auth/register', data),

  socialLogin: (provider: 'google' | 'kakao', token: string) =>
    api.post<LoginResponse>('/auth/social', { provider, token }),

  logout: () =>
    api.post('/auth/logout'),

  refresh: (refreshToken: string) =>
    api.post<{ accessToken: string }>('/auth/refresh', { refreshToken }),

  getMe: () =>
    api.get('/auth/me'),

  updateProfile: (data: FormData) =>
    api.put('/auth/profile', data, { headers: { 'Content-Type': 'multipart/form-data' } }),

  deleteAccount: () =>
    api.delete('/auth/account'),
};
