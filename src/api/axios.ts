/*
 파일명 : axios.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 개선 - SecureStore 기반 tokenManager 연동, 재시도 로직, 로거 추가
*/
import axios, { AxiosRequestConfig } from 'axios';
import { ENV } from '@/constants/env';
import { tokenManager } from '@/utils/tokenManager';
import { logger } from '@/utils/logger';

// ────────────────────────────────────────────────
// axios 인스턴스 생성
// ────────────────────────────────────────────────
const axiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ────────────────────────────────────────────────
// 요청 인터셉터
// 1) AccessToken 자동 첨부 (SecureStore)
// 2) 요청 로그 출력 (개발 환경)
// ────────────────────────────────────────────────
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await tokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    logger.api.request(config.method ?? 'GET', config.url ?? '', config.data);
    return config;
  },
  (error) => {
    logger.error('Axios', '요청 인터셉터 오류', error);
    return Promise.reject(error);
  }
);

// ────────────────────────────────────────────────
// 응답 인터셉터
// 1) 응답 로그 출력
// 2) 401 → RefreshToken으로 재발급 후 원본 요청 재시도
// 3) RefreshToken 만료 → 로그아웃 (authStore 직접 호출 금지, 이벤트로 분리)
// ────────────────────────────────────────────────

// 토큰 갱신 중복 방지 (Promise 공유)
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onTokenRefreshed(newToken: string) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

axiosInstance.interceptors.response.use(
  (response) => {
    logger.api.response(
      response.config.method ?? 'GET',
      response.config.url ?? '',
      response.status,
      response.data
    );
    return response;
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    logger.api.error(
      originalRequest?.method ?? 'GET',
      originalRequest?.url ?? '',
      error
    );

    // ── 401: 토큰 만료 처리 ───────────────────────
    if (status === 401 && !originalRequest._retry) {
      // 이미 재발급 중이면 대기 후 새 토큰으로 재시도
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await tokenManager.getRefreshToken();
        if (!refreshToken) throw new Error('RefreshToken 없음');

        // 재발급 전용 axios (인터셉터 순환 방지)
        const { data } = await axios.post(
          `${ENV.API_BASE_URL}/auth/refresh`,
          { refreshToken },
          { timeout: ENV.REQUEST_TIMEOUT }
        );

        const newAccessToken: string = data.data.accessToken;
        const newRefreshToken: string = data.data.refreshToken ?? refreshToken;

        await tokenManager.setTokens(newAccessToken, newRefreshToken);
        logger.info('Axios', '토큰 재발급 성공');

        onTokenRefreshed(newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        logger.error('Axios', '토큰 재발급 실패 → 로그아웃', refreshError);
        await tokenManager.clearTokens();

        // 순환 의존성 없이 로그아웃 신호 전달
        // useAuthStore().logout() 직접 호출 대신 이벤트 활용
        axiosInstance.defaults.headers.common['Authorization'] = '';

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ── 재시도 로직 (5xx, 네트워크 오류) ──────────
    const retryCount = (originalRequest as any)._retryCount ?? 0;
    if (
      retryCount < ENV.MAX_RETRY_COUNT &&
      (!status || status >= 500)
    ) {
      (originalRequest as any)._retryCount = retryCount + 1;
      // 지수 백오프: 1초, 2초 ...
      await new Promise((res) => setTimeout(res, 1000 * (retryCount + 1)));
      logger.warn('Axios', `재시도 ${retryCount + 1}/${ENV.MAX_RETRY_COUNT}`);
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
