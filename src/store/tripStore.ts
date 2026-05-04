/*
 파일명 : tripStore.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import { create } from 'zustand';
import type { Trip, ChecklistItem } from '../types/trip.types';
import { MOCK_TRIPS } from '../constants/mockData';

interface TripState {
  trips: Trip[];
  selectedTrip: Trip | null;
  setTrips: (trips: Trip[]) => void;
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  selectTrip: (trip: Trip | null) => void;
  toggleChecklist: (tripId: string, itemId: string) => void;
  addChecklistItem: (tripId: string, item: ChecklistItem) => void;
}

export const useTripStore = create<TripState>((set) => ({
  trips: MOCK_TRIPS,
  selectedTrip: null,

  setTrips: (trips) => set({ trips }),

  addTrip: (trip) => set((state) => ({ trips: [trip, ...state.trips] })),

  updateTrip: (id, updates) =>
    set((state) => ({
      trips: state.trips.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  deleteTrip: (id) =>
    set((state) => ({ trips: state.trips.filter((t) => t.id !== id) })),

  selectTrip: (trip) => set({ selectedTrip: trip }),

  toggleChecklist: (tripId, itemId) =>
    set((state) => ({
      trips: state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              checklist: trip.checklist.map((item) =>
                item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
              ),
            }
          : trip
      ),
    })),

  addChecklistItem: (tripId, item) =>
    set((state) => ({
      trips: state.trips.map((trip) =>
        trip.id === tripId
          ? { ...trip, checklist: [...trip.checklist, item] }
          : trip
      ),
    })),
}));
