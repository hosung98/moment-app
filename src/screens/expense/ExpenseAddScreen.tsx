/*
 파일명 : ExpenseAddScreen.tsx
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Header } from '../../components/common/Header';
import { Chip } from '../../components/common/Chip';
import { Button } from '../../components/common/Button';
import { useTheme } from '../../hooks/useTheme';
import { getCategoryIcon } from '../../utils/currency';

const CATEGORIES = ['accommodation', 'food', 'transport', 'activity', 'shopping', 'other'];

export const ExpenseAddScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [memo, setMemo] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [paidBy, setPaidBy] = useState('나');

  const CATEGORY_LABELS: Record<string, string> = {
    accommodation: '숙박', food: '식비', transport: '교통', activity: '액티비티', shopping: '쇼핑', other: '기타'
  };

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaWrapper>
      <Header title="경비 추가" showBack onBack={() => navigation.goBack()} />
      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        {/* Amount */}
        <View style={[styles.amountCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>금액</Text>
          <View style={styles.amountRow}>
            <Text style={[styles.currency, { color: colors.primary }]}>₩</Text>
            <TextInput
              style={[styles.amountInput, { color: colors.text }]}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={colors.textMuted}
            />
          </View>
        </View>

        {/* Category */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>카테고리</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.catBtn, category === cat && { backgroundColor: colors.primary }]}
                onPress={() => setCategory(cat)}
              >
                <Text style={styles.catIcon}>{getCategoryIcon(cat)}</Text>
                <Text style={[styles.catLabel, { color: category === cat ? '#fff' : colors.textSecondary }]}>
                  {CATEGORY_LABELS[cat]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Memo */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>메모</Text>
          <TextInput
            style={[styles.memoInput, { color: colors.text, borderColor: colors.border }]}
            value={memo}
            onChangeText={setMemo}
            placeholder="지출 내용을 입력하세요"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* Date */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>날짜</Text>
          <TextInput
            style={[styles.memoInput, { color: colors.text, borderColor: colors.border }]}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* Paid By */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>결제자</Text>
          <View style={styles.paidByRow}>
            {['나', 'user2', 'user3'].map((u) => (
              <Chip key={u} label={u} selected={paidBy === u} onPress={() => setPaidBy(u)} />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <Button label="저장" variant="primary" fullWidth onPress={handleSave} />
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  amountCard: { padding: 24, borderRadius: 20, marginBottom: 16 },
  section: { padding: 16, borderRadius: 16, marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '700', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  amountRow: { flexDirection: 'row', alignItems: 'center' },
  currency: { fontSize: 32, fontWeight: '700', marginRight: 8 },
  amountInput: { fontSize: 42, fontWeight: '800', flex: 1 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  catBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    gap: 6,
    minWidth: 90,
  },
  catIcon: { fontSize: 18 },
  catLabel: { fontSize: 13, fontWeight: '600' },
  memoInput: { height: 48, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, fontSize: 15 },
  paidByRow: { flexDirection: 'row', gap: 8 },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, paddingBottom: 32, borderTopWidth: StyleSheet.hairlineWidth,
  },
});
