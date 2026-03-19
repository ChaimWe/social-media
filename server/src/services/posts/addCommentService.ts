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

    const populated = await Comment.findById(comment._id).populate("author", "name profileImage");
    if (!populated) return comment;

    const author = populated.author as any;
    return {
      _id: populated._id,
      user: { id: author?._id?.toString?.() ?? String(author?._id ?? ""), name: author?.name ?? "" },
      text: populated.content,
      createdAt: populated.createdAt,
    };
}