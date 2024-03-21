import { Post } from "@/repos/post/types";
import React from "react";
import Markdown from "react-markdown";
import styles from './post.module.css'

export const PostWithIdItem: React.FC<{
    post: Pick<Post, "id" | "title" | "description" | "content">;
}> = ({ post: { id, title, description, content } }) => (
    <div className={"max-w-[800px] w-full m-auto"}>
        <h1 className="text-2xl">{`Id: ${id} -- ${title}`}</h1>
        <h2 className="text-xl">{description}</h2>
        <hr />
        <div>
            <Markdown className={styles.markdown}>
                {content}
            </Markdown>
        </div>
    </div>
);
