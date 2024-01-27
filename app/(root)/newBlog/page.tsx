"use client"
import React from "react";
import NewBlogForm from "./NewBlogForm";
import { useSession } from "next-auth/react";

export default function Page() {
  const {data:session, status:SessionStatus }= useSession();
  if(SessionStatus === "loading") return <h1>Loading...</h1>

  
  return (
    <main className="container flex gap-6 flex-col bg-primary-black mx-auto my-6 h-auto rounded-xl p-10 ">
      
      <NewBlogForm />
    </main>
  );
}
