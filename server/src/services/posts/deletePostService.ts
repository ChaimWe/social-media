import { Post } from "../../models/PostModel";
import { AppError } from "../../utils/appError";

export default async function deletePostService(
  userId: string,
  postId: string,
) {
  const deleted = await Post.findOneAndDelete({
    _id: postId,
    author: userId,
  });

  if (!deleted) throw new AppError("Post not found or unauthorized", 404);
  return { message: "Post deleted successfully" };
}
