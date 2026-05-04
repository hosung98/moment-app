/*
 파일명 : TripScheduleScreen.tsx
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
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Header } from '../../components/common/Header';
import { useTheme } from '../../hooks/useTheme';
import { useTripStore } from '../../store/tripStore';
import type { HomeStackParamList } from '../../types/navigation.types';

export const TripScheduleScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<HomeStackParamList, 'TripSchedule'>>();
  const { colors } = useTheme();
  const trips = useTripStore((s) => s.trips);
  const trip = trips.find((t) => t.id === route.params.tripId);

  if (!trip) return null;

  return (
    <SafeAreaWrapper>
      <Header title="여행 일정" showBack onBack={() => navigation.goBack()} />
      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {trip.days.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="calendar-outline" size={56} color={colors.border} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>일정이 없어요</Text>
            <Text style={[styles.emptyMsg, { color: colors.textMuted }]}>첫 번째 일정을 추가해보세요!</Text>
          </View>
        ) : (
          trip.days.map((day) => (
            <View key={day.dayNumber} style={styles.daySection}>
              <View style={[styles.dayHeader, { backgroundColor: colors.primary }]}>
                <Text style={styles.dayNumber}>Day {day.dayNumber}</Text>
                <Text style={styles.dayDate}>{day.date}</Text>
              </View>
              {day.schedules.map((item, idx) => (
                <View key={item.id} style={[styles.scheduleItem, { backgroundColor: colors.surface }]}>
                  <View style={styles.timelineLeft}>
                    <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                    {idx < day.schedules.length - 1 && <View style={[styles.line, { backgroundColor: colors.border }]} />}
                  </View>
                  <View style={[styles.scheduleContent, { borderBottomColor: colors.border }]}>
                    <Text style={[styles.time, { color: colors.primary }]}>{item.time}</Text>
                    <Text style={[styles.itemTitle, { color: colors.text }]}>{item.title}</Text>
                    {item.description && (
                      <Text style={[styles.itemDesc, { color: colors.textSecondary }]}>{item.description}</Text>
                    )}
                    {item.duration && (
                      <View style={styles.metaRow}>
                        <Ionicons name="time-outline" size={12} color={colors.textMuted} />
                        <Text style={[styles.meta, { color: colors.textMuted }]}>{item.duration}분</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          ))
        )}

        <TouchableOpacity style={[styles.addDayBtn, { borderColor: colors.primary }]}>
          <Ionicons name="add" size={20} color={colors.primary} />
          <Text style={[styles.addDayText, { color: colors.primary }]}>일정 추가</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  empty: { alignItems: 'center', paddingTop: 80, gap: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700' },
  emptyMsg: { fontSize: 14 },
  daySection: { marginBottom: 20 },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  dayNumber: { color: '#fff', fontWeight: '800', fontSize: 15 },
  dayDate: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  scheduleItem: { flexDirection: 'row', borderRadius: 12, overflow: 'hidden' },
  timelineLeft: { width: 32, alignItems: 'center', paddingTop: 14, paddingBottom: 0 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  line: { width: 2, flex: 1, marginTop: 4 },
  scheduleContent: { flex: 1, padding: 14, borderBottomWidth: StyleSheet.hairlineWidth },
  time: { fontSize: 12, fontWeight: '700', marginBottom: 4 },
  itemTitle: { fontSize: 15, fontWeight: '700' },
  itemDesc: { fontSize: 13, marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  meta: { fontSize: 12 },
  addDayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    gap: 8,
    marginTop: 8,
  },
  addDayText: { fontSize: 15, fontWeight: '700' },
});
