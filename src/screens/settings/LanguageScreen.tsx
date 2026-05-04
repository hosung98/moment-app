/*
 파일명 : LanguageScreen.tsx
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
import type { Language } from '../../types/common.types';

const LANG_OPTIONS: { label: string; native: string; value: Language; flag: string }[] = [
  { label: '한국어', native: '한국어', value: 'ko', flag: '🇰🇷' },
  { label: 'English', native: 'English', value: 'en', flag: '🇺🇸' },
  { label: '日本語', native: '日本語', value: 'ja', flag: '🇯🇵' },
];

export const LanguageScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);

  return (
    <SafeAreaWrapper>
      <Header title="언어 설정" showBack onBack={() => navigation.goBack()} />
      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ padding: 16 }}>
        <SettingsSection title="언어">
          {LANG_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[styles.option, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}
              onPress={() => setLanguage(opt.value)}
            >
              <Text style={styles.flag}>{opt.flag}</Text>
              <View style={styles.labelGroup}>
                <Text style={[styles.label, { color: colors.text }]}>{opt.label}</Text>
                <Text style={[styles.native, { color: colors.textMuted }]}>{opt.native}</Text>
              </View>
              {language === opt.value && (
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
  flag: { fontSize: 28 },
  labelGroup: { flex: 1 },
  label: { fontSize: 16, fontWeight: '600' },
  native: { fontSize: 12, marginTop: 2 },
});
