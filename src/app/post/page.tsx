import PostRepository from "@/repos/post/PostRepository";
import React, { memo } from "react";
import CardItem from "@/components/homepage/CardItem";
import { SinglePost } from "common-types";
export interface PostsProps {
    postList: SinglePost[];
}

const Posts = async () => {
    const postList = (await fetchPosts()).postList;

    return (
        <div className="p-2 max-w-[1200px] m-auto">
            <h1 className={`text-xl font-bold text-center py-6`}>
                所有文章
            </h1>
            <ul className={"grid grid-cols-2 md:grid-cols-4 gap-4"}>
                {postList.map((post) => (
                    <CardItem
                        key={post.id}
                        thumbnailImg={post.thumbnail?.src || ""}
                        intro={post.description}
                        {...post} />
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
