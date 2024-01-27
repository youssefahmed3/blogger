
import React from "react";
import NewBlogForm from "./NewBlogForm";

export default function Page() {


  return (
    <main className="container flex gap-6 flex-col bg-primary-black mx-auto my-6 h-auto rounded-xl p-10 ">
      
      <NewBlogForm />
    </main>
  );
}
