import { Response, NextFunction } from "express";
import { AuthRequest } from "../../types";
import { User } from "../../models/UserModel";
import { AppError } from "../../utils/appError";

export default async function listUsers(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError("Unauthorized", 401);

    const users = await User.find({})
      .select("name bio profileImage followers following")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users: users.map((u: any) => ({
        id: u._id.toString(),
        name: u.name,
        bio: u.bio || "",
        profileImage: u.profileImage || "",
        followers: (u.followers || []).map((id: any) => id.toString()),
        following: (u.following || []).map((id: any) => id.toString()),
      })),
    });
  } catch (error) {
    next(error);
  }
}

