/*
 파일명 : place.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import api from './axios';
import type { Place } from '../types/common.types';

export const placeApi = {
  getNearby: (latitude: number, longitude: number, category?: string) =>
    api.get<Place[]>('/places/nearby', { params: { latitude, longitude, category } }),

  search: (query: string, category?: string) =>
    api.get<Place[]>('/places/search', { params: { query, category } }),

  getPlace: (id: string) =>
    api.get<Place>(`/places/${id}`),

  getRecommended: (latitude?: number, longitude?: number) =>
    api.get<Place[]>('/places/recommended', { params: { latitude, longitude } }),
};
