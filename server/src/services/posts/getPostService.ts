import path from "path";
import fs from 'fs';
import { Post } from "../../models/PostModel";
import { AppError } from "../../utils/appError";

export default async function getPostService(postId: string){
    const post = await Post.findById(postId).populate("author", "name");
    if (!post) throw new AppError("Post not found", 404);

    let imageBase64 = null;
    if (post.image) {
        const imagePath = path.join(__dirname, "../../uploads", post.image);
        
        if( fs.existsSync(imagePath)){
            const buffer = fs.readFileSync(imagePath);
            imageBase64 = buffer.toString("base64");
        }
    }
      return {
    _id: post._id,
    content: post.content,
    author: post.author,
    likes: post.likes,
    image: imageBase64
  };
}