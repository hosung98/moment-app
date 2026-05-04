/*
 파일명 : ChatListItem.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../common/Avatar';
import { useTheme } from '../../hooks/useTheme';
import type { ChatRoom } from '../../types/common.types';

interface ChatListItemProps {
  room: ChatRoom;
  onPress: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ room, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.item, { borderBottomColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.thumbnailWrapper}>
        {room.thumbnail ? (
          <Image source={{ uri: room.thumbnail }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnailPlaceholder, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons
              name={room.type === 'trip' ? 'airplane' : 'location'}
              size={22}
              color={colors.primary}
            />
          </View>
        )}
        {room.type === 'location' && (
          <View style={[styles.typeBadge, { backgroundColor: colors.primary }]}>
            <Ionicons name="location" size={10} color="#fff" />
          </View>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{room.name}</Text>
          <Text style={[styles.time, { color: colors.textMuted }]}>{room.lastMessageTime}</Text>
        </View>
        <View style={styles.bottomRow}>
          <Text style={[styles.lastMessage, { color: colors.textSecondary }]} numberOfLines={1}>
            {room.lastMessage}
          </Text>
          {room.unreadCount > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <Text style={styles.badgeText}>{room.unreadCount > 99 ? '99+' : room.unreadCount}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.members, { color: colors.textMuted }]}>
          <Ionicons name="people-outline" size={12} /> {room.members}명
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  thumbnailWrapper: { position: 'relative', marginRight: 14 },
  thumbnail: { width: 52, height: 52, borderRadius: 16 },
  thumbnailPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  content: { flex: 1 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  name: { fontSize: 16, fontWeight: '700', flex: 1 },
  time: { fontSize: 12, marginLeft: 8 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lastMessage: { fontSize: 14, flex: 1 },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  members: { fontSize: 12, marginTop: 4 },
});
