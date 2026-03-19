import { Response, NextFunction } from "express";
import { AuthRequest } from "../../types";
import { AppError } from "../../utils/appError";
import deletePostService from "../../services/posts/deletePostService";

export default async function deletePost(req: AuthRequest, res: Response, next: NextFunction){
    try {
        const postId = String(req.params.postId);
        if (!postId) throw new AppError("Post Id required", 400);
        const userId = req.user?.id;
        if (!userId) throw new AppError("Unauthorized", 401)

        const deletion = await deletePostService(userId, postId);
        res.status(200).json({success: true, message: deletion})
    } catch (error) {
        next(error);
    }
}