import { Response } from "express";
import { AuthRequest } from "../../types";
import { AppError } from "../../utils/appError";
import followService from "../../services/user/followService";

export default async function follow(req: AuthRequest, res:Response){
    const userId = req.user?.id;
    if (!userId) throw new AppError("Unauthorized", 401);
    const userToFollow = String(req.params.userId);
    if (!userToFollow) throw new AppError("User ID required", 400);
    const followUser = await followService(userId, userToFollow);

    res.status(200).json({success: true, followUser});
}