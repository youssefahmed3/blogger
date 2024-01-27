import React from "react";
import RegisterForm from "./registerForm";

function Page() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="inline-flex flex-col items-center bg-primary-black p-10 rounded-lg gap-10">
        <p className="tracking-[0.15rem] text-white font-bold text-4xl">
          Register to Blogger
        </p>

        <RegisterForm />
      </div>
    </main>
  );
}

export default Page;