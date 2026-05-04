/*
 파일명 : TripCreateScreen.tsx
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
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useTheme } from '../../hooks/useTheme';
import type { RootStackParamList } from '../../types/navigation.types';

export const TripCreateScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();

  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setCoverImage(result.assets[0].uri);
    }
  };

  const handleCreate = () => {
    if (!title.trim() || !destination.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.goBack();
    }, 800);
  };

  return (
    <SafeAreaWrapper>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>새 여행 만들기</Text>
        <View style={{ width: 34 }} />
      </View>

      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        {/* Cover Photo */}
        <TouchableOpacity style={[styles.coverPicker, { backgroundColor: colors.surface }]} onPress={pickImage} activeOpacity={0.8}>
          {coverImage ? (
            <Image source={{ uri: coverImage }} style={styles.coverPreview} />
          ) : (
            <View style={styles.coverPlaceholder}>
              <Ionicons name="camera-outline" size={44} color={colors.primary} />
              <Text style={[styles.coverPlaceholderTitle, { color: colors.text }]}>커버 이미지 추가</Text>
              <Text style={[styles.coverPlaceholderSub, { color: colors.textMuted }]}>탭하여 사진 선택</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.form}>
          <Input
            label="여행 제목 *"
            value={title}
            onChangeText={setTitle}
            placeholder="예) 오사카 가족 여행"
          />
          <Input
            label="여행지 *"
            value={destination}
            onChangeText={setDestination}
            placeholder="예) 오사카, 일본"
            leftIcon={<Ionicons name="location-outline" size={18} color={colors.textMuted} />}
          />
          <View style={styles.dateRow}>
            <View style={{ flex: 1 }}>
              <Input
                label="출발일"
                value={startDate}
                onChangeText={setStartDate}
                placeholder="YYYY-MM-DD"
                leftIcon={<Ionicons name="calendar-outline" size={18} color={colors.textMuted} />}
              />
            </View>
            <View style={styles.dateSep}>
              <Text style={[styles.dateSepText, { color: colors.textMuted }]}>~</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Input
                label="도착일"
                value={endDate}
                onChangeText={setEndDate}
                placeholder="YYYY-MM-DD"
                leftIcon={<Ionicons name="calendar-outline" size={18} color={colors.textMuted} />}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <Button
          label="여행 만들기"
          variant="primary"
          fullWidth
          onPress={handleCreate}
          loading={isLoading}
          disabled={!title.trim() || !destination.trim()}
        />
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  closeBtn: { padding: 4 },
  title: { fontSize: 18, fontWeight: '800' },
  coverPicker: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#FF6B35',
  },
  coverPreview: { ...StyleSheet.absoluteFillObject, resizeMode: 'cover' },
  coverPlaceholder: { alignItems: 'center', gap: 6 },
  coverPlaceholderTitle: { fontSize: 16, fontWeight: '700', marginTop: 4 },
  coverPlaceholderSub: { fontSize: 13 },
  form: { gap: 8 },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dateSep: { paddingTop: 28 },
  dateSepText: { fontSize: 20, fontWeight: '300' },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, paddingBottom: 32, borderTopWidth: StyleSheet.hairlineWidth,
  },
});
