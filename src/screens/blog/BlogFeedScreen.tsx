/*
 파일명 : BlogFeedScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Header } from '../../components/common/Header';
import { BlogFeedItem } from '../../components/blog/BlogFeedItem';
import { ScrollLayout } from '../../components/common/ScrollLayout';
import { useTheme } from '../../hooks/useTheme';
import { MOCK_BLOG_POSTS } from '../../constants/mockData';

export const BlogFeedScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaWrapper>
      <Header title="여행 피드" />
      <FlatList
        data={MOCK_BLOG_POSTS}
        keyExtractor={(item) => item.id}
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BlogFeedItem post={item} onPress={() => {}} onLike={() => {}} onComment={() => {}} />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 8, backgroundColor: colors.background }} />
        )}
      />
    </SafeAreaWrapper>
  );
};
