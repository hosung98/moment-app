/*
 파일명 : NotificationScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Header } from '../../components/common/Header';
import { SettingsSection } from '../../components/settings/SettingsSection';
import { ToggleItem } from '../../components/settings/ToggleItem';
import { useTheme } from '../../hooks/useTheme';
import { useSettingsStore } from '../../store/settingsStore';

export const NotificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const notifications = useSettingsStore((s) => s.notifications);
  const setNotifications = useSettingsStore((s) => s.setNotifications);

  return (
    <SafeAreaWrapper>
      <Header title="알림 설정" showBack onBack={() => navigation.goBack()} />
      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 60 }}>
        <SettingsSection title="알림">
          <ToggleItem
            icon="chatbubble-outline"
            label="채팅 알림"
            value={notifications.chat}
            onToggle={(v) => setNotifications({ chat: v })}
          />
          <ToggleItem
            icon="heart-outline"
            label="좋아요 알림"
            value={notifications.likes}
            onToggle={(v) => setNotifications({ likes: v })}
          />
          <ToggleItem
            icon="people-outline"
            label="팔로우 알림"
            value={notifications.follows}
            onToggle={(v) => setNotifications({ follows: v })}
          />
          <ToggleItem
            icon="calendar-outline"
            label="여행 일정 알림"
            value={notifications.tripUpdates}
            onToggle={(v) => setNotifications({ tripUpdates: v })}
          />
          <ToggleItem
            icon="megaphone-outline"
            label="마케팅 정보 수신"
            value={notifications.marketing}
            onToggle={(v) => setNotifications({ marketing: v })}
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaWrapper>
  );
};
