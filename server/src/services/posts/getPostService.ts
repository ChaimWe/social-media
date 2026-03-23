import { Post } from "../../models/PostModel";
import { AppError } from "../../utils/appError";
import { formatPostFromDoc } from "../../utils/postResponse";

export default async function getPostService(postId: string) {
  const post: any = await Post.findById(postId)
    .populate("author", "name profileImage")
    .populate({
      path: "comments",
      select: "content author createdAt",
      populate: { path: "author", select: "name" },
    });
  if (!post) throw new AppError("Post not found", 404);

  return formatPostFromDoc(post);
} 