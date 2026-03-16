import {Post} from "../../models/PostModel";
import { PostInput, postZodSchema } from "../../schemas/postSchema";

export async function PostCreateService(userId: string, data: PostInput) {
  const validatedData = postZodSchema.parse(data);

  const post = new Post({
    author: userId,
    content: validatedData.content,
    image: validatedData.image || "",
  });
  await post.save();

  return post;
};
