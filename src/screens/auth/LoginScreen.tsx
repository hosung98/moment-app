/*
 파일명 : LoginScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 / 리팩토링 - useTheme 적용, 하드코딩 색상 제거, 주석 보강
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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../types/navigation.types';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useTheme } from '../../hooks/useTheme';
import { normalize, scale, vScale } from '../../utils/responsive';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme(); // ← 다크모드 대응을 위해 하드코딩 색상 대신 theme 사용
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // ──────────────────────────────────────────────
  // 이메일 로그인 핸들러
  // TODO: 실제 서버 연동 시 authApi.login(email, password) 호출
  //       성공 → tokenManager.setTokens() → navigation.reset('Main')
  //       실패 → 에러 메시지 표시
  // ──────────────────────────────────────────────
  const handleLogin = async () => {
    setLoading(true);
    // 개발 시 Mock: 1초 후 Main으로 이동 (서버 연동 전 UI 확인용)
    setTimeout(() => {
      setLoading(false);
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    }, 1000);
  };

  // ──────────────────────────────────────────────
  // 소셜 로그인 핸들러
  // TODO: expo-auth-session 또는 kakao-sdk 연동 필요
  // ──────────────────────────────────────────────
  const handleSocialLogin = (_provider: 'google' | 'kakao') => {
    // 개발 Mock: 바로 Main 진입
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    // KeyboardAvoidingView: 키보드 올라올 때 입력창이 가려지지 않도록 자동 조정
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        // 키보드 영역 외 터치 시 키보드 유지 (버튼 클릭 대응)
        keyboardShouldPersistTaps="handled"
      >
        {/* ── 앱 로고 영역 ── */}
        <View style={styles.header}>
          <View style={[styles.logoCircle, { shadowColor: colors.primary }]}>
            <Text style={styles.logoEmoji}>✈️</Text>
          </View>
          <Text style={[styles.logoText, { color: colors.text }]}>모먼</Text>
          <Text style={[styles.tagline, { color: colors.textMuted }]}>여행의 모든 순간을 담다</Text>
        </View>

        {/* ── 소셜 로그인 ── */}
        {/* 카카오: 브랜드 가이드라인상 배경색(#FEE500)은 고정 */}
        <TouchableOpacity
          style={styles.kakaoBtn}
          onPress={() => handleSocialLogin('kakao')}
          activeOpacity={0.85}
        >
          <Text style={styles.kakaoBtnEmoji}>💬</Text>
          <Text style={styles.kakaoBtnText}>카카오로 시작하기</Text>
        </TouchableOpacity>

        {/* Google: 브랜드 가이드라인상 흰 배경 + 테두리 고정 */}
        <TouchableOpacity
          style={[styles.googleBtn, { borderColor: colors.border }]}
          onPress={() => handleSocialLogin('google')}
          activeOpacity={0.85}
        >
          <Text style={styles.googleBtnG}>G</Text>
          <Text style={[styles.googleBtnText, { color: colors.text }]}>Google로 시작하기</Text>
        </TouchableOpacity>

        {/* ── 구분선 ── */}
        <View style={styles.dividerRow}>
          <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          <Text style={[styles.dividerText, { color: colors.textMuted }]}>또는 이메일로</Text>
          <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        </View>

        {/* ── 이메일/비밀번호 입력 ── */}
        {/* leftIcon에 ReactNode를 넘겨 아이콘 색상을 theme에 맞게 동적 적용 */}
        <Input
          label="이메일"
          value={email}
          onChangeText={setEmail}
          placeholder="이메일을 입력하세요"
          keyboardType="email-address"
          leftIcon={<Ionicons name="mail-outline" size={18} color={colors.textMuted} />}
        />
        <Input
          label="비밀번호"
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry
          leftIcon={<Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} />}
        />

        <Button
          label="로그인"
          onPress={handleLogin}
          loading={loading}
          fullWidth
          style={styles.loginBtn}
        />

        {/* ── 회원가입 이동 ── */}
        <TouchableOpacity style={styles.signupRow}>
          <Text style={[styles.signupText, { color: colors.textMuted }]}>아직 계정이 없으신가요? </Text>
          <Text style={[styles.signupLink, { color: colors.primary }]}>회원가입</Text>
        </TouchableOpacity>

        {/* ── 약관 동의 안내 ── */}
        <Text style={[styles.terms, { color: colors.textMuted }]}>
          로그인 시 <Text style={{ color: colors.primary }}>서비스 이용약관</Text> 및{' '}
          <Text style={{ color: colors.primary }}>개인정보처리방침</Text>에 동의하게 됩니다.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ──────────────────────────────────────────────────────────
// StyleSheet 원칙:
// - 변경되지 않는 레이아웃/형태 → StyleSheet.create() (성능 최적화)
// - 테마에 따라 바뀌는 색상     → 인라인 style={{ color: colors.xxx }}
// ──────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: scale(24), paddingBottom: vScale(48) },

  // ── 로고 헤더 ──
  header:     { alignItems: 'center', paddingTop: vScale(60), paddingBottom: vScale(40) },
  logoCircle: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(24),
    backgroundColor: '#FF6B35',   // 브랜드 색상: 테마 무관하게 고정
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vScale(12),
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  logoEmoji: { fontSize: normalize(36) },
  logoText:  { fontSize: normalize(32), fontWeight: '800', letterSpacing: -1 },
  tagline:   { fontSize: normalize(14), marginTop: vScale(6) },

  // ── 소셜 로그인 버튼 ──
  // 카카오/구글은 각 사의 브랜드 가이드라인에 따라 색상을 고정
  kakaoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE500',   // 카카오 공식 노란색 (변경 불가)
    height: vScale(54),
    borderRadius: scale(16),
    marginBottom: vScale(12),
    gap: scale(8),
  },
  kakaoBtnEmoji: { fontSize: normalize(22) },
  kakaoBtnText:  { fontSize: normalize(16), fontWeight: '700', color: '#1A1A1A' },

  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',   // 구글 공식 흰 배경 (변경 불가)
    height: vScale(54),
    borderRadius: scale(16),
    borderWidth: 1.5,
    marginBottom: vScale(24),
    gap: scale(8),
  },
  googleBtnG:    { fontSize: normalize(18), fontWeight: '800', color: '#4285F4' }, // 구글 파란색 고정
  googleBtnText: { fontSize: normalize(16), fontWeight: '600' },

  // ── 구분선 ──
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vScale(20),
    gap: scale(12),
  },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: normalize(13) },

  // ── 하단 링크 ──
  loginBtn:  { marginTop: vScale(4) },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: vScale(16) },
  signupText: { fontSize: normalize(14) },
  signupLink: { fontSize: normalize(14), fontWeight: '700' },
  terms: {
    fontSize: normalize(12),
    textAlign: 'center',
    marginTop: vScale(24),
    lineHeight: normalize(12) * 1.6,
  },
});
