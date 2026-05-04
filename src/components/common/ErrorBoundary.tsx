/*
 파일명 : ErrorBoundary.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 - React Error Boundary (예상치 못한 렌더링 오류 포착)
*/
import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { logger } from '@/utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;           // 커스텀 에러 화면
  onError?: (error: Error) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * [Error Boundary]
 * React의 함수형 컴포넌트에서 componentDidCatch를 지원하지 않아
 * 반드시 클래스 컴포넌트로 작성해야 합니다.
 *
 * 사용 예:
 * <ErrorBoundary>
 *   <FeatureScreen />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    logger.error('ErrorBoundary', error.message, { error, info });
    this.props.onError?.(error);
    // 운영: Sentry.captureException(error, { extra: info });
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback) return this.props.fallback;

    return (
      <View style={styles.container}>
        <Ionicons name="alert-circle-outline" size={64} color="#FF6B35" />
        <Text style={styles.title}>오류가 발생했습니다</Text>
        <Text style={styles.message}>
          {__DEV__ ? this.state.error?.message : '잠시 후 다시 시도해 주세요.'}
        </Text>
        <TouchableOpacity style={styles.button} onPress={this.handleReset}>
          <Text style={styles.buttonText}>다시 시도</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFF8F0',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1F36',
    marginTop: 16,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
