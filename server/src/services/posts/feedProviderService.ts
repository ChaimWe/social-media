import {Post} from "../../models/PostModel";
import { User } from "../../models/UserModel";
import { AppError } from "../../utils/appError";

export default async function feedProviderService(userId: string){
    const user = await User.findById(userId).select("following");
    if (!user) throw new AppError("User not found", 404);
    const followingIds = [...user.following, userId];

    const feed = await Post.find({
        author: {$in: followingIds}
    }).populate("author", "name") .populate({
      path: "comments",
      select: "content author createdAt",
      populate: { path: "author", select: "name" },
    }).sort({createdAt: -1}).limit(50);

    return feed;
}