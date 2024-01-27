"use server"

import {connectToDb} from "../mongoose";

import Blog from "../models/blog.model";


export async function createBlog({body, createdBy}: { body: string, createdBy: string }) {
    try {
        await connectToDb();
        const blog = await Blog.create({
            body: body,
            createdBy: createdBy,
    });
    await blog.save();

    console.log(blog);
    } catch (error:any) {
        console.log(error.message);
        
    }    
};

export async function fetchAllBlogs() {
    try {
        await connectToDb();
        const blogs = await Blog.find({}); // find all blogs
        console.log(blogs);
        return blogs.map(blog => blog.toObject({ getters: true, virtuals: false })); // convert each blog to a plain object
    } catch (error:any) {
        console.log(error.message);
    }
}