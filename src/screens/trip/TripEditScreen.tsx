/*
 파일명 : TripEditScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useTheme } from '../../hooks/useTheme';
import { useTripStore } from '../../store/tripStore';
import type { HomeStackParamList } from '../../types/navigation.types';

export const TripEditScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'TripEdit'>>();
  const { colors } = useTheme();
  const trips = useTripStore((s) => s.trips);
  const updateTrip = useTripStore((s) => s.updateTrip);

  const trip = trips.find((t) => t.id === route.params.tripId);

  const [title, setTitle] = useState(trip?.title || '');
  const [destination, setDestination] = useState(trip?.destination || '');
  const [startDate, setStartDate] = useState(trip?.startDate || '');
  const [endDate, setEndDate] = useState(trip?.endDate || '');
  const [coverImage, setCoverImage] = useState(trip?.coverImage || '');

  if (!trip) return null;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setCoverImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    updateTrip(trip.id, { title, destination, startDate, endDate, coverImage });
    navigation.goBack();
  };

  return (
    <SafeAreaWrapper>
      <Header title="여행 편집" showBack onBack={() => navigation.goBack()} />
      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        {/* Cover Photo */}
        <TouchableOpacity style={[styles.coverPicker, { backgroundColor: colors.surface }]} onPress={pickImage} activeOpacity={0.8}>
          {coverImage ? (
            <Image source={{ uri: coverImage }} style={styles.coverPreview} />
          ) : (
            <View style={styles.coverPlaceholder}>
              <Ionicons name="image-outline" size={40} color={colors.textMuted} />
              <Text style={[styles.coverPlaceholderText, { color: colors.textMuted }]}>커버 이미지 선택</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.form}>
          <Input
            label="여행 제목"
            value={title}
            onChangeText={setTitle}
            placeholder="어떤 여행인가요?"
          />
          <Input
            label="여행지"
            value={destination}
            onChangeText={setDestination}
            placeholder="여행할 도시/나라를 입력하세요"
            leftIcon={<Ionicons name="location-outline" size={18} color={colors.textMuted} />}
          />
          <Input
            label="시작일"
            value={startDate}
            onChangeText={setStartDate}
            placeholder="YYYY-MM-DD"
            leftIcon={<Ionicons name="calendar-outline" size={18} color={colors.textMuted} />}
          />
          <Input
            label="종료일"
            value={endDate}
            onChangeText={setEndDate}
            placeholder="YYYY-MM-DD"
            leftIcon={<Ionicons name="calendar-outline" size={18} color={colors.textMuted} />}
          />
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <Button label="저장" variant="primary" fullWidth onPress={handleSave} />
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  coverPicker: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverPreview: { ...StyleSheet.absoluteFillObject, resizeMode: 'cover' },
  coverPlaceholder: { alignItems: 'center', gap: 8 },
  coverPlaceholderText: { fontSize: 15 },
  form: { gap: 8 },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, paddingBottom: 32, borderTopWidth: StyleSheet.hairlineWidth,
  },
});
