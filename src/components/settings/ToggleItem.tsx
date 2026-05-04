/*
 파일명 : ToggleItem.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SettingsItem } from './SettingsItem';
import { useTheme } from '../../hooks/useTheme';

interface ToggleItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  label: string;
  value: boolean;
  onToggle: (value: boolean) => void;
}

export const ToggleItem: React.FC<ToggleItemProps> = ({
  icon,
  iconColor,
  label,
  value,
  onToggle,
}) => {
  const { colors } = useTheme();

  return (
    <SettingsItem
      icon={icon}
      iconColor={iconColor}
      label={label}
      showArrow={false}
      rightElement={
        <Switch
          value={value}
          onValueChange={(v) => onToggle(v)}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor="#fff"
        />
      }
    />
  );
};
