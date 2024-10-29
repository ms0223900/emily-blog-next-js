
import React from "react";
import Markdown from "react-markdown";
import styles from './post.module.css'
import { Tag } from "@/components/homepage/Tag";
import remarkGfm from "remark-gfm";
import remarkHeadingId from 'remark-heading-id';
import { SinglePost } from "common-types";


export const PostWithIdItem: React.FC<{
    post: SinglePost;
}> = ({ post: { id, title, description, content, tagList, thumbnail } }) => {
    return (
        <div className={"max-w-[800px] w-full m-auto px-4 md:px-0 pt-8"}>
            {tagList.map(tag => (
                <Tag key={tag.id} tag={tag} />
            ))}
            <h1 className="text-4xl font-bold pt-4 pb-5 leading-normal">{title}</h1>
            <h2 className="text-xl">{description}</h2>
            {thumbnail && <div
                className={"w-full max-h-[200px] md:max-h-[400px] my-4 overflow-hidden rounded-md flex items-center"}>
                <img className={"w-full"} src={thumbnail.src} alt={"post-thumbnail"} />
            </div>}
            <div>
                <Markdown className={styles.markdown}
                    remarkPlugins={[remarkGfm, remarkHeadingId]}
                    components={{
                        a: ({ children, ...props }) =>
                            <a {...props} target={'_blank'}>{children}</a>
                    }}
                >
                    {content}
                </Markdown>
            </div>
        </div>
    );
};
