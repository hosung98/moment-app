/*
 파일명 : settingsStore.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ThemeMode, FontSize, Language } from '../types/common.types';

interface SettingsState {
  themeMode: ThemeMode;
  fontSize: FontSize;
  language: Language;
  notifications: {
    enabled: boolean;
    trip: boolean;
    chat: boolean;
    location: boolean;
    event: boolean;
    likes: boolean;
    follows: boolean;
    tripUpdates: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    locationSharing: boolean;
    defaultPostVisibility: 'public' | 'friends' | 'private';
    activityVisible: boolean;
  };
  offlineMode: boolean;
  autoSavePhotos: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  setFontSize: (size: FontSize) => void;
  setLanguage: (lang: Language) => void;
  toggleNotification: (key: keyof SettingsState['notifications']) => void;
  setNotifications: (updates: Partial<SettingsState['notifications']>) => void;
  updatePrivacy: (updates: Partial<SettingsState['privacy']>) => void;
  setPrivacy: (updates: Partial<SettingsState['privacy']>) => void;
  toggleOfflineMode: () => void;
  setOfflineMode: (value: boolean) => void;
  toggleAutoSavePhotos: () => void;
  setAutoSavePhotos: (value: boolean) => void;
  loadSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  themeMode: 'system',
  fontSize: 'medium',
  language: 'ko',
  notifications: {
    enabled: true,
    trip: true,
    chat: true,
    location: false,
    event: true,
    likes: true,
    follows: true,
    tripUpdates: true,
    marketing: false,
  },
  privacy: {
    profileVisibility: 'public',
    locationSharing: false,
    defaultPostVisibility: 'friends',
    activityVisible: true,
  },
  offlineMode: false,
  autoSavePhotos: true,

  setThemeMode: async (mode) => {
    await AsyncStorage.setItem('themeMode', mode);
    set({ themeMode: mode });
  },

  setFontSize: async (size) => {
    await AsyncStorage.setItem('fontSize', size);
    set({ fontSize: size });
  },

  setLanguage: async (lang) => {
    await AsyncStorage.setItem('language', lang);
    set({ language: lang });
  },

  toggleNotification: (key) =>
    set((state) => ({
      notifications: { ...state.notifications, [key]: !state.notifications[key] },
    })),

  setNotifications: (updates) =>
    set((state) => ({
      notifications: { ...state.notifications, ...updates },
    })),

  updatePrivacy: (updates) =>
    set((state) => ({ privacy: { ...state.privacy, ...updates } })),

  setPrivacy: (updates) =>
    set((state) => ({ privacy: { ...state.privacy, ...updates } })),

  toggleOfflineMode: () => set((state) => ({ offlineMode: !state.offlineMode })),
  setOfflineMode: (value) => set({ offlineMode: value }),
  toggleAutoSavePhotos: () => set((state) => ({ autoSavePhotos: !state.autoSavePhotos })),
  setAutoSavePhotos: (value) => set({ autoSavePhotos: value }),

  loadSettings: async () => {
    const themeMode = await AsyncStorage.getItem('themeMode');
    const fontSize = await AsyncStorage.getItem('fontSize');
    const language = await AsyncStorage.getItem('language');
    if (themeMode) set({ themeMode: themeMode as ThemeMode });
    if (fontSize) set({ fontSize: fontSize as FontSize });
    if (language) set({ language: language as Language });
  },
}));
