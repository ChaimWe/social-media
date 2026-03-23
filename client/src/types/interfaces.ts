export interface User{
  id: string;
  name: string;
  email: string;
  bio: string;
  profileImage: string;
  followers: string[];
  following: string[];
  posts: Post[];
};
export interface Comment {
  _id?: string;
  user: { id: string; name: string };
  text: string;
  createdAt: string;
}
export interface Post {
  _id: string;
  author: { id: string; name: string; profileImage: string };
  content: string;
  image?: string;
  likes: string[];
  comments: Comment[];
  commentCount: number;
  createdAt: string;
}
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
}