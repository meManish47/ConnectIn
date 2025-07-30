//@ts-nocheck
import { BiLike, BiRepost } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";

import { getCurrentUser } from "@/app/actions/actions";
import Image from "next/image";
export default function PostCard({ post, userObj }) {
  return (
    <div className="w-full h-max flex flex-col p-2 rounded-2xl shadow-xl bg-white  my-2">
      <div className="w-full h-15  p-2 flex gap-2">
        <div className=" flex justify-center items-center h-12 w-12 border-1 border-gray-400 rounded-[50%] bg-white overflow-hidden">
          <Image
            src={"/default_user.png"}
            height={80}
            width={80}
            alt="User"
          ></Image>
        </div>
        <div className=" w-full h-max  flex flex-col">
          <div>{userObj.user.name}</div>
          <div className="text-sm text-gray-500">{userObj.user.school}</div>
        </div>
      </div>
      <div className="w-full h-max  p-2 ">{post.content}</div>
      <div className="flex justify-between w-full h-max p-2 px-12 ">
        <div className="flex gap-0.5 hover:text-blue-500  transition duration-100 cursor-pointer">
          <BiLike size={22} />
          Like
        </div>
        <div
          className="flex  gap-0.5 hover:text-emerald-500 transition duration-100 cursor-pointer
        "
        >
          <FaRegCommentDots size={22} />
          Comment
        </div>
        <div className="flex  gap-0.5 hover:text-amber-500 transition duration-100 cursor-pointer">
          <BiRepost size={22} />
          Repost
        </div>
      </div>
    </div>
  );
}
