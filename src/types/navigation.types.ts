/*
 파일명 : navigation.types.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
// ─── Navigation Types ─────────────────────────────────────────────────────────
import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<TabParamList>;
  BlogWrite: { tripId?: string; openPhotoPicker?: boolean } | undefined;
  TripCreate: undefined;
};

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
};

export type TabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ExploreTab: NavigatorScreenParams<ExploreStackParamList>;
  MomentTab: undefined;
  ChatTab: NavigatorScreenParams<ChatStackParamList>;
  MyPageTab: NavigatorScreenParams<MyPageStackParamList>;
};

export type HomeStackParamList = {
  Home: undefined;
  TripList: undefined;
  TripDetail: { tripId: string };
  TripEdit: { tripId: string };
  TripSchedule: { tripId: string };
  TripChecklist: { tripId: string };
  Expense: { tripId?: string };
  ExpenseAdd: { tripId?: string };
  BlogFeed: undefined;
  BlogDetail: { blogId: string };
  BlogComment: { blogId: string };
};

export type ExploreStackParamList = {
  Explore: undefined;
  PlaceDetail: { placeId: string };
};

export type ChatStackParamList = {
  ChatList: undefined;
  ChatRoom: { chatId: string; chatName: string };
};

export type MyPageStackParamList = {
  MyPage: undefined;
  ProfileEdit: undefined;
  Settings: undefined;
  Notification: undefined;
  Privacy: undefined;
  Theme: undefined;
  Language: undefined;
  Storage: undefined;
  AppInfo: undefined;
  Expense: { tripId?: string };
  ExpenseAdd: { tripId?: string };
  Challenge: undefined;
};
