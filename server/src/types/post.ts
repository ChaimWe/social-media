import { Types } from "mongoose";
import { IComment } from "./comment";

export interface IPost{
    author: Types.ObjectId;
    content: string;
    image?: string;
    likes: Types.ObjectId[];
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}
