import { makeAutoObservable, runInAction } from "mobx";
import type { User } from "../types/interfaces";
import { loginRequest, logoutRequest, registerRequest } from "../api/authApi";
export const authStore = makeAutoObservable({
  user: null as User | null,
  isAuthenticated: false,
  loading: false,
  error: "",

  async login(email: string, password: string) {
    this.loading = true;
    try {
      const res = await loginRequest(email, password);
      if (res.data.user) {
        runInAction(() => {
          this.user = res.data.user;
          this.isAuthenticated = true;
        });
      } else {
        runInAction(() => {
          this.error = "Invalid response from server";
        });
      }
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Login failed";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  },

  async logout() {
    try {
      await logoutRequest();
      runInAction(() => {
        this.user = null;
        this.isAuthenticated = false;
      });
    } catch (err: any) {
      console.error(err);
    }
  },

  async register(data: { name: string; email: string; password: string }) {
    this.loading = true;
    try {
      const res = await registerRequest(data);
      if (res.data.user) {
        runInAction(() => {
          this.user = res.data.user;
          this.isAuthenticated = true;
        });
      }
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Registration failed";
      });
    } finally {
      this.loading = false;
    }
  },
});
