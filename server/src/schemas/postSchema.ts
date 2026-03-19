import z from "zod";

export const postZodSchema = z.object({
    content: z.string().trim().max(500, "Post cannot exceed 500 characters").optional(),
    image: z.string().optional(),
  })
  .strict()
  .refine(
    (data) => Boolean(data.content && data.content.length > 0) || Boolean(data.image && data.image.length > 0),
    { message: "Post must have content or an image" },
  );

export type PostInput = z.infer<typeof postZodSchema>