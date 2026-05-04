/*
 파일명 : queryKeys.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 - React Query 키 팩토리 패턴
*/

/**
 * [왜 키 팩토리인가?]
 * - 하드코딩 문자열 대신 타입 안전한 함수로 관리
 * - queryClient.invalidateQueries(queryKeys.blog.all()) 처럼 계층적 무효화 가능
 * - 키 변경 시 한 곳만 수정
 */

export const queryKeys = {
  // ── 인증 ─────────────────────────────────────
  auth: {
    all: () => ['auth'] as const,
    me: () => ['auth', 'me'] as const,
  },

  // ── 블로그 ────────────────────────────────────
  blog: {
    all: () => ['blog'] as const,
    feeds: () => ['blog', 'feeds'] as const,
    feed: (page: number) => ['blog', 'feeds', page] as const,
    infiniteFeed: (filter?: string) => ['blog', 'feeds', 'infinite', filter] as const,
    detail: (id: string) => ['blog', 'detail', id] as const,
    comments: (postId: string) => ['blog', 'comments', postId] as const,
    myPosts: (userId: string) => ['blog', 'my', userId] as const,
  },

  // ── 여행 ─────────────────────────────────────
  trip: {
    all: () => ['trip'] as const,
    list: (status?: string) => ['trip', 'list', status] as const,
    detail: (id: string) => ['trip', 'detail', id] as const,
    checklist: (tripId: string) => ['trip', 'checklist', tripId] as const,
    schedule: (tripId: string) => ['trip', 'schedule', tripId] as const,
    members: (tripId: string) => ['trip', 'members', tripId] as const,
  },

  // ── 경비 ─────────────────────────────────────
  expense: {
    all: () => ['expense'] as const,
    list: (tripId: string) => ['expense', 'list', tripId] as const,
    summary: (tripId: string) => ['expense', 'summary', tripId] as const,
  },

  // ── 탐색 ─────────────────────────────────────
  explore: {
    all: () => ['explore'] as const,
    places: (params?: Record<string, unknown>) => ['explore', 'places', params] as const,
    placeDetail: (id: string) => ['explore', 'place', id] as const,
    nearby: (lat: number, lng: number) => ['explore', 'nearby', lat, lng] as const,
  },

  // ── 채팅 ─────────────────────────────────────
  chat: {
    all: () => ['chat'] as const,
    rooms: () => ['chat', 'rooms'] as const,
    messages: (roomId: string) => ['chat', 'messages', roomId] as const,
  },

  // ── 챌린지 ───────────────────────────────────
  challenge: {
    all: () => ['challenge'] as const,
    list: () => ['challenge', 'list'] as const,
    my: (userId: string) => ['challenge', 'my', userId] as const,
  },

  // ── 사용자 ───────────────────────────────────
  user: {
    all: () => ['user'] as const,
    profile: (id: string) => ['user', 'profile', id] as const,
  },
};

// 타입 추출 유틸 (useQuery 타입 추론 보조)
export type QueryKeys = typeof queryKeys;
