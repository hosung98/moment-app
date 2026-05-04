/*
 파일명 : useNetworkState.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 - 네트워크 연결 상태 감지
*/
import { useState, useEffect } from 'react';
import * as Network from 'expo-network';

interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean;
  type: Network.NetworkStateType;
}

/**
 * 네트워크 상태 실시간 감지
 *
 * 사용 예:
 * const { isConnected } = useNetworkState();
 * if (!isConnected) return <OfflineBanner />;
 */
export function useNetworkState(): NetworkState {
  const [state, setState] = useState<NetworkState>({
    isConnected: true,
    isInternetReachable: true,
    type: Network.NetworkStateType.UNKNOWN,
  });

  useEffect(() => {
    let isMounted = true;

    const check = async () => {
      const networkState = await Network.getNetworkStateAsync();
      if (!isMounted) return;
      setState({
        isConnected: networkState.isConnected ?? true,
        isInternetReachable: networkState.isInternetReachable ?? true,
        type: networkState.type ?? Network.NetworkStateType.UNKNOWN,
      });
    };

    // 초기 체크
    check();

    // expo-network는 이벤트 구독 미지원 → 포커스/백그라운드 복귀 시 재체크
    // AppState 활용
    const { AppState } = require('react-native');
    const subscription = AppState.addEventListener('change', (state: string) => {
      if (state === 'active') check();
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  return state;
}
