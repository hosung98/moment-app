/*
 파일명 : common.types.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
export interface ChatMessage {
  id: string;
  chatRoomId: string;
  senderId: string;
  senderName: string;
  senderImage?: string;
  content: string;
  type: 'text' | 'image' | 'location';
  imageUrl?: string;
  translatedContent?: string;
  isTranslated: boolean;
  createdAt: string;
  isRead: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'location' | 'trip' | 'direct';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  members: number;
  thumbnail?: string;
  location?: string;
}

export interface BlogPost {
  id: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  title?: string;
  content: string;
  images: string[];
  location?: string;
  tripId?: string;
  tags: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  visibility: 'public' | 'friends' | 'private';
  createdAt: string;
}

export interface BlogComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
}

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  distance?: number;
  images: string[];
  description?: string;
  openHours?: string;
  phone?: string;
  website?: string;
}

export type PlaceCategory = '전체' | '음식' | '자연' | '역사' | '액티비티' | '쇼핑' | '숙박';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  condition: string;
  badgeImage: string;
  badgeColor: string;
  isCompleted: boolean;
  progress: number;
  maxProgress: number;
  category: string;
  completedAt?: string;
  // 화면 표시용 추가 필드
  icon: string;           // 이모지 아이콘
  currentCount: number;   // 현재 달성 수
  targetCount: number;    // 목표 수
  rewardPoints: number;   // 보상 포인트
}

export type ThemeMode = 'light' | 'dark' | 'system';
export type FontSize = 'small' | 'medium' | 'large';
export type Language = 'ko' | 'en' | 'ja';
