import PostRepository from "@/repos/post/PostRepository";
import React, { memo } from "react";
import { PostWithIdItem } from "./PostWithIdItem";

const PostWithId: React.FC<{ params: { id: string } }> = async ({
  params: { id },
}) => {
  const postData = await PostRepository.getPostById(id);

  return <PostWithIdItem post={postData} />;
};

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const posts = await PostRepository.getPosts();

  return posts.map(({ id }) => ({
    id: String(id),
  }));
}

export default memo(PostWithId);
