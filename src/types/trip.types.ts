/*
 파일명 : trip.types.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
export type TripStatus = 'upcoming' | 'ongoing' | 'completed';

export interface TripMember {
  id: string;
  nickname: string;
  profileImage?: string;
  role: 'owner' | 'member';
}

export interface TripPlace {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  place?: TripPlace;
  duration?: number;
  memo?: string;
}

export interface TripDay {
  date: string;
  dayNumber: number;
  schedules: ScheduleItem[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  category: string;
  isCompleted: boolean;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  coverImage?: string;
  startDate: string;
  endDate: string;
  status: TripStatus;
  members: TripMember[];
  days: TripDay[];
  checklist: ChecklistItem[];
  totalBudget?: number;
  description?: string;
  createdAt: string;
}

export type ExpenseCategory = '식사' | '교통' | '숙박' | '쇼핑' | '액티비티' | '기타';

export interface Expense {
  id: string;
  tripId: string;
  category: ExpenseCategory;
  amount: number;
  currency: string;
  memo?: string;
  date: string;
  paidBy: string;
  participants: string[];
}
