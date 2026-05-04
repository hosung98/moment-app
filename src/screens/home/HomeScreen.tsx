/*
 파일명 : HomeScreen.tsx
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
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { TripCard } from '../../components/trip/TripCard';
import { BlogFeedItem } from '../../components/blog/BlogFeedItem';
import { useTheme } from '../../hooks/useTheme';
import { useTripStore } from '../../store/tripStore';
import { MOCK_BLOG_POSTS, MOCK_USER, MOCK_RECOMMENDED_PLACES } from '../../constants/mockData';
import type { HomeStackParamList } from '../../types/navigation.types';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const { colors } = useTheme();
  const trips = useTripStore((s) => s.trips);
  const upcomingTrips = trips.filter((t) => t.status === 'upcoming');
  const [posts, setPosts] = useState(MOCK_BLOG_POSTS);

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  return (
    <SafeAreaWrapper>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.surface }]}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>안녕하세요 👋</Text>
            <Text style={[styles.username, { color: colors.text }]}>{MOCK_USER.nickname}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={[styles.searchBtn, { backgroundColor: colors.inputBg }]}>
              <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.searchPlaceholder, { color: colors.textMuted }]}>어디로 가시나요?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Trip */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>다가오는 여행 ✈️</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TripList')}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>전체보기</Text>
            </TouchableOpacity>
          </View>
          {upcomingTrips.length > 0 ? (
            <TripCard
              trip={upcomingTrips[0]}
              onPress={() => navigation.navigate('TripDetail', { tripId: upcomingTrips[0].id })}
            />
          ) : (
            <TouchableOpacity
              style={[styles.emptyTrip, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => {}}
            >
              <Ionicons name="add-circle-outline" size={32} color={colors.primary} />
              <Text style={[styles.emptyTripText, { color: colors.text }]}>새 여행 계획 세우기</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Recommended Places */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>📍 추천 여행지</Text>
            <Text style={[styles.locationText, { color: colors.primary }]}>
              <Ionicons name="location" size={12} /> 서울 근처
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {MOCK_RECOMMENDED_PLACES.map((place) => (
              <TouchableOpacity
                key={place.id}
                style={[styles.placeCard, { backgroundColor: colors.card }]}
                activeOpacity={0.9}
              >
                <Image source={{ uri: place.image }} style={styles.placeImage} />
                <View style={[styles.placeCategoryBadge, { backgroundColor: colors.primary }]}>
                  <Text style={styles.placeCategoryText}>{place.category}</Text>
                </View>
                <View style={styles.placeInfo}>
                  <Text style={[styles.placeName, { color: colors.text }]} numberOfLines={1}>{place.name}</Text>
                  <Text style={[styles.placeCity, { color: colors.textSecondary }]}>{place.city}</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={12} color="#F59E0B" />
                    <Text style={[styles.rating, { color: colors.textSecondary }]}>{place.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Friend Feed */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>👥 친구 소식</Text>
            <TouchableOpacity onPress={() => navigation.navigate('BlogFeed')}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>전체보기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {posts.map((post) => (
          <BlogFeedItem
            key={post.id}
            post={post}
            onPress={() => navigation.navigate('BlogDetail', { blogId: post.id })}
            onLike={() => handleLike(post.id)}
            onComment={() => navigation.navigate('BlogComment', { blogId: post.id })}
          />
        ))}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  header: { padding: 16, paddingTop: 8 },
  greeting: { fontSize: 13 },
  username: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  searchBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    gap: 8,
  },
  searchPlaceholder: { fontSize: 14 },
  section: { padding: 16, paddingBottom: 0 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  seeAll: { fontSize: 14, fontWeight: '600' },
  locationText: { fontSize: 13, fontWeight: '600' },
  emptyTrip: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 20,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  emptyTripText: { fontSize: 15, fontWeight: '600' },
  horizontalScroll: { marginLeft: -16, paddingLeft: 16 },
  placeCard: {
    width: 160,
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  placeImage: { width: 160, height: 110 },
  placeCategoryBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  placeCategoryText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  placeInfo: { padding: 10 },
  placeName: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  placeCity: { fontSize: 12, marginBottom: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  rating: { fontSize: 12, fontWeight: '600' },
});
