import { Response, NextFunction } from "express";
import { AuthRequest } from "../../types";
import { AppError } from "../../utils/appError";
import feedProviderService from "../../services/posts/feedProviderService";

export default async function getFeed(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError("Unauthorized", 401);
    const feed = await feedProviderService(userId);
    res.status(200).json({ success: true, data: {feed} });
  } catch (error) {
    next(error);
  }
}
