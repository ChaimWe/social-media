import { User } from "../../models/UserModel";
import { AppError } from "../../utils/appError";

export default async function getMeService(userId: string) {
  const user = await User.findById(userId).select("-password");

  if (!user) throw new AppError("User not found", 404);
  
  return user;
}