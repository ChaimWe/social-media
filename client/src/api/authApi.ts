import { api } from "./axios";

export const loginRequest = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const registerRequest = (data: any) =>
  api.post("/auth/register", data);

export const logoutRequest = () =>
  api.post("/auth/logout");