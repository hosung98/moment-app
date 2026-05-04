/*
 파일명 : blog.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
import api from './axios';
import type { BlogPost, BlogComment } from '../types/common.types';

export const blogApi = {
  getFeed: (page = 0) =>
    api.get<BlogPost[]>('/blog/feed', { params: { page, size: 10 } }),

  getPost: (id: string) =>
    api.get<BlogPost>(`/blog/${id}`),

  createPost: (data: FormData) =>
    api.post<BlogPost>('/blog', data, { headers: { 'Content-Type': 'multipart/form-data' } }),

  updatePost: (id: string, data: Partial<BlogPost>) =>
    api.put<BlogPost>(`/blog/${id}`, data),

  deletePost: (id: string) =>
    api.delete(`/blog/${id}`),

  likePost: (id: string) =>
    api.post(`/blog/${id}/like`),

  unlikePost: (id: string) =>
    api.delete(`/blog/${id}/like`),

  getComments: (postId: string) =>
    api.get<BlogComment[]>(`/blog/${postId}/comments`),

  addComment: (postId: string, content: string) =>
    api.post<BlogComment>(`/blog/${postId}/comments`, { content }),

  deleteComment: (postId: string, commentId: string) =>
    api.delete(`/blog/${postId}/comments/${commentId}`),
};
