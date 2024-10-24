import { PostWithIdItem } from "@/app/post/[id]/PostWithIdItem";
import PostRepository from "@/repos/post/PostRepository";
import TagRepo from "@/repos/tag/TagRepository";
import React, { memo } from "react";

const PostsByTag: React.FC<{ params: { tagId: string } }> = async ({
    params: { tagId, },
}) => {
    const posts = await PostRepository.getPostsByTagId(tagId);
    return (
        <div>
            {posts.map((post) => (
                <PostWithIdItem key={post.id} post={post} />
            ))}
        </div>
    );
};

export async function generateStaticParams(): Promise<{ tagId: string }[]> {
    const tags = await TagRepo.getTags();

    return tags.map(({ id }) => ({
        tagId: String(id),
    }));
}

export default memo(PostsByTag);
