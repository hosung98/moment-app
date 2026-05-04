/*
 파일명 : responsive.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/

/**
 * 반응형 레이아웃 유틸리티
 *
 * 사용법:
 *   import { wp, hp, scale, normalize, isTablet, layout } from '@/utils/responsive';
 *
 *   width: wp(90)         → 화면 너비의 90%
 *   height: hp(50)        → 화면 높이의 50%
 *   fontSize: normalize(16) → 기기별 적절한 폰트 크기
 *   padding: scale(16)    → 기기별 적절한 패딩
 */

import { Dimensions, PixelRatio, Platform } from 'react-native';

// 기준 디자인 해상도 (iPhone 14 기준)
const BASE_WIDTH  = 390;
const BASE_HEIGHT = 844;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/** 화면 너비의 비율(%) → px 변환 */
export const wp = (percentage: number): number => {
  return (SCREEN_WIDTH * percentage) / 100;
};

/** 화면 높이의 비율(%) → px 변환 */
export const hp = (percentage: number): number => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

/**
 * 수평 기준 스케일 (width, padding, margin, border 등에 사용)
 * @example padding: scale(16) → 소형/대형 화면 모두 비율 유지
 */
export const scale = (size: number): number => {
  return Math.round(PixelRatio.roundToNearestPixel(
    (SCREEN_WIDTH / BASE_WIDTH) * size,
  ));
};

/**
 * 수직 기준 스케일 (height, top/bottom 여백에 사용)
 */
export const vScale = (size: number): number => {
  return Math.round(PixelRatio.roundToNearestPixel(
    (SCREEN_HEIGHT / BASE_HEIGHT) * size,
  ));
};

/**
 * 폰트 크기 정규화 (접근성·가독성 우선)
 * 태블릿에서 지나치게 커지지 않도록 상한선 적용
 */
export const normalize = (size: number): number => {
  const scaledSize = (SCREEN_WIDTH / BASE_WIDTH) * size;
  const maxScale   = 1.3; // 최대 130% 확대
  const bounded    = Math.min(scaledSize, size * maxScale);
  return Math.round(PixelRatio.roundToNearestPixel(bounded));
};

/** 태블릿 여부 판단 (너비 600px 이상) */
export const isTablet = SCREEN_WIDTH >= 600;

/** 플랫폼별 그림자 유틸 */
export const shadow = (elevation = 4) =>
  Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: 0.12,
      shadowRadius: elevation,
    },
    android: { elevation },
    default: {},
  });

/** 화면 크기 상수 (직접 필요할 때 사용) */
export const layout = {
  screenWidth:  SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  isTablet,
  // 콘텐츠 영역 최대 너비 (태블릿에서 가운데 정렬용)
  contentWidth: isTablet ? Math.min(SCREEN_WIDTH * 0.75, 600) : SCREEN_WIDTH,
  // 공통 여백
  paddingH: scale(20),       // 좌우 기본 패딩
  paddingV: vScale(16),      // 상하 기본 패딩
  borderRadius: scale(16),   // 공통 border radius
};
