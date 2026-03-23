import { Response, NextFunction } from "express";
import type { AuthRequest } from "../../types";
import { PostCreateService } from "../../services/posts/postCreateService";
import { AppError } from "../../utils/appError";
import { Post } from "../../models/PostModel";
import { formatPostFromDoc } from "../../utils/postResponse";

export default async function createPost(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError("Unauthorized", 401);

    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const {content} = req.body;
    if (!content?.trim() && !image) throw new AppError("Post must have content or an image", 400);
    
    const created = await PostCreateService(userId, { content, image });
    const post = await Post.findById(created._id).populate("author", "name profileImage");
    if (!post) throw new AppError("Post not found", 404);

    res.status(201).json({ success: true, data: {post: formatPostFromDoc(post, { includeComments: false })} });
  } catch (error) {
    next(error);
  }
}
