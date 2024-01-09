import PostRepository from "@/repos/post/PostRepository";
import { Post } from "@/repos/post/types";
import React, { memo } from "react";

export const PostWithIdItem: React.FC<{
  post: Pick<Post, "id" | "title" | "description" | "content">;
}> = ({ post: { id, title, description, content } }) => (
  <div>
    <h1 className="text-2xl">{`Id: ${id} -- ${title}`}</h1>
    <h2 className="text-xl">{description}</h2>
    <hr />
    <p className="whitespace-pre-wrap">{content}</p>
  </div>
);

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
