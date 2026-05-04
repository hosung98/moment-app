/*
 파일명 : ThemeScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Header } from '../../components/common/Header';
import { SettingsSection } from '../../components/settings/SettingsSection';
import { useTheme } from '../../hooks/useTheme';
import { useSettingsStore } from '../../store/settingsStore';
import type { ThemeMode } from '../../types/common.types';

const THEME_OPTIONS: { label: string; value: ThemeMode; icon: string }[] = [
  { label: '라이트 모드', value: 'light', icon: 'sunny-outline' },
  { label: '다크 모드', value: 'dark', icon: 'moon-outline' },
  { label: '시스템 설정 따르기', value: 'system', icon: 'phone-portrait-outline' },
];

export const ThemeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const themeMode = useSettingsStore((s) => s.themeMode);
  const setThemeMode = useSettingsStore((s) => s.setThemeMode);

  return (
    <SafeAreaWrapper>
      <Header title="테마 설정" showBack onBack={() => navigation.goBack()} />
      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ padding: 16 }}>
        <SettingsSection title="테마">
          {THEME_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[styles.option, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}
              onPress={() => setThemeMode(option.value)}
            >
              <View style={[styles.iconWrapper, { backgroundColor: colors.inputBg }]}>
                <Ionicons name={option.icon as any} size={20} color={colors.primary} />
              </View>
              <Text style={[styles.label, { color: colors.text }]}>{option.label}</Text>
              {themeMode === option.value && (
                <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </SettingsSection>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 14,
  },
  iconWrapper: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  label: { flex: 1, fontSize: 16 },
});
