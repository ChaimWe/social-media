import { Response } from "express";
import { AuthRequest } from "../../types";
import { AppError } from "../../utils/appError";
import userProfileService from "../../services/user/userProfileService";

export default async function getProfile(req: AuthRequest, res: Response){
    const userId = req.user?.id;
    if (!userId) throw new AppError("Unauthorized", 401);
    const profile = await userProfileService(userId);
    res.status(200).json({success: true, profile})
}