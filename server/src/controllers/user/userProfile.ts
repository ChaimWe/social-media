import { Response, NextFunction } from "express";
import { AuthRequest } from "../../types";
import { AppError } from "../../utils/appError";
import getUserProfileWithPosts from "../../services/user/getProfileWithPosts";

export default async function getProfile(req: AuthRequest, res: Response, next: NextFunction){
    try {
        const requesterId = req.user?.id;
        if (!requesterId) throw new AppError("Unauthorized", 401);

        const profileUserId = String(req.params.userId);
        if (!profileUserId) throw new AppError("User ID required", 400);

        const user = await getUserProfileWithPosts(profileUserId);
        res.status(200).json({ success: true, user })
    } catch (error) {
        next(error);
    }
}