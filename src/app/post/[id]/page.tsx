import PostRepository from "@/repos/post/PostRepository";
import React, { memo } from "react";

const PostWithId: React.FC<{ params: { id: string } }> = async ({
  params: { id },
}) => {
  const postData = await PostRepository.getPostById(id);

  return (
    <div>
      <h1>{`Id: ${id} -- ${postData.title}`}</h1>
      <h2>{postData.description}</h2>
      <p>{postData.content}</p>
    </div>
  );
};

export async function generateStaticParams(): Promise<{ id: string }[]> {
  // TODO
  // fetch post ids or all posts

  return [1, 2, 3].map((id) => ({
    id: String(id),
  }));
}

export default memo(PostWithId);
