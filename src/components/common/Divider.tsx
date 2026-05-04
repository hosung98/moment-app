/*
 파일명 : Divider.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface DividerProps {
  style?: ViewStyle;
  vertical?: boolean;
}

export const Divider: React.FC<DividerProps> = ({ style, vertical }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        vertical ? styles.vertical : styles.horizontal,
        { backgroundColor: colors.border },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: { height: 1, width: '100%', marginVertical: 8 },
  vertical: { width: 1, height: '100%', marginHorizontal: 8 },
});
