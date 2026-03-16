import { Response } from "express";
import type { AuthRequest } from "../../types";
import { PostCreateService } from "../../services/posts/postCreateService";
import { AppError } from "../../utils/appError";

export default async function createPost(req: AuthRequest, res: Response) {
  const userId = req.user?.id;
  if (!userId) throw new AppError("Unauthorized", 401);

  const image = req.file ? `/uploads/${req.file.filename}` : "";
  const {content} = req.body;
  if(!content || !image) throw new AppError("Post must have content or an image", 400);
  
  const post = await PostCreateService(userId, { content, image });
  res.status(201).json({ success: true, post });
}
