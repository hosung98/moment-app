/*
 파일명 : i18n.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ko from './ko.json';
import en from './en.json';
import ja from './ja.json';

const LANGUAGE_KEY = 'language';

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lang: string) => void) => {
    const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
    callback(stored || 'ko');
  },
  init: () => {},
  cacheUserLanguage: async (lang: string) => {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: { ko: { translation: ko }, en: { translation: en }, ja: { translation: ja } },
    fallbackLng: 'ko',
    interpolation: { escapeValue: false },
    compatibilityJSON: 'v4',
  });

export default i18n;
