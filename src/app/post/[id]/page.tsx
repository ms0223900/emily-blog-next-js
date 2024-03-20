import PostRepository from "@/repos/post/PostRepository";
import React, { memo } from "react";
import { PostWithIdItem } from "./PostWithIdItem";
import Head from "next/head";

export const generateMetadata = async ({
                                           params: { id }
                                       }: { params: { id: string } }) => {
    const postData = await PostRepository.getPostById(id);

    return ({
        title: postData.title,
    })
};


const PostWithId: React.FC<{ params: { id: string } }> = async ({
                                                                    params: { id },
                                                                }) => {
    const postData = await PostRepository.getPostById(id);

    return <div>
        <Head>
            <title>{postData.title}</title>
        </Head>
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
