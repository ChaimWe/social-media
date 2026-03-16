import { User } from "../../models/UserModel";
import { AppError } from "../../utils/appError";

export default async function followService(userId: string, userToFollow: string) {

  if (userId === userToFollow)
    throw new AppError("You cannot follow yourself", 400);

  const user = await User.findById(userToFollow).select("followers");
  if (!user) throw new AppError("User not found", 404);

  const alreadyFollowing = user.followers.some(
    id => id.toString() === userId
  );

  if (alreadyFollowing) {
    await User.findByIdAndUpdate(userToFollow, { $pull: { followers: userId } });
    await User.findByIdAndUpdate(userId, { $pull: { following: userToFollow } });
  } else {
    await User.findByIdAndUpdate(userToFollow, { $addToSet: { followers: userId } });
    await User.findByIdAndUpdate(userId, { $addToSet: { following: userToFollow } });
  }

  return {
    followed: !alreadyFollowing,
    followersCount: user.followers.length + (alreadyFollowing ? -1 : 1)
  };
}