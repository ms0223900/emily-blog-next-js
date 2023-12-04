import Link from "next/link";
import React, { memo } from "react";

export interface SinglePost {
  id: number;
  title: string;
}

export interface PostsProps {
  postList: SinglePost[];
}

const Posts = async () => {
  const postList = (await fetchPosts()).postList;

  return (
    <div className="p-10">
      <h1 className={`text-xl`}>All Posts Here :)</h1>
      {postList.map((post) => (
        <Link
          key={post.id}
          className="block p-4 bg-white m-2 hover:bg-gray-50"
          href={`/post/${post.id}`}
        >
          {post.title}
        </Link>
      ))}
    </div>
  );
};

export async function fetchPosts(): Promise<PostsProps> {
  // TODO
  // fetch post ids or all posts

  return {
    postList: Array(10)
      .fill(0)
      .map((_, i) => i)
      .map((id) => ({
        id: id,
        title: `Title-${id}`,
      })),
  };
}

export default memo(Posts);
