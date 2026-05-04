/*
 파일명 : SettingsScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Header } from '../../components/common/Header';
import { SettingsSection } from '../../components/settings/SettingsSection';
import { SettingsItem } from '../../components/settings/SettingsItem';
import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';
import { useSettingsStore } from '../../store/settingsStore';
import type { MyPageStackParamList } from '../../types/navigation.types';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<MyPageStackParamList>>();
  const { colors } = useTheme();
  const logout = useAuthStore((s) => s.logout);
  const themeMode = useSettingsStore((s) => s.themeMode);
  const language = useSettingsStore((s) => s.language);

  const THEME_LABELS = { light: '라이트', dark: '다크', system: '시스템' };
  const LANG_LABELS = { ko: '한국어', en: 'English', ja: '日本語' };

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠어요?', [
      { text: '취소', style: 'cancel' },
      { text: '로그아웃', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <SafeAreaWrapper>
      <Header title="설정" showBack onBack={() => navigation.goBack()} />
      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 60 }}>
        <SettingsSection title="계정">
          <SettingsItem icon="person-outline" label="프로필 편집" onPress={() => navigation.navigate('ProfileEdit')} />
          <SettingsItem icon="notifications-outline" label="알림 설정" onPress={() => navigation.navigate('Notification')} />
        </SettingsSection>

        <SettingsSection title="화면">
          <SettingsItem
            icon="contrast-outline"
            label="테마"
            value={THEME_LABELS[themeMode]}
            onPress={() => navigation.navigate('Theme')}
          />
          <SettingsItem
            icon="language-outline"
            label="언어"
            value={LANG_LABELS[language]}
            onPress={() => navigation.navigate('Language')}
          />
        </SettingsSection>

        <SettingsSection title="개인정보">
          <SettingsItem icon="lock-closed-outline" label="개인정보 설정" onPress={() => navigation.navigate('Privacy')} />
        </SettingsSection>

        <SettingsSection title="데이터">
          <SettingsItem icon="cloud-download-outline" label="저장 공간 관리" onPress={() => navigation.navigate('Storage')} />
        </SettingsSection>

        <SettingsSection title="앱 정보">
          <SettingsItem icon="information-circle-outline" label="버전 정보" onPress={() => navigation.navigate('AppInfo')} />
        </SettingsSection>

        <SettingsSection title="계정 관리">
          <SettingsItem icon="log-out-outline" label="로그아웃" onPress={handleLogout} danger />
        </SettingsSection>
      </ScrollView>
    </SafeAreaWrapper>
  );
};
