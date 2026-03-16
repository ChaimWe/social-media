import { Response } from "express";
import { AuthRequest } from "../../types";
import { AppError } from "../../utils/appError";
import searchUserService from "../../services/user/searchUserService";

export default async function searchUser(req: AuthRequest, res: Response) {
  const searchedUser = req.query.q as string;
  if (!searchedUser) throw new AppError("No searched user", 400);
  const foundUser = await searchUserService(searchedUser);
  res.status(200).json({ success: true, foundUser });
}
