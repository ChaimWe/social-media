import getUserPostsService from "../posts/getUserPostsService";
import userProfileService from "./userProfileService";

export default async function getUserProfileWithPosts(userId: string) {
  const [user, posts] = await Promise.all([
    userProfileService(userId),
    getUserPostsService(userId),
  ]);

  return { user, posts };
}