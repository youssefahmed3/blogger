"use client";
import React from 'react'
import { useSession } from 'next-auth/react';
import BlogCard from '@/components/blogCard/BlogCard';

export default function Page() {

  const { data: session } = useSession();

  return (
    <main className="container flex gap-6 flex-col bg-primary-black mx-auto my-6 h-auto rounded-xl p-10">
      <div className="flex justify-between items-center mx-10">
        {/* Image */}
        <h1 className="text-4xl font-bold text-white tracking-[.15em]">{session?.user?.name}</h1>
        
        <div className='flex flex-row items-center justify-center gap-16 bg-white py-5 px-14 rounded-lg'>
          <div className='flex flex-col items-center justify-center'>
            <p>Followers</p>
            <p>650</p>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p>Following</p>
            <p>650</p>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p>Posts</p>
            <p>650</p>
          </div>
        </div>

      </div>

      <hr />  

 

      {/* Cards */}
      {/* <BlogCard /> */}
      

    </main>
  )
}
