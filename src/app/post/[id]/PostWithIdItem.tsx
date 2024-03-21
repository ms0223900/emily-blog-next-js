import { Post } from "@/repos/post/types";
import React from "react";
import Markdown from "react-markdown";
import styles from './post.module.css'
import { Tag } from "@/components/homepage/Tag";

export const PostWithIdItem: React.FC<{
    post: Pick<Post, "id" | "title" | "description" | "content" | "tags">;
}> = ({ post: { id, title, description, content, tags } }) => (
    <div className={"max-w-[800px] w-full m-auto px-4 md:px-0 pt-8"}>
        <Tag tag={tags} />
        <h1 className="text-4xl font-bold pt-4 pb-5">{`Id: ${id} -- ${title}`}</h1>
        <h2 className="text-xl">{description}</h2>
        <div className={"py-2"}>
            <hr />
        </div>
        <div>
            <Markdown className={styles.markdown}>
                {content}
            </Markdown>
        </div>
    </div>
);
