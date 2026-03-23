import { api } from "./axios";
import type { ApiResponse, Post } from "../types/interfaces";

export const fetchFeedRequest = () => api.get<ApiResponse<{ feed: Post[] }>>("/posts/feed");

export const createPostRequest = (data: FormData) =>
  api.post<ApiResponse<{ post: Post }>>("/posts", data);

export const likePostRequest = (postId: string) => api.post(`/posts/${postId}/like`);

export const addCommentRequest = (postId: string, text: string) =>
  api.post<ApiResponse<{ comment: any }>>(`/posts/${postId}/comment`, { content: text });

export const getPostRequest = (postId: string) =>
  api.get<ApiResponse<{ post: Post }>>(`/posts/${postId}`);

export const deletePostRequest = (postId: string) => api.delete(`/posts/${postId}`);