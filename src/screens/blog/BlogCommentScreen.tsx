/*
 파일명 : BlogCommentScreen.tsx
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
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Header } from '../../components/common/Header';
import { Avatar } from '../../components/common/Avatar';
import { useTheme } from '../../hooks/useTheme';
import type { HomeStackParamList } from '../../types/navigation.types';

const MOCK_COMMENTS = [
  { id: 'c1', authorId: 'u1', authorName: '여행자 김모먼', profileImage: '', content: '너무 아름다운 사진이에요! 저도 꼭 가보고 싶어요 😍', likeCount: 5, createdAt: '2025-01-10T12:00:00Z' },
  { id: 'c2', authorId: 'u2', authorName: '제주도러버', profileImage: '', content: '오사카 3박4일 여행 때 저도 다녀왔는데, 정말 좋았어요!', likeCount: 3, createdAt: '2025-01-10T13:30:00Z' },
  { id: 'c3', authorId: 'u3', authorName: '배낭여행중', profileImage: '', content: '다음 여행지로 강력 추천합니다!', likeCount: 1, createdAt: '2025-01-11T09:00:00Z' },
];

export const BlogCommentScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<HomeStackParamList, 'BlogComment'>>();
  const { colors } = useTheme();
  const [text, setText] = useState('');
  const [comments, setComments] = useState(MOCK_COMMENTS);

  const handleSend = () => {
    if (!text.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: `c${Date.now()}`,
        authorId: 'me',
        authorName: '나',
        profileImage: '',
        content: text.trim(),
        likeCount: 0,
        createdAt: new Date().toISOString(),
      },
    ]);
    setText('');
  };

  return (
    <SafeAreaWrapper>
      <Header title="댓글" showBack onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          style={{ backgroundColor: colors.background }}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          renderItem={({ item }) => (
            <View style={[styles.commentItem, { borderBottomColor: colors.border }]}>
              <Avatar uri={item.profileImage} name={item.authorName} size={40} />
              <View style={styles.commentBody}>
                <View style={styles.commentTop}>
                  <Text style={[styles.authorName, { color: colors.text }]}>{item.authorName}</Text>
                  <TouchableOpacity style={styles.likeBtn}>
                    <Ionicons name="heart-outline" size={14} color={colors.textMuted} />
                    <Text style={[styles.likeCount, { color: colors.textMuted }]}>{item.likeCount}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.commentText, { color: colors.textSecondary }]}>{item.content}</Text>
              </View>
            </View>
          )}
        />
        {/* Input */}
        <View style={[styles.inputBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <TextInput
            style={[styles.input, { color: colors.text, backgroundColor: colors.inputBg }]}
            value={text}
            onChangeText={setText}
            placeholder="댓글을 입력하세요..."
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
  commentItem: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  commentBody: { flex: 1 },
  commentTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  authorName: { fontSize: 14, fontWeight: '700' },
  likeBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  likeCount: { fontSize: 12 },
  commentText: { fontSize: 14, lineHeight: 21 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    paddingBottom: 28,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 10,
  },
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
