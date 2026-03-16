import z from "zod";

export const postZodSchema = z.object({
    content: z.string().trim().min(1,"Post cannot be empty").max(500, "Post cannot exceed 500 characters"),
    image: z.string().optional()
}).strict();

export type PostInput = z.infer<typeof postZodSchema>