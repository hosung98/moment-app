/*
 파일명 : LoginScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../types/navigation.types';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Divider } from '../../components/common/Divider';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // 개발 시 Mock 로그인: 바로 Main으로 이동
    setTimeout(() => {
      setLoading(false);
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    }, 1000);
  };

  const handleSocialLogin = (provider: 'google' | 'kakao') => {
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>✈️</Text>
          </View>
          <Text style={styles.logoText}>모먼</Text>
          <Text style={styles.tagline}>여행의 모든 순간을 담다</Text>
        </View>

        {/* Social Login */}
        <TouchableOpacity
          style={styles.kakaoBtn}
          onPress={() => handleSocialLogin('kakao')}
          activeOpacity={0.85}
        >
          <Text style={styles.kakaoBtnEmoji}>💬</Text>
          <Text style={styles.kakaoBtnText}>카카오로 시작하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.googleBtn}
          onPress={() => handleSocialLogin('google')}
          activeOpacity={0.85}
        >
          <Text style={styles.googleBtnEmoji}>G</Text>
          <Text style={styles.googleBtnText}>Google로 시작하기</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>또는 이메일로</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Email Login */}
        <Input
          label="이메일"
          value={email}
          onChangeText={setEmail}
          placeholder="이메일을 입력하세요"
          keyboardType="email-address"
          leftIcon="mail-outline"
        />
        <Input
          label="비밀번호"
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry
          leftIcon="lock-closed-outline"
        />

        <Button
          label="로그인"
          onPress={handleLogin}
          loading={loading}
          fullWidth
          style={styles.loginBtn}
        />

        <TouchableOpacity style={styles.signupRow}>
          <Text style={styles.signupText}>아직 계정이 없으신가요? </Text>
          <Text style={styles.signupLink}>회원가입</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          로그인 시 <Text style={styles.link}>서비스 이용약관</Text> 및{' '}
          <Text style={styles.link}>개인정보처리방침</Text>에 동의하게 됩니다.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FFF8F0' },
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 48 },
  header: { alignItems: 'center', paddingTop: 60, paddingBottom: 40 },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  logoEmoji: { fontSize: 36 },
  logoText: { fontSize: 32, fontWeight: '800', color: '#1A1F36', letterSpacing: -1 },
  tagline: { fontSize: 14, color: '#9CA3AF', marginTop: 6 },
  kakaoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE500',
    height: 54,
    borderRadius: 16,
    marginBottom: 12,
    gap: 8,
  },
  kakaoBtnEmoji: { fontSize: 22 },
  kakaoBtnText: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 54,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    marginBottom: 24,
    gap: 8,
  },
  googleBtnEmoji: { fontSize: 18, fontWeight: '800', color: '#4285F4' },
  googleBtnText: { fontSize: 16, fontWeight: '600', color: '#1A1F36' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  dividerText: { fontSize: 13, color: '#9CA3AF' },
  loginBtn: { marginTop: 4 },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  signupText: { fontSize: 14, color: '#9CA3AF' },
  signupLink: { fontSize: 14, color: '#FF6B35', fontWeight: '700' },
  terms: { fontSize: 12, color: '#9CA3AF', textAlign: 'center', marginTop: 24, lineHeight: 18 },
  link: { color: '#FF6B35' },
});
