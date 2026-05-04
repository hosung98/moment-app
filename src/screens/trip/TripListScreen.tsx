/*
 파일명 : TripListScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { TripCard } from '../../components/trip/TripCard';
import { Chip } from '../../components/common/Chip';
import { EmptyState } from '../../components/common/EmptyState';
import { useTheme } from '../../hooks/useTheme';
import { useTripStore } from '../../store/tripStore';
import type { HomeStackParamList } from '../../types/navigation.types';
import type { TripStatus } from '../../types/trip.types';

const STATUS_TABS: { label: string; value: TripStatus | 'all' }[] = [
  { label: '전체', value: 'all' },
  { label: '예정', value: 'upcoming' },
  { label: '진행 중', value: 'ongoing' },
  { label: '완료', value: 'completed' },
];

export const TripListScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const { colors } = useTheme();
  const trips = useTripStore((s) => s.trips);
  const [activeStatus, setActiveStatus] = useState<TripStatus | 'all'>('all');

  const filtered = activeStatus === 'all' ? trips : trips.filter((t) => t.status === activeStatus);

  return (
    <SafeAreaWrapper>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>여행 목록</Text>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: colors.primary }]}
          onPress={() => {}}
        >
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Status Filter */}
      <View style={[styles.filterBar, { backgroundColor: colors.surface }]}>
        <FlatList
          data={STATUS_TABS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.value}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
          renderItem={({ item }) => (
            <Chip
              label={item.label}
              selected={activeStatus === item.value}
              onPress={() => setActiveStatus(item.value)}
            />
          )}
        />
      </View>

      {filtered.length === 0 ? (
        <EmptyState
          title="여행이 없어요"
          message="새로운 여행을 계획해보세요!"
          icon="airplane-outline"
          actionLabel="여행 만들기"
          onAction={() => {}}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          style={{ backgroundColor: colors.background }}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TripCard
              trip={item}
              onPress={() => navigation.navigate('TripDetail', { tripId: item.id })}
            />
          )}
        />
      )}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: { padding: 4 },
  title: { fontSize: 20, fontWeight: '800' },
  addBtn: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  filterBar: { paddingVertical: 12 },
  list: { padding: 16, paddingBottom: 100 },
});
