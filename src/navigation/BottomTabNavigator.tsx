/*
 파일명 : BottomTabNavigator.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 / require() 인라인 → 정적 import 교체
*/
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeStackNavigator } from './StackNavigator';
import { ExploreScreen } from '../screens/explore/ExploreScreen';
import { PlaceDetailScreen } from '../screens/explore/PlaceDetailScreen';
import { ChatListScreen } from '../screens/chat/ChatListScreen';
import { ChatRoomScreen } from '../screens/chat/ChatRoomScreen';
import { MyPageScreen } from '../screens/mypage/MyPageScreen';
import { ProfileEditScreen } from '../screens/mypage/ProfileEditScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { NotificationScreen } from '../screens/settings/NotificationScreen';
import { PrivacyScreen } from '../screens/settings/PrivacyScreen';
import { ThemeScreen } from '../screens/settings/ThemeScreen';
import { LanguageScreen } from '../screens/settings/LanguageScreen';
import { StorageScreen } from '../screens/settings/StorageScreen';
import { AppInfoScreen } from '../screens/settings/AppInfoScreen';
import { ExpenseScreen } from '../screens/expense/ExpenseScreen';
import { ExpenseAddScreen } from '../screens/expense/ExpenseAddScreen';
import { ChallengeScreen } from '../screens/challenge/ChallengeScreen';
import { BottomSheet } from '../components/common/BottomSheet';
import { useTheme } from '../hooks/useTheme';
import type { TabParamList } from '../types/navigation.types';

const ExploreStack = createStackNavigator();
const ChatStack    = createStackNavigator();
const MyPageStack  = createStackNavigator();

const Tab = createBottomTabNavigator<TabParamList>();

const TABS = [
  { key: 'HomeTab', label: '홈', icon: 'home' as const },
  { key: 'ExploreTab', label: '탐색', icon: 'search' as const },
  { key: 'MomentTab', label: '모먼+', icon: 'add-circle' as const },
  { key: 'ChatTab', label: '채팅', icon: 'chatbubbles' as const },
  { key: 'MyPageTab', label: '마이', icon: 'person' as const },
];

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  onMomentPress: () => void;
  unreadCount?: number;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  onMomentPress,
  unreadCount = 10,
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.tabBarBorder,
          paddingBottom: insets.bottom || 16,
        },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const tab = TABS[index];
        const isFocused = state.index === index;
        const isMoment = route.name === 'MomentTab';

        const onPress = () => {
          if (isMoment) {
            onMomentPress();
            return;
          }
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (isMoment) {
          return (
            <View key={route.key} style={styles.fabWrapper}>
              <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.85}>
                <Ionicons name="airplane" size={26} color="#fff" />
              </TouchableOpacity>
              <Text style={[styles.fabLabel, { color: colors.primary }]}>{tab.label}</Text>
            </View>
          );
        }

        const color = isFocused ? colors.tabBarActive : colors.tabBarInactive;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>
              <Ionicons
                name={isFocused ? tab.icon : (`${tab.icon}-outline` as any)}
                size={24}
                color={color}
              />
              {route.name === 'ChatTab' && unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

interface ChatStackProps {
  navigation: any;
}

// Placeholder navigators for tabs
const ExploreTabNavigator = () => (
  <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
    <ExploreStack.Screen name="Explore" component={ExploreScreen} />
    <ExploreStack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
  </ExploreStack.Navigator>
);

const ChatTabNavigator = () => (
  <ChatStack.Navigator screenOptions={{ headerShown: false }}>
    <ChatStack.Screen name="ChatList" component={ChatListScreen} />
    <ChatStack.Screen name="ChatRoom" component={ChatRoomScreen} />
  </ChatStack.Navigator>
);

const MyPageTabNavigator = () => (
  <MyPageStack.Navigator screenOptions={{ headerShown: false }}>
    <MyPageStack.Screen name="MyPage"       component={MyPageScreen} />
    <MyPageStack.Screen name="ProfileEdit"  component={ProfileEditScreen} />
    <MyPageStack.Screen name="Settings"     component={SettingsScreen} />
    <MyPageStack.Screen name="Notification" component={NotificationScreen} />
    <MyPageStack.Screen name="Privacy"      component={PrivacyScreen} />
    <MyPageStack.Screen name="Theme"        component={ThemeScreen} />
    <MyPageStack.Screen name="Language"     component={LanguageScreen} />
    <MyPageStack.Screen name="Storage"      component={StorageScreen} />
    <MyPageStack.Screen name="AppInfo"      component={AppInfoScreen} />
    <MyPageStack.Screen name="Expense"      component={ExpenseScreen} />
    <MyPageStack.Screen name="ExpenseAdd"   component={ExpenseAddScreen} />
    <MyPageStack.Screen name="Challenge"    component={ChallengeScreen} />
  </MyPageStack.Navigator>
);

export const BottomTabNavigator: React.FC = () => {
  const [showMomentSheet, setShowMomentSheet] = useState(false);

  return (
    <>
      <Tab.Navigator
        tabBar={(props) => (
          <CustomTabBar
            {...props}
            onMomentPress={() => setShowMomentSheet(true)}
          />
        )}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
        <Tab.Screen name="ExploreTab" component={ExploreTabNavigator} />
        <Tab.Screen name="MomentTab" component={HomeStackNavigator} />
        <Tab.Screen name="ChatTab" component={ChatTabNavigator} />
        <Tab.Screen name="MyPageTab" component={MyPageTabNavigator} />
      </Tab.Navigator>

      <MomentBottomSheet
        visible={showMomentSheet}
        onClose={() => setShowMomentSheet(false)}
      />
    </>
  );
};

const MomentBottomSheet: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const handleOption = (type: 'blog' | 'trip' | 'photo') => {
    onClose();
    // BottomSheet가 닫힌 뒤 navigate 실행 (애니메이션 충돌 방지)
    setTimeout(() => {
      if (type === 'blog') {
        navigation.navigate('BlogWrite');
      } else if (type === 'trip') {
        navigation.navigate('TripCreate');
      } else if (type === 'photo') {
        // 사진 기록 = 이미지 피커 열고 BlogWrite로 이동
        navigation.navigate('BlogWrite', { openPhotoPicker: true });
      }
    }, 300);
  };

  const options: {
    icon: 'pencil-outline' | 'map-outline' | 'camera-outline';
    label: string;
    sub: string;
    color: string;
    type: 'blog' | 'trip' | 'photo';
  }[] = [
    { icon: 'pencil-outline', label: '여행 기록 쓰기', sub: '블로그 형식으로 여행을 기록해요', color: '#FF6B35', type: 'blog' },
    { icon: 'map-outline',    label: '여행 일정 만들기', sub: '새로운 여행 계획을 세워봐요',   color: '#3B82F6', type: 'trip' },
    { icon: 'camera-outline', label: '사진으로 기록하기', sub: '사진을 찍거나 갤러리에서 선택해요', color: '#10B981', type: 'photo' },
  ];

  return (
    <BottomSheet visible={visible} onClose={onClose} title="무엇을 기록할까요? ✈️">
      <View style={{ paddingBottom: 8 }}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.type}
            style={[momentStyles.option, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => handleOption(opt.type)}
            activeOpacity={0.8}
          >
            <View style={[momentStyles.optionIcon, { backgroundColor: opt.color + '20' }]}>
              <Ionicons name={opt.icon} size={24} color={opt.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[momentStyles.optionLabel, { color: colors.text }]}>{opt.label}</Text>
              <Text style={[momentStyles.optionSub, { color: colors.textSecondary }]}>{opt.sub}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  tabItem: { flex: 1, alignItems: 'center', paddingTop: 2 },
  iconWrapper: { position: 'relative' },
  tabLabel: { fontSize: 11, marginTop: 4, fontWeight: '500' },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#FF6B35',
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '700' },
  fabWrapper: { flex: 1, alignItems: 'center', marginTop: -24 },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  fabLabel: { fontSize: 11, marginTop: 4, fontWeight: '700' },
});

const momentStyles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
    gap: 14,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabel: { fontSize: 16, fontWeight: '700', marginBottom: 3 },
  optionSub: { fontSize: 13 },
});
