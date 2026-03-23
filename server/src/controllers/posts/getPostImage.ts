import { Request, Response, NextFunction } from "express";
import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { AppError } from "../../utils/appError";
import { Post } from "../../models/PostModel";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(path.join(__dirname, "../../../uploads"));

export default async function getPostImage(req: Request, res: Response, next: NextFunction) {
  try {
    const postId = String(req.params.postId);
    const post = await Post.findById(postId).select("image").lean();
    if (!post?.image?.trim()) throw new AppError("Not found", 404);

    const basename = path.basename(post.image);
    if (!basename || basename === "." || basename === "..") throw new AppError("Not found", 404);

    const abs = path.resolve(path.join(uploadsDir, basename));
    const rel = path.relative(uploadsDir, abs);
    if (rel.startsWith("..") || path.isAbsolute(rel)) {
      throw new AppError("Not found", 404);
    }

    await fs.access(abs);
    res.sendFile(abs);
  } catch (error) {
    next(error);
  }
}
