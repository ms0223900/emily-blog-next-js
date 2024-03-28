import PostRepository from "@/repos/post/PostRepository";
import React, { memo } from "react";
import CardItem from "@/components/homepage/CardItem";
import { Post } from "@/repos/post/types";

export interface SinglePost extends Post {
    id: string;
    title: string;
}

export interface PostsProps {
    postList: SinglePost[];
}

const Posts = async () => {
    const postList = (await fetchPosts()).postList;

    return (
        <div className="p-2 max-w-[1200px] m-auto">
            <h1 className={`text-xl`}>All Posts Here :)</h1>
            <ul className={"grid grid-cols-2 md:grid-cols-4 gap-4"}>
                {postList.map((post) => (
                    <CardItem key={post.id}
                              thumbnailImg={post.thumbnail}
                              tag={post.tags}
                              intro={post.description} {...post} />
                ))}
            </ul>
        </div>
    );
};

async function fetchPosts(): Promise<PostsProps> {
    const posts = await PostRepository.getPosts();

    return {
        postList: posts,
    };
}

export default memo(Posts);
