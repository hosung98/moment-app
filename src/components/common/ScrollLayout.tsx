/*
 파일명 : ScrollLayout.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { ScrollView, StyleSheet, ViewStyle, RefreshControl } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface ScrollLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export const ScrollLayout: React.FC<ScrollLayoutProps> = ({
  children,
  style,
  contentContainerStyle,
  onRefresh,
  refreshing,
}) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing ?? false}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        ) : undefined
      }
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingBottom: 100 },
});
