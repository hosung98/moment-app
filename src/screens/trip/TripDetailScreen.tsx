/*
 파일명 : TripDetailScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Avatar } from '../../components/common/Avatar';
import { useTheme } from '../../hooks/useTheme';
import { useTripStore } from '../../store/tripStore';
import { formatDate, getDDay, getTripDuration } from '../../utils/date';
import type { HomeStackParamList } from '../../types/navigation.types';

export const TripDetailScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'TripDetail'>>();
  const { colors } = useTheme();
  const trips = useTripStore((s) => s.trips);
  const deleteTrip = useTripStore((s) => s.deleteTrip);
  const trip = trips.find((t) => t.id === route.params.tripId);

  if (!trip) return null;

  const duration = getTripDuration(trip.startDate, trip.endDate);
  const checkedCount = trip.checklist.filter((c) => c.isCompleted).length;

  const handleDelete = () => {
    Alert.alert('여행 삭제', '정말 이 여행을 삭제하시겠어요?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          deleteTrip(trip.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <SafeAreaWrapper>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Cover */}
        <View style={styles.coverWrapper}>
          {trip.coverImage ? (
            <Image source={{ uri: trip.coverImage }} style={styles.cover} />
          ) : (
            <View style={[styles.coverPlaceholder, { backgroundColor: colors.primary }]}>
              <Ionicons name="airplane" size={48} color="#fff" />
            </View>
          )}
          <View style={styles.overlay} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreBtn} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.coverContent}>
            <View style={styles.ddayBadge}>
              <Text style={styles.ddayText}>{getDDay(trip.startDate)}</Text>
            </View>
            <Text style={styles.coverTitle}>{trip.title}</Text>
            <View style={styles.coverMeta}>
              <Ionicons name="location-outline" size={14} color="rgba(255,255,255,0.9)" />
              <Text style={styles.coverMetaText}>{trip.destination}</Text>
              <Text style={styles.coverSep}>·</Text>
              <Text style={styles.coverMetaText}>{duration - 1}박{duration}일</Text>
            </View>
            <Text style={styles.coverDates}>
              {formatDate(trip.startDate)} ~ {formatDate(trip.endDate)}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={[styles.quickActions, { backgroundColor: colors.surface }]}>
          {[
            { icon: 'calendar-outline', label: '일정', action: () => navigation.navigate('TripSchedule', { tripId: trip.id }) },
            { icon: 'checkmark-circle-outline', label: '체크리스트', action: () => navigation.navigate('TripChecklist', { tripId: trip.id }) },
            { icon: 'cash-outline', label: '경비', action: () => navigation.navigate('Expense', { tripId: trip.id }) },
            { icon: 'create-outline', label: '편집', action: () => navigation.navigate('TripEdit', { tripId: trip.id }) },
          ].map((item) => (
            <TouchableOpacity key={item.label} style={styles.quickAction} onPress={item.action}>
              <View style={[styles.quickActionIcon, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name={item.icon as any} size={22} color={colors.primary} />
              </View>
              <Text style={[styles.quickActionLabel, { color: colors.textSecondary }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Members */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>여행 멤버</Text>
            <TouchableOpacity>
              <Text style={[styles.invite, { color: colors.primary }]}>+ 초대</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.membersRow}>
            {trip.members.map((member) => (
              <View key={member.id} style={styles.memberItem}>
                <Avatar uri={member.profileImage} name={member.nickname} size={52} />
                <Text style={[styles.memberName, { color: colors.textSecondary }]} numberOfLines={1}>
                  {member.nickname}
                </Text>
                {member.role === 'owner' && (
                  <View style={[styles.ownerBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.ownerText}>방장</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Checklist Preview */}
        <View style={[styles.section, { backgroundColor: colors.surface, marginTop: 8 }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              준비물 체크리스트 ({checkedCount}/{trip.checklist.length})
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('TripChecklist', { tripId: trip.id })}>
              <Text style={[styles.invite, { color: colors.primary }]}>전체보기</Text>
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.primary,
                  width: `${trip.checklist.length > 0 ? (checkedCount / trip.checklist.length) * 100 : 0}%`,
                },
              ]}
            />
          </View>

          {trip.checklist.slice(0, 4).map((item) => (
            <View key={item.id} style={[styles.checklistItem, { borderBottomColor: colors.border }]}>
              <Ionicons
                name={item.isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
                size={22}
                color={item.isCompleted ? colors.success : colors.border}
              />
              <Text
                style={[
                  styles.checklistText,
                  { color: item.isCompleted ? colors.textMuted : colors.text },
                  item.isCompleted && styles.checklistTextDone,
                ]}
              >
                {item.title}
              </Text>
              <View style={[styles.checklistCategory, { backgroundColor: colors.inputBg }]}>
                <Text style={[styles.checklistCategoryText, { color: colors.textMuted }]}>{item.category}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Budget */}
        {trip.totalBudget && (
          <View style={[styles.section, { backgroundColor: colors.surface, marginTop: 8 }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>예산</Text>
            <View style={styles.budgetRow}>
              <View>
                <Text style={[styles.budgetLabel, { color: colors.textSecondary }]}>총 예산</Text>
                <Text style={[styles.budgetAmount, { color: colors.text }]}>
                  {trip.totalBudget.toLocaleString()}원
                </Text>
              </View>
              <TouchableOpacity style={[styles.expenseBtn, { backgroundColor: colors.primary + '15' }]}>
                <Text style={[styles.expenseBtnText, { color: colors.primary }]}>경비 관리</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  coverWrapper: { height: 280, position: 'relative' },
  cover: { ...StyleSheet.absoluteFillObject },
  coverPlaceholder: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(26,31,54,0.5)' },
  backBtn: {
    position: 'absolute', top: 48, left: 16,
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  moreBtn: {
    position: 'absolute', top: 48, right: 16,
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  coverContent: { position: 'absolute', bottom: 20, left: 20, right: 20 },
  ddayBadge: { alignSelf: 'flex-start', backgroundColor: '#FF6B35', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 8 },
  ddayText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  coverTitle: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 6 },
  coverMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  coverMetaText: { color: 'rgba(255,255,255,0.9)', fontSize: 14 },
  coverSep: { color: 'rgba(255,255,255,0.5)' },
  coverDates: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    paddingVertical: 20,
  },
  quickAction: { alignItems: 'center', gap: 6 },
  quickActionIcon: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  quickActionLabel: { fontSize: 12, fontWeight: '600' },
  section: { padding: 20, marginTop: 0 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: '800' },
  invite: { fontSize: 14, fontWeight: '600' },
  membersRow: { marginLeft: -4 },
  memberItem: { alignItems: 'center', marginRight: 14, width: 60 },
  memberName: { fontSize: 11, marginTop: 6, textAlign: 'center' },
  ownerBadge: { marginTop: 4, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  ownerText: { color: '#fff', fontSize: 9, fontWeight: '700' },
  progressBar: { height: 6, borderRadius: 3, marginBottom: 14, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  checklistText: { flex: 1, fontSize: 15 },
  checklistTextDone: { textDecorationLine: 'line-through' },
  checklistCategory: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  checklistCategoryText: { fontSize: 11 },
  budgetRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  budgetLabel: { fontSize: 13, marginBottom: 4 },
  budgetAmount: { fontSize: 24, fontWeight: '800' },
  expenseBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  expenseBtnText: { fontWeight: '700', fontSize: 14 },
});
