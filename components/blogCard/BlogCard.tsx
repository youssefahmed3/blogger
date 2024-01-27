import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import LikeIcon from "@/assets/thumb_up.svg";
import CommentIcon from "@/assets/Chat_alt.svg";

interface BlogCardProps {
    username: string;
    body: string;
    /* likes: number;
    comments: number;
    createdAt: string; */
}

function BlogCard(props: BlogCardProps) {
  return (
    <Card className="">
      <CardHeader className="inline-flex flex-row items-center gap-2 bg-primary-black m-3 !p-2 w-auto rounded-md text-white">
        <CardTitle>username</CardTitle>
        {"—"}
        <CardDescription className="!mt-0 text-white">
          Following
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio amet et
          laboriosam perferendis quo debitis placeat. Vitae iste voluptatibus
          ducimus, recusandae quibusdam quas voluptatum non quaerat quod
          dolorem, a laudantium?
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant={"ghost"} className="gap-2">
          <div className="flex gap-2 items-center">
            {"2"}
            <Image src={LikeIcon} alt="Like Icon" width={24} height={24} />
          </div>
          Like
        </Button>
        <Button variant={"ghost"} className="gap-2">
          <div className="flex gap-2 items-center">
            {"2"}
            <Image src={CommentIcon} alt="Like Icon" width={24} height={24} />
          </div>
          Comment
        </Button>
      </CardFooter>
    </Card>
  );
}

export default BlogCard;
