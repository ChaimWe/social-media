import { Response } from "express";
import { AuthRequest } from "../../types";
import { AppError } from "../../utils/appError";
import getMeService from "../../services/user/getMeService";

export default async function getMe(req: AuthRequest, res: Response){
    const userId = req.user?.id;
    if (!userId) throw new AppError("Unauthorized", 401);
    const user = await getMeService(userId);

    res.status(200).json({success: true, user});
}