/*
 파일명 : expense.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import api from './axios';
import type { Expense } from '../types/trip.types';

export const expenseApi = {
  getExpenses: (tripId: string) =>
    api.get<Expense[]>(`/trips/${tripId}/expenses`),

  addExpense: (tripId: string, data: Partial<Expense>) =>
    api.post<Expense>(`/trips/${tripId}/expenses`, data),

  updateExpense: (tripId: string, expenseId: string, data: Partial<Expense>) =>
    api.put<Expense>(`/trips/${tripId}/expenses/${expenseId}`, data),

  deleteExpense: (tripId: string, expenseId: string) =>
    api.delete(`/trips/${tripId}/expenses/${expenseId}`),

  getSettlement: (tripId: string) =>
    api.get(`/trips/${tripId}/settlement`),
};
