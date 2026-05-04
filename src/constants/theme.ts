/*
 파일명 : theme.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 / 반응형 Typography·Spacing·BorderRadius 적용
*/

import { normalize, scale, vScale } from '@/utils/responsive';

export const Colors = {
  light: {
    primary: '#FF6B35',
    primaryLight: '#FF8C5A',
    primaryDark: '#E55A2B',
    background: '#FFF8F0',
    surface: '#FFFFFF',
    text: '#1A1F36',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#E5E7EB',
    card: '#FFFFFF',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#3B82F6',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E5E7EB',
    tabBarActive: '#FF6B35',
    tabBarInactive: '#9CA3AF',
    overlay: 'rgba(0,0,0,0.5)',
    inputBg: '#F9FAFB',
    skeleton: '#E5E7EB',
    skeletonHighlight: '#F3F4F6',
    badge: '#FF6B35',
    badgeText: '#FFFFFF',
    chatBubbleSelf: '#FF6B35',
    chatBubbleOther: '#F3F4F6',
    chatTextSelf: '#FFFFFF',
    chatTextOther: '#1A1F36',
  },
  dark: {
    primary: '#FF6B35',
    primaryLight: '#FF8C5A',
    primaryDark: '#E55A2B',
    background: '#0F1117',
    surface: '#1A1F36',
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    textMuted: '#6B7280',
    border: '#374151',
    card: '#1E2340',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#3B82F6',
    tabBar: '#1A1F36',
    tabBarBorder: '#374151',
    tabBarActive: '#FF6B35',
    tabBarInactive: '#6B7280',
    overlay: 'rgba(0,0,0,0.7)',
    inputBg: '#1E2340',
    skeleton: '#374151',
    skeletonHighlight: '#4B5563',
    badge: '#FF6B35',
    badgeText: '#FFFFFF',
    chatBubbleSelf: '#FF6B35',
    chatBubbleOther: '#2D3748',
    chatTextSelf: '#FFFFFF',
    chatTextOther: '#F9FAFB',
  },
} as const;

/** 폰트 크기 — normalize()로 기기별 자동 조정 */
export const Typography = {
  xs:    normalize(12),
  sm:    normalize(14),
  base:  normalize(16),
  lg:    normalize(18),
  xl:    normalize(20),
  '2xl': normalize(24),
  '3xl': normalize(30),
  '4xl': normalize(36),
} as const;

/** 여백 — scale()/vScale()로 기기별 자동 조정 */
export const Spacing = {
  xs:    scale(4),
  sm:    scale(8),
  md:    scale(16),
  lg:    scale(24),
  xl:    scale(32),
  '2xl': scale(48),
} as const;

/** 수직 여백 */
export const SpacingV = {
  xs:    vScale(4),
  sm:    vScale(8),
  md:    vScale(16),
  lg:    vScale(24),
  xl:    vScale(32),
  '2xl': vScale(48),
} as const;

/** 모서리 반지름 */
export const BorderRadius = {
  sm:   scale(8),
  md:   scale(12),
  lg:   scale(16),
  xl:   scale(24),
  full: 9999,
} as const;

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  xl: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;
