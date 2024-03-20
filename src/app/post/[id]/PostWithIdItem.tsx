import { Post } from "@/repos/post/types";
import React from "react";
import Markdown from "react-markdown";
import styles from './post.module.css'

export const PostWithIdItem: React.FC<{
    post: Pick<Post, "id" | "title" | "description" | "content">;
}> = ({ post: { id, title, description, content } }) => (
    <div>
        <h1 className="text-2xl">{`Id: ${id} -- ${title}`}</h1>
        <h2 className="text-xl">{description}</h2>
        <hr />
        <Markdown className={styles.markdown}>
            {content}
        </Markdown>
    </div>
);
