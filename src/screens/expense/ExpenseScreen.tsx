/*
 파일명 : ExpenseScreen.tsx
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
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { SafeAreaWrapper } from '../../components/common/SafeAreaWrapper';
import { Header } from '../../components/common/Header';
import { useTheme } from '../../hooks/useTheme';
import { getCategoryIcon, getCategoryColor, formatCurrency } from '../../utils/currency';

type AnyNavigation = StackNavigationProp<any>;

const { width } = Dimensions.get('window');

const MOCK_EXPENSES = [
  { id: 'e1', category: 'accommodation', amount: 120000, memo: '도톤보리 호텔 2박', paidBy: 'user1', date: '2025-03-15' },
  { id: 'e2', category: 'food', amount: 45000, memo: '이치란 라멘', paidBy: 'user1', date: '2025-03-16' },
  { id: 'e3', category: 'transport', amount: 32000, memo: '오사카 1일 교통권', paidBy: 'user2', date: '2025-03-16' },
  { id: 'e4', category: 'shopping', amount: 89000, memo: '신사이바시 쇼핑', paidBy: 'user1', date: '2025-03-17' },
  { id: 'e5', category: 'activity', amount: 30000, memo: '유니버설 스튜디오', paidBy: 'user2', date: '2025-03-17' },
];

const CHART_COLORS = ['#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

export const ExpenseScreen: React.FC = () => {
  const navigation = useNavigation<AnyNavigation>();
  const { colors, isDark } = useTheme();

  const totalBudget = 500000;
  const totalSpent = MOCK_EXPENSES.reduce((sum, e) => sum + e.amount, 0);
  const remaining = totalBudget - totalSpent;

  const categoryTotals = MOCK_EXPENSES.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryTotals).map(([cat, amount], idx) => ({
    name: cat,
    population: amount,
    color: CHART_COLORS[idx % CHART_COLORS.length],
    legendFontColor: colors.text,
    legendFontSize: 12,
  }));

  return (
    <SafeAreaWrapper>
      <Header
        title="여행 경비"
        showBack
        onBack={() => navigation.goBack()}
        rightLabel="추가"
        onRightPress={() => navigation.navigate('ExpenseAdd', {})}
      />

      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Budget Summary */}
        <View style={[styles.budgetCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.budgetLabel}>총 예산</Text>
          <Text style={styles.budgetAmount}>{formatCurrency(totalBudget, 'KRW')}</Text>
          <View style={[styles.budgetBar, { backgroundColor: 'rgba(255,255,255,0.3)' }]}>
            <View style={[styles.budgetFill, { width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }]} />
          </View>
          <View style={styles.budgetRow}>
            <Text style={styles.spentLabel}>사용: {formatCurrency(totalSpent, 'KRW')}</Text>
            <Text style={styles.remainLabel}>남은: {formatCurrency(remaining, 'KRW')}</Text>
          </View>
        </View>

        {/* Pie Chart */}
        <View style={[styles.chartSection, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>카테고리별 지출</Text>
          <PieChart
            data={pieData}
            width={width - 32}
            height={180}
            chartConfig={{
              color: (opacity = 1) => `rgba(26,31,54,${opacity})`,
              backgroundColor: colors.surface,
              backgroundGradientFrom: colors.surface,
              backgroundGradientTo: colors.surface,
              labelColor: () => colors.text,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="16"
            absolute
          />
        </View>

        {/* Settlement */}
        <View style={[styles.settlementCard, { backgroundColor: colors.surface }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>정산</Text>
          </View>
          <View style={styles.settlementRow}>
            <View style={styles.settlementPerson}>
              <Text style={[styles.personName, { color: colors.text }]}>user1</Text>
              <Text style={[styles.personAmount, { color: colors.primary }]}>{formatCurrency(254000, 'KRW')} 냄</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color={colors.textMuted} />
            <View style={styles.settlementPerson}>
              <Text style={[styles.personName, { color: colors.text }]}>user2</Text>
              <Text style={[styles.personAmount, { color: '#EF4444' }]}>62000원 받아야 함</Text>
            </View>
          </View>
        </View>

        {/* Expense List */}
        <View style={[styles.listSection, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>지출 내역</Text>
          {MOCK_EXPENSES.map((expense) => (
            <View key={expense.id} style={[styles.expenseItem, { borderBottomColor: colors.border }]}>
              <View style={[styles.expenseIcon, { backgroundColor: getCategoryColor(expense.category) + '20' }]}>
                <Text style={styles.expenseIconText}>{getCategoryIcon(expense.category)}</Text>
              </View>
              <View style={styles.expenseInfo}>
                <Text style={[styles.expenseMemo, { color: colors.text }]}>{expense.memo}</Text>
                <Text style={[styles.expenseDate, { color: colors.textMuted }]}>{expense.date}</Text>
              </View>
              <Text style={[styles.expenseAmount, { color: colors.text }]}>{formatCurrency(expense.amount, 'KRW')}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  budgetCard: { margin: 16, padding: 20, borderRadius: 20 },
  budgetLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 6 },
  budgetAmount: { color: '#fff', fontSize: 32, fontWeight: '800', marginBottom: 16 },
  budgetBar: { height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 10 },
  budgetFill: { height: '100%', backgroundColor: '#fff', borderRadius: 4 },
  budgetRow: { flexDirection: 'row', justifyContent: 'space-between' },
  spentLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 13 },
  remainLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 13 },
  chartSection: { marginHorizontal: 16, marginBottom: 8, padding: 16, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  settlementCard: { marginHorizontal: 16, marginBottom: 8, padding: 16, borderRadius: 16 },
  settlementRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  settlementPerson: { alignItems: 'center', gap: 4 },
  personName: { fontSize: 14, fontWeight: '700' },
  personAmount: { fontSize: 13 },
  listSection: { marginHorizontal: 16, borderRadius: 16, padding: 16, paddingBottom: 0 },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  expenseIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  expenseIconText: { fontSize: 20 },
  expenseInfo: { flex: 1 },
  expenseMemo: { fontSize: 15, fontWeight: '600' },
  expenseDate: { fontSize: 12, marginTop: 3 },
  expenseAmount: { fontSize: 15, fontWeight: '800' },
});
