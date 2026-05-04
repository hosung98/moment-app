/*
 파일명 : Input.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
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
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
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
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry;

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      <View
        style={[
          styles.container,
          { backgroundColor: colors.inputBg, borderColor: focused ? colors.primary : (error ? colors.error : colors.border) },
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIcon}>{leftIcon}</View>
        )}
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
        {isPassword ? (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.rightIcon}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textMuted} />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            <Ionicons name={rightIcon} size={20} color={colors.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>
      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: scale(16) },
  label: { fontSize: normalize(14), fontWeight: '600', marginBottom: scale(8) },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    minHeight: vScale(52),
  },
  input: { fontSize: normalize(16), paddingVertical: vScale(14) },
  leftIcon: { marginRight: scale(10) },
  rightIcon: { padding: scale(4) },
  error: { fontSize: normalize(12), marginTop: scale(6), marginLeft: scale(4) },
});
