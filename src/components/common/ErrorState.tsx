/*
 파일명 : ErrorState.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './Button';
import { useTheme } from '../../hooks/useTheme';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = '오류가 발생했습니다.\n잠시 후 다시 시도해주세요.',
  onRetry,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={64} color={colors.error} />
      <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
      {onRetry && <Button label="다시 시도" onPress={onRetry} style={styles.button} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  message: { fontSize: 16, marginTop: 16, textAlign: 'center', lineHeight: 24 },
  button: { marginTop: 24 },
});
