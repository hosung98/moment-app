/*
 파일명 : Button.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
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

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
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

  const containerStyle = [
    styles.base,
    fullWidth && styles.fullWidth,
    variant === 'primary' && { backgroundColor: colors.primary },
    variant === 'secondary' && { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
    variant === 'outline' && { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary },
    variant === 'ghost' && { backgroundColor: 'transparent' },
    (disabled || loading) && styles.disabled,
    style,
  ];

  const labelStyle = [
    styles.label,
    variant === 'primary' && { color: '#FFFFFF' },
    variant === 'secondary' && { color: colors.text },
    variant === 'outline' && { color: colors.primary },
    variant === 'ghost' && { color: colors.primary },
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : colors.primary} size="small" />
      ) : (
        <Text style={labelStyle}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: vScale(52),
    borderRadius: scale(16),
    paddingHorizontal: scale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { width: '100%' },
  label: { fontSize: normalize(16), fontWeight: '600' },
  disabled: { opacity: 0.5 },
});
