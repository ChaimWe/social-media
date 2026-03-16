import { api } from "./axios";
import type { Post } from "../types/interfaces";

// Fetch feed posts
export const fetchFeedRequest = () => api.get<{ feed: Post[] }>("/posts/feed");

export const createPostRequest = (data: FormData) =>
  api.post<{ post: Post }>("/posts", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const likePostRequest = (postId: string) => api.post(`/posts/${postId}/like`);

export const addCommentRequest = (postId: string, text: string) =>
  api.post<{ comment: any }>(`/posts/${postId}/comment`, { text });