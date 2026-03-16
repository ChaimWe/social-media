import mongoose from "mongoose";
import { IComment } from "../types";

const CommentSchema = new mongoose.Schema<IComment>(
  {
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    postId: {type: mongoose.Types.ObjectId, ref: "Post", required: true},
    content: { type: String, required: true, trim: true, maxlength: 500 },
  },
  { timestamps: true },
);
export const Comment = mongoose.model<IComment>("Comment", CommentSchema);
