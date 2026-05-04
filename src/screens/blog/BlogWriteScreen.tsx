/*
 파일명 : BlogWriteScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Chip } from '../../components/common/Chip';
import { useTheme } from '../../hooks/useTheme';
import type { RootStackParamList } from '../../types/navigation.types';

const VISIBILITY_OPTIONS = ['전체 공개', '친구만', '비공개'];

export const BlogWriteScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'BlogWrite'>>();
  const { colors } = useTheme();

  const [images, setImages] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [location, setLocation] = useState('');
  const [visibility, setVisibility] = useState('전체 공개');
  const [isLoading, setIsLoading] = useState(false);

  // '사진으로 기록하기'로 진입한 경우 자동으로 이미지 피커 오픈
  useEffect(() => {
    if (route.params?.openPhotoPicker) {
      pickImages();
    }
  }, []);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 10,
    });
    if (!result.canceled) {
      setImages((prev) => [...prev, ...result.assets.map((a) => a.uri)].slice(0, 10));
    }
  };

  const handlePost = () => {
    if (!content.trim()) {
      Alert.alert('내용을 입력해주세요');
      return;
    }
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>여행 기록 쓰기</Text>
        <TouchableOpacity
          style={[styles.postBtn, { backgroundColor: content.trim() ? colors.primary : colors.border }]}
          onPress={handlePost}
          disabled={!content.trim() || isLoading}
        >
          <Text style={styles.postBtnText}>게시</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ paddingBottom: 120 }}>
          {/* Images */}
          <View style={styles.imagesSection}>
            <TouchableOpacity style={[styles.addImgBtn, { backgroundColor: colors.surface }]} onPress={pickImages}>
              <Ionicons name="image-outline" size={28} color={colors.primary} />
              <Text style={[styles.addImgText, { color: colors.textSecondary }]}>사진 추가</Text>
              <Text style={[styles.addImgCount, { color: colors.textMuted }]}>{images.length}/10</Text>
            </TouchableOpacity>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
              {images.map((uri, idx) => (
                <View key={idx} style={styles.imageWrapper}>
                  <Image source={{ uri }} style={styles.thumbnail} />
                  <TouchableOpacity
                    style={styles.removeImg}
                    onPress={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                  >
                    <Ionicons name="close-circle" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Text */}
          <View style={[styles.textArea, { backgroundColor: colors.surface }]}>
            <TextInput
              style={[styles.contentInput, { color: colors.text }]}
              value={content}
              onChangeText={setContent}
              placeholder="여행에서 있었던 이야기를 들려주세요..."
              placeholderTextColor={colors.textMuted}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Meta */}
          <View style={[styles.metaSection, { backgroundColor: colors.surface }]}>
            <View style={[styles.metaRow, { borderBottomColor: colors.border }]}>
              <Ionicons name="location-outline" size={20} color={colors.primary} />
              <TextInput
                style={[styles.metaInput, { color: colors.text }]}
                value={location}
                onChangeText={setLocation}
                placeholder="위치 추가"
                placeholderTextColor={colors.textMuted}
              />
            </View>
            <View style={[styles.metaRow, { borderBottomColor: colors.border }]}>
              <Ionicons name="pricetag-outline" size={20} color={colors.primary} />
              <TextInput
                style={[styles.metaInput, { color: colors.text }]}
                value={hashtags}
                onChangeText={setHashtags}
                placeholder="#해시태그 #추가"
                placeholderTextColor={colors.textMuted}
              />
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="globe-outline" size={20} color={colors.primary} />
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.visibilityScroll}>
                {VISIBILITY_OPTIONS.map((opt) => (
                  <Chip
                    key={opt}
                    label={opt}
                    selected={visibility === opt}
                    onPress={() => setVisibility(opt)}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  headerTitle: { fontSize: 18, fontWeight: '800' },
  postBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  postBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  imagesSection: { padding: 16, flexDirection: 'row', alignItems: 'center', gap: 10 },
  addImgBtn: {
    width: 80,
    height: 80,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  addImgText: { fontSize: 11, fontWeight: '600' },
  addImgCount: { fontSize: 10 },
  imageScroll: { flex: 1 },
  imageWrapper: { position: 'relative', marginRight: 10 },
  thumbnail: { width: 80, height: 80, borderRadius: 14 },
  removeImg: { position: 'absolute', top: -6, right: -6 },
  textArea: { margin: 16, marginTop: 0, borderRadius: 16, padding: 16 },
  contentInput: { minHeight: 150, fontSize: 16, lineHeight: 24 },
  metaSection: { margin: 16, borderRadius: 16, overflow: 'hidden' },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  metaInput: { flex: 1, fontSize: 15 },
  visibilityScroll: { flex: 1 },
});
