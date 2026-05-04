/*
 파일명 : Header.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { scale, vScale, normalize } from '../../utils/responsive';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  rightLabel?: string;
  onRightPress?: () => void;
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack,
  onBack,
  rightIcon,
  rightLabel,
  onRightPress,
  transparent,
}) => {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: transparent ? 'transparent' : colors.surface,
          borderBottomColor: transparent ? 'transparent' : colors.border,
        },
      ]}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity onPress={onBack} style={styles.iconBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
      {title && <Text style={[styles.title, { color: colors.text }]}>{title}</Text>}
      <View style={styles.right}>
        {(rightIcon || rightLabel) && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconBtn}>
            {rightIcon ? (
              <Ionicons name={rightIcon} size={24} color={colors.text} />
            ) : (
              <Text style={[styles.rightLabel, { color: colors.primary }]}>{rightLabel}</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: vScale(56),
    paddingHorizontal: scale(16),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  left: { width: scale(40), alignItems: 'flex-start' },
  right: { width: scale(40), alignItems: 'flex-end' },
  title: { fontSize: normalize(17), fontWeight: '700', flex: 1, textAlign: 'center' },
  iconBtn: { padding: scale(4) },
  rightLabel: { fontSize: normalize(15), fontWeight: '600' },
});
