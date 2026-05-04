/*
 파일명 : TripChecklistScreen.tsx
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
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Header } from '../../components/common/Header';
import { useTheme } from '../../hooks/useTheme';
import { useTripStore } from '../../store/tripStore';
import type { HomeStackParamList } from '../../types/navigation.types';
import type { ChecklistItem } from '../../types/trip.types';

const CATEGORIES = ['서류', '금융', '통신', '숙박', '의류', '건강', '기타'];

export const TripChecklistScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<HomeStackParamList, 'TripChecklist'>>();
  const { colors } = useTheme();
  const trips = useTripStore((s) => s.trips);
  const toggleChecklist = useTripStore((s) => s.toggleChecklist);
  const addChecklistItem = useTripStore((s) => s.addChecklistItem);

  const trip = trips.find((t) => t.id === route.params.tripId);
  const [newItem, setNewItem] = useState('');
  const [newCategory, setNewCategory] = useState('기타');

  if (!trip) return null;

  const checkedCount = trip.checklist.filter((c) => c.isCompleted).length;
  const progress = trip.checklist.length > 0 ? checkedCount / trip.checklist.length : 0;

  const grouped = CATEGORIES.reduce<Record<string, ChecklistItem[]>>((acc, cat) => {
    const items = trip.checklist.filter((i) => i.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  const handleAdd = () => {
    if (!newItem.trim()) return;
    const item: ChecklistItem = {
      id: `c${Date.now()}`,
      title: newItem.trim(),
      category: newCategory,
      isCompleted: false,
    };
    addChecklistItem(trip.id, item);
    setNewItem('');
  };

  return (
    <SafeAreaWrapper>
      <Header title="체크리스트" showBack onBack={() => navigation.goBack()} />

      {/* Progress */}
      <View style={[styles.progressCard, { backgroundColor: colors.surface }]}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressTitle, { color: colors.text }]}>
            {checkedCount}/{trip.checklist.length} 완료
          </Text>
          <Text style={[styles.progressPercent, { color: colors.primary }]}>
            {Math.round(progress * 100)}%
          </Text>
        </View>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${progress * 100}%` }]} />
        </View>
      </View>

      <ScrollView style={{ backgroundColor: colors.background }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {Object.entries(grouped).map(([category, items]) => (
          <View key={category} style={[styles.section, { backgroundColor: colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{category}</Text>
            {items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.item, { borderBottomColor: colors.border }]}
                onPress={() => toggleChecklist(trip.id, item.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
                  size={24}
                  color={item.isCompleted ? colors.success : colors.border}
                />
                <Text
                  style={[
                    styles.itemText,
                    { color: item.isCompleted ? colors.textMuted : colors.text },
                    item.isCompleted && styles.itemDone,
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Add Item */}
      <View style={[styles.addBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <TextInput
          style={[styles.addInput, { color: colors.text, backgroundColor: colors.inputBg }]}
          value={newItem}
          onChangeText={setNewItem}
          placeholder="아이템 추가..."
          placeholderTextColor={colors.textMuted}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catChip, newCategory === cat && { backgroundColor: colors.primary }]}
              onPress={() => setNewCategory(cat)}
            >
              <Text style={[styles.catText, { color: newCategory === cat ? '#fff' : colors.textSecondary }]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: colors.primary, opacity: newItem ? 1 : 0.5 }]}
          onPress={handleAdd}
          disabled={!newItem.trim()}
        >
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  progressCard: { padding: 20, marginBottom: 8 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressTitle: { fontSize: 16, fontWeight: '700' },
  progressPercent: { fontSize: 16, fontWeight: '800' },
  progressBar: { height: 8, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  section: { marginBottom: 8, paddingHorizontal: 16, paddingTop: 16 },
  sectionTitle: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, gap: 12 },
  itemText: { flex: 1, fontSize: 16 },
  itemDone: { textDecorationLine: 'line-through' },
  addBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 12, paddingBottom: 28, borderTopWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  addInput: { height: 44, borderRadius: 12, paddingHorizontal: 14, fontSize: 15 },
  categoryScroll: { maxHeight: 36 },
  catChip: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999,
    backgroundColor: '#E5E7EB', marginRight: 6,
  },
  catText: { fontSize: 13, fontWeight: '600' },
  addBtn: { width: 44, height: 44, borderRadius: 13, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' },
});
