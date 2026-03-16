import { Response } from "express";
import { AuthRequest } from "../../types";
import { addCommentService } from "../../services/posts/addCommentService";
import { AppError } from "../../utils/appError";

export default async function addComment(req: AuthRequest, res: Response) {
  const postId = String(req.params.postId)
  const { content } = req.body;
  const userId = req.user?.id;
  if (!userId) throw new AppError("Unauthorized", 401);

  const newComment = await addCommentService(userId, postId, content);

  res.status(201).json({success: true, Comment: newComment});
}
