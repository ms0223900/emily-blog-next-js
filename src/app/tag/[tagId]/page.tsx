import { PostWithIdItem } from "@/app/post/[id]/PostWithIdItem";
import CardList from "@/components/homepage/CardList";
import PostRepository from "@/repos/post/PostRepository";
import TagRepo from "@/repos/tag/TagRepository";
import React, { memo } from "react";

const PostsByTag: React.FC<{ params: { tagId: string } }> = async ({
    params: { tagId },
}) => {
    const tag = await TagRepo.getTagById(tagId);
    const posts = await PostRepository.getPostsByTagId(tagId);

    // TODO, refactor with Dto -> Vo
    const cardListData = JSON.parse(JSON.stringify(posts.map(p => ({
        ...p,
        thumbnailImg: p.thumbnail?.src || '',
        intro: p.description
    }))));

    return (
        <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-2 py-4">
                <h1 className="text-2xl font-bold inline-block leading-normal text-blue-500 bg-blue-100 rounded-md px-2 py-1">#{tag.title}</h1>
                <p className="text-sm text-gray-500">共 {posts.length} 篇</p>
            </div>
            <CardList cardListData={cardListData} />
        </div>
    );
};

export async function generateStaticParams(): Promise<{ tagId: string }[]> {
    const tags = await TagRepo.getTags();

    return tags.map(tag => ({ tagId: String(tag.id) }));
}

export default memo(PostsByTag);
