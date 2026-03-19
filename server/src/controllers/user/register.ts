import { Request, Response, NextFunction } from "express";
import { createUser } from "../../services/user/registerService";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/appError";

export default async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await createUser(req.body);
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new AppError("JWT_SECRET missing", 400);

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          bio: user.bio || "",
          profileImage: user.profileImage || "",
          followers: (user.followers || []).map((id: any) => id.toString()),
        },
      });
  } catch (error) {
    next(error);
  }
}
