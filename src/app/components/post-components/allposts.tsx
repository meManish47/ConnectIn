//@ts-nocheck
"use client";
import { getCurrentUser } from "@/app/actions/actions";
import { getAllPostsOfUser } from "@/app/actions/postsaction";
import { useEffect, useState } from "react";
import PostCard from "./post_card";
export default function AllPostsComponent({ userId, userObj }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const posts = await getAllPostsOfUser(userId);
      console.log("CAME", posts);
      setPosts(posts.posts);
    }
    getPosts();
  }, []);
  console.log("POSTS", posts);
  if (!posts) {
    return (
      <div className="w-full h-full rounded-2xl flex flex-col justify-center items-center">
        No Posts here yet :/
      </div>
    );
  }
  return (
    <div className="w-full h-full rounded-2xl flex flex-col p-4 items-start">
      {posts.map((post) => {
        return <PostCard post={post} userObj={userObj} />;
      })}
    </div>
  );
}
