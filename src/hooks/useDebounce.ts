/*
 파일명 : useDebounce.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 - 검색/입력 디바운스 훅
*/
import { useState, useEffect } from 'react';

/**
 * 검색 등 빠른 타이핑 시 API 호출 최소화
 *
 * 사용 예:
 * const debouncedKeyword = useDebounce(keyword, 400);
 * useEffect(() => { searchApi(debouncedKeyword) }, [debouncedKeyword]);
 */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
