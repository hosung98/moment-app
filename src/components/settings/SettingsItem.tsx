/*
 파일명 : SettingsItem.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  label: string;
  value?: string;
  onPress?: () => void;
  showArrow?: boolean;
  rightElement?: React.ReactNode;
  danger?: boolean;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  iconColor,
  label,
  value,
  onPress,
  showArrow = true,
  rightElement,
  danger,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.item, { borderBottomColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={[styles.iconWrapper, { backgroundColor: (iconColor || colors.primary) + '20' }]}>
        <Ionicons name={icon} size={20} color={iconColor || colors.primary} />
      </View>
      <Text style={[styles.label, { color: danger ? colors.error : colors.text }]}>{label}</Text>
      <View style={styles.right}>
        {value && <Text style={[styles.value, { color: colors.textMuted }]}>{value}</Text>}
        {rightElement}
        {showArrow && !rightElement && (
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  label: { flex: 1, fontSize: 16 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  value: { fontSize: 14 },
});
