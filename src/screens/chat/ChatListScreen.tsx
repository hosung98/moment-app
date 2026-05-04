/*
 파일명 : ChatListScreen.tsx
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
import { Chip } from '../../components/common/Chip';
import { ChatListItem } from '../../components/chat/ChatListItem';
import { EmptyState } from '../../components/common/EmptyState';
import { useTheme } from '../../hooks/useTheme';
import { MOCK_CHAT_ROOMS } from '../../constants/mockData';
import type { ChatStackParamList } from '../../types/navigation.types';

export const ChatListScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<ChatStackParamList>>();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'nearby' | 'trip'>('nearby');

  const filtered = MOCK_CHAT_ROOMS.filter((r) =>
    activeTab === 'nearby' ? r.type === 'location' : r.type === 'trip'
  );

  return (
    <SafeAreaWrapper>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>채팅</Text>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={[styles.tabBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        {[
          { label: '내 주변', value: 'nearby' as const },
          { label: '여행방', value: 'trip' as const },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.value}
            style={[styles.tab, activeTab === tab.value && { borderBottomColor: colors.primary }]}
            onPress={() => setActiveTab(tab.value)}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab.value ? colors.primary : colors.textSecondary },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtered.length === 0 ? (
        <EmptyState title="채팅방이 없어요" message="주변 여행자들과 대화해보세요!" icon="chatbubbles-outline" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          style={{ backgroundColor: colors.background }}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <ChatListItem
              room={item}
              onPress={() => navigation.navigate('ChatRoom', { chatId: item.id, chatName: item.name })}
            />
          )}
        />
      )}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  title: { fontSize: 24, fontWeight: '800' },
  tabBar: { flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: { fontSize: 15, fontWeight: '700' },
});
