import { Types } from "mongoose";

export interface IComment{
    author: Types.ObjectId;
    postId: Types.ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};
