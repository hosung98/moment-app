/*
 파일명 : SettingsSection.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface SettingsSectionProps {
  title?: string;
  children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.section}>
      {title && (
        <Text style={[styles.title, { color: colors.textMuted }]}>{title}</Text>
      )}
      <View style={[styles.content, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginBottom: 24 },
  title: { fontSize: 13, fontWeight: '600', marginLeft: 16, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  content: { borderRadius: 16, overflow: 'hidden', borderWidth: StyleSheet.hairlineWidth },
});
