/*
 파일명 : currency.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
export const formatCurrency = (amount: number, currency = 'KRW'): string => {
  const formatters: Record<string, Intl.NumberFormat> = {
    KRW: new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }),
    JPY: new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }),
    USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
    EUR: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }),
    THB: new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }),
  };
  return (formatters[currency] || formatters.KRW).format(amount);
};

export const parseCurrency = (value: string): number => {
  const cleaned = value.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
};

export const splitAmount = (total: number, participants: number): number =>
  Math.ceil(total / participants);

export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    식사: '🍽️',
    교통: '🚌',
    숙박: '🏨',
    쇼핑: '🛍️',
    액티비티: '🎡',
    기타: '💳',
  };
  return icons[category] || '💳';
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    식사: '#FF6B35',
    교통: '#3B82F6',
    숙박: '#8B5CF6',
    쇼핑: '#EC4899',
    액티비티: '#10B981',
    기타: '#6B7280',
  };
  return colors[category] || '#6B7280';
};
