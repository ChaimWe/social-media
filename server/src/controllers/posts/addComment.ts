import { Response, NextFunction } from "express";
import { AuthRequest } from "../../types";
import { addCommentService } from "../../services/posts/addCommentService";
import { AppError } from "../../utils/appError";

export default async function addComment(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const postId = String(req.params.postId)
    const { content, text } = req.body as { content?: string; text?: string };
    const normalizedContent = content ?? text;
    const userId = req.user?.id;
    if (!userId) throw new AppError("Unauthorized", 401);

    const newComment = await addCommentService(userId, postId, { content: normalizedContent || "" });

    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    next(error);
  }
}
