/*
 파일명 : ChallengeScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Header } from '../../components/common/Header';
import { useTheme } from '../../hooks/useTheme';
import { MOCK_CHALLENGES } from '../../constants/mockData';

export const ChallengeScreen: React.FC = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');

  const filtered = MOCK_CHALLENGES.filter((c) =>
    activeTab === 'ongoing' ? !c.isCompleted : c.isCompleted
  );

  return (
    <SafeAreaWrapper>
      <Header title="챌린지" />

      {/* Stats */}
      <View style={[styles.statsRow, { backgroundColor: colors.surface }]}>
        {[
          { label: '달성', value: MOCK_CHALLENGES.filter((c) => c.isCompleted).length, color: colors.primary },
          { label: '진행 중', value: MOCK_CHALLENGES.filter((c) => !c.isCompleted).length, color: '#4ECDC4' },
          { label: '전체', value: MOCK_CHALLENGES.length, color: colors.textSecondary },
        ].map((stat) => (
          <View key={stat.label} style={styles.statItem}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Tabs */}
      <View style={[styles.tabBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        {[
          { label: '진행 중', value: 'ongoing' as const },
          { label: '완료', value: 'completed' as const },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.value}
            style={[styles.tab, activeTab === tab.value && { borderBottomColor: colors.primary }]}
            onPress={() => setActiveTab(tab.value)}
          >
            <Text style={[styles.tabText, { color: activeTab === tab.value ? colors.primary : colors.textSecondary }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={[styles.challengeCard, { backgroundColor: colors.surface }]}>
            <View style={styles.challengeHeader}>
              <Text style={styles.challengeIcon}>{item.icon}</Text>
              <View style={styles.challengeInfo}>
                <Text style={[styles.challengeTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.challengeDesc, { color: colors.textSecondary }]}>{item.description}</Text>
              </View>
              {item.isCompleted && (
                <View style={[styles.completedBadge, { backgroundColor: colors.primary }]}>
                  <Ionicons name="checkmark" size={14} color="#fff" />
                </View>
              )}
            </View>
            {!item.isCompleted && (
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                    {item.currentCount}/{item.targetCount}
                  </Text>
                  <Text style={[styles.progressPct, { color: colors.primary }]}>
                    {Math.round((item.currentCount / item.targetCount) * 100)}%
                  </Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        backgroundColor: colors.primary,
                        width: `${(item.currentCount / item.targetCount) * 100}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            )}
            <View style={styles.rewardRow}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={[styles.rewardText, { color: colors.textMuted }]}>{item.rewardPoints} 포인트</Text>
              <View style={[styles.categoryTag, { backgroundColor: colors.inputBg }]}>
                <Text style={[styles.categoryText, { color: colors.textSecondary }]}>{item.category}</Text>
              </View>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  statsRow: { flexDirection: 'row', padding: 16 },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: '800' },
  statLabel: { fontSize: 13, marginTop: 4 },
  tabBar: { flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabText: { fontSize: 15, fontWeight: '700' },
  challengeCard: { borderRadius: 20, padding: 16 },
  challengeHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  challengeIcon: { fontSize: 36 },
  challengeInfo: { flex: 1 },
  challengeTitle: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
  challengeDesc: { fontSize: 14, lineHeight: 20 },
  completedBadge: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  progressSection: { marginBottom: 12 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressText: { fontSize: 13 },
  progressPct: { fontSize: 13, fontWeight: '700' },
  progressBar: { height: 8, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  rewardRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rewardText: { fontSize: 13, flex: 1 },
  categoryTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  categoryText: { fontSize: 12, fontWeight: '600' },
});
