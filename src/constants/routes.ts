/*
 파일명 : routes.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/

/**
 * 화면 이동(내비게이션) 경로명 상수 모음
 *
 * React Navigation 에서 문자열 오타를 방지하기 위해
 * 모든 스크린 이름을 이 파일에서 중앙 관리합니다.
 *
 * 사용법:
 *   import { ROUTES } from '@/constants/routes';
 *   navigation.navigate(ROUTES.TRIP_DETAIL, { tripId: '123' });
 */

export const ROUTES = {
  // ─── 인증 ────────────────────────────────────────────────
  SPLASH:          'Splash',
  ONBOARDING:      'Onboarding',
  LOGIN:           'Login',

  // ─── 메인 탭 ──────────────────────────────────────────────
  MAIN:            'Main',
  HOME:            'Home',
  EXPLORE:         'Explore',
  BLOG_FEED:       'BlogFeed',
  CHAT_LIST:       'ChatList',
  MY_PAGE:         'MyPage',

  // ─── 탐색 ─────────────────────────────────────────────────
  PLACE_DETAIL:    'PlaceDetail',

  // ─── 여행 ─────────────────────────────────────────────────
  TRIP_LIST:       'TripList',
  TRIP_DETAIL:     'TripDetail',
  TRIP_CREATE:     'TripCreate',
  TRIP_EDIT:       'TripEdit',
  TRIP_SCHEDULE:   'TripSchedule',
  TRIP_CHECKLIST:  'TripChecklist',

  // ─── 블로그 ───────────────────────────────────────────────
  BLOG_DETAIL:     'BlogDetail',
  BLOG_COMMENT:    'BlogComment',
  BLOG_WRITE:      'BlogWrite',

  // ─── 채팅 ─────────────────────────────────────────────────
  CHAT_ROOM:       'ChatRoom',

  // ─── 경비 ─────────────────────────────────────────────────
  EXPENSE:         'Expense',
  EXPENSE_ADD:     'ExpenseAdd',

  // ─── 챌린지 ───────────────────────────────────────────────
  CHALLENGE:       'Challenge',

  // ─── 마이페이지 ────────────────────────────────────────────
  PROFILE_EDIT:    'ProfileEdit',

  // ─── 설정 ─────────────────────────────────────────────────
  SETTINGS:        'Settings',
  NOTIFICATION:    'Notification',
  PRIVACY:         'Privacy',
  THEME:           'Theme',
  LANGUAGE:        'Language',
  STORAGE:         'Storage',
  APP_INFO:        'AppInfo',
} as const;

/** ROUTES 값의 유니온 타입 — navigation.navigate() 파라미터 타입에 활용 */
export type RouteKeys = (typeof ROUTES)[keyof typeof ROUTES];
