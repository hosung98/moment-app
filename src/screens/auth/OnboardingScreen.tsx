/*
 파일명 : OnboardingScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import type { AuthStackParamList } from '../../types/navigation.types';
import { Button } from '../../components/common/Button';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    emoji: '🗓️',
    title: '여행을 계획하세요',
    desc: '날짜별 일정을 쉽게 관리하고\n친구들과 함께 공유하세요',
    bgColor: '#FF6B35',
  },
  {
    id: '2',
    emoji: '📸',
    title: '순간을 기록하세요',
    desc: '여행의 모든 순간을 사진과 글로\n소셜 피드에 담아보세요',
    bgColor: '#8B5CF6',
  },
  {
    id: '3',
    emoji: '💬',
    title: '위치 기반 채팅',
    desc: '현재 위치의 여행자들과\n실시간으로 소통하세요',
    bgColor: '#3B82F6',
  },
  {
    id: '4',
    emoji: '💰',
    title: '경비를 관리하세요',
    desc: '여행 예산을 한눈에 파악하고\n친구와 정산도 손쉽게',
    bgColor: '#10B981',
  },
];

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const goToLogin = () => navigation.replace('Login');

  const goNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      goToLogin();
    }
  };

  const slide = SLIDES[currentIndex];

  return (
    <View style={[styles.container, { backgroundColor: slide.bgColor }]}>
      <TouchableOpacity style={styles.skip} onPress={goToLogin}>
        <Text style={styles.skipText}>건너뛰기</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.bgColor }]}>
            <View style={styles.emojiCircle}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === currentIndex && styles.dotActive]}
          />
        ))}
      </View>

      {/* Button */}
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
          <Text style={styles.nextText}>
            {currentIndex === SLIDES.length - 1 ? '시작하기' : '다음'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#FF6B35" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  skip: { position: 'absolute', top: 56, right: 24, zIndex: 10 },
  skipText: { color: 'rgba(255,255,255,0.8)', fontSize: 15 },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emojiCircle: {
    width: 140,
    height: 140,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  emoji: { fontSize: 64 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 16 },
  desc: { fontSize: 17, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 26 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { width: 24, backgroundColor: '#fff' },
  btnWrapper: { paddingHorizontal: 24, paddingBottom: 48 },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 56,
    borderRadius: 18,
    gap: 8,
  },
  nextText: { fontSize: 17, fontWeight: '700', color: '#FF6B35' },
});
