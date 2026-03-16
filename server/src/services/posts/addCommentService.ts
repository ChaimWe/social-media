import {Comment} from "../../models/CommentModel";
import { Post } from "../../models/PostModel";
import { CommentInput, commentZodSchema } from "../../schemas/commentSchema";
import { AppError } from "../../utils/appError";

export async function addCommentService(userId: string, postId: string, data: CommentInput){
    const post = await Post.findById(postId);
    if (!post) throw new AppError("Post not found", 404)
    const validatedData = commentZodSchema.parse(data);

    const comment = new Comment({
        author: userId,
        postId: postId,
        content: validatedData.content
    });

    await comment.save();
    await Post.updateOne({_id: postId}, {$push: {comments: comment._id}});
    return comment;
}