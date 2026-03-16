import z from "zod";

export const commentZodSchema = z.object({
    content: z.string().trim().min(1, "Comment cannot be empty").max(150, "Comment cannot exceed 150 characters")
}).strict();

export type CommentInput = z.infer<typeof commentZodSchema>