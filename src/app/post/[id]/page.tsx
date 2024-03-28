import PostRepository from "@/repos/post/PostRepository";
import React, { memo } from "react";
import { PostWithIdItem } from "./PostWithIdItem";

export const generateMetadata = async ({
                                           params: { id }
                                       }: { params: { id: string } }) => {
    const postData = await PostRepository.getPostById(id);

    return ({
        title: `${postData.title} | Emily's Blog`,
    })
};


const PostWithId: React.FC<{ params: { id: string } }> = async ({
                                                                    params: { id },
                                                                }) => {
    const postData = await PostRepository.getPostById(id);

    return <div>
        <PostWithIdItem post={postData} />
    </div>
};

export async function generateStaticParams(): Promise<{ id: string }[]> {
    const posts = await PostRepository.getPosts();

    return posts.map(({ id }) => ({
        id: String(id),
    }));
}

export default memo(PostWithId);
