/*
 파일명 : TripCard.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { formatDate, getDDay } from '../../utils/date';
import type { Trip } from '../../types/trip.types';

interface TripCardProps {
  trip: Trip;
  onPress: () => void;
  compact?: boolean;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onPress, compact }) => {
  const { colors } = useTheme();
  const dday = getDDay(trip.startDate);
  const duration = Math.ceil(
    (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }, compact && styles.compact]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {trip.coverImage ? (
        <Image source={{ uri: trip.coverImage }} style={styles.image} />
      ) : (
        <View style={[styles.imagePlaceholder, { backgroundColor: colors.primary + '30' }]}>
          <Ionicons name="airplane" size={32} color={colors.primary} />
        </View>
      )}
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{dday}</Text>
        </View>
        <View>
          <Text style={styles.title} numberOfLines={1}>{trip.title}</Text>
          <View style={styles.meta}>
            <Ionicons name="location-outline" size={14} color="rgba(255,255,255,0.9)" />
            <Text style={styles.metaText}>{trip.destination}</Text>
            <Text style={styles.separator}>·</Text>
            <Text style={styles.metaText}>{duration}박{duration + 1}일</Text>
          </View>
          <Text style={styles.dates}>
            {formatDate(trip.startDate, 'M.d')} - {formatDate(trip.endDate, 'M.d')}
          </Text>
        </View>
        <View style={styles.members}>
          {trip.members.slice(0, 3).map((m, i) => (
            <View
              key={m.id}
              style={[styles.memberAvatar, { marginLeft: i > 0 ? -8 : 0, backgroundColor: colors.primary }]}
            >
              {m.profileImage ? (
                <Image source={{ uri: m.profileImage }} style={styles.memberAvatarImg} />
              ) : (
                <Text style={styles.memberInitial}>{m.nickname[0]}</Text>
              )}
            </View>
          ))}
          {trip.members.length > 3 && (
            <View style={[styles.memberAvatar, styles.memberMore, { marginLeft: -8 }]}>
              <Text style={styles.memberMoreText}>+{trip.members.length - 3}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    height: 200,
  },
  compact: { height: 160, marginBottom: 0 },
  image: { ...StyleSheet.absoluteFillObject },
  imagePlaceholder: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26,31,54,0.5)',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF6B35',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  title: { color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 4 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: 'rgba(255,255,255,0.9)', fontSize: 13 },
  separator: { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  dates: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 },
  members: { flexDirection: 'row', alignItems: 'center' },
  memberAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberAvatarImg: { width: 28, height: 28 },
  memberInitial: { color: '#fff', fontSize: 11, fontWeight: '700' },
  memberMore: { backgroundColor: 'rgba(0,0,0,0.4)' },
  memberMoreText: { color: '#fff', fontSize: 9, fontWeight: '700' },
});
