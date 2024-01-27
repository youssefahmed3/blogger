"use client";
import { createUser, fetchAllUsers } from "@/lib/actions/user.actions";
import User, { UserType } from "@/lib/models/user.model";
import Blog from "@/lib/models/blog.model";
import { useEffect, useState } from "react";
import { createBlog, fetchAllBlogs } from "@/lib/actions/blog.actions";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blogCard/BlogCard";
import { useSession } from "next-auth/react";


export default function Home() {
  const [users, setUsers] = useState<(typeof User)[]>([]);
  const [blogs, setBlogs] = useState<(typeof Blog)[]>([]);
  const {data:session }= useSession();
  const user = session?.user as UserType;
  async function createNewBlog() {
    await createBlog({
      body: "test Blog",
      createdBy: "65ac5198f1c0c6fb978472c1",
    });
  }

  // Fetch all users on page load
  useEffect(() => {
    /* async function fetchUsers() {
      const users = await fetchAllUsers();
      if (!users) return;
      setUsers(users);
    }

    async function fetchBlogs() {
      const blogs = await fetchAllBlogs();
      if (!blogs) return;
      setBlogs(blogs);
    }

    fetchBlogs();
    fetchUsers(); */

    console.log(user);
    
  }, [user]);

  return (
    <main className="container flex gap-6 flex-col bg-primary-black mx-auto my-6 h-auto rounded-xl p-10 ">
      <div className="flex justify-between items-center mx-10">
        <h1 className="text-4xl font-bold text-white tracking-[.15em]">Blogs</h1>
        <Button variant="default" className='button-style'>Most Recent</Button>
      </div>

      

      {/* Cards */}
      {/* <BlogCard /> */}
      

    </main>
  );
}
