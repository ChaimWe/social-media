import { User } from "../../models/UserModel";
import { AppError } from "../../utils/appError";

export default async function searchUserService(searchedUser: string){
    const regex = new RegExp(searchedUser, "i")
    const foundUser = await User.find({name: regex}).select("name bio profileImage followers following");
    if (!foundUser) throw new AppError("User not found", 404);
    return foundUser;
}