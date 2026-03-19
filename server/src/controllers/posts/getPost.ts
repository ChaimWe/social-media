import { Request, Response, NextFunction } from "express";
import getPostService from "../../services/posts/getPostService";
import { AppError } from "../../utils/appError";

export default async function getPost(req: Request, res: Response, next: NextFunction) {
  try {
    const postId = String(req.params.postId);
    if (!postId) throw new AppError("Post ID required", 400);

    const post = await getPostService(postId);
    
    res.status(200).json({ success: true, post });
  } catch (error) {
    next(error);
  }
}
