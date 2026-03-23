export function publicPostImageUrl(postId: string, storedPath: string) {
  if (!storedPath?.trim()) return "";
  return `/api/posts/${postId}/image`;
}

export function formatPostFromDoc(post: any, opts?: { includeComments?: boolean }) {
  const includeComments = opts?.includeComments ?? true;
  const rawComments = post.comments || [];
  const commentCount = rawComments.length;

  const comments = includeComments
    ? rawComments.map((c: any) => ({
        _id: c._id,
        user: {
          id: c.author?._id?.toString?.() ?? String(c.author?._id ?? ""),
          name: c.author?.name ?? "",
        },
        text: c.content,
        createdAt: c.createdAt,
      }))
    : [];

  return {
    _id: post._id,
    author: {
      id: post.author?._id?.toString?.() ?? String(post.author?._id ?? ""),
      name: post.author?.name ?? "",
      profileImage: post.author?.profileImage ?? "",
    },
    content: post.content,
    image: publicPostImageUrl(String(post._id), post.image || ""),
    likes: (post.likes || []).map((id: any) => id.toString()),
    comments,
    commentCount,
    createdAt: post.createdAt,
  };
}
