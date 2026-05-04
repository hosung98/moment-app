/*
 파일명 : useLocation.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export const useLocation = () => {
  const [state, setState] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setState((s) => ({ ...s, error: '위치 권한이 필요합니다', loading: false }));
      return false;
    }
    return true;
  };

  const getLocation = async () => {
    setState((s) => ({ ...s, loading: true }));
    const granted = await requestPermission();
    if (!granted) return;

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        error: null,
        loading: false,
      });
    } catch (e) {
      setState((s) => ({ ...s, error: '위치를 가져올 수 없습니다', loading: false }));
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { ...state, refresh: getLocation };
};
