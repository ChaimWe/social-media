export interface User{
  id: string;
  name: string;
  email: string;
};
export interface Comment {
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
  createdAt: string;
}