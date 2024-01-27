import mongoose from "mongoose";
import {BlogType} from "./blog.model";

export interface UserType {
    githubId: string;
    username: string;
    email: string;
    password: string;
    blogs: BlogType[];
    following: UserType[];
    followers: UserType[];
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },

    email: { type: String, required: true, unique: true },

    password: { type: String },

    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],

    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    avatar: { type: String, default: "" },

    githubId: { type: String, default: "" },

}, { timestamps: true });


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;