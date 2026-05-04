/*
 파일명 : RootNavigator.tsx
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import React from 'react';
import { createStackNavigator as createNativeStackNavigator } from '@react-navigation/stack';

import { SplashScreen } from '../screens/auth/SplashScreen';
import { OnboardingScreen } from '../screens/auth/OnboardingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { BlogWriteScreen } from '../screens/blog/BlogWriteScreen';
import { TripCreateScreen } from '../screens/trip/TripCreateScreen';
import type { RootStackParamList } from '../types/navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen
        name="BlogWrite"
        component={BlogWriteScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="TripCreate"
        component={TripCreateScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = createNativeStackNavigator();

const AuthNavigator: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Splash" component={SplashScreen} />
    <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);
