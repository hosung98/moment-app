/*
 파일명 : permissions.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 - 카메라/위치/알림 권한 통합 관리
*/
import { Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { logger } from '@/utils/logger';

type PermissionResult = 'granted' | 'denied' | 'blocked';

// ────────────────────────────────────────────────
// 권한 거부 시 설정 화면 안내 다이얼로그
// ────────────────────────────────────────────────
function showSettingsAlert(feature: string): void {
  Alert.alert(
    `${feature} 권한 필요`,
    `${feature} 기능을 사용하려면 설정에서 권한을 허용해 주세요.`,
    [
      { text: '취소', style: 'cancel' },
      { text: '설정 열기', onPress: () => Linking.openSettings() },
    ]
  );
}

// ────────────────────────────────────────────────
// 카메라 / 사진 라이브러리 권한
// ────────────────────────────────────────────────
export const permissions = {
  async requestCamera(): Promise<PermissionResult> {
    try {
      const { status, canAskAgain } =
        await ImagePicker.requestCameraPermissionsAsync();

      if (status === 'granted') return 'granted';

      if (!canAskAgain) {
        showSettingsAlert('카메라');
        return 'blocked';
      }

      return 'denied';
    } catch (e) {
      logger.error('Permissions', '카메라 권한 요청 실패', e);
      return 'denied';
    }
  },

  async requestMediaLibrary(): Promise<PermissionResult> {
    try {
      const { status, canAskAgain } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status === 'granted') return 'granted';

      if (!canAskAgain) {
        showSettingsAlert('사진 라이브러리');
        return 'blocked';
      }

      return 'denied';
    } catch (e) {
      logger.error('Permissions', '미디어 라이브러리 권한 요청 실패', e);
      return 'denied';
    }
  },

  // ── 위치 권한 ──────────────────────────────────
  async requestLocation(background = false): Promise<PermissionResult> {
    try {
      const { status, canAskAgain } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        if (!canAskAgain) {
          showSettingsAlert('위치');
          return 'blocked';
        }
        return 'denied';
      }

      // 백그라운드 위치가 필요한 경우 추가 요청
      if (background) {
        const bgResult = await Location.requestBackgroundPermissionsAsync();
        if (bgResult.status !== 'granted') return 'denied';
      }

      return 'granted';
    } catch (e) {
      logger.error('Permissions', '위치 권한 요청 실패', e);
      return 'denied';
    }
  },

  // ── 푸시 알림 권한 ─────────────────────────────
  async requestNotification(): Promise<PermissionResult> {
    try {
      const { status: existing } = await Notifications.getPermissionsAsync();
      if (existing === 'granted') return 'granted';

      const { status, canAskAgain } =
        await Notifications.requestPermissionsAsync();

      if (status === 'granted') return 'granted';

      if (!canAskAgain) {
        showSettingsAlert('알림');
        return 'blocked';
      }

      return 'denied';
    } catch (e) {
      logger.error('Permissions', '알림 권한 요청 실패', e);
      return 'denied';
    }
  },

  // ── 현재 권한 상태 조회 (요청 없이) ────────────
  async check(): Promise<{
    camera: boolean;
    mediaLibrary: boolean;
    location: boolean;
    notification: boolean;
  }> {
    const [camera, media, location, notification] = await Promise.all([
      ImagePicker.getCameraPermissionsAsync(),
      ImagePicker.getMediaLibraryPermissionsAsync(),
      Location.getForegroundPermissionsAsync(),
      Notifications.getPermissionsAsync(),
    ]);

    return {
      camera: camera.status === 'granted',
      mediaLibrary: media.status === 'granted',
      location: location.status === 'granted',
      notification: notification.status === 'granted',
    };
  },
};
