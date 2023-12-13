import PostRepository from "@/repos/post/PostRepository";
import { log } from "console";
import React, { memo } from "react";

const PostWithId: React.FC<{ params: { id: string } }> = async ({
  params: { id },
}) => {
  const postData = await PostRepository.getPostById(id);

  return (
    <div>
      <h1 className="text-2xl">{`Id: ${id} -- ${postData.title}`}</h1>
      <h2 className="text-xl">{postData.description}</h2>
      <hr />
      <p className="whitespace-pre-wrap">{postData.content}</p>
    </div>
  );
};

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const posts = await PostRepository.getPosts();

  return posts.map(({ id }) => ({
    id,
  }));
}

export default memo(PostWithId);
