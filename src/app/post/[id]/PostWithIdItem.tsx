import { Post } from "@/repos/post/types";
import React from "react";

export const PostWithIdItem: React.FC<{
  post: Pick<Post, "id" | "title" | "description" | "content">;
}> = ({ post: { id, title, description, content } }) => (
  <div>
    <h1 className="text-2xl">{`Id: ${id} -- ${title}`}</h1>
    <h2 className="text-xl">{description}</h2>
    <hr />
    <p className="whitespace-pre-wrap">{content}</p>
  </div>
);
