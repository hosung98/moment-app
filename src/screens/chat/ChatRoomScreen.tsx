/*
 파일명 : ChatRoomScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Avatar } from '../../components/common/Avatar';
import { useTheme } from '../../hooks/useTheme';
import type { ChatStackParamList } from '../../types/navigation.types';

const MY_ID = 'user1';

const MOCK_MESSAGES = [
  { id: 'm1', senderId: 'u2', senderName: '제주도러버', content: '안녕하세요! 오사카 여행 중이신가요?', createdAt: '2025-01-10T09:00:00Z', isTranslated: false },
  { id: 'm2', senderId: MY_ID, senderName: '나', content: '네! 도톤보리 근처에 있어요. 맛집 추천해주실 수 있나요?', createdAt: '2025-01-10T09:02:00Z', isTranslated: false },
  { id: 'm3', senderId: 'u2', senderName: '제주도러버', content: '이치란 라멘이 정말 맛있어요! 줄이 길지만 기다릴 만해요.', createdAt: '2025-01-10T09:05:00Z', isTranslated: false },
  { id: 'm4', senderId: MY_ID, senderName: '나', content: '감사해요! 바로 찾아가볼게요 😊', createdAt: '2025-01-10T09:07:00Z', isTranslated: false },
];

export const ChatRoomScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ChatStackParamList, 'ChatRoom'>>();
  const { colors } = useTheme();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [text, setText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `m${Date.now()}`,
        senderId: MY_ID,
        senderName: '나',
        content: text.trim(),
        createdAt: new Date().toISOString(),
        isTranslated: false,
      },
    ]);
    setText('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessage = ({ item }: { item: typeof MOCK_MESSAGES[0] }) => {
    const isMe = item.senderId === MY_ID;
    return (
      <View style={[styles.msgRow, isMe && styles.msgRowMe]}>
        {!isMe && <Avatar name={item.senderName} size={34} />}
        <View style={[styles.bubble, isMe ? [styles.bubbleMe, { backgroundColor: colors.primary }] : [styles.bubbleOther, { backgroundColor: colors.surface }]]}>
          {!isMe && <Text style={[styles.senderName, { color: colors.textMuted }]}>{item.senderName}</Text>}
          <Text style={[styles.msgText, { color: isMe ? '#fff' : colors.text }]}>{item.content}</Text>
        </View>
        {!isMe && (
          <TouchableOpacity style={[styles.translateBtn, { backgroundColor: colors.inputBg }]}>
            <Ionicons name="language-outline" size={14} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaWrapper>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={[styles.chatName, { color: colors.text }]}>{route.params.chatName}</Text>
          <Text style={[styles.memberCount, { color: colors.textMuted }]}>12명 참여 중</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          style={{ backgroundColor: colors.background }}
          contentContainerStyle={styles.msgList}
          renderItem={renderMessage}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />

        <View style={[styles.inputBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <TouchableOpacity style={[styles.attachBtn, { backgroundColor: colors.inputBg }]}>
            <Ionicons name="image-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>
          <TextInput
            style={[styles.input, { color: colors.text, backgroundColor: colors.inputBg }]}
            value={text}
            onChangeText={setText}
            placeholder="메시지를 입력하세요..."
            placeholderTextColor={colors.textMuted}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, { backgroundColor: text.trim() ? colors.primary : colors.border }]}
            onPress={handleSend}
            disabled={!text.trim()}
          >
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  backBtn: { padding: 4 },
  headerInfo: { flex: 1 },
  chatName: { fontSize: 16, fontWeight: '800' },
  memberCount: { fontSize: 12, marginTop: 2 },
  msgList: { padding: 16, gap: 12, paddingBottom: 20 },
  msgRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, maxWidth: '80%' },
  msgRowMe: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
  bubble: { padding: 12, borderRadius: 16, maxWidth: 260 },
  bubbleMe: { borderBottomRightRadius: 4 },
  bubbleOther: { borderBottomLeftRadius: 4 },
  senderName: { fontSize: 11, marginBottom: 4, fontWeight: '600' },
  msgText: { fontSize: 15, lineHeight: 21 },
  translateBtn: { padding: 6, borderRadius: 10, alignSelf: 'flex-end' },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    paddingBottom: 28,
    gap: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  attachBtn: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
  },
  sendBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
});
