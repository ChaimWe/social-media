import { z } from "zod";

export const userZodSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().toLowerCase().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
}).strict();

export type UserInput = z.infer<typeof userZodSchema>;