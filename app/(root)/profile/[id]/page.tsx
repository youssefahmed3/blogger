"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import BlogCard from "@/components/blogCard/BlogCard";
import { UserType } from "@/lib/models/user.model";
import { fetchUserById } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Page({ params }: { params: { id: string } }) {
  const [currentUserProfile, setCurrentUserProfile] = useState(true);
  const { data: session, status: SessionStatus } = useSession();
  const [user, setUser] = useState<UserType | null>(session?.user as UserType);

  /* useEffect for loading the userdata from session variable */
  useEffect(() => {
    setUser(session?.user as UserType);
  }, [session]);

  useEffect(() => {
    async function fetchUserProfile() {
      const user = await fetchUserById(params.id);
      setUser(user);
    }

    if (user && params.id !== user._id) {
      setCurrentUserProfile(false);
      fetchUserProfile();
    }
  }, [params.id, user]);

  if (SessionStatus === "loading") return <h1>Loading...</h1>;

  return (
    <main className="container flex gap-6 flex-col bg-primary-black mx-auto my-6 h-auto rounded-xl p-10">
      <div className="flex flex-col justify-between items-center mx-10">
        {/* Image */}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex gap-3 justify-center items-center">
            <Avatar className="h-[150px] w-[150px] shadow-lg">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="text-2xl">{user?.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-5">
              <h1 className="text-2xl font-bold text-white tracking-[.15em]">
                {user?.username}
              </h1>
              <p className="text-white text-sm">
                {user?.bio
                  ? user?.bio
                  : currentUserProfile
                  ? "Add your bio"
                  : `${user?.username} has no bio`}
              </p>
            </div>
          </div>
          {currentUserProfile ? (
            <div className="flex justify-around items-center gap-3">
              <Button className="button-style">Edit Profile</Button>
            </div>
          ) : (
            <div className="flex justify-around items-center gap-3">
              <Button className="button-style">Follow</Button>
            </div>
          )}
        </div>
        <div className="container flex items-center justify-center gap-[4rem] text-white">
          <div className="flex flex-col items-center justify-center">
            <p>Followers</p>
            <p>{user?.followers.length}</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p>Following</p>
            <p>{user?.following.length}</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p>Posts</p>
            <p>{user?.blogs.length}</p>
          </div>
        </div>
      </div>

      <hr />

      {/* Cards */}
      {user?.blogs.length === 0 ? (
        <h1 className="text-white text-2xl text-center">
          {currentUserProfile
            ? "You don't have any Blogs yet!"
            : `${user?.username} has no blogs`}
        </h1>
      ) : (
        <BlogCard username={user?.username as string} body="Hi Hi" />
      )}
    </main>
  );
}
