import { Request, Response, NextFunction } from "express";
import { loginUser } from "../../services/user/loginService";
import { AppError } from "../../utils/appError";

export default async function loginUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new AppError("Email and password are required", 401);
    

    const result = await loginUser(email, password);
    const user = result.user;
    const token = result.token;
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    next(error);
  }
}
