/*
 파일명 : StackNavigator.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { createStackNavigator as createNativeStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/home/HomeScreen';
import { TripListScreen } from '../screens/trip/TripListScreen';
import { TripDetailScreen } from '../screens/trip/TripDetailScreen';
import { TripEditScreen } from '../screens/trip/TripEditScreen';
import { TripScheduleScreen } from '../screens/trip/TripScheduleScreen';
import { TripChecklistScreen } from '../screens/trip/TripChecklistScreen';
import { ExpenseScreen } from '../screens/expense/ExpenseScreen';
import { ExpenseAddScreen } from '../screens/expense/ExpenseAddScreen';
import { BlogFeedScreen } from '../screens/blog/BlogFeedScreen';
import { BlogDetailScreen } from '../screens/blog/BlogDetailScreen';
import { BlogCommentScreen } from '../screens/blog/BlogCommentScreen';

import type { HomeStackParamList } from '../types/navigation.types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="TripList" component={TripListScreen} />
    <Stack.Screen name="TripDetail" component={TripDetailScreen} />
    <Stack.Screen name="TripEdit" component={TripEditScreen} />
    <Stack.Screen name="TripSchedule" component={TripScheduleScreen} />
    <Stack.Screen name="TripChecklist" component={TripChecklistScreen} />
    <Stack.Screen name="Expense" component={ExpenseScreen} />
    <Stack.Screen name="ExpenseAdd" component={ExpenseAddScreen} />
    <Stack.Screen name="BlogFeed" component={BlogFeedScreen} />
    <Stack.Screen name="BlogDetail" component={BlogDetailScreen} />
    <Stack.Screen name="BlogComment" component={BlogCommentScreen} />
  </Stack.Navigator>
);
