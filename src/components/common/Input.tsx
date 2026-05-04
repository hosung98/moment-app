/*
 파일명 : Input.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 / 리팩토링 - leftIcon을 ReactNode로 변경, 주석 보강
*/
import React, { useState, ReactNode } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { scale, vScale, normalize } from '../../utils/responsive';

interface InputProps {
  /** 입력 필드 위에 표시되는 레이블 */
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  /** 에러 메시지 — 있으면 필드 아래 빨간 텍스트로 표시 + 테두리 빨간색 */
  error?: string;
  /** true 시 비밀번호 마스킹 + 우측에 보기/숨기기 토글 자동 생성 */
  secureTextEntry?: boolean;
  /**
   * 좌측 아이콘 — ReactNode로 JSX 요소 전달
   * 아이콘 색상을 useTheme()으로 동적 적용하려면 JSX 형태로 넘겨야 함
   *
   * @example
   * leftIcon={<Ionicons name="mail-outline" size={18} color={colors.textMuted} />}
   */
  leftIcon?: ReactNode;
  /** 우측 아이콘 이름 (Ionicons 키) — secureTextEntry가 없을 때만 적용 */
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  /** 기본값 'none' — 자동 대문자 변환 방지 (이메일/아이디 입력 시 중요) */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: ViewStyle;
  multiline?: boolean;
  numberOfLines?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry,
  leftIcon,
  rightIcon,
  onRightIconPress,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style,
  multiline,
  numberOfLines,
}) => {
  const { colors } = useTheme();
  // focused 상태: 포커스 시 테두리를 primary 색상으로 강조
  const [focused, setFocused] = useState(false);
  // 비밀번호 표시 토글 (secureTextEntry 전용)
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry;

  // ──────────────────────────────────────────────
  // 테두리 색상 우선순위:
  // 1) 포커스 중   → primary (파란/주황 강조)
  // 2) 에러 있음   → error (빨간색)
  // 3) 기본 상태   → border (회색)
  // ──────────────────────────────────────────────
  const borderColor = focused ? colors.primary : error ? colors.error : colors.border;

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      <View style={[styles.container, { backgroundColor: colors.inputBg, borderColor }]}>
        {/* 좌측 아이콘: ReactNode를 그대로 렌더링 */}
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={[styles.input, { color: colors.text, flex: 1 }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />

        {/* 우측 아이콘: 비밀번호 필드면 보기/숨기기 토글, 아니면 rightIcon prop 사용 */}
        {isPassword ? (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.rightIcon}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            <Ionicons name={rightIcon} size={20} color={colors.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* 에러 메시지 */}
      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper:   { marginBottom: scale(16) },
  label:     { fontSize: normalize(14), fontWeight: '600', marginBottom: scale(8) },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    minHeight: vScale(52),
  },
  input:     { fontSize: normalize(16), paddingVertical: vScale(14) },
  leftIcon:  { marginRight: scale(10) },
  rightIcon: { padding: scale(4) },
  error:     { fontSize: normalize(12), marginTop: scale(6), marginLeft: scale(4) },
});
