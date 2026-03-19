import { makeAutoObservable, runInAction } from "mobx";
import type { Post } from "../types/interfaces";
import { addCommentRequest, createPostRequest, fetchFeedRequest, getPostRequest, likePostRequest } from "../api/postApi";
import { authStore } from "./authstore";

export const postStore = makeAutoObservable({
  posts: [] as Post[],
  currentPost: null as Post | null,

  loadingFeed: false,
  creatingPost: false,
  likingPost: false,
  addingComment: false,
  loadingPost: false,

  error: "",

  async fetchFeed() {
    this.loadingFeed = true;
    try {
      const res = await fetchFeedRequest();
      runInAction(() => {
        this.posts = res.data.feed;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Failed to fetch posts";
      });
    } finally {
      runInAction(() => (this.loadingFeed = false));
    }
  },

  async getPost(postId: string) {
    this.loadingPost = true;
    try {
      const res = await getPostRequest(postId)
      runInAction(() => {
        this.currentPost = res.data.post;
      })
    } catch (err: any) {
      runInAction(()=>{
        this.error = err.response?.data?.message || "Failed to fetch user";
      })
    } finally {
      this.loadingPost = false;
    }
  },

  async createPost(content: string, imageFile?: File) {
    const formData = new FormData();
    formData.append("content", content);
    if (imageFile) formData.append("image", imageFile);

    this.creatingPost = true;
    try {
      const res = await createPostRequest(formData);
      runInAction(() => {
        this.posts.unshift(res.data.post); 
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Failed to create post";
      });
    } finally {
      runInAction(() => (this.creatingPost = false));
    }
  },

  async likePost(postId: string) {
    const currentUserId = authStore.user?.id;
    const post = this.posts.find((p) => p._id === postId);
    if (!post || !currentUserId) return;


    const prevLikes = [...post.likes];

    const hasLiked = post.likes.includes(currentUserId);

    runInAction(() => {
      post.likes = hasLiked
        ? post.likes.filter((id) => id !== currentUserId)
        : [...post.likes, currentUserId];
    });

    this.likingPost = true; 
    try {
      await likePostRequest(postId);
    } catch (err) {
      console.error("Failed to update like:", err);
      
      runInAction(() => {
        post.likes = prevLikes;
      });
    } finally {
      runInAction(() => (this.likingPost = false));
    }
  },

  async addComment(postId: string, text: string) {
    if (!text.trim()) return;

    this.addingComment = true; 
    try {
      const res = await addCommentRequest(postId, text);
      runInAction(() => {
        const post = this.posts.find((p) => p._id === postId);
        if (post) post.comments.push(res.data.comment);
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Failed to add comment"; 
      });
      console.error("Failed to add comment:", err);
    } finally {
      runInAction(() => (this.addingComment = false));
    }
  },
});