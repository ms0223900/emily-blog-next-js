import React, { memo } from "react";

const PostWithId: React.FC<{ params: { id: string } }> = ({
  params: { id },
}) => {
  return (
    <div>
      <h1>{`Id: ${id}`}</h1>
    </div>
  );
};

export async function generateStaticParams(): Promise<{ id: string }[]> {
  // TODO
  // fetch post ids or all posts

  return [1, 2, 3].map((id) => ({
    id: String(id),
  }));
}

export default memo(PostWithId);
