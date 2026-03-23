import { Post } from "../../models/PostModel";
import { formatPostFromDoc } from "../../utils/postResponse";

export default async function getUserPostsService(userId: string) {
  const posts: any[] = await Post.find({ author: userId })
    .sort({ createdAt: -1 })
    .populate("author", "name profileImage")
    .lean();

  return posts.map((post: any) => formatPostFromDoc(post, { includeComments: false }));
}

