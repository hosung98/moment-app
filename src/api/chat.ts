/*
 파일명 : chat.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import api from './axios';
import type { ChatRoom, ChatMessage } from '../types/common.types';

export const chatApi = {
  getRooms: () =>
    api.get<ChatRoom[]>('/chat/rooms'),

  getNearbyRooms: (latitude: number, longitude: number) =>
    api.get<ChatRoom[]>('/chat/rooms/nearby', { params: { latitude, longitude } }),

  getMessages: (roomId: string, page = 0) =>
    api.get<ChatMessage[]>(`/chat/rooms/${roomId}/messages`, { params: { page, size: 30 } }),

  sendMessage: (roomId: string, content: string, type: 'text' | 'image' = 'text') =>
    api.post<ChatMessage>(`/chat/rooms/${roomId}/messages`, { content, type }),

  translateMessage: (messageId: string, targetLang: string) =>
    api.post<{ translatedContent: string }>(`/chat/messages/${messageId}/translate`, { targetLang }),

  joinRoom: (roomId: string) =>
    api.post(`/chat/rooms/${roomId}/join`),

  leaveRoom: (roomId: string) =>
    api.delete(`/chat/rooms/${roomId}/leave`),
};
