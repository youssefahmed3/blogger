"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { UserType } from "@/lib/models/user.model";
// import { useRouter } from "next/navigation";
function Navbar() {
  const { data: session } = useSession();
  const user = session?.user as UserType;

  return (
    <div className="flex justify-between items-center p-2 bg-primary-black">
      {session ? (
        <Link href={"/home"}>
          <div className="text-xl text-white">
            Hello, {session ? `${user?.username}` : "Guest"}
          </div>
        </Link>
      ) : (
        <div className="text-xl text-white">
          Hello, Guest
        </div>
      )}

      <div className="flex justify-evenly gap-2">
        {session ? (
          <>
            <Link href={"/newBlog"}>
              <Button variant="default" className="button-style">
                New Blog
              </Button>
            </Link>

            <Link href={`/profile/${user._id}`}>
              <Button variant="default" className="button-style">
                Profile
              </Button>
            </Link>

            <Link href={"/"}>
              <Button
                variant="default"
                className="button-style"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href={"/login"}>
              <Button variant="default" className="button-style">
                Login
              </Button>
            </Link>

            <Link href={"/register"}>
              <Button variant="default" className="button-style">
                Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
