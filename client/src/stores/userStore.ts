import { makeAutoObservable, runInAction } from "mobx";
import type { User } from "../types/interfaces";
import {
  fetchUserRequest,
  followUserRequest,
  fetchAllUsersRequest,
} from "../api/userApi";
import { authStore } from "./authstore";

export const userStore = makeAutoObservable({
  currentProfile: null as User | null,
  allUsers: [] as User[],
  loading: false,
  error: "",

  async fetchUser(userId: string) {
    this.loading = true;
    this.error = "";
    try {
      const res = await fetchUserRequest(userId);
      runInAction(() => {
        this.currentProfile = res.data.user;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Failed to fetch user";
      });
    } finally {
      runInAction(() => (this.loading = false));
    }
  },

  async followUser(userId: string) {
    try {
      await followUserRequest(userId);
      const currentUserId = authStore.user?.id;
      if (!currentUserId) return;

      runInAction(() => {
        const toggleFollowers = (u: User) => {
          const isFollowing = u.followers.includes(currentUserId);
          u.followers = isFollowing
            ? u.followers.filter((id) => id !== currentUserId)
            : [...u.followers, currentUserId];
        };

        const inList = this.allUsers.find((u) => u.id === userId);
        if (inList) toggleFollowers(inList);

        if (this.currentProfile && this.currentProfile.id === userId) {
          toggleFollowers(this.currentProfile);
        }
      });
    } catch (err: any) {
      console.error("Follow failed:", err);
      runInAction(() => {
        this.error = "Failed to follow user";
      });
    }
  },

  async fetchAllUsers() {
    this.loading = true;
    try {
      const res = await fetchAllUsersRequest();
      runInAction(() => {
        this.allUsers = res.data.users;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Failed to fetch users";
      });
    } finally {
      runInAction(() => (this.loading = false));
    }
  },
});
