/*
 파일명 : trip.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import api from './axios';
import type { Trip } from '../types/trip.types';

export const tripApi = {
  getTrips: (status?: string) =>
    api.get<Trip[]>('/trips', { params: { status } }),

  getTrip: (id: string) =>
    api.get<Trip>(`/trips/${id}`),

  createTrip: (data: Partial<Trip>) =>
    api.post<Trip>('/trips', data),

  updateTrip: (id: string, data: Partial<Trip>) =>
    api.put<Trip>(`/trips/${id}`, data),

  deleteTrip: (id: string) =>
    api.delete(`/trips/${id}`),

  inviteMember: (tripId: string, userId: string) =>
    api.post(`/trips/${tripId}/members`, { userId }),

  removeMember: (tripId: string, userId: string) =>
    api.delete(`/trips/${tripId}/members/${userId}`),

  updateChecklist: (tripId: string, itemId: string, isCompleted: boolean) =>
    api.patch(`/trips/${tripId}/checklist/${itemId}`, { isCompleted }),

  addChecklistItem: (tripId: string, data: { title: string; category: string }) =>
    api.post(`/trips/${tripId}/checklist`, data),
};
