import { Post } from "../../models/PostModel";

export default async function getUserPostsService(userId: string) {
  const posts: any[] = await Post.find({ author: userId })
    .sort({ createdAt: -1 })
    .populate("author", "name profileImage")
    .populate({
      path: "comments",
      select: "content author createdAt",
      populate: { path: "author", select: "name" },
    });

  return posts.map((post: any) => ({
    _id: post._id,
    author: {
      id: post.author?._id?.toString?.() ?? String(post.author?._id ?? ""),
      name: post.author?.name ?? "",
      profileImage: post.author?.profileImage ?? "",
    },
    content: post.content,
    image: post.image || "",
    likes: (post.likes || []).map((id: any) => id.toString()),
    comments: (post.comments || []).map((c: any) => ({
      _id: c._id,
      user: {
        id: c.author?._id?.toString?.() ?? String(c.author?._id ?? ""),
        name: c.author?.name ?? "",
      },
      text: c.content,
      createdAt: c.createdAt,
    })),
    createdAt: post.createdAt,
  }));
}

