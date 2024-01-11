import { PostWithIdItem } from "@/app/post/[id]/PostWithIdItem";
import PostRepository from "@/repos/post/PostRepository";
import TagRepo from "@/repos/tag/TagRepository";
import React, { memo } from "react";

const PostsByTag: React.FC<{ params: { tagName: string } }> = async ({
  params: { tagName: tagName },
}) => {
  const posts = await PostRepository.getPostsByTag(tagName);

  return (
    <div>
      {posts.map((post) => (
        <PostWithIdItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export async function generateStaticParams(): Promise<{ tagName: string }[]> {
  const tags = await TagRepo.getTags();

  return tags.map(({ id, title }) => ({
    tagName: encodeURIComponent(title),
  }));
}

export default memo(PostsByTag);
