import { PostWithIdItem } from "@/app/post/[id]/PostWithIdItem";
import CardList from "@/components/homepage/CardList";
import PostRepository from "@/repos/post/PostRepository";
import TagRepo from "@/repos/tag/TagRepository";
import { Tag } from "common-types";
import React, { memo } from "react";

const PostsByTag: React.FC<{ params: { id: string, title: string } }> = async ({
    params: { id: tagId, title: tagTitle },
}) => {
    console.log(tagId, tagTitle);
    const posts = await PostRepository.getPostsByTagId(tagId);
    return (
        <div className="max-w-[1200px] mx-auto">
            <h1 className="text-4xl font-bold pt-4 pb-5 leading-normal">{tagTitle}</h1>
            <CardList cardListData={posts.map(p => ({
                ...p,
                thumbnailImg: p.thumbnail?.src || '',
                tag: p.tagList[0], // TODO: multiple tags
                intro: p.description
            }))} />
        </div>
    );
};

export async function generateStaticParams(): Promise<Tag[]> {
    const tags = await TagRepo.getTags();

    return tags.map(tag => ({
        id: String(tag.id),
        title: tag.title
    }));
}

export default memo(PostsByTag);
