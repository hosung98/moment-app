/*
 파일명 : PrivacyScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Header } from '../../components/common/Header';
import { SettingsSection } from '../../components/settings/SettingsSection';
import { ToggleItem } from '../../components/settings/ToggleItem';
import { SettingsItem } from '../../components/settings/SettingsItem';
import { useTheme } from '../../hooks/useTheme';
import { useSettingsStore } from '../../store/settingsStore';

export const PrivacyScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const privacy = useSettingsStore((s) => s.privacy);
  const setPrivacy = useSettingsStore((s) => s.setPrivacy);

  const VISIBILITY_LABELS = { public: '전체 공개', friends: '친구만', private: '비공개' };

  return (
    <SafeAreaWrapper>
      <Header title="개인정보 설정" showBack onBack={() => navigation.goBack()} />
      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 60 }}>
        <SettingsSection title="공개 설정">
          <SettingsItem
            icon="eye-outline"
            label="프로필 공개 범위"
            value={VISIBILITY_LABELS[privacy.profileVisibility]}
            onPress={() => {}}
          />
          <ToggleItem
            icon="location-outline"
            label="위치 정보 공유"
            value={privacy.locationSharing}
            onToggle={(v) => setPrivacy({ locationSharing: v })}
          />
          <ToggleItem
            icon="bar-chart-outline"
            label="활동 상태 표시"
            value={privacy.activityVisible}
            onToggle={(v) => setPrivacy({ activityVisible: v })}
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaWrapper>
  );
};
