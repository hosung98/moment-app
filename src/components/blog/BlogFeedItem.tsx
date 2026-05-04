/*
 파일명 : BlogFeedItem.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Avatar } from '../common/Avatar';
import { formatRelativeTime } from '../../utils/date';
import type { BlogPost } from '../../types/common.types';

interface BlogFeedItemProps {
  post: BlogPost;
  onPress: () => void;
  onLike: () => void;
  onComment: () => void;
}

export const BlogFeedItem: React.FC<BlogFeedItemProps> = ({
  post,
  onPress,
  onLike,
  onComment,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      {/* Header */}
      <View style={styles.header}>
        <Avatar uri={post.authorImage} name={post.authorName} size={40} />
        <View style={styles.authorInfo}>
          <Text style={[styles.authorName, { color: colors.text }]}>{post.authorName}</Text>
          <View style={styles.locationRow}>
            {post.location && (
              <>
                <Ionicons name="location-outline" size={12} color={colors.primary} />
                <Text style={[styles.location, { color: colors.textSecondary }]}>{post.location}</Text>
                <Text style={[styles.dot, { color: colors.textMuted }]}>·</Text>
              </>
            )}
            <Text style={[styles.time, { color: colors.textMuted }]}>{formatRelativeTime(post.createdAt)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreBtn}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Images */}
      {post.images.length > 0 && (
        <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
          <Image source={{ uri: post.images[0] }} style={styles.image} />
          {post.images.length > 1 && (
            <View style={styles.imageCount}>
              <Ionicons name="images-outline" size={14} color="#fff" />
              <Text style={styles.imageCountText}>{post.images.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}

      {/* Content */}
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.contentArea}>
        <Text style={[styles.content, { color: colors.text }]} numberOfLines={3}>
          {post.content}
        </Text>
        {post.tags.length > 0 && (
          <View style={styles.tags}>
            {post.tags.map((tag) => (
              <Text key={tag} style={[styles.tag, { color: colors.primary }]}>#{tag}</Text>
            ))}
          </View>
        )}
      </TouchableOpacity>

      {/* Actions */}
      <View style={[styles.actions, { borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.actionBtn} onPress={onLike}>
          <Ionicons
            name={post.isLiked ? 'heart' : 'heart-outline'}
            size={22}
            color={post.isLiked ? '#EF4444' : colors.textSecondary}
          />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={onComment}>
          <Ionicons name="chatbubble-outline" size={21} color={colors.textSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="share-social-outline" size={22} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 8 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 14, paddingBottom: 10 },
  authorInfo: { flex: 1, marginLeft: 10 },
  authorName: { fontSize: 15, fontWeight: '700' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  location: { fontSize: 12 },
  dot: { fontSize: 12 },
  time: { fontSize: 12 },
  moreBtn: { padding: 4 },
  image: { width: '100%', height: 300, backgroundColor: '#f0f0f0' },
  imageCount: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  imageCountText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  contentArea: { padding: 14, paddingTop: 12 },
  content: { fontSize: 15, lineHeight: 22 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  tag: { fontSize: 14, fontWeight: '500' },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 20,
  },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionText: { fontSize: 14, fontWeight: '500' },
});
