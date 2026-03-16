import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { IUser } from "../types";

const SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    bio: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    followers: [{type: mongoose.Schema.ObjectId, ref:"User"}],
    following: [{type: mongoose.Schema.ObjectId, ref:"User"}]
  },
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  if(!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
})

export const User = mongoose.model<IUser>("User", UserSchema);
