/*
 파일명 : useInfiniteList.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록 - FlatList 무한 스크롤 공통 훅
*/
import { useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { PaginatedResponse } from '@/types/api.types';
import type { QueryKey } from '@tanstack/react-query';

interface UseInfiniteListOptions<T> {
  queryKey: QueryKey;
  queryFn: (context: { pageParam: number }) => Promise<PaginatedResponse<T>>;
  enabled?: boolean;
  staleTime?: number;
}

/**
 * FlatList 무한 스크롤을 위한 공통 훅
 * PaginatedResponse<T> 형태의 API에 사용
 *
 * 사용 예:
 * const { items, onEndReached, hasNextPage, isFetchingNextPage } =
 *   useInfiniteList<BlogPost>({
 *     queryKey: queryKeys.blog.infiniteFeed(),
 *     queryFn: ({ pageParam }) => blogApi.getFeed(pageParam).then(r => r.data.data),
 *   });
 */
export function useInfiniteList<T>(options: UseInfiniteListOptions<T>) {
  const query = useInfiniteQuery({
    queryKey: options.queryKey,
    queryFn: options.queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage: PaginatedResponse<T>) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
    enabled: options.enabled,
    staleTime: options.staleTime,
  });

  // FlatList의 onEndReached에 연결
  const onEndReached = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [query.hasNextPage, query.isFetchingNextPage, query.fetchNextPage]);

  // 모든 페이지 데이터를 단일 배열로 합침
  const items = query.data?.pages.flatMap((page) => page.content) ?? [];

  return {
    ...query,
    items,
    onEndReached,
  };
}
