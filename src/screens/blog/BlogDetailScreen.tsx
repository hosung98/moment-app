/*
 파일명 : BlogDetailScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Avatar } from '../../components/common/Avatar';
import { useTheme } from '../../hooks/useTheme';
import { MOCK_BLOG_POSTS } from '../../constants/mockData';
import { formatRelativeTime } from '../../utils/date';
import type { HomeStackParamList } from '../../types/navigation.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const BlogDetailScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'BlogDetail'>>();
  const { colors } = useTheme();
  const [liked, setLiked] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const post = MOCK_BLOG_POSTS.find((p) => p.id === route.params.blogId) || MOCK_BLOG_POSTS[0];

  return (
    <SafeAreaWrapper>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Image Carousel */}
        {post.images.length > 0 && (
          <View style={styles.carousel}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(e) => setCurrentImage(Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH))}
              scrollEventThrottle={16}
            >
              {post.images.map((img, idx) => (
                <Image key={idx} source={{ uri: img }} style={styles.carouselImage} />
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </TouchableOpacity>
            {post.images.length > 1 && (
              <View style={styles.pagination}>
                {post.images.map((_, idx) => (
                  <View
                    key={idx}
                    style={[styles.dot, { backgroundColor: idx === currentImage ? '#fff' : 'rgba(255,255,255,0.5)' }]}
                  />
                ))}
              </View>
            )}
          </View>
        )}

        {/* Content */}
        <View style={[styles.content, { backgroundColor: colors.surface }]}>
          {/* Author */}
          <View style={styles.authorRow}>
            <Avatar uri={post.authorImage} name={post.authorName} size={44} />
            <View style={styles.authorInfo}>
              <Text style={[styles.authorName, { color: colors.text }]}>{post.authorName}</Text>
              <Text style={[styles.postTime, { color: colors.textMuted }]}>{formatRelativeTime(post.createdAt)}</Text>
            </View>
            <TouchableOpacity style={[styles.followBtn, { borderColor: colors.primary }]}>
              <Text style={[styles.followText, { color: colors.primary }]}>팔로우</Text>
            </TouchableOpacity>
          </View>

          {post.location && (
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color={colors.primary} />
              <Text style={[styles.locationText, { color: colors.primary }]}>{post.location}</Text>
            </View>
          )}

          <Text style={[styles.bodyText, { color: colors.text }]}>{post.content}</Text>

          {post.tags && post.tags.length > 0 && (
            <View style={styles.hashtags}>
              {post.tags.map((tag) => (
                <TouchableOpacity key={tag}>
                  <Text style={[styles.hashtag, { color: colors.primary }]}>#{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Actions */}
          <View style={[styles.actions, { borderTopColor: colors.border }]}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => setLiked(!liked)}>
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={24}
                color={liked ? '#EF4444' : colors.textMuted}
              />
              <Text style={[styles.actionCount, { color: colors.textSecondary }]}>
                {post.likes + (liked ? 1 : 0)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => navigation.navigate('BlogComment', { blogId: post.id })}
            >
              <Ionicons name="chatbubble-outline" size={22} color={colors.textMuted} />
              <Text style={[styles.actionCount, { color: colors.textSecondary }]}>{post.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="share-social-outline" size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  carousel: { position: 'relative', height: 320 },
  carouselImage: { width: SCREEN_WIDTH, height: 320 },
  backBtn: {
    position: 'absolute', top: 48, left: 16,
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  pagination: { position: 'absolute', bottom: 14, alignSelf: 'center', flexDirection: 'row', gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  content: { padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -16 },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  authorInfo: { flex: 1 },
  authorName: { fontSize: 15, fontWeight: '700' },
  postTime: { fontSize: 12, marginTop: 2 },
  followBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10, borderWidth: 1.5 },
  followText: { fontSize: 13, fontWeight: '700' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 12 },
  locationText: { fontSize: 13, fontWeight: '600' },
  bodyText: { fontSize: 15, lineHeight: 24, marginBottom: 16 },
  hashtags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  hashtag: { fontSize: 14, fontWeight: '600' },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 20,
  },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionCount: { fontSize: 14, fontWeight: '600' },
});
