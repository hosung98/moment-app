/*
 파일명 : useTheme.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import { useColorScheme } from 'react-native';
import { useSettingsStore } from '../store/settingsStore';
import { Colors } from '../constants/theme';

export const useTheme = () => {
  const systemScheme = useColorScheme();
  const themeMode = useSettingsStore((s) => s.themeMode);

  const isDark =
    themeMode === 'dark' || (themeMode === 'system' && systemScheme === 'dark');

  const colors = isDark ? Colors.dark : Colors.light;

  return { isDark, colors, themeMode };
};
