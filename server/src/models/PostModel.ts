import mongoose from "mongoose";
import { IPost } from "../types";

const PostSchema = new mongoose.Schema<IPost>(
  {
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true, maxlength: 500 },
    image: { type: String, default: "" },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true },
);
PostSchema.index({ author: 1, createdAt: -1 });

export const Post = mongoose.model<IPost>("Post", PostSchema);
