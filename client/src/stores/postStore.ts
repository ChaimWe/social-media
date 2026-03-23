import { makeAutoObservable, runInAction } from "mobx";
import type { Post } from "../types/interfaces";
import {
  addCommentRequest,
  createPostRequest,
  deletePostRequest,
  fetchFeedRequest,
  getPostRequest,
  likePostRequest,
} from "../api/postApi";
import { authStore } from "./authstore";

export const postStore = makeAutoObservable({
  posts: [] as Post[],
  currentPost: null as Post | null,
  postOwner: false,

  loadingFeed: false,
  creatingPost: false,
  likingPost: false,
  addingComment: false,
  loadingPost: false,

  message: "",
  error: "",

  async fetchFeed() {
    this.loadingFeed = true;
    try {
      const res = await fetchFeedRequest();
      runInAction(() => {
        this.posts = res.data.data.feed;
        this.message = res.data.message ?? "";
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
    runInAction(() => {
      this.currentPost = null;
    });
    this.loadingPost = true;
    try {
      const res = await getPostRequest(postId);
      runInAction(() => {
        this.currentPost = res.data.data.post;
        this.message = res.data.message ?? "";
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Failed to fetch post";
      });
    } finally {
      runInAction(() => {
        this.loadingPost = false;
      });
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
        this.posts.unshift(res.data.data.post);
        this.message = res.data.message ?? "";
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

  async deletePost(postId: string) {
    try {
      const res = await deletePostRequest(postId);
      runInAction(() => {
        this.posts = this.posts.filter((post) => post._id !== postId);
        this.message = res.data.message ?? "";
      });
    } catch (err: any) {
      console.error(err);
      runInAction(() => {
        this.error = "Failed to delete post";
      });
    }
  },

  async addComment(postId: string, text: string) {
    if (!text.trim()) return;

    this.addingComment = true;
    try {
      const res = await addCommentRequest(postId, text);
      runInAction(() => {
        const post = this.posts.find((p) => p._id === postId);
        if (post) {
          post.commentCount = (post.commentCount ?? 0) + 1;
        }
        if (this.currentPost?._id === postId) {
          this.currentPost.comments.push(res.data.data.comment);
          this.message = res.data.message ?? "";
          this.currentPost.commentCount = this.currentPost.comments.length;
        }
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
