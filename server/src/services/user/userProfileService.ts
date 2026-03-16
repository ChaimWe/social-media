import { User } from "../../models/UserModel";
import { AppError } from "../../utils/appError";

export default async function userProfileService(userId: string){
    const user = await User.findById(userId).select("name bio profileImage followers following")
    if(!user) throw new AppError("User not found", 404);
    return user;
}