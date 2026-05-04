/*
 파일명 : MyPageScreen.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Avatar } from '../../components/common/Avatar';
import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';
import { useTripStore } from '../../store/tripStore';
import { MOCK_BLOG_POSTS } from '../../constants/mockData';
import type { MyPageStackParamList } from '../../types/navigation.types';

const { width } = Dimensions.get('window');
const GRID_ITEM_SIZE = (width - 4) / 3;

export const MyPageScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<MyPageStackParamList>>();
  const { colors } = useTheme();
  const user = useAuthStore((s) => s.user);
  const trips = useTripStore((s) => s.trips);

  const myPosts = MOCK_BLOG_POSTS.filter((p) => p.authorId === user?.id);

  return (
    <SafeAreaWrapper>
      <ScrollView style={{ backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.surface }]}>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <View style={[styles.profileCard, { backgroundColor: colors.surface }]}>
          <Avatar uri={user?.profileImage} name={user?.nickname || '나'} size={80} />
          <View style={styles.profileInfo}>
            <Text style={[styles.nickname, { color: colors.text }]}>{user?.nickname || '여행자 김모먼'}</Text>
            <Text style={[styles.bio, { color: colors.textSecondary }]}>{user?.bio || '여행을 사랑하는 나 🌍'}</Text>
          </View>
          <TouchableOpacity
            style={[styles.editBtn, { borderColor: colors.border }]}
            onPress={() => navigation.navigate('ProfileEdit')}
          >
            <Text style={[styles.editBtnText, { color: colors.text }]}>프로필 편집</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={[styles.stats, { backgroundColor: colors.surface }]}>
          {[
            { label: '여행', value: trips.length },
            { label: '게시물', value: myPosts.length },
            { label: '팔로워', value: 42 },
            { label: '팔로잉', value: 30 },
          ].map((stat) => (
            <View key={stat.label} style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Badges */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>획득한 뱃지</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Challenge')}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgeRow}>
            {['🏆', '✈️', '📸', '🗺️', '⭐'].map((badge, idx) => (
              <View key={idx} style={[styles.badgeItem, { backgroundColor: colors.inputBg }]}>
                <Text style={styles.badgeIcon}>{badge}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Photo Grid */}
        <View style={[styles.section, { backgroundColor: colors.surface, marginTop: 8 }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>나의 기록</Text>
          {myPosts.length === 0 ? (
            <View style={styles.emptyGrid}>
              <Ionicons name="camera-outline" size={44} color={colors.border} />
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>첫 번째 기록을 남겨보세요!</Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {MOCK_BLOG_POSTS.flatMap((p) => p.images).slice(0, 9).map((img, idx) => (
                <TouchableOpacity key={idx} style={styles.gridItem}>
                  <Image source={{ uri: img }} style={styles.gridImage} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'flex-end', padding: 12 },
  settingsBtn: { padding: 4 },
  profileCard: { padding: 20, gap: 12 },
  profileInfo: { gap: 6 },
  nickname: { fontSize: 22, fontWeight: '800' },
  bio: { fontSize: 14 },
  editBtn: { alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5 },
  editBtnText: { fontSize: 14, fontWeight: '700' },
  stats: { flexDirection: 'row', paddingVertical: 16, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E5E7EB' },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statValue: { fontSize: 22, fontWeight: '800' },
  statLabel: { fontSize: 12 },
  section: { padding: 16, marginTop: 0 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '800' },
  seeAll: { fontSize: 14, fontWeight: '600' },
  badgeRow: { marginLeft: -4 },
  badgeItem: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  badgeIcon: { fontSize: 28 },
  emptyGrid: { alignItems: 'center', padding: 40, gap: 12 },
  emptyText: { fontSize: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 2 },
  gridItem: { width: GRID_ITEM_SIZE, height: GRID_ITEM_SIZE },
  gridImage: { width: '100%', height: '100%' },
});
