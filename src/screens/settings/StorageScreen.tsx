/*
 파일명 : StorageScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { View, Text, ScrollView, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Header } from '../../components/common/Header';
import { SettingsSection } from '../../components/settings/SettingsSection';
import { SettingsItem } from '../../components/settings/SettingsItem';
import { ToggleItem } from '../../components/settings/ToggleItem';
import { useTheme } from '../../hooks/useTheme';
import { useSettingsStore } from '../../store/settingsStore';

export const StorageScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const offlineMode = useSettingsStore((s) => s.offlineMode);
  const autoSavePhotos = useSettingsStore((s) => s.autoSavePhotos);
  const setOfflineMode = useSettingsStore((s) => s.setOfflineMode);
  const setAutoSavePhotos = useSettingsStore((s) => s.setAutoSavePhotos);

  const clearCache = () => {
    Alert.alert('캐시 삭제', '저장된 캐시를 모두 삭제하시겠어요?', [
      { text: '취소', style: 'cancel' },
      { text: '삭제', style: 'destructive', onPress: () => Alert.alert('완료', '캐시가 삭제되었습니다.') },
    ]);
  };

  return (
    <SafeAreaWrapper>
      <Header title="저장 공간 관리" showBack onBack={() => navigation.goBack()} />
      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 60 }}>
        {/* Storage Info */}
        <View style={[styles.storageCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.storageTitle, { color: colors.text }]}>저장 공간 사용량</Text>
          <Text style={[styles.storageUsed, { color: colors.primary }]}>128 MB</Text>
          <View style={[styles.storageBar, { backgroundColor: colors.border }]}>
            <View style={[styles.storageBarFill, { backgroundColor: colors.primary, width: '26%' }]} />
          </View>
          <Text style={[styles.storageSub, { color: colors.textMuted }]}>총 500 MB 중 128 MB 사용</Text>
        </View>

        <SettingsSection title="설정">
          <ToggleItem
            icon="cloud-offline-outline"
            label="오프라인 모드"
            value={offlineMode}
            onToggle={setOfflineMode}
          />
          <ToggleItem
            icon="images-outline"
            label="자동 사진 저장"
            value={autoSavePhotos}
            onToggle={setAutoSavePhotos}
          />
        </SettingsSection>

        <SettingsSection title="데이터 관리">
          <SettingsItem icon="trash-outline" label="캐시 삭제" onPress={clearCache} danger />
        </SettingsSection>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  storageCard: { borderRadius: 16, padding: 20, marginBottom: 16 },
  storageTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  storageUsed: { fontSize: 32, fontWeight: '800', marginBottom: 12 },
  storageBar: { height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
  storageBarFill: { height: '100%', borderRadius: 4 },
  storageSub: { fontSize: 13 },
});
