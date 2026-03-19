import { makeAutoObservable, runInAction } from "mobx";
import type { User } from "../types/interfaces";
import {
  getMeRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
} from "../api/authApi";

class AuthStore {
  user: User | null = null;
  isAuthenticated = false;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  clearError() {
    this.error = null;
  }

  async login(email: string, password: string) {
    this.loading = true;
    this.error = null;

    try {
      const res = await loginRequest(email, password);

      runInAction(() => {
        if (res.data.user) {
          this.user = res.data.user;
          this.isAuthenticated = true;
        } else {
          this.error = "Invalid response from server";
        }
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Login failed";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async getMe() {
    try {
      const res = await getMeRequest();
      runInAction(() => {
        this.user = res.data.user;
        this.isAuthenticated = true;
      });
    } catch {
      runInAction(() => {
        this.user = null;
        this.isAuthenticated = false;
      });
    }
  }
  
  async register(data: { name: string; email: string; password: string }) {
    this.loading = true;
    this.error = null;

    try {
      const res = await registerRequest(data);

      runInAction(() => {
        if (res.data.user) {
          this.user = res.data.user;
          this.isAuthenticated = true;
        } else {
          this.error = "Invalid response from server";
        }
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Registration failed";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async logout() {
    try {
      await logoutRequest();

      runInAction(() => {
        this.user = null;
        this.isAuthenticated = false;
      });
    } catch (err) {
      console.error("Logout failed", err);
    }
  }
}


  //   async updateProfile(data: FormData) {
  //     this.loading = true;
  //     try {
  //       const res = await updateProfileRequest(data);
  //       runInAction(() => {
  //         this.currentProfile = res.data.user;
  //       });
  //     } catch (err: any) {
  //       runInAction(() => {
  //         this.error = err.response?.data?.message || "Failed to update profile";
  //       });
  //     } finally {
  //       runInAction(() => (this.loading = false));
  //     }
  //   },

export const authStore = new AuthStore();
