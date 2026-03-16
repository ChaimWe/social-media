import { Response } from "express";
import { AuthRequest } from "../../types";
import { AppError } from "../../utils/appError";
import likePostService from "../../services/posts/likePostService";

export default async function likePost(req: AuthRequest, res: Response) {
  const postId = String(req.params.postId);
  if (!postId) throw new AppError("Post Id is required", 400);

  const userId = req.user?.id;
  if (!userId) throw new AppError("Unauthorized", 401);

  const likedPost = await likePostService(userId, postId);
  res.status(200).json({ success: true, likedPost });
}
