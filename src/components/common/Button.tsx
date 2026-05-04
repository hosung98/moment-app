/*
 파일명 : Button.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 / 리팩토링 - 주석 강화
*/
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { scale, vScale, normalize } from '../../utils/responsive';

/**
 * 버튼 스타일 종류
 *
 * primary   — 주요 액션 (주황 배경, 흰 텍스트)
 * secondary — 보조 액션 (surface 배경, 테두리)
 * outline   — 강조 없는 주요 액션 (투명 배경, primary 테두리)
 * ghost     — 최소 강조 (투명 배경, primary 텍스트만)
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps {
  /** 버튼에 표시할 텍스트 */
  label: string;
  /** 버튼 클릭 시 실행할 함수 */
  onPress: () => void;
  /** 버튼 스타일 종류 (기본값: 'primary') */
  variant?: ButtonVariant;
  /** 비활성화 여부 — opacity 0.5 적용 + 터치 비활성 */
  disabled?: boolean;
  /** 로딩 중 여부 — ActivityIndicator로 대체 표시 */
  loading?: boolean;
  /** 추가 컨테이너 스타일 (margin 등) */
  style?: ViewStyle;
  /** 추가 텍스트 스타일 */
  textStyle?: TextStyle;
  /** true 시 부모 너비 100% 차지 */
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const { colors } = useTheme();

  // ──────────────────────────────────────────────
  // 스타일 배열 합성 패턴:
  // 1) 고정 base 스타일 (형태/크기)
  // 2) variant 스타일 (색상 - 테마 의존)
  // 3) 상태 스타일 (disabled)
  // 4) 외부 override style (마지막이라 우선순위 최고)
  // ──────────────────────────────────────────────
  const containerStyle = [
    styles.base,
    fullWidth && styles.fullWidth,
    variant === 'primary'   && { backgroundColor: colors.primary },
    variant === 'secondary' && { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
    variant === 'outline'   && { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary },
    variant === 'ghost'     && { backgroundColor: 'transparent' },
    (disabled || loading)   && styles.disabled,
    style,
  ];

  const labelStyle = [
    styles.label,
    variant === 'primary'   && { color: '#FFFFFF' },
    variant === 'secondary' && { color: colors.text },
    variant === 'outline'   && { color: colors.primary },
    variant === 'ghost'     && { color: colors.primary },
    textStyle,
  ];

  return (
    // disabled와 loading 모두 onPress 비활성화
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {/* 로딩 중엔 스피너 표시, 완료 시 텍스트 복귀 */}
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : colors.primary} size="small" />
      ) : (
        <Text style={labelStyle}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

// ──────────────────────────────────────────────────────────────
// [StyleSheet 분리 원칙]
// 색상처럼 테마에 따라 바뀌는 값은 useTheme()에서 가져와 인라인으로,
// 변경되지 않는 형태/크기 값만 StyleSheet.create()로 정의합니다.
// → StyleSheet.create()는 네이티브에 ID로 등록되어 bridge 트래픽 절감
// ──────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  base: {
    height: vScale(52),
    borderRadius: scale(16),
    paddingHorizontal: scale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { width: '100%' },
  label:     { fontSize: normalize(16), fontWeight: '600' },
  disabled:  { opacity: 0.5 },
});
