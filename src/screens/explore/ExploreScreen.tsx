/*
 파일명 : ExploreScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Chip } from '../../components/common/Chip';
import { useTheme } from '../../hooks/useTheme';
import { MOCK_PLACES } from '../../constants/mockData';
import { getCategoryMarkerColor } from '../../utils/location';
import type { ExploreStackParamList } from '../../types/navigation.types';

const CATEGORIES = ['전체', '음식', '자연', '역사', '액티비티', '쇼핑'];

export const ExploreScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<ExploreStackParamList>>();
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);

  const filteredPlaces = MOCK_PLACES.filter(
    (p) =>
      (selectedCategory === '전체' || p.category === selectedCategory) &&
      (searchQuery === '' || p.name.includes(searchQuery))
  );

  return (
    <SafeAreaWrapper>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>탐색</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setShowMap(!showMap)} style={[styles.viewToggle, { borderColor: colors.border }]}>
            <Ionicons name={showMap ? 'list-outline' : 'map-outline'} size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={[styles.searchBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View style={[styles.searchInput, { backgroundColor: colors.inputBg }]}>
          <Ionicons name="search-outline" size={18} color={colors.textMuted} />
          <TextInput
            style={[styles.searchText, { color: colors.text }]}
            placeholder="어디로 가시나요?"
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categories */}
      <View style={[styles.categories, { borderBottomColor: colors.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              selected={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat)}
            />
          ))}
        </ScrollView>
      </View>

      {showMap ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 34.6687,
            longitude: 135.5009,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {filteredPlaces.map((place) => (
            <Marker
              key={place.id}
              coordinate={{ latitude: place.latitude, longitude: place.longitude }}
              title={place.name}
              description={place.category}
              pinColor={getCategoryMarkerColor(place.category)}
              onPress={() => navigation.navigate('PlaceDetail', { placeId: place.id })}
            />
          ))}
        </MapView>
      ) : (
        <FlatList
          data={filteredPlaces}
          keyExtractor={(item) => item.id}
          style={{ backgroundColor: colors.background }}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.placeCard, { backgroundColor: colors.card }]}
              onPress={() => navigation.navigate('PlaceDetail', { placeId: item.id })}
              activeOpacity={0.9}
            >
              <Image source={{ uri: item.images[0] }} style={styles.placeImage} />
              <View style={styles.placeContent}>
                <View style={styles.placeTop}>
                  <View style={[styles.categoryBadge, { backgroundColor: getCategoryMarkerColor(item.category) + '20' }]}>
                    <Text style={[styles.categoryText, { color: getCategoryMarkerColor(item.category) }]}>
                      {item.category}
                    </Text>
                  </View>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={13} color="#F59E0B" />
                    <Text style={[styles.rating, { color: colors.text }]}>{item.rating}</Text>
                    <Text style={[styles.reviewCount, { color: colors.textMuted }]}>({item.reviewCount})</Text>
                  </View>
                </View>
                <Text style={[styles.placeName, { color: colors.text }]}>{item.name}</Text>
                <View style={styles.addressRow}>
                  <Ionicons name="location-outline" size={13} color={colors.textMuted} />
                  <Text style={[styles.address, { color: colors.textSecondary }]} numberOfLines={1}>{item.address}</Text>
                </View>
                {item.distance && (
                  <Text style={[styles.distance, { color: colors.primary }]}>
                    <Ionicons name="navigate-outline" size={12} /> {item.distance}km
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  title: { fontSize: 24, fontWeight: '800' },
  headerRight: { flexDirection: 'row', gap: 8 },
  viewToggle: { padding: 8, borderWidth: 1, borderRadius: 10 },
  searchBar: { padding: 12, paddingTop: 0, borderBottomWidth: StyleSheet.hairlineWidth },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  searchText: { flex: 1, fontSize: 15 },
  categories: {
    paddingVertical: 12,
    paddingLeft: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  map: { flex: 1 },
  list: { padding: 16, gap: 14, paddingBottom: 100 },
  placeCard: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  placeImage: { width: 100, height: 110 },
  placeContent: { flex: 1, padding: 12 },
  placeTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  categoryBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  categoryText: { fontSize: 12, fontWeight: '700' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  rating: { fontSize: 13, fontWeight: '700' },
  reviewCount: { fontSize: 12 },
  placeName: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 6 },
  address: { fontSize: 12, flex: 1 },
  distance: { fontSize: 12, fontWeight: '600' },
});
