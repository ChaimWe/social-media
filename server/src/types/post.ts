import { Types } from "mongoose";

export interface IPost{
    author: Types.ObjectId;
    content: string;
    image?: string;
    likes: Types.ObjectId[];
    comments: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
