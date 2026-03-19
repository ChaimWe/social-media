import { Response, NextFunction } from "express";
import { AuthRequest } from "../../types";
import { AppError } from "../../utils/appError";
import searchUserService from "../../services/user/searchUserService";

export default async function searchUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const searchedUser = req.query.q as string;
    if (!searchedUser) throw new AppError("No searched user", 400);
    const foundUser = await searchUserService(searchedUser);
    res.status(200).json({ success: true, foundUser });
  } catch (error) {
    next(error);
  }
}
