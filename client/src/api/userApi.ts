import { api } from "./axios";
import type { User } from "../types/interfaces";

export const fetchUserRequest = (userId: string) =>
  api.get<{ user: User }>(`/users/${userId}`);

export const followUserRequest = (userId: string) =>
  api.post<{ success: boolean }>(`/users/${userId}/follow`);

// export const updateProfileRequest = (data: FormData) =>
//   api.put<{ user: User }>("/users/me", data, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

export const fetchAllUsersRequest = () =>
  api.get<{ users: User[] }>("/users");