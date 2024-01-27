import mongoose from "mongoose";
import {UserType} from "./user.model";


export interface BlogType {
    body: string;
    createdBy: UserType;
    createdAt: Date;
    updatedAt: Date;
    likes: string[];
    // comments: Comment[];
}

const blogSchema = new mongoose.Schema({
    body: { type: String, required: true },
    
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    createdAt: { type: Date, default: () => Date.now() },
    
    updatedAt: { type: Date, default: () => Date.now() },
    
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    /* comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], */

}, {timestamps: true});


const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;