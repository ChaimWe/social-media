import { Post } from "../../models/PostModel";
import { AppError } from "../../utils/appError";

export default async function likePostService(userId: string, postId: string) {
  const post = await Post.findById(postId);
  if (!post) throw new AppError("Post not found", 404);

  const alreadyLiked = post.likes.some((id) => id.toString() === userId);
  if (alreadyLiked) {
    await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
  } else {
    await Post.updateOne({ _id: postId }, { $addToSet: { likes: userId } });
  }
  
  const updatedPost = await Post.findById(postId);

  return {
    liked: !alreadyLiked,
    likesCount: updatedPost?.likes.length || 0,
  }
}
