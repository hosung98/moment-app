/*
 파일명 : globalStyles.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 - 여러 화면에서 반복되는 레이아웃 패턴 중앙화

 ─────────────────────────────────────────────────────
 [CSS(StyleSheet) 아키텍처 원칙]

 React Native StyleSheet는 컴포넌트 파일 안에 두는 게 표준입니다.
 이유: StyleSheet.create()는 네이티브 레이어에 "ID"로 등록되기 때문에
       파일을 분리해도 성능 차이가 없고, 오히려 컴포넌트-스타일 응집성이
       낮아져서 유지보수가 어려워집니다.

 ✅ 컴포넌트 파일 안 StyleSheet  → 각 컴포넌트 고유 스타일
 ✅ globalStyles.ts (이 파일)    → 반복되는 레이아웃 패턴만 추출
 ✅ theme.ts                     → 색상·폰트·여백 토큰
 ❌ 모든 스타일을 한 파일에 통합  → 오히려 Anti-pattern

 사용법:
   import { globalStyles as gs } from '@/styles/globalStyles';
   style={[gs.row, gs.flexCenter, { marginTop: 16 }]}
 ─────────────────────────────────────────────────────
*/
import { StyleSheet, Platform } from 'react-native';
import { scale, vScale, normalize } from '@/utils/responsive';
import { BorderRadius, Spacing } from '@/constants/theme';

export const globalStyles = StyleSheet.create({
  // ── Flex 레이아웃 ─────────────────────────────
  flex:            { flex: 1 },
  flexCenter:      { alignItems: 'center', justifyContent: 'center' },
  flexRow:         { flexDirection: 'row', alignItems: 'center' },
  flexBetween:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  flexEnd:         { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },

  // ── 스크롤 화면 공통 ──────────────────────────
  screen:          { flex: 1 },
  scrollContent:   { padding: Spacing.md, paddingBottom: vScale(100) },

  // ── 카드/패널 ─────────────────────────────────
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    // 색상은 theme.colors.card를 useTheme()에서 가져오므로 여기선 생략
  },

  // ── 구분선 ────────────────────────────────────
  divider: {
    height: StyleSheet.hairlineWidth, // 1px보다 얇은 네이티브 픽셀
    marginVertical: Spacing.sm,
  },

  // ── 폼 레이아웃 ───────────────────────────────
  formGroup:       { marginBottom: Spacing.md },
  inputLabel: {
    fontSize: normalize(14),
    fontWeight: '600',
    marginBottom: vScale(6),
  },

  // ── 하단 고정 버튼 영역 ───────────────────────
  bottomBar: {
    padding: Spacing.md,
    paddingBottom: Platform.OS === 'ios' ? vScale(28) : Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  // ── 텍스트 계층 ───────────────────────────────
  /** 화면/섹션 제목 */
  textTitle: {
    fontSize: normalize(20),
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  /** 본문 */
  textBody: {
    fontSize: normalize(14),
    lineHeight: normalize(14) * 1.5,
  },
  /** 보조 설명 */
  textCaption: {
    fontSize: normalize(12),
  },
  /** 레이블 */
  textLabel: {
    fontSize: normalize(13),
    fontWeight: '600',
  },

  // ── 공통 패딩 ────────────────────────────────
  pagePadding:     { paddingHorizontal: Spacing.md },
  sectionPadding:  { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md },
});
