/*
 파일명 : PlaceDetailScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { useTheme } from '../../hooks/useTheme';
import { MOCK_PLACES } from '../../constants/mockData';
import { getCategoryMarkerColor } from '../../utils/location';
import type { ExploreStackParamList } from '../../types/navigation.types';

export const PlaceDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ExploreStackParamList, 'PlaceDetail'>>();
  const { colors } = useTheme();
  const place = MOCK_PLACES.find((p) => p.id === route.params.placeId) || MOCK_PLACES[0];

  return (
    <SafeAreaWrapper>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Cover Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: place.images[0] }} style={styles.coverImage} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={[styles.categoryTag, { backgroundColor: getCategoryMarkerColor(place.category) }]}>
            <Text style={styles.categoryText}>{place.category}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={[styles.content, { backgroundColor: colors.surface }]}>
          <Text style={[styles.name, { color: colors.text }]}>{place.name}</Text>

          <View style={styles.metaRow}>
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= Math.floor(place.rating) ? 'star' : 'star-outline'}
                  size={16}
                  color="#F59E0B"
                />
              ))}
              <Text style={[styles.ratingText, { color: colors.text }]}>{place.rating}</Text>
              <Text style={[styles.reviewCount, { color: colors.textMuted }]}>({place.reviewCount}개 리뷰)</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            {place.address && (
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={18} color={colors.primary} />
                <Text style={[styles.infoText, { color: colors.textSecondary }]}>{place.address}</Text>
              </View>
            )}
            {place.openHours && (
              <View style={styles.infoRow}>
                <Ionicons name="time-outline" size={18} color={colors.primary} />
                <Text style={[styles.infoText, { color: colors.textSecondary }]}>{place.openHours}</Text>
              </View>
            )}
            {place.phone && (
              <View style={styles.infoRow}>
                <Ionicons name="call-outline" size={18} color={colors.primary} />
                <Text style={[styles.infoText, { color: colors.primary }]}>{place.phone}</Text>
              </View>
            )}
          </View>

          {place.description && (
            <View style={styles.descSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>소개</Text>
              <Text style={[styles.description, { color: colors.textSecondary }]}>{place.description}</Text>
            </View>
          )}

          {/* Map */}
          <View style={styles.mapSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>위치</Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: place.latitude,
                longitude: place.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              scrollEnabled={false}
            >
              <Marker
                coordinate={{ latitude: place.latitude, longitude: place.longitude }}
                title={place.name}
                pinColor={getCategoryMarkerColor(place.category)}
              />
            </MapView>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.addToTripBtn, { backgroundColor: colors.primary }]}
          activeOpacity={0.85}
        >
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.addToTripText}>여행 일정에 추가</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  imageContainer: { position: 'relative' },
  coverImage: { width: '100%', height: 280 },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTag: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  categoryText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  content: { borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -20, padding: 24 },
  name: { fontSize: 26, fontWeight: '800', marginBottom: 10 },
  metaRow: { marginBottom: 16 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 15, fontWeight: '700', marginLeft: 4 },
  reviewCount: { fontSize: 13 },
  infoSection: { marginBottom: 20, gap: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoText: { fontSize: 14, flex: 1 },
  descSection: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 10 },
  description: { fontSize: 15, lineHeight: 24 },
  mapSection: { marginBottom: 16 },
  map: { height: 200, borderRadius: 16, overflow: 'hidden' },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  addToTripBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    borderRadius: 16,
    gap: 8,
  },
  addToTripText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
