import {Post} from "../../models/PostModel";
import { User } from "../../models/UserModel";
import { AppError } from "../../utils/appError";
import { formatPostFromDoc } from "../../utils/postResponse";

export default async function feedProviderService(userId: string){
    const user = await User.findById(userId).select("following");
    if (!user) throw new AppError("User not found", 404);
    const followingIds = [...user.following, userId];

    const feed = await Post.find({
        author: {$in: followingIds}
    })
      .sort({ createdAt: -1 })
      .populate("author", "name profileImage");

    return feed.map((post: any) => formatPostFromDoc(post, { includeComments: false }));
}