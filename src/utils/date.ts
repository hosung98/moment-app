/*
 파일명 : date.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import { format, differenceInDays, parseISO, isToday, isTomorrow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (date: string, pattern = 'yyyy.MM.dd') =>
  format(parseISO(date), pattern, { locale: ko });

export const formatDateTime = (date: string) =>
  format(parseISO(date), 'yyyy.MM.dd HH:mm', { locale: ko });

export const formatRelativeTime = (date: string): string => {
  const diff = differenceInDays(new Date(), parseISO(date));
  if (diff === 0) return '오늘';
  if (diff === 1) return '어제';
  if (diff < 7) return `${diff}일 전`;
  if (diff < 30) return `${Math.floor(diff / 7)}주 전`;
  if (diff < 365) return `${Math.floor(diff / 30)}달 전`;
  return `${Math.floor(diff / 365)}년 전`;
};

export const getDDay = (startDate: string): string => {
  const days = differenceInDays(parseISO(startDate), new Date());
  if (days === 0) return 'D-DAY';
  if (days > 0) return `D-${days}`;
  return `D+${Math.abs(days)}`;
};

export const getTripDuration = (startDate: string, endDate: string): number =>
  differenceInDays(parseISO(endDate), parseISO(startDate)) + 1;

export const isTripToday = (date: string) => isToday(parseISO(date));
export const isTripTomorrow = (date: string) => isTomorrow(parseISO(date));
