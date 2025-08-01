"use server";
import prismaClient from "@/services/prisma";

export async function createPostsForUser(id: string, content: string) {
  try {
    const post = await prismaClient.posts.create({
      data: {
        content,
        userID: id,
      },
    });
    return { success: true, post: post };
  } catch (err) {
    return { success: false, message: err };
  }
}
export async function getAllPostsOfUser(id: string) {
  try {
    const posts = await prismaClient.posts.findMany({
      where: {
        userID: id,
      },
      orderBy: {
        postedAt: "desc",
      },
    });
    // console.log(posts)
    if (posts) {
      return {
        success: true,
        posts: posts,
      };
    } else {
      return {
        success: false,
        message: "NO POSTS",
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err,
    };
  }
}
