/*
 파일명 : AppInfoScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Header } from '../../components/common/Header';
import { SettingsSection } from '../../components/settings/SettingsSection';
import { SettingsItem } from '../../components/settings/SettingsItem';
import { useTheme } from '../../hooks/useTheme';

export const AppInfoScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaWrapper>
      <Header title="앱 정보" showBack onBack={() => navigation.goBack()} />
      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 60 }}>
        {/* App Logo */}
        <View style={[styles.logoCard, { backgroundColor: colors.surface }]}>
          <View style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
            <Text style={styles.logoText}>모먼</Text>
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>모먼 (Moment)</Text>
          <Text style={[styles.version, { color: colors.textMuted }]}>버전 1.0.0</Text>
        </View>

        <SettingsSection title="법적 정보">
          <SettingsItem
            icon="document-text-outline"
            label="이용약관"
            onPress={() => Linking.openURL('https://moment-app.com/terms')}
          />
          <SettingsItem
            icon="shield-outline"
            label="개인정보 처리방침"
            onPress={() => Linking.openURL('https://moment-app.com/privacy')}
          />
        </SettingsSection>

        <SettingsSection title="지원">
          <SettingsItem
            icon="mail-outline"
            label="문의하기"
            onPress={() => Linking.openURL('mailto:support@moment-app.com')}
          />
          <SettingsItem
            icon="star-outline"
            label="앱 평가하기"
            onPress={() => {}}
          />
        </SettingsSection>

        <SettingsSection title="정보">
          <SettingsItem icon="code-slash-outline" label="앱 버전" value="1.0.0" />
          <SettingsItem icon="build-outline" label="빌드 번호" value="100" />
        </SettingsSection>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  logoCard: { borderRadius: 20, padding: 32, alignItems: 'center', marginBottom: 16 },
  logoCircle: { width: 80, height: 80, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  logoText: { color: '#fff', fontSize: 22, fontWeight: '900' },
  appName: { fontSize: 22, fontWeight: '800', marginBottom: 6 },
  version: { fontSize: 14 },
});
